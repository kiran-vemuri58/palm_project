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
import axios from 'axios';

const PostGrantOppositionV2 = () => {
  const router = useRouter();
  const { 
    currentAssetId, 
    updateFormData, 
    setStoreData, 
    markFormAsSaved,
  // No need for API loading functions - data is pre-loaded from assets page 
  } = useV2Store();
  
  const postGrantOpposition = useV2Store((state) => state.getFormData('postGrantOpposition'));
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000); // Hide after 3 seconds - same as Forms 1, 2, 3 & 4
  };

  // Redirect if no assetId
  useEffect(() => {
    if (mounted && !currentAssetId) {
      router.push('/v2/invention-recognition?new=true');
    }
  }, [mounted, currentAssetId, router]);

  // No need to load data - it's already in store from assets page
  // Data is pre-loaded when user clicks "View" from assets page

  // Create a wrapper function for updateFormData
  const handleUpdateFormData = (field, value) => {
    updateFormData('postGrantOpposition', field, value);
  };

  // Save data to API
  const handleSave = async () => {
    if (!currentAssetId) {
      showNotification('No Asset ID found. Please create an asset first.', 'error');
      return;
    }

    setIsSaving(true);
    
    try {
      // Prepare payload with all PGO fields
      const payload = {
        asset_id: currentAssetId,
        ...postGrantOpposition
      };

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
        
        showNotification(message, 'success');
        
      } else {
        throw new Error(response.data.message || 'Save failed');
      }
    } catch (error) {
      console.error('❌ Error saving PGO data:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Database error occurred';
        showNotification(errorMessage, 'error');
      } else if (error.request) {
        showNotification('Network error. Please check your connection and try again.', 'error');
      } else {
        showNotification('Error saving data. Please try again.', 'error');
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

      {/* Beautiful Notification Popup - Same as Forms 1, 2, 3 & 4 */}
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
};

export default PostGrantOppositionV2;