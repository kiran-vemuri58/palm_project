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
import PGPEffortSheetDetails from "@/components/PostGrantOpposition/PGPEffortSheet";
//import PSPInventionDetails from "@/components/PatentSpecificPreparation/PSPInventionDetails";

const PostGrantOpposition = () => {

  const handleSave = () => {
    
  }

   return(
    <div className="min-h-screen flex flex-col pt-24">
    <CardWrapper
        label="7- Post Grant Opposition "
        title="Register"
        backButtonHref="/assetForm6"
        nextButtonHref="/assetForm8"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
      >
     <MiniHeader title="Invention Details"/>
     <InventionDetails />

     <MiniHeader title="Patent Prosecution"/>
     <PatentProsectionDetails />
     <MiniHeader title="Effort Sheet - Number of Hours and Financial Efforts"/>
     <PGPEffortSheetDetails />
     <MiniHeader title="Activity Status"/>
     <ActivityStatus />

    </CardWrapper>
  </div>
   ) 
}

export default PostGrantOpposition;