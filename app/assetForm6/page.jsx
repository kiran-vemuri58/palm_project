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


const PatentProsecution = () => {

  const assetId = useFormStore((state) => state.assetId);
  const formData6 = useFormStore((state) => state.formData6);
  const router = useRouter();

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
        backButtonHref="/assetForm5"
        nextButtonHref="/assetForm7"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
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