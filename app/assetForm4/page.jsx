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
import { useRouter } from 'next/navigation';
import useFormStore from '@/store/store';
import { buildPatentSpecificPayload } from '@/utils/PageField4Payload'; // Assuming this utility function exists
import AveragePatentabilityRating from '@/components/PatentSpecificationPreparation/AveragePatentabilityRating';
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";


const PatentSpecificationPreparation = () => {
  const assetId = useFormStore((state) => state.assetId);
  const formData4 = useFormStore((state) => state.formData4);
  const router = useRouter();
  const draftType = useFormStore((state) => state.formData4.draftType);
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

  //const [draftType, setDraftType] = useState('');

  const handleSave = async () => {

    let payloadFromUtil = buildPatentSpecificPayload({ assetId, formData4, activityStatus: formData4.activityStatus, draftType: formData4.draftType });

    // Merge uploaded file paths into payload
    const payload = payloadFromUtil;

    // Submit to invention API
    const saveRes = await fetch('/api/psp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const resultDB = await saveRes.json();
    console.log('PSP saved:', resultDB);

    if (resultDB.success) {
      router.push('/assetForm5'); // Navigate to next page on success
    } else {
      console.error('❌ Failed to save PSP:', resultDB.message);
      alert(`Failed to save PSP: ${resultDB.message}`);
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
    <div className='min-h-screen flex flex-col pt-14'>
      <CardWrapper
        label={`Patent Specification Preparation ${assetId ? `${assetId}` : ''}`}
        title="Register"
        backButtonHref="/assetForm3"
        nextButtonHref="/assetForm5"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
      >

        <MiniHeader title="Invention Details" />
        <InventionDetails disableCommon={true} />
        <MiniHeader title="Average Patentability Rating" />
        <AveragePatentabilityRating 
          formKey="rating" 
          storeKey="formData4" 
          updateFunctionKey="updateFormData4" 
        />
        <MiniHeader title="Activity Status" />
        <ActivityStatus formKey="formData4" updateFunction="updateFormData4" />
        <MiniHeader title="Patent Specific information" />
        <TypeOfDraft value={draftType} 
          formDataKey="formData4"
          updateFunctionKey="updateFormData4"
        />
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