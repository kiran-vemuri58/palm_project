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
//import PSPInventionDetails from "@/components/PatentSpecificationPreparation/PSPInventionDetails";

const PatentFiling = () => {

  const handleSave = () => {
    
  }

   return(
    <div className="min-h-screen flex flex-col pt-24">
    <CardWrapper
        label="5- PatentFiling"
        title="Register"
        backButtonHref="/assetForm4"
        nextButtonHref="/assetForm6"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
      >
     <MiniHeader title="Invention Details"/>
     <InventionDetails />
     <MiniHeader title="Activity Status" />
     <ActivityStatus />
     
     
    </CardWrapper>
  </div>
   ) 
}

export default PatentFiling;