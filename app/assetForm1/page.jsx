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
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Ensure formData is always initialized
  const safeFormData = formData || {};

  // Handle assetId from query parameter
  useEffect(() => {
    const queryAssetId = searchParams.get('assetId');
    console.log('🔍 Query AssetId:', queryAssetId);
    console.log('🔍 Current AssetId:', assetId);
    if (queryAssetId && queryAssetId !== assetId) {
      console.log('🔍 Setting AssetId from query:', queryAssetId);
      setAssetId(queryAssetId);
    }
  }, [searchParams, assetId, setAssetId]);

  // Map database fields to form fields
  const mapDatabaseToForm = (dbData) => {
    return {
      inventiontitle: dbData.inventiontitle || '',
      commonName: dbData.commonname || '',
      inventordetails: dbData.inventordetails || '',
      inventors: dbData.inventors || [],
      incrementalRenovation: dbData.incrementalrenovation || '',
      patentNumbers: dbData.patentnumbers || '',
      journalNumbers: dbData.journalnumbers || '',
      productIdentity: dbData.productidentity || '',
      problemAddressed: dbData.problemaddressed || '',
      trainRun: dbData.trainrun || '',
      experimentResults: dbData.experimentresults || '',
      evidence: dbData.evidence || [],
      minuteOfMeeting: dbData.minuteofmeeting || [],
      attachments: dbData.attachments || [],
      ipRecognizer: dbData.iprecognizer || '',
      hoursSpent: dbData.hoursspent || '',
      agencyRecognizer: dbData.agencyrecognizer || '',
      agencyCost: dbData.agencycost || '',
      reviewEffort: dbData.revieweffort || '',
      managerEmpId: dbData.managerempid || '',
      entity: dbData.entity || '',
      date: dbData.date ? new Date(dbData.date).toISOString().split('T')[0] : '',
      inventionCountry: dbData.inventioncountry || '',
      creationCountry: dbData.creationcountry || '',
      collaboration: dbData.collaboration || '',
      collaboratorName: dbData.collaboratorname || '',
      collaboratorCountry: dbData.collaboratorcountry || '',
      stakeholders: dbData.stakeholders || '',
      activityStatus: dbData.activitystatus || '',
      uploadedFilePaths: {
        evidence: dbData.evidence || [],
        minuteOfMeeting: dbData.minuteofmeeting || [],
        attachments: dbData.attachments || []
      }
    };
  };

  // Load existing data when assetId changes
  const loadExistingData = async () => {
    console.log('🔍 loadExistingData called with assetId:', assetId);
    if (!assetId) {
      console.log('🔍 No assetId, skipping data load');
      return;
    }

    setIsLoadingData(true);
    try {
      console.log('🔍 Making API call to:', `/api/invention?assetId=${assetId}`);
      const response = await fetch(`/api/invention?assetId=${assetId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('🔍 API Response:', data);
        if (data.success && data.data) {
          console.log('🔍 Raw DB Data:', data.data);
          // Map database fields to form fields and update form data
          const mappedData = mapDatabaseToForm(data.data);
          console.log('🔍 Mapped Form Data:', mappedData);
          updateFormData(mappedData);
        }
      }
    } catch (error) {
      console.error('Error loading existing data:', error);
      toast.error("Failed to load existing data. Please try again.");
    } finally {
      setIsLoadingData(false);
    }
  };

  // Initialize formData if undefined
  useEffect(() => {
    if (!formData) {
      updateFormData({});
    }
  }, [formData, updateFormData]);

  // Load data on component mount
  useEffect(() => {
    loadExistingData();
  }, [assetId]);

  // No complex authentication logic needed - SimpleProtectedRoute handles it

  const handleSave = async () => {
    try {
      // Validate form data
      const validationResult = validateInventionForm(safeFormData);
      if (!validationResult.isValid) {
        setErrors(validationResult.errors);
        toast.error("Please fix the validation errors before saving.");
        return false;
      }

      // Clear previous errors
      setErrors({});

      // Prepare payload
      const payload = {
        ...safeFormData,
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
          return false;
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
        // Set the assetId after successful save so Next button gets enabled
        if (result.data?.asset_id && !assetId) {
          setAssetId(result.data.asset_id);
        }
        toast.success("Invention recognition form saved successfully!");
        return true;
      } else {
        toast.error(result.error || "Failed to save form. Please try again.");
        return false;
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error("An error occurred while saving. Please try again.");
      return false;
    }
  };

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

  // Safety check: ensure formData is initialized
  if (!formData) {
    console.warn('formData is undefined, initializing with empty object');
    updateFormData({});
    return null; // Prevent rendering until formData is initialized
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <CardWrapper
        label="Invention Recognition Form"
        backButtonHref="/assets"
        nextButtonHref="/assetForm2"
        onSave={handleSave}
        requireSave={true}
        formData={safeFormData}
        validateForm={validateInventionForm}
        assetId={assetId}
      >
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