'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import SimpleProtectedRoute from '@/components/SimpleProtectedRoute';
import V2Navigation from '@/components/V2Navigation';
import useV2Store from '@/store/v2Store';
import axios from 'axios';
import CryptoJS from 'crypto-js';

// Import V2 components for Invention Extraction
import InventionDetailsV2 from '@/components/V2/InventionDetailsV2';
import ExtractorDetailsV2 from '@/components/V2/ExtractorDetailsV2';
import UpdatesNBAV2 from '@/components/V2/UpdatesNBAV2';
import EffortSheetV2 from '@/components/V2/EffortSheetV2';
import ActivityStatusV2 from '@/components/V2/ActivityStatusV2';

function InventionExtractionV2Content() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const assetId = searchParams.get('assetId');
  const isNew = searchParams.get('new');
  const isEdit = searchParams.get('edit');
  
  // Get form data and actions from store
  const formData = useV2Store((state) => state.getFormData('inventionExtraction'));
  const updateFormData = useV2Store((state) => state.updateFormData);
  const setCurrentAssetId = useV2Store((state) => state.setCurrentAssetId);
  const setErrors = useV2Store((state) => state.setErrors);
  const currentAssetId = useV2Store((state) => state.currentAssetId);

  // Redirect to Page 1 if no asset ID is present
  useEffect(() => {
    if (!assetId && !currentAssetId) {
      setIsRedirecting(true);
      router.push('/v2/invention-recognition?new=true');
    }
  }, [assetId, currentAssetId, router]);
  const loadFormDataFromAPI = useV2Store((state) => state.loadFormDataFromAPI);
  const mapAPIDataToStore = useV2Store((state) => state.mapAPIDataToStore);
  const setStoreData = useV2Store((state) => state.setStoreData);
  const ensurePageDataLoaded = useV2Store((state) => state.ensurePageDataLoaded);
  const ensurePage1DataLoaded = useV2Store((state) => state.ensurePage1DataLoaded);
  const refreshStoreAfterAPI = useV2Store((state) => state.refreshStoreAfterAPI);
  const clearAllDataAndAssetId = useV2Store((state) => state.clearAllDataAndAssetId);
  
  // Get Page 1 data for Invention Details display
  const page1Data = useV2Store((state) => state.getFormData('inventionRecognition'));
  
  const errors = useV2Store((state) => state.errors);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000); // Hide after 3 seconds
  };

  // Type casting and validation function
  const convertForDatabase = (data) => {
    const converted = { ...data };
    
    // Date is now handled as string - no conversion needed
    if (converted.iEDate === undefined || converted.iEDate === null || converted.iEDate === '') {
      converted.iEDate = '';
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
    converted.idattachments = converted.idattachments || [];
    
    return converted;
  };

  const handleSave = async () => {
    
    // No mandatory fields validation for Page 2 - all fields are optional
    const newErrors = {};
    setErrors(newErrors);
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
              await refreshStoreAfterAPI(assetNumber, 'inventionExtraction');
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
        const dbResponse = await axios.post('/api/extraction/save', databasePayload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (dbResponse.data.success) {
          
          // Update store with the data returned from save API (no need for separate GET call)
          const saveResponseData = dbResponse.data.data;
          
          // Map the saved data back to store format and update store
          const mappedData = mapAPIDataToStore(saveResponseData, 'inventionExtraction');
          
          // Update the store with the returned data
          setStoreData('inventionExtraction', mappedData);
          
          // Determine if this was a create or update based on API response
          const isUpdate = dbResponse.data.message && dbResponse.data.message.includes('updated');
          const message = isUpdate 
            ? `Invention Extraction updated successfully! Asset ID: ${assetNumber}`
            : `Invention Extraction created successfully! Asset ID: ${assetNumber}`;
          
          showNotification(message, 'success');
        } else {
          throw new Error(dbResponse.data.error || 'Database save failed');
        }
      } catch (error) {
        console.error('Error saving:', error);
        
        // Handle different types of errors
        if (error.message.includes('Date must be')) {
          showNotification(error.message, 'error');
        } else if (error.message.includes('Failed to generate asset ID')) {
          showNotification('Failed to generate asset ID. Please try again.', 'error');
        } else if (error.response) {
          // Axios error with response
          if (error.response.status === 401) {
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
  };

  // Load data from API when we have an Asset ID
  const loadDataFromAPI = async (assetIdToLoad) => {
    try {
      setIsLoadingData(true);
      
      // Use store's automatic data loading and mapping
      const mappedData = await loadFormDataFromAPI(assetIdToLoad, 'inventionExtraction');
      
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
    
    if (assetId && !currentAssetId) {
      setCurrentAssetId(assetId);
    }
    
    // Only make API calls if we have an asset ID (not for new assets)
    if (targetAssetId) {
      await ensurePageDataLoaded(targetAssetId, 'inventionExtraction');
      
      // Ensure Page 1 data is loaded for Invention Details display
      await ensurePage1DataLoaded(targetAssetId);
      
      // Force a re-render by getting fresh data
      const freshPage1Data = useV2Store.getState().getFormData('inventionRecognition');
    }
    // For new assets (no assetId), just use store data without API calls
  }, [assetId, currentAssetId, setCurrentAssetId, ensurePageDataLoaded, ensurePage1DataLoaded]);

  // Set asset ID and ensure data is loaded when component mounts
  useEffect(() => {
    initializeData();
  }, [initializeData]);

  // Show loading screen if redirecting
  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to create new asset...</p>
        </div>
      </div>
    );
  }

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
            <div className="flex-shrink-0">
              {notification.type === 'success' ? (
                <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              ) : (
                <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✕</span>
                </div>
              )}
            </div>
            <div className="text-sm font-medium">{notification.message}</div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Invention Extraction V2</h1>
              <p className="text-gray-600 mt-2">Extract and analyze invention details</p>
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


          {/* Form Fields */}
          <div className="space-y-8">
            {/* Invention Details - View Only (from Page 1) */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Invention Details</h2>
                <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  From Page 1
                </span>
              </div>
              <p className="text-sm text-blue-700 mb-4">
                These fields are automatically populated from Page 1 (Invention Recognition) data and are read-only on this page.
              </p>
              <InventionDetailsV2 
                page="inventionRecognition"
                errors={errors}
                isEditable={false}
                showRating={false}
                showPatentNumber={false}
                isNewAsset={false}
                showOnlyBasicFields={false}
                formData={page1Data}
                updateFormData={() => {}} // No-op since it's read-only
              />
            </div>

            {/* Extraction Details */}
            <ExtractorDetailsV2 
              page="inventionExtraction"
              errors={errors}
            />
            

            {/* NBA Updates */}
            <UpdatesNBAV2 
              page="inventionExtraction"
              errors={errors}
            />

            {/* Effort Sheet Details */}
            <EffortSheetV2 
              page="inventionExtraction"
              errors={errors}
              isEditable={true}
            />

            {/* Activity Status */}
            <ActivityStatusV2 
              page="inventionExtraction"
              errors={errors}
              isEditable={true}
            />
          </div>

          {/* Bottom Save Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              💾 Save Extraction Details
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function InventionExtractionV2() {
  return (
    <SimpleProtectedRoute>
      <InventionExtractionV2Content />
    </SimpleProtectedRoute>
  );
}