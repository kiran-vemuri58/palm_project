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
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";


//import PSPInventionDetails from "@/components/PatentSpecificationPreparation/PSPInventionDetails";

const PatentFiling = () => {
  //const [draftType, setDraftType] = useState('');

  const assetId = useFormStore((state) => state.assetId);
  const draftType = useFormStore((state) => state.formData5.draftType);
  const formData5 = useFormStore((state) => state.formData5);
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  // Authentication check
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

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

  // Show access denied if not signed in
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You must be signed in to access this page.</p>
          <button 
            onClick={() => router.push('/sign-in')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

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
    console.log('Patent Filing saved:', resultDB);

    if (resultDB.success) {
      router.push('/assetForm6'); // Navigate to next page on success
    } else {
      console.error('❌ Failed to save Patent Filing:', resultDB.message);
      alert(`Failed to save Patent Filing: ${resultDB.message}`);
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
        <InventionDetails disableCommon={true} />
        <MiniHeader title="Average Patentability Rating" />
        <AveragePatentabilityRating 
          storeKey="formData5" 
          updateFunctionKey="updateFormData5" 
        />
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