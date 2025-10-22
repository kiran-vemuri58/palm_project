'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Removed toast import - using custom notification instead
import V2Navigation from '@/components/V2Navigation';
import useV2Store from '@/store/v2Store';

// Import all V2 components
import InventionDetailsV2 from '@/components/V2/InventionDetailsV2';
import PPExtractorDetailsV2 from '@/components/V2/PatentProsecution/PPExtractorDetailsV2';
import PPPatentProsecutionDetailsV2 from '@/components/V2/PatentProsecution/PPPatentProsecutionDetailsV2';
import PPPatentApplicationStatusV2 from '@/components/V2/PatentProsecution/PPPatentApplicationStatusV2';
import PPFERV2 from '@/components/V2/PatentProsecution/PPFERV2';
import PPHearingV2 from '@/components/V2/PatentProsecution/PPHearingV2';
import PPDecisionSheetV2 from '@/components/V2/PatentProsecution/PPDecisionSheetV2';
import PPInnovationAnalysisV2 from '@/components/V2/PatentProsecution/PPInnovationAnalysisV2';
import PPPatentabilityExtractorV2 from '@/components/V2/PatentProsecution/PPPatentabilityExtractorV2';
import PPAveragePatentabilityRatingV2 from '@/components/V2/PatentProsecution/PPAveragePatentabilityRatingV2';
import PPEffortSheetV2 from '@/components/V2/PatentProsecution/PPEffortSheetV2';
import PPActivityStatusV2 from '@/components/V2/PatentProsecution/PPActivityStatusV2';

const PatentProsecutionV2 = () => {
  const router = useRouter();
  
  const { 
    currentAssetId, 
    updateFormData,
    mapAPIDataToStore,
    setStoreData
  } = useV2Store();
  
  const patentProsecution = useV2Store((state) => state.getFormData('patentProsecution'));

  const [isSaving, setIsSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000); // Hide after 3 seconds - same as Forms 1, 2, 3, 4 & 5
  };

  // Redirect if no assetId
  useEffect(() => {
    if (mounted && !currentAssetId) {
      router.push('/v2/invention-recognition?new=true');
    }
  }, [mounted, currentAssetId, router]);

  // Handle save functionality
  const handleSave = async () => {
    if (!currentAssetId) {
      showNotification('Please enter an Asset ID first', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/patentProsecution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          asset_id: currentAssetId,
          ...patentProsecution
        }),
      });

      const result = await response.json();

      if (result.success) {
        showNotification('Patent Prosecution data saved successfully!', 'success');
        
        // Update store with returned data to ensure FER and Hearing arrays are properly loaded
        if (result.data) {
          const mappedData = mapAPIDataToStore('patentProsecution', result.data);
          setStoreData('patentProsecution', mappedData);
        }
      } else {
        showNotification(result.message || 'Failed to save data', 'error');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      showNotification('Failed to save data. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  // No loading state needed - data is pre-loaded from assets page

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <V2Navigation />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Patent Prosecution</h1>
              <p className="text-lg text-gray-600">Form 6 - Comprehensive patent prosecution management</p>
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

        {/* Form Components */}
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
          <PPExtractorDetailsV2 
            formData={patentProsecution} 
            updateFormData={updateFormData} 
            page="patentProsecution"
          />

          {/* Patent Prosecution Details */}
          <PPPatentProsecutionDetailsV2 
            formData={patentProsecution} 
            updateFormData={updateFormData} 
            page="patentProsecution"
          />

          {/* Patent Application Status */}
          <PPPatentApplicationStatusV2 
            formData={patentProsecution} 
            updateFormData={updateFormData} 
            page="patentProsecution"
          />

          {/* First Examination Report (FER) */}
          <PPFERV2 
            formData={patentProsecution} 
            updateFormData={updateFormData} 
            page="patentProsecution"
          />

          {/* Hearing Details */}
          <PPHearingV2 
            formData={patentProsecution} 
            updateFormData={updateFormData} 
            page="patentProsecution"
          />

          {/* Decision Sheet */}
          <PPDecisionSheetV2 
            formData={patentProsecution} 
            updateFormData={updateFormData} 
            page="patentProsecution"
          />

          {/* Innovation Analysis */}
          <PPInnovationAnalysisV2 
            formData={patentProsecution} 
            updateFormData={updateFormData} 
            page="patentProsecution"
          />

          {/* Patentability Extractor */}
          <PPPatentabilityExtractorV2 
            formData={patentProsecution} 
            updateFormData={updateFormData} 
            page="patentProsecution"
          />

          {/* Average Patentability Rating */}
          <PPAveragePatentabilityRatingV2 
            formData={patentProsecution} 
            updateFormData={updateFormData} 
            page="patentProsecution"
          />

          {/* Effort Sheet Details */}
          <PPEffortSheetV2 
            formData={patentProsecution} 
            updateFormData={updateFormData} 
            page="patentProsecution"
          />

          {/* Activity Status */}
          <PPActivityStatusV2 
            formData={patentProsecution} 
            updateFormData={updateFormData} 
            page="patentProsecution"
          />
        </div>

        {/* Save Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleSave}
            disabled={isSaving || !currentAssetId}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
              isSaving || !currentAssetId
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg hover:scale-105'
            }`}
          >
            {isSaving ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Saving...</span>
              </div>
            ) : (
              'Save Patent Prosecution Data'
            )}
          </button>
          {!currentAssetId && (
            <p className="text-sm text-gray-500 mt-2">
              Please enter an Asset ID in Form 1 to enable saving
            </p>
          )}
        </div>

      </div>

      {/* Beautiful Notification Popup - Same as Forms 1, 2, 3, 4 & 5 */}
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

export default PatentProsecutionV2;
