'use client'

import CardWrapper from "@/components/CardWrapper";
import ActivityStatus from "@/components/InventionRecognition/ActivityStatus";
import InventionDetails from "@/components/InventionRecognition/InventionDetails";
import MiniHeader from "@/components/MiniHeader";
import PAN from "@/components/PatentCommercialisation/PAN";
import PatentCommercializationChild from "@/components/PatentCommercialisation/PatentCommercializationChild";
import PCEfforts from "@/components/PatentCommercialisation/PCEfforts";
import useFormStore from "@/store/store";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const PatentCommercialisation = () => {
  const assetId = useFormStore((state) => state.assetId);
  const formData9 = useFormStore((state) => state.formData9); 
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { isLoaded, isSignedIn } = useUser();

  // Authentication check
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      setShouldRedirect(true);
    }
  }, [isLoaded, isSignedIn]);

  // Handle redirect
  useEffect(() => {
    if (shouldRedirect) {
      router.push('/');
    }
  }, [shouldRedirect, router]);

  // Show loading while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading if not signed in (while redirecting)
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    // Merge uploaded file paths into payload
    const payload = {
      ...formData9,
      asset_id: assetId,
    };

    // Submit to invention API
    const saveRes = await fetch('/api/pc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const resultDB = await saveRes.json();
    console.log('Patent Commercialisation saved:', resultDB);

    if (resultDB.success) {
      router.push('/assets'); // Navigate to next page on success
    } else {
      console.error('❌ Failed to save Patent Commercialisation:', resultDB.message);
      alert(`Failed to save Patent Commercialisation: ${resultDB.message}`);
    }

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
     <InventionDetails disableCommon={true} />
     <MiniHeader title="Patent Application Number and Patent Number"/>
     <PAN formKey="formData9" updateFunction="updateFormData9"  />
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