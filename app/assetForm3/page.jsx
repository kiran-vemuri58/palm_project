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

const Patentability_Analysis = () => {

  const handleSave = async () => {
    // Merge uploaded file paths into payload
 const payload = {
   ...formData3,
 };
    
  }

   return(
    <div className="min-h-screen flex flex-col pt-14">
    <CardWrapper
        label="3- Patentability Analysis"
        title="Register"
        backButtonHref="/assetForm2"
        nextButtonHref="/assetForm4"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
      >
     <MiniHeader title="Invention Details"/>
     <InventionDetails />
     <MiniHeader title="Extractor Details"/>
     <PAExtractor/>
     <MiniHeader title="Innovation"/>
     <Innovation/>
     <MiniHeader title="Decision Sheet"/>
     <DecisionSheet/>
     <MiniHeader title="Efforts Sheet"/>
     <PAEffortSheetDetails />
     <MiniHeader title="Activity Status" />
     <ActivityStatus formKey="formData3" updateFunction="updateFormData3" />
     
    </CardWrapper>
  </div>
   ) 
}

export default Patentability_Analysis;