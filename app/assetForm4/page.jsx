'use client'

import React, { useState } from 'react';

import CardWrapper from "@/components/CardWrapper";
import ActivityStatus from "@/components/InventionRecognition/ActivityStatus";
import InventionDetails from "@/components/InventionRecognition/InventionDetails";
import MiniHeader from "@/components/MiniHeader";
import TypeOfDraft from '@/components/PatentSpecificationPreparation/TypeOfDraft';
import Complete from '@/components/PatentSpecificationPreparation/Complete';
import Provisional from '@/components/PatentSpecificationPreparation/Provisional';
import PCT from '@/components/PatentSpecificationPreparation/PCT';
import NationalPhase from '@/components/PatentSpecificationPreparation/NationalPhase';

const PatentSpecificationPreparation = () => {

  const [draftType, setDraftType] = useState('');

  const handleSave = () => {
    
  }

  const DraftComponentMap = {
    complete: Complete,
    provisional: Provisional,
    pct: PCT,
    national_phase: NationalPhase,
  };
  
  const DraftComponent = DraftComponentMap[draftType];

   return(
    <div className='min-h-screen flex flex-col pt-14'>
    <CardWrapper
        label="Patent Specification Preparation"
        title="Register"
        backButtonHref="/assetForm3"
        nextButtonHref="/assetForm5"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
      >

        <MiniHeader title="Invention Details" />
        <InventionDetails showRating={true} />
        <MiniHeader title="Activity Status" />
        <ActivityStatus formKey="formData4" updateFunction="updateFormData4"/>
        <MiniHeader title="Patent Specific information" />
        <TypeOfDraft value={draftType} onChange={setDraftType} />
        {DraftComponent && (
          <>
            <MiniHeader title={draftType} />
            <DraftComponent formKey="formData4" updateFunction="updateFormData4" />
          </>
        )}


    </CardWrapper>
    </div>
   ) 
}

export default PatentSpecificationPreparation;