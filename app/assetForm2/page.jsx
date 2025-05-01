'use client'

import CardWrapper from "@/components/CardWrapper";
import ExtractorDetails from "@/components/InventionExtraction/ExtractorDetails";
import UpdatesNBA from "@/components/InventionExtraction/UpdatesNBA";
import ActivityStatus from "@/components/InventionRecognition/ActivityStatus";
import EffortSheetDetails from "@/components/InventionRecognition/EffortSheet";
import InventionDetails from "@/components/InventionRecognition/InventionDetails";
import MiniHeader from "@/components/MiniHeader";

const InventionExtraction = () => {


   const handleSave = () => {

   }

   return(
    <div className="min-h-screen flex flex-col pt-14">
    <CardWrapper
        label="2- invention Extraction"
        title="Register"
        backButtonHref="/assetForm1"
        nextButtonHref="/assetForm3"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
      >
       
      <MiniHeader title="Invention Details"/>
      <InventionDetails/>
      <MiniHeader title="Extractor Details"/>
      <ExtractorDetails/>
      <MiniHeader title="Efforts Sheet"/>
      <EffortSheetDetails/>
      <MiniHeader title="Activity Status" />
      <ActivityStatus />
      <MiniHeader title="Updates" />
      <UpdatesNBA />

    </CardWrapper>
    </div>

   ) 
}

export default InventionExtraction;