'use client'

import CardWrapper from "@/components/CardWrapper";
import ExtractorDetails from "@/components/InventionExtraction/ExtractorDetails";
import UpdatesNBA from "@/components/InventionExtraction/UpdatesNBA";
import ActivityStatus from "@/components/InventionRecognition/ActivityStatus";
import EffortSheetDetails from "@/components/InventionRecognition/EffortSheet";
import InventionDetails from "@/components/InventionRecognition/InventionDetails";
import MiniHeader from "@/components/MiniHeader";
import useFormStore from "@/store/store";
import { useRouter } from "next/navigation";


const InventionExtraction = () => {
  const { formData2, uploadedPaths , assetId } = useFormStore();
  const router = useRouter()

   const handleSave = async () => {
         // Merge uploaded file paths into payload
      const payload = {
        ...formData2,
        asset_id: assetId,
      };
  
      // Submit to invention API
      const saveRes = await fetch('/api/extraction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const resultDB = await saveRes.json();
      console.log('Invention saved:', resultDB);

      if(resultDB.success){
        router.push('/assetForm3'); // Navigate to next page on success
      }
    
   }

   return(
    <div className="min-h-screen flex flex-col pt-14">
    <CardWrapper
        label={`2 - Invention Extraction${assetId ? ` - ${assetId}` : ''}`}
        title="Register"
        backButtonHref="/assetForm1"
        nextButtonHref="/assetForm3"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
      >
       
      <MiniHeader title="Invention Details"/>
      <InventionDetails disableCommon={true}/>
      <MiniHeader title="Extractor Details"/>
      <ExtractorDetails formKey="formData2" updateFunction="updateFormData2"/>
      <MiniHeader title="Efforts Sheet"/>
      <EffortSheetDetails formKey="formData2" updateFunction="updateFormData2"/>
      <MiniHeader title="Activity Status"   />
      <ActivityStatus formKey="formData2" updateFunction="updateFormData2" />
      <MiniHeader title="Updates" />
      <UpdatesNBA />

    </CardWrapper>
    </div>

   ) 
}

export default InventionExtraction;