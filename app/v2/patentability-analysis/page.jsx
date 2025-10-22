'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SimpleProtectedRoute from '@/components/SimpleProtectedRoute';
import V2Navigation from '@/components/V2Navigation';
import useV2Store from '@/store/v2Store';
import axios from 'axios';

// Import V2 components
import InventionDetailsV2 from '@/components/V2/InventionDetailsV2';
import ExtractorDetailsV2 from '@/components/V2/ExtractorDetailsV2';
import InnovationAnalysisV2 from '@/components/V2/InnovationAnalysisV2';
import DecisionSheetV2 from '@/components/V2/DecisionSheetV2';
import EffortSheetV2 from '@/components/V2/EffortSheetV2';
import ActivityStatusV2 from '@/components/V2/ActivityStatusV2';

function PatentabilityAnalysisV2Content() {
  const router = useRouter();
  
  // Get form data and actions from store
  const formData = useV2Store((state) => state.getFormData('patentabilityAnalysis'));
  const updateFormData = useV2Store((state) => state.updateFormData);
  const setCurrentAssetId = useV2Store((state) => state.setCurrentAssetId);
  const setErrors = useV2Store((state) => state.setErrors);
  const currentAssetId = useV2Store((state) => state.currentAssetId);
  const mapAPIDataToStore = useV2Store((state) => state.mapAPIDataToStore);
  const setStoreData = useV2Store((state) => state.setStoreData);
  const clearAllDataAndAssetId = useV2Store((state) => state.clearAllDataAndAssetId);

  // Wrapper function to handle updateFormData calls from components
  const handleUpdateFormData = (field, value) => {
    updateFormData('patentabilityAnalysis', field, value);
  };
  
  const errors = useV2Store((state) => state.errors);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Redirect to Page 1 if no asset ID
  useEffect(() => {
    if (!currentAssetId) {
      setIsRedirecting(true);
      router.push('/v2/invention-recognition?new=true');
    }
  }, [currentAssetId, router]);

  // Get Page 1 data for Invention Details display
  const page1Data = useV2Store((state) => state.getFormData('inventionRecognition'));

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000); // Hide after 3 seconds - same as Forms 1 & 2
  };

  // No need to load data - it's already in store from assets page
  // Data is pre-loaded when user clicks "View" from assets page

  // No useEffect needed - data is pre-loaded from assets page

  // Convert form data for database
  const convertForDatabase = (data) => {
    const converted = { ...data };
    
    // Convert numeric fields to integers
    const numericFields = ['rating', 'hoursspent', 'agencycost', 'revieweffort', 'extractionEffort'];
    numericFields.forEach(field => {
      if (converted[field] === '' || converted[field] === null || converted[field] === undefined) {
        converted[field] = 0;
      } else {
        converted[field] = parseInt(converted[field]) || 0;
      }
    });
    
    return converted;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const assetIdToUse = currentAssetId;
      
      if (!assetIdToUse) {
        showNotification('No Asset ID found. Please go to Page 1 first.', 'error');
        return;
      }

      // Convert data for database
      const databasePayload = convertForDatabase(formData);
      
      // Add asset_id to payload
      databasePayload.asset_id = assetIdToUse;

      // Make API call to save data
      const response = await axios.post('/api/patentability/save', databasePayload, {
        withCredentials: true
      });

      if (response.data.success) {
        // Update store with returned data
        const saveResponseData = response.data.data;
        if (saveResponseData) {
          const mappedData = mapAPIDataToStore('patentabilityAnalysis', saveResponseData);
          setStoreData('patentabilityAnalysis', mappedData);
        }
        
        const message = response.data.message || 'Patentability Analysis saved successfully!';
        showNotification(message, 'success');
      }
    } catch (error) {
      console.error('Save error:', error);
      
      if (error.response?.status === 401) {
        clearAllDataAndAssetId();
        router.push('/login');
        return;
      }
      
      const errorMessage = error.response?.data?.error || 'Failed to save Patentability Analysis data';
      showNotification(errorMessage, 'error');
    }
    
    setIsSaving(false);
  };

  // Show loading screen if redirecting
  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to Page 1...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <V2Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Asset ID Display */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-blue-600 font-semibold text-lg">
              📋 Asset ID: {currentAssetId || 'Not Generated'}
            </span>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Patentability Analysis V2
          </h1>
          <p className="text-gray-600">
            Analyze patentability and conduct comprehensive research
          </p>
        </div>

        {/* Loading Indicator */}
        {isLoadingData && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-3"></div>
              <span className="text-yellow-800">Loading data...</span>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {/* Invention Details - Read Only from Page 1 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">🔬</span>
              Invention Details (From Page 1)
            </h2>
            <InventionDetailsV2
              formData={page1Data}
              updateFormData={null}
              isEditable={false}
              showRating={false}
            />
          </div>

          {/* Extractor Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">🔍</span>
              Extractor Details
            </h2>
            <ExtractorDetailsV2 
              page="patentabilityAnalysis"
              formData={formData}
              updateFormData={handleUpdateFormData}
            />
          </div>

          {/* Innovation Analysis */}
          <InnovationAnalysisV2 
            page="patentabilityAnalysis" 
            isEditable={true}
            formData={formData}
            updateFormData={handleUpdateFormData}
          />

          {/* Decision Sheet */}
          <DecisionSheetV2 page="patentabilityAnalysis" isEditable={true} />

          {/* Effort Sheet Details */}
          <EffortSheetV2
            formData={formData}
            updateFormData={handleUpdateFormData}
            page="patentabilityAnalysis"
            isEditable={true}
          />

          {/* Activity Status */}
          <ActivityStatusV2
            formData={formData}
            updateFormData={handleUpdateFormData}
            page="patentabilityAnalysis"
            isEditable={true}
          />


          {/* Save Button */}
          <div className="flex justify-center pt-8">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-8 py-4 font-semibold text-lg rounded-xl transition-all duration-200 shadow-lg transform hover:-translate-y-1 cursor-pointer ${
                isSaving 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-70' 
                  : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-xl'
              }`}
            >
              {isSaving ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                  Saving...
                </>
              ) : (
                '💾 Save Patentability Analysis'
              )}
            </button>
          </div>


        </div>
      </div>

      {/* Beautiful Notification Popup - Same as Forms 1 & 2 */}
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
    </div>
  );
}

export default function PatentabilityAnalysisV2() {
  return (
    <SimpleProtectedRoute>
      <PatentabilityAnalysisV2Content />
    </SimpleProtectedRoute>
  );
}