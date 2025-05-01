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
import PatentProsectionDetails from "@/components/PatentProsecution/PatentProsectionDetails";
import PSPInventionDetails from "@/components/PatentSpecificationPreparation/PSPInventionDetails";

const PatentManagement = () => {

  const handleSave = () => {
    
  }

   return(
    <div className="min-h-screen flex flex-col pt-24">
    <CardWrapper
        label="8- Patent Management"
        title="Register"
        backButtonHref="/assetForm7"
        nextButtonHref="/assetForm9"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
      >
     <MiniHeader title="Invention Details"/>
     <PSPInventionDetails/>
     <MiniHeader title="Patent Maintance History"/>
    <PatentMaintanceHistory />
    <MiniHeader title="Activy Status"/>
    <ActivityStatus />
     
    </CardWrapper>
  </div>
   ) 
}

export default PatentManagement;