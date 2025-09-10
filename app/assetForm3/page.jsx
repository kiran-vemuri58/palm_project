'use client'

import CardWrapper from "@/components/CardWrapper";
import ExtractorDetails from "@/components/InventionExtraction/ExtractorDetails";
import ActivityStatus from "@/components/InventionRecognition/ActivityStatus";
import InventionDetails from "@/components/InventionRecognition/InventionDetails";
import MiniHeader from "@/components/MiniHeader";
import DecisionSheet from "@/components/PatentabilityAnalysis/DecisionSheet";
import Innovation from "@/components/PatentabilityAnalysis/Innovation";
import PAEffortSheetDetails from "@/components/PatentabilityAnalysis/PAEffortSheet";
import PAExtractor from "@/components/PatentabilityAnalysis/PAExtractor";
import useFormStore from "@/store/store";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const Patentability_Analysis = () => {
  const { formData3, assetId } = useFormStore();
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
      ...formData3,
      asset_id: assetId,
    };

    // Submit to invention API
    const saveRes = await fetch('/api/patentability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const resultDB = await saveRes.json();
    console.log('Patentability saved:', resultDB);

    if (resultDB.success) {
      router.push('/assetForm4'); // Navigate to next page on success
    } else {
      console.error('❌ Failed to save patentability:', resultDB.message);
      alert(`Failed to save patentability: ${resultDB.message}`);
    }

  }

  return (
    <div className="min-h-screen flex flex-col pt-14">
      <CardWrapper
        label={`3- Patentability Analysis${assetId ? ` - ${assetId}` : ''}`}
        title="Register"
        backButtonHref="/assetForm2"
        nextButtonHref="/assetForm4"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
      >
        <MiniHeader title="Invention Details" />
        <InventionDetails disableCommon={true} />
        <MiniHeader title="Extractor Details" />
        <PAExtractor formKey="formData3" updateFunction="updateFormData3" />
        <MiniHeader title="Innovation" />
        <Innovation formKey="formData3" updateFunction="updateFormData3" />
        <MiniHeader title="Decision Sheet" />
        <DecisionSheet formKey="formData3" updateFunction="updateFormData3" />
        <MiniHeader title="Efforts Sheet" />
        <PAEffortSheetDetails formKey="formData3" updateFunction="updateFormData3" />
        <MiniHeader title="Activity Status" />
        <ActivityStatus formKey="formData3" updateFunction="updateFormData3" />

      </CardWrapper>
    </div>
  )
}

export default Patentability_Analysis;