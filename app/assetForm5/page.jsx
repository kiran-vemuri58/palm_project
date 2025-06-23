'use client'
import React, { useState } from 'react';
import CardWrapper from "@/components/CardWrapper";
import ExtractorDetails from "@/components/InventionExtraction/ExtractorDetails";
import ActivityStatus from "@/components/InventionRecognition/ActivityStatus";
import EffortSheetDetails from "@/components/InventionRecognition/EffortSheet";
import InventionDetails from "@/components/InventionRecognition/InventionDetails";
import MiniHeader from "@/components/MiniHeader";
import TypeOfDraft from '@/components/PatentSpecificationPreparation/TypeOfDraft';
import Complete from '@/components/PatentFiling/Complete';
import Provisional from '@/components/PatentFiling/Provisional';
import PCT from '@/components/PatentFiling/PCT';
import NationalPhase from '@/components/PatentFiling/NationalPhase';
import DecisionSheet from "@/components/PatentabilityAnalysis/DecisionSheet";
import Innovation from "@/components/PatentabilityAnalysis/Innovation";
import PAExtractor from "@/components/PatentabilityAnalysis/PAExtractor";
//import PSPInventionDetails from "@/components/PatentSpecificationPreparation/PSPInventionDetails";

const PatentFiling = () => {

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
    <div className="min-h-screen flex flex-col pt-24">
    <CardWrapper
        label="5- PatentFiling"
        title="Register"
        backButtonHref="/assetForm4"
        nextButtonHref="/assetForm6"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
      >
     <MiniHeader title="Invention Details"/>
     <InventionDetails showRating="true"/>
     <MiniHeader title="Activity Status" />
     <ActivityStatus formKey="formData5" updateFunction="updateFormData5"/>
     <MiniHeader title="Patent Application Filing" />
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

export default PatentFiling;