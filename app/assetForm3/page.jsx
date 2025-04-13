'use client'

import CardWrapper from "@/components/CardWrapper";

const InventionExtraction = () => {

  const handleSave = () => {
    
  }

   return(
    <CardWrapper
        label="Invention Recognition"
        title="Register"
        backButtonHref="/assetForm3"
        nextButtonHref="/assetForm4"
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
      >


    </CardWrapper>

   ) 
}

export default InventionExtraction;