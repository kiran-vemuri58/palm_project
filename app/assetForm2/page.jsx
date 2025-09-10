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
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";


const InventionExtraction = () => {
  const { formData2, uploadedPaths , assetId } = useFormStore();
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  // Authentication check - only redirect if definitely not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn && !user) {
      // Only redirect if we're sure the user is not signed in
      setShouldRedirect(true);
    }
  }, [isLoaded, isSignedIn, user]);

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
        toast.success('Data saved successfully!');
      } else {
        toast.error('Failed to save data');
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