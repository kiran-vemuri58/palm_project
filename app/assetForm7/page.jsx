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



const PostGrantOpposition = () => {

  const assetId = useFormStore((state) => state.assetId);
  const formData7 = useFormStore((state) => state.formData7);
  const router = useRouter();


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
    console.log('pgo saved:', resultDB);

    if (resultDB.success) {
      router.push('/assetForm8'); // Navigate to next page on success
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
        <InventionDetails />
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