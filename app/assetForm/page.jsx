'use client'

import CardWrapper from "@/components/CardWrapper";
import InventionDetails from "@/components/InventionRecognition/InventionDetails";
import AddOrDeleteInventor from "@/components/InventionRecognition/AddOrDeleteInventor";
import { validateInventionForm } from "@/lib/validateInventRecognitionForm";
import useFormStore from "@/store/store";
import React from "react";
import EntityDetails from "@/components/InventionRecognition/EntityDetails";
import TechnologyDetails from "@/components/InventionRecognition/TechnologyDetails";
import TrainRunExperimentation from "@/components/InventionRecognition/TrainRunExperimentation";
import MiniHeader from "@/components/MiniHeader";
import EffortSheetDetails from "@/components/InventionRecognition/EffortSheet";

const InventionRecognitionForm = () => {
  const { formData, setErrors, uploadedPaths } = useFormStore();

  const handleSave = async () => {
    const errors = validateInventionForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
  
    try {
      const fileFields = ['evidence', 'minuteOfMeeting', 'attachments'];
      const uploadedPaths = {};
  
      // Upload files
      for (const field of fileFields) {
        const file = formData[field];
        if (file) {
          const uploadForm = new FormData();
          uploadForm.append('file', file);
          uploadForm.append('registerId', 'A0005'); // or generate dynamically
  
          const res = await fetch('/api/upload', {
            method: 'POST',
            body: uploadForm,
          });
  
          const result = await res.json();
          if (result.success) {
            uploadedPaths[field] = result.path;
          } else {
            console.error(`Upload failed for ${field}:`, result.error);
            return;
          }
        }
      }
  
      // Merge uploaded file paths into payload
      const payload = {
        ...formData,
        ...uploadedPaths,
      };
  
      // Submit to invention API
      const saveRes = await fetch('/api/invention', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const resultDB = await saveRes.json();
      console.log('Invention saved:', resultDB);
    } catch (error) {
      console.error('Error saving invention:', error);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col pt-24">
      <CardWrapper
        label="Invention Recognition"
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

        <MiniHeader title="Effort Sheet" />
        <EffortSheetDetails/>
      </CardWrapper>
    </div>
  );
};

export default InventionRecognitionForm;
