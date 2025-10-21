'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import V2Navigation from '@/components/V2Navigation';
import InventionDetailsV2 from '@/components/V2/InventionDetailsV2';
import PGOExtractorDetailsV2 from '@/components/V2/PostGrantOpposition/PGOExtractorDetailsV2';
import PGOPatentProsecutionDetailsV2 from '@/components/V2/PostGrantOpposition/PGOPatentProsecutionDetailsV2';
import PGOPANV2 from '@/components/V2/PostGrantOpposition/PGOPANV2';
import PGODecisionSheetV2 from '@/components/V2/PostGrantOpposition/PGODecisionSheetV2';
import PGOInnovationAnalysisV2 from '@/components/V2/PostGrantOpposition/PGOInnovationAnalysisV2';
import PGOPatentabilityExtractorV2 from '@/components/V2/PostGrantOpposition/PGOPatentabilityExtractorV2';
import PGOEffortSheetDetailsV2 from '@/components/V2/PostGrantOpposition/PGOEffortSheetDetailsV2';
import PGOActivityStatusV2 from '@/components/V2/PostGrantOpposition/PGOActivityStatusV2';
import useV2Store from '@/store/v2Store';
import { toast } from 'sonner';
import axios from 'axios';

const PostGrantOppositionV2 = () => {
  const router = useRouter();
  const { 
    currentAssetId, 
    postGrantOpposition, 
    updateFormData, 
    setStoreData, 
    markFormAsSaved,
    loadFormDataFromAPI 
  } = useV2Store();
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if no assetId
  useEffect(() => {
    if (mounted && !currentAssetId) {
      router.push('/v2/invention-recognition?new=true');
    }
  }, [mounted, currentAssetId, router]);

  // Load data from API when component mounts
  useEffect(() => {
    if (mounted && currentAssetId) {
      loadDataFromAPI();
    }
  }, [mounted, currentAssetId]);

  // Create a wrapper function for updateFormData
  const handleUpdateFormData = (field, value) => {
    console.log('🔄 PGO Form Update:', { field, value });
    updateFormData('postGrantOpposition', field, value);
  };

  // Load data from API
  const loadDataFromAPI = async () => {
    try {
      const mappedData = await loadFormDataFromAPI(currentAssetId, 'postGrantOpposition');
      if (mappedData) {
        console.log('✅ PGO data loaded from API:', mappedData);
      }
    } catch (error) {
      console.error('❌ Error loading PGO data from API:', error);
    }
  };

  // Save data to API
  const handleSave = async () => {
    if (!currentAssetId) {
      toast.error('No Asset ID found. Please create an asset first.');
      return;
    }

    setIsSaving(true);
    
    try {
      // Prepare payload with all PGO fields
      const payload = {
        asset_id: currentAssetId,
        ...postGrantOpposition
      };

      console.log('📦 PGO payload being sent:', payload);

      // Send data to API
      const response = await axios.post('/api/pgo', payload);
      
      if (response.data.success) {
        // Map the saved data back to store format
        const savedData = response.data.data;
        
        // Update store with the returned data
        setStoreData('postGrantOpposition', savedData);
        
        // Mark Form 7 as saved
        markFormAsSaved('postGrantOpposition');
        
        // Show success message
        const isUpdate = response.data.message && response.data.message.includes('updated');
        const message = isUpdate 
          ? `Post Grant Opposition updated successfully!`
          : `Post Grant Opposition saved successfully!`;
        
        toast.success(message);
        
        console.log('✅ PGO data saved and mapped to store:', savedData);
      } else {
        throw new Error(response.data.message || 'Save failed');
      }
    } catch (error) {
      console.error('❌ Error saving PGO data:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Database error occurred';
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error('Network error. Please check your connection and try again.');
      } else {
        toast.error('Error saving data. Please try again.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <V2Navigation />
      
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">PGO</h1>
                <p className="text-lg text-gray-600">Form 7 - Post Grant Opposition</p>
              </div>
              
              {/* Asset ID Display */}
              {currentAssetId && (
                <div className="bg-purple-100 border border-purple-200 rounded-lg px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-purple-700">Asset ID:</span>
                    <span className="text-lg font-bold text-purple-900 font-mono">
                      {currentAssetId}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-8">
            {/* Invention Details - Read from Form 1 store, disabled */}
            <div className="mb-8">
              <InventionDetailsV2 
                isEditable={false}
                page="inventionRecognition"
                showOnlyBasicFields={true}
              />
            </div>

            {/* Extractor Details */}
            <div className="mb-8">
              <PGOExtractorDetailsV2 
                formData={postGrantOpposition}
                updateFormData={handleUpdateFormData}
                page="postGrantOpposition"
              />
            </div>

            {/* Patent Prosecution Details */}
            <div className="mb-8">
              <PGOPatentProsecutionDetailsV2 
                formData={postGrantOpposition}
                updateFormData={handleUpdateFormData}
                page="postGrantOpposition"
              />
            </div>

            {/* PAN */}
            <div className="mb-8">
              <PGOPANV2 
                formData={postGrantOpposition}
                updateFormData={handleUpdateFormData}
                page="postGrantOpposition"
              />
            </div>

            {/* Decision Sheet */}
            <div className="mb-8">
              <PGODecisionSheetV2 
                formData={postGrantOpposition}
                updateFormData={handleUpdateFormData}
                page="postGrantOpposition"
              />
            </div>

            {/* Innovation Analysis */}
            <div className="mb-8">
              <PGOInnovationAnalysisV2 
                formData={postGrantOpposition}
                updateFormData={handleUpdateFormData}
                page="postGrantOpposition"
              />
            </div>

            {/* Patentability Extractor */}
            <div className="mb-8">
              <PGOPatentabilityExtractorV2 
                formData={postGrantOpposition}
                updateFormData={handleUpdateFormData}
                page="postGrantOpposition"
              />
            </div>

            {/* Effort Sheet Details */}
            <div className="mb-8">
              <PGOEffortSheetDetailsV2 
                formData={postGrantOpposition}
                updateFormData={handleUpdateFormData}
                page="postGrantOpposition"
              />
            </div>

            {/* Activity Status */}
            <div className="mb-8">
              <PGOActivityStatusV2 
                formData={postGrantOpposition}
                updateFormData={handleUpdateFormData}
                page="postGrantOpposition"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                isSaving
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {isSaving ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                'Save Post Grant Opposition'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostGrantOppositionV2;