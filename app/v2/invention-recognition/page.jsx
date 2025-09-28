'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import SimpleProtectedRoute from '@/components/SimpleProtectedRoute';
import V2Navigation from '@/components/V2Navigation';
import InventionDetailsV2 from '@/components/V2/InventionDetailsV2';
import AddInventorV2 from '@/components/V2/AddInventorV2';
import EntityDetailsV2 from '@/components/V2/EntityDetailsV2';
import TechnologyDetailsV2 from '@/components/V2/TechnologyDetailsV2';
import TrainRunExperimentationV2 from '@/components/V2/TrainRunExperimentationV2';
import EffortSheetV2 from '@/components/V2/EffortSheetV2';
import ActivityStatusV2 from '@/components/V2/ActivityStatusV2';
import { saveFilesToDocuments } from '@/utils/fileUploadUtils';
import useV2Store from '@/store/v2Store';
import axios from 'axios';
import CryptoJS from 'crypto-js';

function InventionRecognitionV2Content() {
  const searchParams = useSearchParams();
  const assetId = searchParams.get('assetId');
  const isNew = searchParams.get('new');
  const isEdit = searchParams.get('edit');
  
  // Get form data and actions from store
  const formData = useV2Store((state) => state.getFormData('inventionRecognition'));
  const updateFormData = useV2Store((state) => state.updateFormData);
  const setCurrentAssetId = useV2Store((state) => state.setCurrentAssetId);
  const setErrors = useV2Store((state) => state.setErrors);
  const currentAssetId = useV2Store((state) => state.currentAssetId);
  const loadFormDataFromAPI = useV2Store((state) => state.loadFormDataFromAPI);
  const mapAPIDataToStore = useV2Store((state) => state.mapAPIDataToStore);
  const setStoreData = useV2Store((state) => state.setStoreData);
  const ensurePageDataLoaded = useV2Store((state) => state.ensurePageDataLoaded);
  const refreshStoreAfterAPI = useV2Store((state) => state.refreshStoreAfterAPI);
  const clearAllDataAndAssetId = useV2Store((state) => state.clearAllDataAndAssetId);
  
  const errors = useV2Store((state) => state.errors);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [isLoadingData, setIsLoadingData] = useState(false);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000); // Hide after 3 seconds
  };

  // Type casting and validation function
  const convertForDatabase = (data) => {
    const converted = { ...data };
    
    // Convert rating to number with validation - always return integer, never null
    if (converted.rating !== undefined && converted.rating !== null && converted.rating !== '') {
      const ratingNum = parseInt(converted.rating);
      if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
        throw new Error('Rating must be a number between 0 and 5');
      }
      converted.rating = ratingNum;
    } else {
      // Set to 0 instead of null for rating field
      converted.rating = 0;
    }
    
    // Date is now handled as string - no conversion needed
    if (converted.date === undefined || converted.date === null || converted.date === '') {
      converted.date = '';
    }
    
    // Convert integer fields with validation - always return integers, never null
    const integerFields = ['hoursspent', 'agencycost', 'revieweffort', 'extractionEffort'];
    integerFields.forEach(field => {
      if (converted[field] !== undefined && converted[field] !== null && converted[field] !== '') {
        const numValue = parseInt(converted[field]);
        if (isNaN(numValue) || numValue < 0) {
          throw new Error(`${field} must be a valid positive number`);
        }
        converted[field] = numValue;
      } else {
        // Set to 0 instead of null for integer fields
        converted[field] = 0;
      }
    });
    
    // Convert file arrays to string arrays (file paths)
    converted.evidence = converted.evidence || [];
    converted.minuteOfMeeting = converted.minuteOfMeeting || [];
    converted.attachments = converted.attachments || [];
    
    // Convert inventors to JSON format
    if (converted.inventors && Array.isArray(converted.inventors)) {
      converted.inventors = { inventors: converted.inventors };
    } else {
      converted.inventors = null;
    }
    
    return converted;
  };

  const handleSave = async () => {
    
    // Basic validation for all required fields
    const newErrors = {};
    const missingFields = [];
    
      // Only three fields are mandatory: Invention Title, Common Name, Inventor Details
      if (!formData.inventiontitle || !formData.inventiontitle.trim()) {
        newErrors.inventiontitle = 'Invention title is required';
        missingFields.push('Invention Title');
      }
      if (!formData.commonname || !formData.commonname.trim()) {
        newErrors.commonname = 'Common name is required';
        missingFields.push('Common Name');
      }
      if (!formData.inventordetails || !formData.inventordetails.trim()) {
        newErrors.inventordetails = 'Inventor details are required';
        missingFields.push('Inventor Details');
      }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      try {
        // Type casting and validation
        const convertedData = convertForDatabase(formData);
        
        let assetNumber = currentAssetId || assetId;
        
        // Generate new asset ID only for new assets
        if (isNew === 'true' && !assetNumber) {
          try {
            const response = await axios.get('/api/invention/generate-asset-id');
            
            if (response.data.success) {
              const generatedAssetId = response.data.assetId;
              
              // Safety check: Compare with localStorage asset ID
              const storedAssetId = localStorage.getItem('v2-asset-storage');
              let finalAssetId = generatedAssetId;
              
              if (storedAssetId) {
                try {
                  // Decrypt and parse stored asset ID
                  const ENCRYPTION_KEY = 'your-secret-key-32-characters!!';
                  const decrypted = CryptoJS.AES.decrypt(storedAssetId, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
                  const parsedStored = JSON.parse(decrypted);
                  const storedId = parsedStored.currentAssetId;
                  
                  if (storedId) {
                    // Extract numeric part for comparison
                    const generatedNum = parseInt(generatedAssetId.replace('A', ''));
                    const storedNum = parseInt(storedId.replace('A', ''));
                    
                    
                    if (storedNum > generatedNum) {
                      finalAssetId = storedId;
                    } else {
                    }
                  }
                } catch (decryptError) {
                }
              }
              
              assetNumber = finalAssetId;
              setCurrentAssetId(assetNumber);
              
              // Refresh store after asset ID generation to ensure consistency
              await refreshStoreAfterAPI(assetNumber, 'inventionRecognition');
            } else {
              throw new Error('Failed to generate asset ID');
            }
          } catch (error) {
            console.error('Error generating asset ID:', error);
            throw new Error('Failed to generate asset ID. Please try again.');
          }
        }
        
        // Add asset_id to the converted data
        const databasePayload = {
          asset_id: assetNumber,
          ...convertedData
        };
        
        
        // Save to database using axios
        const dbResponse = await axios.post('/api/invention/save', databasePayload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (dbResponse.data.success) {
          
          // Save files to documents folder (optional - can be done after DB save)
          const pageName = 'invention-recognition';
          const fileSavePromises = [];
          
          if (formData.evidence && formData.evidence.length > 0) {
            fileSavePromises.push(
              saveFilesToDocuments(formData.evidence, assetNumber, pageName, 'evidence')
            );
          }
          
          if (formData.minuteOfMeeting && formData.minuteOfMeeting.length > 0) {
            fileSavePromises.push(
              saveFilesToDocuments(formData.minuteOfMeeting, assetNumber, pageName, 'minute-of-meeting')
            );
          }
          
          if (formData.attachments && formData.attachments.length > 0) {
            fileSavePromises.push(
              saveFilesToDocuments(formData.attachments, assetNumber, pageName, 'attachments')
            );
          }
          
          // Wait for all files to be saved (optional)
          if (fileSavePromises.length > 0) {
            const savedFilePaths = await Promise.all(fileSavePromises);
            const allSavedPaths = savedFilePaths.flat();
          }
          
          // Update store with the data returned from save API (no need for separate GET call)
          const saveResponseData = dbResponse.data.data;
          
          // Map the saved data back to store format and update store
          const mappedData = mapAPIDataToStore(saveResponseData, 'inventionRecognition');
          
          // Update the store with the returned data
          setStoreData('inventionRecognition', mappedData);
          
          // Determine if this was a create or update based on API response
          const isUpdate = dbResponse.data.message && dbResponse.data.message.includes('updated');
          const message = isUpdate 
            ? `Invention updated successfully! Asset ID: ${assetNumber}`
            : `Invention created successfully! Asset ID: ${assetNumber}`;
          
          showNotification(message, 'success');
        } else {
          throw new Error(dbResponse.data.error || 'Database save failed');
        }
      } catch (error) {
        console.error('Error saving:', error);
        
        // Handle different types of errors
        if (error.message.includes('Rating must be') || error.message.includes('Date must be')) {
          showNotification(error.message, 'error');
        } else if (error.message.includes('Failed to generate asset ID')) {
          showNotification('Failed to generate asset ID. Please try again.', 'error');
        } else if (error.response) {
          // Axios error with response
          if (error.response.status === 401) {
            // Clear only V2 store data (not authentication data since we use HttpOnly cookies)
            clearAllDataAndAssetId();
            window.location.href = '/login';
            return;
          }
          const errorMessage = error.response.data?.error || error.response.data?.message || 'Database error occurred';
          showNotification(errorMessage, 'error');
        } else if (error.request) {
          // Axios error without response (network error)
          showNotification('Network error. Please check your connection and try again.', 'error');
        } else {
          // Other errors
          showNotification('Error saving data. Please try again.', 'error');
        }
      }
    } else {
      const missingList = missingFields.join(', ');
      showNotification(`Required fields are missing: ${missingList}`, 'error');
    }
  };

  // Load data from API when we have an Asset ID
  const loadDataFromAPI = async (assetIdToLoad) => {
    try {
      setIsLoadingData(true);
      
      // Use store's automatic data loading and mapping
      const mappedData = await loadFormDataFromAPI(assetIdToLoad, 'inventionRecognition');
      
      if (mappedData) {
      }
    } catch (error) {
      console.error('❌ Error loading data from API:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Memoize the initialization function to prevent unnecessary re-renders
  const initializeData = useCallback(async () => {
    const targetAssetId = assetId || currentAssetId;
    
    if (targetAssetId) {
      if (assetId && !currentAssetId) {
        setCurrentAssetId(assetId);
      }
      
      // Ensure page data is loaded (check store first, then API if needed)
      await ensurePageDataLoaded(targetAssetId, 'inventionRecognition');
    }
  }, [assetId, currentAssetId, setCurrentAssetId, ensurePageDataLoaded]);

  // Set asset ID and ensure data is loaded when component mounts
  useEffect(() => {
    initializeData();
  }, [initializeData]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <V2Navigation />
      
      {/* Loading indicator */}
      {isLoadingData && (
        <div className="fixed top-20 right-4 z-50 bg-blue-100 text-blue-800 px-4 py-3 rounded-md text-sm font-medium shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Loading data from server...</span>
          </div>
        </div>
      )}
      
      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className={`px-6 py-4 rounded-lg shadow-lg border-l-4 flex items-center space-x-3 ${
            notification.type === 'success' 
              ? 'bg-green-50 border-green-400 text-green-800' 
              : 'bg-red-50 border-red-400 text-red-800'
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              notification.type === 'success' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {notification.type === 'success' ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div>
              <p className="font-semibold text-sm">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification({ show: false, message: '', type: '' })}
              className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Invention Recognition V2</h1>
                <p className="text-lg text-gray-600">Step 1: Define your invention details and inventor information</p>
              </div>
              
              {/* Asset ID Display */}
              {(currentAssetId || assetId) && (
                <div className="bg-blue-100 border border-blue-200 rounded-lg px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-700">Asset ID:</span>
                    <span className="text-lg font-bold text-blue-900 font-mono">
                      {currentAssetId || assetId}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Invention Details Component */}
          <div className="mb-8">
            <InventionDetailsV2
              page="inventionRecognition"
              errors={errors}
              isEditable={true}
              showOnlyBasicFields={true}
              isNewAsset={isNew === 'true'}
            />

            {/* Add Inventor Section */}
            <div className="mt-8">
              <AddInventorV2
                page="inventionRecognition"
                isEditable={true}
                isNewAsset={isNew === 'true'}
              />
            </div>

            {/* Entity Details Section */}
            <div className="mt-8">
              <EntityDetailsV2
                page="inventionRecognition"
                errors={errors}
                isEditable={true}
                isNewAsset={isNew === 'true'}
              />
            </div>

            {/* Technology Details Section */}
            <div className="mt-8">
              <TechnologyDetailsV2
                page="inventionRecognition"
                errors={errors}
                isEditable={true}
                isNewAsset={isNew === 'true'}
              />
            </div>

            {/* Train Run / Experimentation Section */}
            <div className="mt-8">
              <TrainRunExperimentationV2
                page="inventionRecognition"
                errors={errors}
                isEditable={true}
                isNewAsset={isNew === 'true'}
              />
            </div>

            {/* Effort Sheet Section */}
            <div className="mt-8">
              <EffortSheetV2
                page="inventionRecognition"
                errors={errors}
                isEditable={true}
                isNewAsset={isNew === 'true'}
                title="Effort Sheet Details"
                description="Track time, costs, and responsibilities for invention recognition process"
              />
            </div>

            {/* Activity Status Section */}
            <div className="mt-8">
              <ActivityStatusV2
                page="inventionRecognition"
                errors={errors}
                isEditable={true}
                isNewAsset={isNew === 'true'}
                title="Activity Status"
                description="Track the current status of invention recognition process"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSave}
              className="px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              💾 Save Invention Recognition
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function InventionRecognitionV2() {
  return (
    <SimpleProtectedRoute>
      <InventionRecognitionV2Content />
    </SimpleProtectedRoute>
  );
}