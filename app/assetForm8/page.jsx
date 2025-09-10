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
import PatentMaintanceHistory from "@/components/PatentManagement/PatentMaintanceHistory";
import PMEffortSheet from "@/components/PatentManagement/PMEffortSheet";
import PatentProsectionDetails from "@/components/PatentProsecution/PatentProsectionDetails";
import PSPInventionDetails from "@/components/PatentSpecificationPreparation/PSPInventionDetails";
import PAN from "@/components/PostGrantOpposition/PAN";
import useFormStore from "@/store/store";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const PatentManagement = () => {
  const assetId = useFormStore((state) => state.assetId);
  const formData8= useFormStore((state) => state.formData8);
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  // Authentication check - only redirect if definitely not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn && !user) {
      // Only redirect if we're sure the user is not signed in
      setShouldRedirect(true);
    }
  }, [isLoaded, isSignedIn, user]);

  // Handle redirect
  useEffect(() => {
    if (shouldRedirect) {
      router.push('/');
    }
  }, [shouldRedirect, router]);

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
      ...formData8,
      asset_id: assetId,
    };

    // Submit to invention API
    const saveRes = await fetch('/api/pm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const resultDB = await saveRes.json();
    console.log('Patent Management saved:', resultDB);

    if (resultDB.success) {
      router.push('/assetForm9'); // Navigate to next page on success
    } else {
      console.error('❌ Failed to save Patent Management:', resultDB.message);
      alert(`Failed to save Patent Management: ${resultDB.message}`);
    }

  }

  return (
    <div className="min-h-screen flex flex-col pt-24">
      <CardWrapper
        label="8- Patent Management"
        title="Register"
        backButtonHref="/assetForm7"
        nextButtonHref="/assetForm9"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
      >
        <MiniHeader title="Invention Details" />
        <InventionDetails disableCommon={true} />
        <MiniHeader title="PAN Details" />
        <PAN formKey="formData7" updateFunction="updateFormData7" />
        <MiniHeader title="Patent Maintance History" />
        <PatentMaintanceHistory
        formKey="formData8"  updateFunction="updateFormData8" />
        <MiniHeader title="Effort Sheet - Number of Hours and Financial Efforts" />
        <PMEffortSheet formKey="formData8" updateFunction="updateFormData8" />
        <MiniHeader title="Activy Status" />
        <ActivityStatus formKey="formData8" updateFunction="updateFormData8" />

      </CardWrapper>
    </div>
  )
}

export default PatentManagement;