'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import V2Navigation from '@/components/V2Navigation';
import InventionDetailsV2 from '@/components/V2/InventionDetailsV2';
import PMExtractorDetailsV2 from '@/components/V2/PatentMaintenance/PMExtractorDetailsV2';
import PMPatentProsecutionDetailsV2 from '@/components/V2/PatentMaintenance/PMPatentProsecutionDetailsV2';
import PMPatentMaintenanceHistoryV2 from '@/components/V2/PatentMaintenance/PMPatentMaintenanceHistoryV2';
import PMPANV2 from '@/components/V2/PatentMaintenance/PMPANV2';
import PMDecisionSheetV2 from '@/components/V2/PatentMaintenance/PMDecisionSheetV2';
import PMInnovationAnalysisV2 from '@/components/V2/PatentMaintenance/PMInnovationAnalysisV2';
import PMPatentabilityExtractorV2 from '@/components/V2/PatentMaintenance/PMPatentabilityExtractorV2';
import PMEffortSheetDetailsV2 from '@/components/V2/PatentMaintenance/PMEffortSheetDetailsV2';
import PMActivityStatusV2 from '@/components/V2/PatentMaintenance/PMActivityStatusV2';
import useV2Store from '@/store/v2Store';
import axios from 'axios';

const PatentMaintenanceV2 = () => {
  const router = useRouter();
  const { 
    currentAssetId, 
    updateFormData, 
    setStoreData, 
    markFormAsSaved,
  // No need for API loading functions - data is pre-loaded from assets page 
  } = useV2Store();
  
  const patentMaintenance = useV2Store((state) => state.getFormData('patentMaintenance'));
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Ensure client-side rendering
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
    updateFormData('patentMaintenance', field, value);
  };

  const handleSave = async () => {
    if (!currentAssetId) {
      showNotification('No Asset ID found. Please complete Form 1 first.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        asset_id: currentAssetId,
        ...patentMaintenance
      };

      const response = await axios.post('/api/pm', payload);
      
      if (response.data.success) {
        showNotification('Patent Maintenance data saved successfully!', 'success');
        markFormAsSaved('patentMaintenance');
        
        // No need to refresh store - data is pre-loaded from assets page
      } else {
        showNotification('Failed to save Patent Maintenance data', 'error');
      }
    } catch (error) {
      console.error('Error saving PM data:', error);
      showNotification('Error saving Patent Maintenance data', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <V2Navigation />
      
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">PM</h1>
                <p className="text-lg text-gray-600">Form 8 - Patent Maintenance</p>
              </div>
              
              {/* Asset ID Display */}
              {currentAssetId && (
                <div className="bg-blue-100 border border-blue-200 rounded-lg px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-700">Asset ID:</span>
                    <span className="text-lg font-bold text-blue-900 font-mono">
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
              <PMExtractorDetailsV2 
                formData={patentMaintenance}
                updateFormData={handleUpdateFormData}
                page="patentMaintenance"
              />
            </div>

            {/* Patent Prosecution Details */}
            <div className="mb-8">
              <PMPatentProsecutionDetailsV2 
                formData={patentMaintenance}
                updateFormData={handleUpdateFormData}
                page="patentMaintenance"
              />
            </div>

            {/* Patent Maintenance History */}
            <div className="mb-8">
              <PMPatentMaintenanceHistoryV2 
                formData={patentMaintenance}
                updateFormData={handleUpdateFormData}
                page="patentMaintenance"
              />
            </div>

            {/* PAN */}
            <div className="mb-8">
              <PMPANV2 
                formData={patentMaintenance}
                updateFormData={handleUpdateFormData}
                page="patentMaintenance"
              />
            </div>

            {/* Decision Sheet */}
            <div className="mb-8">
              <PMDecisionSheetV2 
                formData={patentMaintenance}
                updateFormData={handleUpdateFormData}
                page="patentMaintenance"
              />
            </div>

            {/* Innovation Analysis */}
            <div className="mb-8">
              <PMInnovationAnalysisV2 
                formData={patentMaintenance}
                updateFormData={handleUpdateFormData}
                page="patentMaintenance"
              />
            </div>

            {/* Patentability Extractor */}
            <div className="mb-8">
              <PMPatentabilityExtractorV2 
                formData={patentMaintenance}
                updateFormData={handleUpdateFormData}
                page="patentMaintenance"
              />
            </div>

            {/* Effort Sheet Details */}
            <div className="mb-8">
              <PMEffortSheetDetailsV2 
                formData={patentMaintenance}
                updateFormData={handleUpdateFormData}
                page="patentMaintenance"
              />
            </div>

            {/* Activity Status */}
            <div className="mb-8">
              <PMActivityStatusV2 
                formData={patentMaintenance}
                updateFormData={handleUpdateFormData}
                page="patentMaintenance"
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
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {isSaving ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                'Save Patent Maintenance'
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

export default PatentMaintenanceV2;