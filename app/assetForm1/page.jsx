'use client'

import CardWrapper from "@/components/CardWrapper";
import InventionDetails from "@/components/InventionRecognition/InventionDetails";
import AddOrDeleteInventor from "@/components/InventionRecognition/AddOrDeleteInventor";
import { validateInventionForm } from "@/lib/validateInventRecognitionForm";
import useFormStore from "@/store/store";
import React, { use, useEffect, useState, Suspense } from "react";
import EntityDetails from "@/components/InventionRecognition/EntityDetails";
import TechnologyDetails from "@/components/InventionRecognition/TechnologyDetails";
import TrainRunExperimentation from "@/components/InventionRecognition/TrainRunExperimentation";
import MiniHeader from "@/components/MiniHeader";
import EffortSheetDetails from "@/components/InventionRecognition/EffortSheet";
import ActivityStatus from "@/components/InventionRecognition/ActivityStatus";
import { Router } from "next/router";
import { useRouter, useSearchParams } from "next/navigation";
import { uploadDocuments } from "@/utils/FileUploadUI";
import { fetchAssetIdFromDB } from "@/utils/assetUtils"; // Utility to fetch or generate asset ID
import { toast } from "sonner";
import SimpleProtectedRoute from "@/components/SimpleProtectedRoute";

// Component that uses useSearchParams - needs to be wrapped in Suspense
const InventionRecognitionFormContent = () => {
  const { formData, setErrors, uploadedPaths, assetId } = useFormStore();
  const updateFormData = useFormStore((state) => state.updateFormData);
  const setAssetId = useFormStore((state) => state.setAssetId);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSaving, setIsSaving] = useState(false);

  // Handle assetId from query parameter
  useEffect(() => {
    const queryAssetId = searchParams.get('assetId');
    if (queryAssetId && queryAssetId !== assetId) {
      setAssetId(queryAssetId);
    }
  }, [searchParams, assetId, setAssetId]);

  // Load existing data when assetId changes
  const loadExistingData = async () => {
    if (!assetId) return;

    try {
      const response = await fetch(`/api/invention?assetId=${assetId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Update form data with existing data
          updateFormData(data.data);
        }
      }
    } catch (error) {
      console.error('Error loading existing data:', error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadExistingData();
  }, [assetId]);

  // No complex authentication logic needed - SimpleProtectedRoute handles it

  const handleSave = async () => {
    // Prevent double API calls
    if (isSaving) return;

    setIsSaving(true);

    try {
      // Validate form data
      const validationResult = validateInventionForm(formData);
      if (!validationResult.isValid) {
        setErrors(validationResult.errors);
        toast.error("Please fix the validation errors before saving.");
        return;
      }

      // Clear previous errors
      setErrors({});

      // Prepare payload
      const payload = {
        ...formData,
        assetId: assetId || await fetchAssetIdFromDB(),
        uploadedPaths: uploadedPaths
      };

      // Upload documents if any
      if (uploadedPaths && uploadedPaths.length > 0) {
        try {
          const uploadResult = await uploadDocuments(uploadedPaths, assetId, 'InventionRecognitionForm');
          if (uploadResult.success) {
            payload.uploadedPaths = uploadResult.uploadedPaths;
          }
        } catch (uploadError) {
          console.error('Upload error:', uploadError);
          toast.error("Error uploading documents. Please try again.");
          return;
        }
      }

      // Save to database
      const response = await fetch('/api/invention', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Invention recognition form saved successfully!");
        // Optionally redirect to assets page
        // router.push('/assets');
      } else {
        toast.error(result.error || "Failed to save form. Please try again.");
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error("An error occurred while saving. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <CardWrapper>
        <MiniHeader title="Invention Details" />
        <InventionDetails formKey="formData" updateFunction="updateFormData" />
        
        <MiniHeader title="Add or Delete Inventor" />
        <AddOrDeleteInventor formKey="formData" updateFunction="updateFormData" />
        
        <MiniHeader title="Entity Details" />
        <EntityDetails formKey="formData" updateFunction="updateFormData" />
        
        <MiniHeader title="Technology Details" />
        <TechnologyDetails formKey="formData" updateFunction="updateFormData" />
        
        <MiniHeader title="Train Run Experimentation" />
        <TrainRunExperimentation formKey="formData" updateFunction="updateFormData" />
        
        <MiniHeader title="Effort Sheet Details" />
        <EffortSheetDetails formKey="formData" updateFunction="updateFormData" />
        
        <MiniHeader title="Activity Status" />
        <ActivityStatus formKey="formData" updateFunction="updateFormData" />
        
        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={() => router.push('/assets')}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save Form'}
          </button>
        </div>
      </CardWrapper>
    </div>
  );
};

// Main component with Suspense wrapper
const InventionRecognitionForm = () => {
  return (
    <SimpleProtectedRoute>
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-gray-200/50 max-w-md mx-auto">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Loading Form</h3>
            <p className="text-gray-600 mb-6">Please wait while we load the invention recognition form...</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      }>
        <InventionRecognitionFormContent />
      </Suspense>
    </SimpleProtectedRoute>
  );
};

export default InventionRecognitionForm;