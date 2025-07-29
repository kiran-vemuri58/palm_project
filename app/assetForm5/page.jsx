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
import { useRouter } from 'next/navigation';
import useFormStore from '@/store/store';
import { buildPatentSpecificPayloadPage5 } from '@/utils/PageField5Payload'; // Assuming this utility function exists
import { Average } from 'next/font/google';
import AveragePatentabilityRating from '@/components/PatentProsecution/AveragePatentabilityRating';


//import PSPInventionDetails from "@/components/PatentSpecificationPreparation/PSPInventionDetails";

const PatentFiling = () => {

  //const [draftType, setDraftType] = useState('');

  const assetId = useFormStore((state) => state.assetId);
  const draftType = useFormStore((state) => state.formData5.draftType);
  const formData5 = useFormStore((state) => state.formData5);
  const router = useRouter();

  const handleSave = async () => {

    let payloadFromUtil = buildPatentSpecificPayloadPage5({ assetId, formData5, activityStatus: formData5.activityStatus, draftType: formData5.draftType });

    // Merge uploaded file paths into payload
    const payload = payloadFromUtil;

    // Submit to invention API
    const saveRes = await fetch('/api/patentFiling', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const resultDB = await saveRes.json();
    console.log('Patentability saved:', resultDB);

    if (resultDB.success) {
      router.push('/assetForm7'); // Navigate to next page on success
    }

  }

  const DraftComponentMap = {
    complete: Complete,
    provisional: Provisional,
    pct: PCT,
    national_phase: NationalPhase,
  };

  const DraftComponent = DraftComponentMap[draftType];

  return (
    <div className="min-h-screen flex flex-col pt-24">
      <CardWrapper
        label={`5- PatentFiling${assetId ? ` ${assetId}` : ''}`}
        title="Register"
        backButtonHref="/assetForm4"
        nextButtonHref="/assetForm6"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
      >
        <MiniHeader title="Invention Details" />
        <InventionDetails />
        <MiniHeader title="Average Patentability Rating"
        storeKey="formData5"
        updateFunctionKey="updateFormData5" />
        <AveragePatentabilityRating formKey="formData5" updateFunction="updateFormData5" />
        <MiniHeader title="Activity Status" />
        <ActivityStatus formKey="formData5" updateFunction="updateFormData5" />
        <MiniHeader title="Patent Application Filing" />
        <TypeOfDraft value={draftType} 
          formDataKey="formData5"
          updateFunctionKey="updateFormData5" />
        {DraftComponent && (
          <>
            <MiniHeader title={draftType} />
            <DraftComponent formKey="formData5" updateFunction="updateFormData5" />
          </>
        )}


      </CardWrapper>
    </div>
  )
}

export default PatentFiling;