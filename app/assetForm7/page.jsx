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
import PatentProsectionDetails from "@/components/PatentProsecution/PatentProsectionDetails";
import PAN from "@/components/PostGrantOpposition/PAN";
import PGPEffortSheetDetails from "@/components/PostGrantOpposition/PGPEffortSheet";
//import PSPInventionDetails from "@/components/PatentSpecificPreparation/PSPInventionDetails";
import useFormStore from "@/store/store";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";



const PostGrantOpposition = () => {
  const assetId = useFormStore((state) => state.assetId);
  const formData7 = useFormStore((state) => state.formData7);
  const updateFormData7 = useFormStore((state) => state.updateFormData7);
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  // Load existing data if assetId exists
  const loadExistingData = async () => {
    if (assetId) {
      try {
        const response = await fetch(`/api/pgo?assetId=${assetId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Map the data back to form format
            const formData = {
              activityStatus: data.data.activityStatus || '',
              patentApplicationNumber: data.data.patentApplicationNumber || '',
              patentNumber: data.data.patentNumber || '',
              // Add other fields based on the API response structure
            };
            updateFormData7(formData);
            console.log('✅ Existing post grant opposition data loaded:', formData);
          } else {
            console.log('ℹ️ No post grant opposition data found for assetId:', assetId);
          }
        } else if (response.status === 404) {
          console.log('ℹ️ No post grant opposition data found for assetId:', assetId);
        } else {
          console.error('❌ Error loading post grant opposition data:', response.status);
        }
      } catch (error) {
        console.error('❌ Error loading existing post grant opposition data:', error);
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
      ...formData7,
      asset_id: assetId,
    };

    // Submit to invention API
    const saveRes = await fetch('/api/pgo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const resultDB = await saveRes.json();
    console.log('Post Grant Opposition saved:', resultDB);

    if (resultDB.success) {
      router.push('/assetForm8'); // Navigate to next page on success
    } else {
      console.error('❌ Failed to save Post Grant Opposition:', resultDB.message);
      alert(`Failed to save Post Grant Opposition: ${resultDB.message}`);
    }

  }

  return (
    <div className="min-h-screen flex flex-col pt-24">
      <CardWrapper
        label={`7- Post Grant Opposition${assetId ? ` - Asset ID: ${assetId}` : ''}`}
        title="Register"
        backButtonHref={assetId ? `/assetForm6?assetId=${assetId}` : "/assetForm6"}
        nextButtonHref={assetId ? `/assetForm8?assetId=${assetId}` : "/assetForm8"}
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
        nextButtonEnabled={!!assetId}
      >
        <MiniHeader title="Invention Details" />
        <InventionDetails disableCommon={true} />
        <MiniHeader title="PAN Details" />
        <PAN formKey="formData7" updateFunction="updateFormData7" />
        <MiniHeader title="Post Grant Opposition" />
        <PatentProsectionDetails formKey="formData7" updateFunction="updateFormData7" />
        <MiniHeader title="Effort Sheet - Number of Hours and Financial Efforts" />
        <PGPEffortSheetDetails formKey="formData7" updateFunction="updateFormData7" />
        <MiniHeader title="Activity Status" />
        <ActivityStatus formKey="formData7" updateFunction="updateFormData7" />

      </CardWrapper>
    </div>
  )
}

export default PostGrantOpposition;