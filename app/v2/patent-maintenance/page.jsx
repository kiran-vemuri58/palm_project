'use client';

import React, { Suspense, useState, useEffect } from 'react';
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
import { toast } from 'sonner';
import axios from 'axios';

const PatentMaintenanceV2 = () => {
  const router = useRouter();
  const { 
    currentAssetId, 
    patentMaintenance, 
    updateFormData, 
    setStoreData, 
    markFormAsSaved,
    loadFormDataFromAPI 
  } = useV2Store();
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Ensure client-side rendering
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

  const loadDataFromAPI = async () => {
    try {
      await loadFormDataFromAPI(currentAssetId, 'patentMaintenance');
    } catch (error) {
      console.error('Error loading PM data:', error);
    }
  };

  // Create a wrapper function for updateFormData
  const handleUpdateFormData = (field, value) => {
    console.log('🔄 PM Form Update:', { field, value });
    updateFormData('patentMaintenance', field, value);
  };

  const handleSave = async () => {
    if (!currentAssetId) {
      toast.error('No Asset ID found. Please complete Form 1 first.');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        asset_id: currentAssetId,
        ...patentMaintenance
      };

      console.log('💾 Saving PM data:', payload);

      const response = await axios.post('/api/pm', payload);
      
      if (response.data.success) {
        toast.success('Patent Maintenance data saved successfully!');
        markFormAsSaved('patentMaintenance');
        
        // Refresh store data after successful save
        await loadDataFromAPI();
      } else {
        toast.error('Failed to save Patent Maintenance data');
      }
    } catch (error) {
      console.error('Error saving PM data:', error);
      toast.error('Error saving Patent Maintenance data');
    } finally {
      setIsSaving(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Suspense fallback={
        <div className="bg-gray-50 border-b border-gray-200 sticky top-24 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-14">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold bg-gray-200 text-gray-400">
                  <span className="text-lg">🔧</span>
                  <span className="text-sm font-mono">PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      }>
        <V2Navigation />
      </Suspense>
      
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
    </div>
  );
};

export default PatentMaintenanceV2;