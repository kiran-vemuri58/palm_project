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
import PatentCommercializationChild from "@/components/PatentCommercialisation/PatentCommercializationChild";
import PCEfforts from "@/components/PatentCommercialisation/PCEfforts";

import PatentProsectionDetails from "@/components/PatentProsecution/PatentProsectionDetails";
import PSPInventionDetails from "@/components/PatentSpecificationPreparation/PSPInventionDetails";

const PatentCommercialisation = () => {

  const handleSave = () => {
    
  }

   return(
    <div className="min-h-screen flex flex-col pt-24">
    <CardWrapper
        label="9- Patent Commercialisation"
        title="Register"
        backButtonHref="/assetForm8"
        nextButtonHref="/assetForm1"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
      >
     <MiniHeader title="Invention Details"/>
     <InventionDetails isPAN="true" patentNumber="true" />
     <MiniHeader title="Patent Commercialization"/>
     <PatentCommercializationChild formKey="formData9" updateFunction="updateFormData9" />
     <MiniHeader title="Efforts Sheet Section"/>
     <PCEfforts formKey="formData9" updateFunction="updateFormData9" />
     <MiniHeader title="Activy Status"/>
     
    <ActivityStatus formKey="formData9" updateFunction="updateFormData9" />
     
    </CardWrapper>
  </div>
   ) 
}

export default PatentCommercialisation;