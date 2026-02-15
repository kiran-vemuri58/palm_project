'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// Removed toast import - using custom notification instead
import SimpleProtectedRoute from '@/components/SimpleProtectedRoute';
import V2Navigation from '@/components/V2Navigation';
import InventionDetailsV2 from '@/components/V2/InventionDetailsV2';
import ActivityStatusV2 from '@/components/V2/ActivityStatusV2';
import TypeOfDraftV2 from '@/components/V2/TypeOfDraftV2';
import CompleteSpecificationV2 from '@/components/V2/CompleteSpecificationV2';
import ProvisionalApplicationV2 from '@/components/V2/ProvisionalApplicationV2';
import PCTApplicationV2 from '@/components/V2/PCTApplicationV2';
import NationalPhaseV2 from '@/components/V2/NationalPhaseV2';
import useV2Store from '@/store/v2Store';

function PatentSpecificationV2Content() {
  
  // Get form data and actions from store
  const formData = useV2Store((state) => state.getFormData('patentSpecification'));
  const updateFormData = useV2Store((state) => state.updateFormData);
  const currentAssetId = useV2Store((state) => state.currentAssetId);
  const setCurrentAssetId = useV2Store((state) => state.setCurrentAssetId);
  // No need for API loading functions - data is pre-loaded from assets page
  const errors = useV2Store((state) => state.errors);
  // No loading state needed - data is pre-loaded from assets page
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  // Get Page 1 data for Invention Details display
  const page1Data = useV2Store((state) => state.getFormData('inventionRecognition'));
  
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000); // Hide after 3 seconds - same as Forms 1, 2 & 3
  };
  
  // Handle Save
  const handleSave = async () => {
    const targetAssetId = currentAssetId;
    
    if (!targetAssetId) {
      showNotification('Cannot save: No Asset ID available. Please save Form 1 first.', 'error');
      return;
    }
    
    setIsSaving(true);
    
    try {
      console.log('💾 Saving Patent Specification data for Asset ID:', targetAssetId);
      console.log('📦 Form Data:', formData);
      
      // Prepare payload for API
      const payload = {
        asset_id: targetAssetId,
        ...formData
      };
      
      // Send to API
      const response = await axios.post('/api/psp', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        showNotification(response.data.message || 'Patent Specification saved successfully!', 'success');
        console.log('✅ Patent Specification saved:', response.data);
        
        // Update store with the data returned from API (ensures store matches DB)
        if (response.data.data) {
          const savedData = response.data.data;
          console.log('🔄 Updating store with saved data from API:', savedData);
          
          // Use the store's mapping function to convert API data to store format
          const mapAPIDataToStore = useV2Store.getState().mapAPIDataToStore;
          const mappedData = mapAPIDataToStore(savedData, 'patentSpecification');
          
          // Update the store with the mapped data
          const setStoreData = useV2Store.getState().setStoreData;
          setStoreData('patentSpecification', mappedData);
          
          console.log('✅ Store updated with latest data from API');
        }
      } else {
        showNotification(response.data.message || 'Failed to save Patent Specification', 'error');
      }
    } catch (error) {
      console.error('❌ Error saving Patent Specification:', error);
      showNotification(error.response?.data?.message || error.message || 'Failed to save Patent Specification', 'error');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handler for rating change
  const handleRatingChange = (rating) => {
    console.log('Rating clicked:', rating);
    console.log('Current formData:', formData);
    updateFormData('patentSpecification', 'rating', rating);
    console.log('Updated formData:', useV2Store.getState().getFormData('patentSpecification'));
  };

  // Memoize the initialization function to prevent unnecessary re-renders
  // No need to load data - it's already in store from assets page
  // Data is pre-loaded when user clicks "View" from assets page

  // No useEffect needed - data is pre-loaded from assets page

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <V2Navigation />
      
      {/* No loading indicator needed - data is pre-loaded from assets page */}
      
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Patent Specification V2</h1>
                <p className="text-lg text-gray-600">Step 4: Patent Specification Preparation</p>
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

          {/* Invention Details Component - Disabled (showing data from Form 1) */}
          <div className="mb-8">
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
                showOnlyBasicFields={true}
                isNewAsset={false}
                formData={page1Data}
                updateFormData={() => {}} // No-op since it's read-only
              />
            </div>
          </div>

          {/* Rating Section */}
          <div className="mb-8">
            <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Average Patentability Rating</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating (1-5)
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const currentRating = formData?.rating || 0;
                      const isActive = currentRating >= star;
                      
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className={`text-4xl transition-all focus:outline-none cursor-pointer ${
                            isActive
                              ? 'text-yellow-400 hover:text-yellow-500'
                              : 'text-gray-300 hover:text-yellow-300'
                          }`}
                        >
                          ★
                        </button>
                      );
                    })}
                    <span className="ml-4 text-lg font-semibold text-gray-700">
                      {formData?.rating || 0} / 5
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Debug: Current rating = {JSON.stringify(formData?.rating)}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Click on a star to set the rating
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Type of Draft Section */}
          <div className="mb-8">
            <TypeOfDraftV2 page="patentSpecification" />
          </div>

          {/* Conditionally show sections based on draft type */}
          {formData?.draftType === 'complete' && (
            <div className="mb-8">
              <CompleteSpecificationV2 page="patentSpecification" isPage4={true} />
            </div>
          )}

          {formData?.draftType === 'provisional' && (
            <div className="mb-8">
              <ProvisionalApplicationV2 page="patentSpecification" isPage4={true} />
            </div>
          )}

          {formData?.draftType === 'pct' && (
            <div className="mb-8">
              <PCTApplicationV2 page="patentSpecification" isPage4={true} />
            </div>
          )}

          {formData?.draftType === 'national_phase' && (
            <div className="mb-8">
              <NationalPhaseV2 page="patentSpecification" isPage4={true} />
            </div>
          )}

          {/* Activity Status Section */}
          <div className="mb-8">
            <ActivityStatusV2
              page="patentSpecification"
              errors={errors}
              isEditable={true}
              title="Activity Status"
              description="Track the current status of patent specification process"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-8 py-4 font-semibold text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                isSaving
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSaving ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                '💾 Save Patent Specification'
              )}
            </button>
          </div>


        </div>
      </div>

      {/* Beautiful Notification Popup - Same as Forms 1, 2 & 3 */}
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

export default function PatentSpecificationV2() {
  return (
    <SimpleProtectedRoute>
      <PatentSpecificationV2Content />
    </SimpleProtectedRoute>
  );
}