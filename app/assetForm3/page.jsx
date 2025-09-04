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

const Patentability_Analysis = () => {

  const { formData3, assetId } = useFormStore();

  const router = useRouter();

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