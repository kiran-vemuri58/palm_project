'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const assetId = searchParams.get('assetId');
  const isNew = searchParams.get('new');
  const isEdit = searchParams.get('edit');
  
  // Get form data and actions from store
  const formData = useV2Store((state) => state.getFormData('patentabilityAnalysis'));
  const updateFormData = useV2Store((state) => state.updateFormData);
  const setCurrentAssetId = useV2Store((state) => state.setCurrentAssetId);
  const setErrors = useV2Store((state) => state.setErrors);
  const currentAssetId = useV2Store((state) => state.currentAssetId);
  const mapAPIDataToStore = useV2Store((state) => state.mapAPIDataToStore);
  const setStoreData = useV2Store((state) => state.setStoreData);
  const ensurePageDataLoaded = useV2Store((state) => state.ensurePageDataLoaded);
  const ensurePage1DataLoaded = useV2Store((state) => state.ensurePage1DataLoaded);
  const clearAllDataAndAssetId = useV2Store((state) => state.clearAllDataAndAssetId);
  
  const errors = useV2Store((state) => state.errors);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Redirect to Page 1 if no asset ID
  useEffect(() => {
    if (!assetId && !currentAssetId) {
      setIsRedirecting(true);
      router.push('/v2/invention-recognition?new=true');
    }
  }, [assetId, currentAssetId, router]);

  // Get Page 1 data for Invention Details display
  const page1Data = useV2Store((state) => state.getFormData('inventionRecognition'));

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000);
  };

  // Initialize data when component mounts
  const initializeData = useCallback(async () => {
    // Only make API calls if we have an asset ID from URL AND no assetId in store from Page 1
    if (assetId && !currentAssetId) {
      setIsLoadingData(true);
      try {
        // Load Page 3 data
        await ensurePageDataLoaded('patentabilityAnalysis', assetId);
        
        // Load Page 1 data for Invention Details display
        await ensurePage1DataLoaded(assetId);
        
        if (assetId !== currentAssetId) {
          setCurrentAssetId(assetId);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoadingData(false);
      }
    }
    // If assetId is in store from Page 1, or for new assets, just use store data without API calls
  }, [assetId, currentAssetId, ensurePageDataLoaded, ensurePage1DataLoaded, setCurrentAssetId]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

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
    try {
      const assetIdToUse = assetId || currentAssetId;
      
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
              📋 Asset ID: {assetId || currentAssetId || 'Not Generated'}
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

        {/* Notification */}
        {notification.show && (
          <div className={`mb-6 p-4 rounded-lg ${
            notification.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex items-center">
              <span className="mr-2">
                {notification.type === 'success' ? '✅' : '❌'}
              </span>
              {notification.message}
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
            <ExtractorDetailsV2 page="patentabilityAnalysis" />
          </div>

          {/* Innovation Analysis */}
          <InnovationAnalysisV2 page="patentabilityAnalysis" isEditable={true} />

          {/* Decision Sheet */}
          <DecisionSheetV2 page="patentabilityAnalysis" isEditable={true} />

          {/* Effort Sheet Details */}
          <EffortSheetV2
            formData={formData}
            updateFormData={updateFormData}
            page="patentabilityAnalysis"
            isEditable={true}
          />

          {/* Activity Status */}
          <ActivityStatusV2
            formData={formData}
            updateFormData={updateFormData}
            page="patentabilityAnalysis"
            isEditable={true}
          />

          {/* Save Button */}
          <div className="flex justify-center pt-8">
            <button
              onClick={handleSave}
              className="px-8 py-4 bg-purple-600 text-white font-semibold text-lg rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              💾 Save Patentability Analysis
            </button>
          </div>

        </div>
      </div>
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