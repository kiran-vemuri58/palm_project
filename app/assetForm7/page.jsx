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
import { useEffect } from "react";



const PostGrantOpposition = () => {
  const assetId = useFormStore((state) => state.assetId);
  const formData7 = useFormStore((state) => state.formData7);
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
        backButtonHref="/assetForm6"
        nextButtonHref="/assetForm8"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
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