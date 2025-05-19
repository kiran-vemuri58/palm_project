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
//import PSPInventionDetails from "@/components/PatentSpecificationPreparation/PSPInventionDetails";

const PatentProsecution = () => {

  const handleSave = () => {
    
  }

   return(
    <div className="min-h-screen flex flex-col pt-24">
    <CardWrapper
        label="6- Patent Prosecution"
        title="Register"
        backButtonHref="/assetForm5"
        nextButtonHref="/assetForm7"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
      >
     <MiniHeader title="Invention Details"/>
     <InventionDetails isPAN={true} showRating={true} />

     <MiniHeader title="Patent Prosecution"/>
     <PatentProsectionDetails />
     <MiniHeader title="Patent Application Status"/>
     <PatentApplicationStatus />
     <MiniHeader title="FER"/>
     <FER />
     <MiniHeader title="Hearing"/>
     <Hearing />
     <MiniHeader title="Efforts Sheet"/>
     <PPEffortSheet />
     
     <MiniHeader title="Activity Status" />
     <ActivityStatus formKey="formData6" updateFunction="updateFormData6"/>
    </CardWrapper>
  </div>
   ) 
}

export default PatentProsecution;