'use client'
import React, { useState, useEffect } from 'react';
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


//import PSPInventionDetails from "@/components/PatentSpecificationPreparation/PSPInventionDetails";

const PatentFiling = () => {
  //const [draftType, setDraftType] = useState('');

  const assetId = useFormStore((state) => state.assetId);
  const draftType = useFormStore((state) => state.formData5.draftType);
  const formData5 = useFormStore((state) => state.formData5);
  const updateFormData5 = useFormStore((state) => state.updateFormData5);
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  // Load existing data if assetId exists
  const loadExistingData = async () => {
    if (assetId) {
      try {
        const response = await fetch(`/api/patentFiling?assetId=${assetId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Map the data back to form format
            const formData = {
              activityStatus: data.data.activityStatus || '',
              rating: data.data.rating || '',
              patentApplicationNumber: data.data.patentApplicationNumber || '',
              draftType: data.data.draftType || '',
              // Add other fields based on the API response structure
            };
            updateFormData5(formData);
            console.log('✅ Existing patent filing data loaded:', formData);
          } else {
            console.log('ℹ️ No patent filing data found for assetId:', assetId);
          }
        } else if (response.status === 404) {
          console.log('ℹ️ No patent filing data found for assetId:', assetId);
        } else {
          console.error('❌ Error loading patent filing data:', response.status);
        }
      } catch (error) {
        console.error('❌ Error loading existing patent filing data:', error);
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
        backButtonHref={assetId ? `/assetForm4?assetId=${assetId}` : "/assetForm4"}
        nextButtonHref={assetId ? `/assetForm6?assetId=${assetId}` : "/assetForm6"}
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
        nextButtonEnabled={!!assetId}
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