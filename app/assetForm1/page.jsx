'use client'

import CardWrapper from "@/components/CardWrapper";
import InventionDetails from "@/components/InventionRecognition/InventionDetails";
import AddOrDeleteInventor from "@/components/InventionRecognition/AddOrDeleteInventor";
import { validateInventionForm } from "@/lib/validateInventRecognitionForm";
import useFormStore from "@/store/store";
import React, { use } from "react";
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

const InventionRecognitionForm = () => {
  const { formData, setErrors, uploadedPaths } = useFormStore();
  const updateFormData = useFormStore((state) => state.updateFormData);
  const setAssetId = useFormStore((state) => state.setAssetId);
  const router = useRouter();
  const handleSave = async () => {
    const errors = validateInventionForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
  
    try {
      console.log('🚀 Starting form submission...');
      console.log('📁 Current form data:', formData);
      
      // First, get the next asset ID that will be used
      const assetId = await fetchAssetIdFromDB();
      const componentName = 'InventionRecognitionForm';

      console.log('🆔 Asset ID:', assetId);
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
        uploadedPaths = await uploadDocuments({ files, assetId, componentName, updateFormData });
        console.log('✅ File upload completed:', uploadedPaths);
      } else {
        console.log('ℹ️ No files to upload');
      }
  
      // Merge uploaded file paths into payload, but preserve the existing uploadedFilePaths structure
      const payload = {
        ...formData,
        asset_id: assetId, // Pass the asset ID to the API
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
      router.push('/assetForm2'); // Redirect to next page on success
     
      console.log('🎉 Invention saved successfully:', resultDB);
    } catch (error) {
      console.error('❌ Error saving invention:', error);
      // You might want to show this error to the user via a toast or alert
      alert(`Failed to save invention: ${error.message}`);
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
