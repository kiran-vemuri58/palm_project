'use client'

import CardWrapper from "@/components/CardWrapper";
import InventionDetails from "@/components/InventionRecognition/InventionDetails";
import AddOrDeleteInventor from "@/components/InventionRecognition/AddOrDeleteInventor";
import { validateInventionForm } from "@/lib/validateInventRecognitionForm";
import useFormStore from "@/store/store";
import React, { use, useEffect, useState } from "react";
import EntityDetails from "@/components/InventionRecognition/EntityDetails";
import TechnologyDetails from "@/components/InventionRecognition/TechnologyDetails";
import TrainRunExperimentation from "@/components/InventionRecognition/TrainRunExperimentation";
import MiniHeader from "@/components/MiniHeader";
import EffortSheetDetails from "@/components/InventionRecognition/EffortSheet";
import ActivityStatus from "@/components/InventionRecognition/ActivityStatus";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { uploadDocuments } from "@/utils/FileUploadUI";
import { fetchAssetIdFromDB } from "@/utils/assetUtils"; // Utility to fetch or generate asset ID
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const InventionRecognitionForm = () => {
  const { formData, setErrors, uploadedPaths, assetId } = useFormStore();
  const updateFormData = useFormStore((state) => state.updateFormData);
  const setAssetId = useFormStore((state) => state.setAssetId);
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  // Authentication check - only redirect if definitely not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn && !user) {
      // Only redirect if we're sure the user is not signed in
      setShouldRedirect(true);
    }
  }, [isLoaded, isSignedIn, user]);

  // Handle redirect
  useEffect(() => {
    if (shouldRedirect) {
      router.push('/');
    }
  }, [shouldRedirect, router]);

  // Show loading while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading if not signed in (while redirecting)
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Load existing data if assetId exists
  const loadExistingData = async () => {
    if (assetId) {
      try {
        const response = await fetch(`/api/invention?assetId=${assetId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Map the data back to form format
            const formData = {
              inventiontitle: data.data.inventiontitle || '',
              commonName: data.data.commonname || '',
              inventordetails: data.data.inventordetails || '',
              incrementalRenovation: data.data.incrementalrenovation || '',
              patentNumbers: data.data.patentnumbers || '',
              journalNumbers: data.data.journalnumbers || '',
              productIdentity: data.data.productidentity || '',
              problemAddressed: data.data.problemaddressed || '',
              trainRun: data.data.trainrun || '',
              experimentResults: data.data.experimentresults || '',
              evidence: data.data.evidence || [],
              minuteOfMeeting: data.data.minuteofmeeting || [],
              attachments: data.data.attachments || [],
              ipRecognizer: data.data.iprecognizer || '',
              hoursSpent: data.data.hoursspent || '',
              agencyRecognizer: data.data.agencyrecognizer || '',
              agencyCost: data.data.agencycost || '',
              reviewEffort: data.data.revieweffort || '',
              managerEmpId: data.data.managerempid || '',
              entity: data.data.entity || '',
              date: data.data.date || '',
              inventionCountry: data.data.inventioncountry || '',
              creationCountry: data.data.creationcountry || '',
              collaboration: data.data.collaboration || '',
              collaboratorName: data.data.collaboratorname || '',
              collaboratorCountry: data.data.collaboratorcountry || '',
              stakeholders: data.data.stakeholders || '',
              inventors: data.data.inventors || [],
            };
            updateFormData(formData);
            console.log('✅ Existing data loaded:', formData);
          }
        }
      } catch (error) {
        console.error('❌ Error loading existing data:', error);
      }
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadExistingData();
  }, [assetId]);

  const handleSave = async () => {
    // Prevent double API calls
    if (isSaving) {
      console.log('⚠️ Save already in progress, ignoring duplicate call');
      return false;
    }

    const errors = validateInventionForm(formData);
    console.log('🔍 Validation errors:', errors);
    console.log('🔍 Form data:', formData);
    if (Object.keys(errors).length > 0) {
      // Show specific toast for missing mandatory fields
      console.log('🔍 Showing validation error toast');
      toast.error('Please enter those three fields: Invention Title, Common Name, and Inventor Details');
      setErrors(errors);
      return false; // Return false to indicate validation failed
    }
  
    try {
      setIsSaving(true);
      console.log('🚀 Starting form submission...');
      console.log('📁 Current form data:', formData);
      
      // Use existing assetId if available, otherwise get a new one
      const currentAssetId = assetId || await fetchAssetIdFromDB();
      const componentName = 'InventionRecognitionForm';

      console.log('🆔 Asset ID:', currentAssetId);
      console.log('🏷️ Component Name:', componentName);

      // Extract only the file fields from formData
      const files = {
        evidence: formData.evidence || [],
        minuteOfMeeting: formData.minuteOfMeeting || [],
        attachments: formData.attachments || [],
      };

      console.log('📂 Files to upload:', files);

      // Only upload if there are files
      let uploadedPaths = {};
      if (files.evidence.length > 0 || files.minuteOfMeeting.length > 0 || files.attachments.length > 0) {
        console.log('📤 Starting file upload...');
        // Upload and get file paths
        uploadedPaths = await uploadDocuments({ files, assetId: currentAssetId, componentName, updateFormData });
        console.log('✅ File upload completed:', uploadedPaths);
      } else {
        console.log('ℹ️ No files to upload');
      }
  
      // Merge uploaded file paths into payload, but preserve the existing uploadedFilePaths structure
      const payload = {
        ...formData,
        asset_id: currentAssetId, // Pass the asset ID to the API
        uploadedFilePaths: {
          ...formData.uploadedFilePaths,
          evidence: uploadedPaths.evidencePaths || formData.uploadedFilePaths.evidence || [],
          minuteOfMeeting: uploadedPaths.minuteOfMeetingPaths || formData.uploadedFilePaths.minuteOfMeeting || [],
          attachments: uploadedPaths.attachmentsPaths || formData.uploadedFilePaths.attachments || [],
        }
      };
  
      console.log('📦 Final payload to API:', payload);
  
      // Submit to invention API
      const saveRes = await fetch('/api/invention', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      // Check if the response is successful
      if (!saveRes.ok) {
        const errorData = await saveRes.json().catch(() => ({}));
        throw new Error(`API call failed: ${saveRes.status} ${saveRes.statusText}. ${errorData.message || ''}`);
      }
  
      const resultDB = await saveRes.json();
      
      // Validate the response data
      if (!resultDB || !resultDB.success) {
        throw new Error(`API returned error: ${resultDB?.message || 'Unknown error'}`);
      }
      
      if (!resultDB.data || !resultDB.data.asset_id) {
        throw new Error('API response missing asset_id');
      }
  
      setAssetId(resultDB.data.asset_id); // Set the asset ID in the store
      console.log('🎉 Operation completed:', resultDB.message);
      console.log('🎉 Invention saved successfully:', resultDB);
      toast.success('Data saved successfully!');
      return true; // Return true to indicate successful save
    } catch (error) {
      console.error('❌ Error saving invention:', error);
      toast.error(`Failed to save invention: ${error.message}`);
      return false; // Return false to indicate save failed
    } finally {
      setIsSaving(false);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col pt-14">
      <CardWrapper
        label="1- Invention Recognition"
        title="Register" 
        backButtonHref="/previous-page"
        nextButtonHref="/assetForm2"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
        requireSave={true}
        formData={formData}
        validateForm={validateInventionForm}
      >
        <MiniHeader title="Invention Details" />

        {/* Form Layout (Stacked One Below The Other) */}
        <div className="flex flex-col gap-6 p-6">
          
          <InventionDetails />
          <div className="ml-4">
            <AddOrDeleteInventor />
          </div>
          <EntityDetails />
        </div>

        <MiniHeader title="Technology Details" />
        <TechnologyDetails />

        <MiniHeader title="Experiments" />
        <TrainRunExperimentation />

        <MiniHeader title="Effort Sheet"  />
        <EffortSheetDetails formKey="formData" updateFunction="updateFormData" />
        <MiniHeader title="Activity Status" />
        <ActivityStatus formKey="formData" updateFunction="updateFormData" />
      </CardWrapper>
    </div>
  );
};

export default InventionRecognitionForm;
