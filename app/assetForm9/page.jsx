'use client'

import CardWrapper from "@/components/CardWrapper";
import ActivityStatus from "@/components/InventionRecognition/ActivityStatus";
import InventionDetails from "@/components/InventionRecognition/InventionDetails";
import MiniHeader from "@/components/MiniHeader";
import PAN from "@/components/PatentCommercialisation/PAN";
import PatentCommercializationChild from "@/components/PatentCommercialisation/PatentCommercializationChild";
import PCEfforts from "@/components/PatentCommercialisation/PCEfforts";
import useFormStore from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import SimpleProtectedRoute from "@/components/SimpleProtectedRoute";

const PatentCommercialisationContent = () => {
  const assetId = useFormStore((state) => state.assetId);
  const formData9 = useFormStore((state) => state.formData9);
  const updateFormData9 = useFormStore((state) => state.updateFormData9);
  const setAssetId = useFormStore((state) => state.setAssetId);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle assetId from query parameter
  useEffect(() => {
    const queryAssetId = searchParams.get('assetId');
    if (queryAssetId && queryAssetId !== assetId) {
      console.log('🔍 Setting assetId from URL:', queryAssetId);
      setAssetId(queryAssetId);
    }
  }, [searchParams, assetId, setAssetId]);

  // Load existing data when assetId changes
    // Map database fields to form fields
  const mapDatabaseToForm = (dbData) => {
    // For now, return the data as-is since each form has different field mappings
    // This can be customized per form if needed
    return dbData || {};
  };

  const loadExistingData = async () => {
    if (!assetId) return;

    setIsLoadingData(true);
    try {
      const response = await fetch(`/api/patent-commercialisation?assetId=${assetId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
          // Update form data with existing data
          updateFormData9(data.data);
        }
      }
    } catch (error) {
      console.error('Error loading existing data:', error);
      toast.error("Failed to load existing data. Please try again.");
    } finally {
      setIsLoadingData(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadExistingData();
  }, [assetId]);

    // Show loading state while fetching data
  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-gray-200/50 max-w-md mx-auto">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Loading Asset Data</h3>
          <p className="text-gray-600 mb-6">Please wait while we load the existing form data...</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <MiniHeader title="Patent Commercialisation" />
        
        <div className="space-y-8">
          <CardWrapper>
            <InventionDetails
              formKey="formData9"
              updateFunction="updateFormData9"
            />
          </CardWrapper>

          <CardWrapper>
            <PatentCommercializationChild
              formData={formData9}
              updateFormData={updateFormData9}
              formKey="formData9"
            />
          </CardWrapper>

          <CardWrapper label="Post Grant Opposition (PAN)">
            <PAN
              formData={formData9}
              updateFormData={updateFormData9}
              formKey="formData9"
            />
          </CardWrapper>

          <CardWrapper label="Patent Commercialization Efforts">
            <PCEfforts
              formData={formData9}
              updateFormData={updateFormData9}
              formKey="formData9"
            />
          </CardWrapper>

          <CardWrapper label="Activity Status">
            <ActivityStatus
              formData={formData9}
              updateFormData={updateFormData9}
              formKey="formData9"
            />
          </CardWrapper>
        </div>
        </div>
      </div>
    );
};

// Main component with Suspense wrapper
const PatentCommercialisation = () => {
  return (
    <SimpleProtectedRoute>
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-gray-200/50 max-w-md mx-auto">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Loading Form</h3>
            <p className="text-gray-600 mb-6">Please wait while we load the patent commercialisation form...</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    }>
      <PatentCommercialisationContent />
    </Suspense>
    </SimpleProtectedRoute>
  );
};

export default PatentCommercialisation;