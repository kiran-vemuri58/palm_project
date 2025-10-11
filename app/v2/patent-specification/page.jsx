'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
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
  const searchParams = useSearchParams();
  const assetId = searchParams.get('assetId');
  const isNew = searchParams.get('new');
  const isEdit = searchParams.get('edit');
  
  // Get form data and actions from store
  const formData = useV2Store((state) => state.getFormData('patentSpecification'));
  const updateFormData = useV2Store((state) => state.updateFormData);
  const currentAssetId = useV2Store((state) => state.currentAssetId);
  const setCurrentAssetId = useV2Store((state) => state.setCurrentAssetId);
  const ensurePageDataLoaded = useV2Store((state) => state.ensurePageDataLoaded);
  const ensurePage1DataLoaded = useV2Store((state) => state.ensurePage1DataLoaded);
  const errors = useV2Store((state) => state.errors);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Get Page 1 data for Invention Details display
  const page1Data = useV2Store((state) => state.getFormData('inventionRecognition'));
  
  // Handle Save
  const handleSave = async () => {
    const targetAssetId = assetId || currentAssetId;
    
    if (!targetAssetId) {
      toast.error('Cannot save: No Asset ID available. Please save Form 1 first.');
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
        toast.success(response.data.message || 'Patent Specification saved successfully!');
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
        toast.error(response.data.message || 'Failed to save Patent Specification');
      }
    } catch (error) {
      console.error('❌ Error saving Patent Specification:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to save Patent Specification');
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
  const initializeData = useCallback(async () => {
    const targetAssetId = assetId || currentAssetId;
    
    if (assetId && !currentAssetId) {
      setCurrentAssetId(assetId);
    }
    
    // Only make API calls if we have an asset ID (not for new assets)
    if (targetAssetId) {
      setIsLoadingData(true);
      try {
        await ensurePageDataLoaded(targetAssetId, 'patentSpecification');
        
        // Ensure Page 1 data is loaded for Invention Details display
        await ensurePage1DataLoaded(targetAssetId);
        
        // Force a re-render by getting fresh data
        const freshPage1Data = useV2Store.getState().getFormData('inventionRecognition');
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoadingData(false);
      }
    }
    // For new assets (no assetId), just use store data without API calls
  }, [assetId, currentAssetId, setCurrentAssetId, ensurePageDataLoaded, ensurePage1DataLoaded]);

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
              <CompleteSpecificationV2 page="patentSpecification" />
            </div>
          )}

          {formData?.draftType === 'provisional' && (
            <div className="mb-8">
              <ProvisionalApplicationV2 page="patentSpecification" />
            </div>
          )}

          {formData?.draftType === 'pct' && (
            <div className="mb-8">
              <PCTApplicationV2 page="patentSpecification" />
            </div>
          )}

          {formData?.draftType === 'national_phase' && (
            <div className="mb-8">
              <NationalPhaseV2 page="patentSpecification" />
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