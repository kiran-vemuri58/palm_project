'use client'

import CardWrapper from "@/components/CardWrapper";
import ExtractorDetails from "@/components/InventionExtraction/ExtractorDetails";
import ActivityStatus from "@/components/InventionRecognition/ActivityStatus";
import EffortSheetDetails from "@/components/InventionRecognition/EffortSheet";
import InventionDetails from "@/components/InventionRecognition/InventionDetails";
import MiniHeader from "@/components/MiniHeader";
import DecisionSheet from "@/components/PatentabilityAnalysis/DecisionSheet";
import Innovation from "@/components/PatentabilityAnalysis/Innovation";
import PAExtractor from "@/components/PatentabilityAnalysis/PAExtractor";
import FER from "@/components/PatentProsecution/FER";
import Hearing from "@/components/PatentProsecution/Hearing";
import PatentApplicationStatus from "@/components/PatentProsecution/PatentApplicationStatus";
import PatentProsectionDetails from "@/components/PatentProsecution/PatentProsectionDetails";
import PPEffortSheet from "@/components/PatentProsecution/PPEffortSheet";
import PPInventionDetails from "@/components/PatentProsecution/PPInventionDetails";
import { Average } from "next/font/google";
import AveragePatentabilityRating from "@/components/PatentProsecution/AveragePatentabilityRating";
//import PSPInventionDetails from "@/components/PatentSpecificationPreparation/PSPInventionDetails";
import useFormStore from "@/store/store";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";


const PatentProsecution = () => {
  const assetId = useFormStore((state) => state.assetId);
  const formData6 = useFormStore((state) => state.formData6);
  const updateFormData6 = useFormStore((state) => state.updateFormData6);
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  // Load existing data if assetId exists
  const loadExistingData = async () => {
    if (assetId) {
      try {
        const response = await fetch(`/api/ps?assetId=${assetId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Map the data back to form format
            const formData = {
              activityStatus: data.data.activityStatus || '',
              rating: data.data.rating || '',
              patentApplicationNumber: data.data.patentApplicationNumber || '',
              // Add other fields based on the API response structure
            };
            updateFormData6(formData);
            console.log('✅ Existing patent prosecution data loaded:', formData);
          } else {
            console.log('ℹ️ No patent prosecution data found for assetId:', assetId);
          }
        } else if (response.status === 404) {
          console.log('ℹ️ No patent prosecution data found for assetId:', assetId);
        } else {
          console.error('❌ Error loading patent prosecution data:', response.status);
        }
      } catch (error) {
        console.error('❌ Error loading existing patent prosecution data:', error);
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
    // Merge uploaded file paths into payload
    const payload = {
      ...formData6,
      asset_id: assetId,
    };

    // Submit to invention API
    const saveRes = await fetch('/api/ps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const resultDB = await saveRes.json();
    console.log('Patent Prosecution saved:', resultDB);

    if (resultDB.success) {
      router.push('/assetForm7'); // Navigate to next page on success
    } else {
      console.error('❌ Failed to save Patent Prosecution:', resultDB.message);
      alert(`Failed to save Patent Prosecution: ${resultDB.message}`);
    }

  }

  return (
    <div className="min-h-screen flex flex-col pt-24">
      <CardWrapper
        label={`6- Patent Prosecution` + (assetId ? ` - Asset ID: ${assetId}` : '')}
        title="Register"
        backButtonHref={assetId ? `/assetForm5?assetId=${assetId}` : "/assetForm5"}
        nextButtonHref={assetId ? `/assetForm7?assetId=${assetId}` : "/assetForm7"}
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
        nextButtonEnabled={!!assetId}
      >
        <MiniHeader title="Invention Details" />
        <InventionDetails disableCommon={true} />
        <MiniHeader title="Rating and PAN Number" />
        <AveragePatentabilityRating 
          storeKey="formData6" 
          updateFunctionKey="updateFormData6" 
        />
        <MiniHeader title="Patent Prosecution" />
        <PatentProsectionDetails formKey="formData6" updateFunction="updateFormData6" />
        <MiniHeader title="Patent Application Status" />
        <PatentApplicationStatus formKey="formData6" updateFunction="updateFormData6" />
        <MiniHeader title="FER" />
        <FER formKey="formData6" updateFunction="updateFormData6" />
        <MiniHeader title="Hearing" />
        <Hearing formKey="formData6" updateFunction="updateFormData6" />
        <MiniHeader title="Efforts Sheet" />
        <PPEffortSheet formKey="formData6" updateFunction="updateFormData6" />
        {/* <MiniHeader title="Patent Prosecution"/>
     <PatentProsectionDetails />
     <MiniHeader title="Patent Application Status"/>
     <PatentApplicationStatus />
     <MiniHeader title="FER"/>
     <FER />
     <MiniHeader title="Hearing"/>
     <Hearing />
     <MiniHeader title="Efforts Sheet"/>
     <PPEffortSheet /> */}

        <MiniHeader title="Activity Status" />
        <ActivityStatus formKey="formData6" updateFunction="updateFormData6" />
      </CardWrapper>
    </div>
  )
}

export default PatentProsecution;