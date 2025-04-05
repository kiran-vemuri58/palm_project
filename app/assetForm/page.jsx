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
  const { formData, setErrors } = useFormStore();

  const handleSave = () => {
    const errors = validateInventionForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-24">
      <CardWrapper
        label="Invention Recognition"
        title="Register"
        backButtonHref="/previous-page"
        nextButtonHref="/next-page"
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
