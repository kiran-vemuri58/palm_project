'use client'

import React, { useState, useEffect } from 'react';

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


const PatentSpecificationPreparation = () => {
  const assetId = useFormStore((state) => state.assetId);
  const formData4 = useFormStore((state) => state.formData4);
  const updateFormData4 = useFormStore((state) => state.updateFormData4);
  const router = useRouter();
  const draftType = useFormStore((state) => state.formData4.draftType);
  const [authChecked, setAuthChecked] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  // Load existing data if assetId exists
  const loadExistingData = async () => {
    if (assetId) {
      try {
        const response = await fetch(`/api/psp?assetId=${assetId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Map the data back to form format
            const formData = {
              activityStatus: data.data.activityStatus || '',
              rating: data.data.rating || '',
              draftType: data.data.draftType || '',
              // Add other fields based on the API response structure
            };
            updateFormData4(formData);
            console.log('✅ Existing PSP data loaded:', formData);
          } else {
            console.log('ℹ️ No PSP data found for assetId:', assetId);
          }
        } else if (response.status === 404) {
          console.log('ℹ️ No PSP data found for assetId:', assetId);
        } else {
          console.error('❌ Error loading PSP data:', response.status);
        }
      } catch (error) {
        console.error('❌ Error loading existing PSP data:', error);
      }
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadExistingData();
  }, [assetId]);

  // Authentication check with proper timing
  useEffect(() => {
    if (isLoaded) {
      // Add a small delay to ensure all auth state is properly loaded
      const timeoutId = setTimeout(() => {
        if (!isSignedIn) {
          router.push('/');
        } else {
          setAuthChecked(true);
        }
      }, 200); // 200ms delay to ensure auth state is stable

      return () => clearTimeout(timeoutId);
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading while checking authentication
  if (!isLoaded || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {!isLoaded ? 'Loading...' : 'Verifying authentication...'}
          </p>
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
        backButtonHref={assetId ? `/assetForm3?assetId=${assetId}` : "/assetForm3"}
        nextButtonHref={assetId ? `/assetForm5?assetId=${assetId}` : "/assetForm5"}
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
        nextButtonEnabled={!!assetId}
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