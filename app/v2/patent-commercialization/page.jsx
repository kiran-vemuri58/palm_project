'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import V2Navigation from '@/components/V2Navigation';
import InventionDetailsV2 from '@/components/V2/InventionDetailsV2';
import PCPatentCommercializationChildV2 from '@/components/V2/PatentCommercialization/PCPatentCommercializationChildV2';
import PCPANV2 from '@/components/V2/PatentCommercialization/PCPANV2';
import PCPatentCommercializationEffortsV2 from '@/components/V2/PatentCommercialization/PCPatentCommercializationEffortsV2';
import PCActivityStatusV2 from '@/components/V2/PatentCommercialization/PCActivityStatusV2';
import useV2Store from '@/store/v2Store';
import { toast } from 'sonner';
import axios from 'axios';

const PatentCommercializationV2 = () => {
  const router = useRouter();
  const { 
    currentAssetId, 
    patentCommercialization, 
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
    console.log('🔄 PC Form Update:', { field, value });
    updateFormData('patentCommercialization', field, value);
  };

  // Load data from API
  const loadDataFromAPI = async () => {
    try {
      const mappedData = await loadFormDataFromAPI(currentAssetId, 'patentCommercialization');
      if (mappedData) {
        console.log('✅ PC data loaded from API:', mappedData);
      }
    } catch (error) {
      console.error('❌ Error loading PC data from API:', error);
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
      // Prepare payload with all PC fields
      const payload = {
        asset_id: currentAssetId,
        ...patentCommercialization
      };

      console.log('📦 PC payload being sent:', payload);

      // Send data to API
      const response = await axios.post('/api/pc', payload);
      
      if (response.data.success) {
        // Map the saved data back to store format
        const savedData = response.data.data;
        
        // Update store with the returned data
        setStoreData('patentCommercialization', savedData);
        
        // Mark Form 9 as saved
        markFormAsSaved('patentCommercialization');
        
        // Show success message
        const isUpdate = response.data.message && response.data.message.includes('updated');
        const message = isUpdate 
          ? `Patent Commercialization updated successfully!`
          : `Patent Commercialization saved successfully!`;
        
        toast.success(message);
        
        console.log('✅ PC data saved and mapped to store:', savedData);
      } else {
        throw new Error(response.data.message || 'Save failed');
      }
    } catch (error) {
      console.error('❌ Error saving PC data:', error);
      
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <V2Navigation />
      
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">PC</h1>
                <p className="text-lg text-gray-600">Form 9 - Patent Commercialization</p>
              </div>
              
              {/* Asset ID Display */}
              {currentAssetId && (
                <div className="bg-orange-100 border border-orange-200 rounded-lg px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-orange-700">Asset ID:</span>
                    <span className="text-lg font-bold text-orange-900 font-mono">
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

            {/* Patent Commercialization Child */}
            <div className="mb-8">
              <PCPatentCommercializationChildV2 
                formData={patentCommercialization}
                updateFormData={handleUpdateFormData}
                page="patentCommercialization"
              />
            </div>

            {/* PAN - Post Grant Opposition */}
            <div className="mb-8">
              <PCPANV2 
                formData={patentCommercialization}
                updateFormData={handleUpdateFormData}
                page="patentCommercialization"
              />
            </div>

            {/* Patent Commercialization Efforts */}
            <div className="mb-8">
              <PCPatentCommercializationEffortsV2 
                formData={patentCommercialization}
                updateFormData={handleUpdateFormData}
                page="patentCommercialization"
              />
            </div>

            {/* Activity Status */}
            <div className="mb-8">
              <PCActivityStatusV2 
                formData={patentCommercialization}
                updateFormData={handleUpdateFormData}
                page="patentCommercialization"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  isSaving
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                {isSaving ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  'Save Patent Commercialization'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatentCommercializationV2;