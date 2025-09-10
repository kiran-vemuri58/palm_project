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
import { useEffect, useState } from "react";


const InventionExtraction = () => {
  const { formData2, uploadedPaths, assetId } = useFormStore();
  const updateFormData2 = useFormStore((state) => state.updateFormData2);
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  // Load existing data if assetId exists
  const loadExistingData = async () => {
    if (assetId) {
      try {
        const response = await fetch(`/api/extraction?assetId=${assetId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Map the data back to form format
            const formData = {
              extractorOne: data.data.extractorOne || '',
              extractortwo: data.data.extractortwo || '',
              iEDate: data.data.iEDate || '',
              iawpl: data.data.iawpl || '',
              nfeature: data.data.nfeature || '',
              ifeature: data.data.ifeature || '',
              idattachments: data.data.idattachments || [],
              scountry: data.data.scountry || '',
              oextractor: data.data.oextractor || '',
              ipRecognizer: data.data.ipRecognizer || '',
              hoursSpent: data.data.hoursSpent || '',
              agencyRecognizer: data.data.agencyRecognizer || '',
              agencyCost: data.data.agencyCost || '',
              reviewEffort: data.data.reviewEffort || '',
              managerEmpId: data.data.managerEmpId || '',
              activityStatus: data.data.activityStatus || '',
              updatenba: data.data.updatenba || '',
            };
            updateFormData2(formData);
            console.log('✅ Existing extraction data loaded:', formData);
          } else {
            console.log('ℹ️ No extraction data found for assetId:', assetId);
          }
        } else if (response.status === 404) {
          console.log('ℹ️ No extraction data found for assetId:', assetId);
        } else {
          console.error('❌ Error loading extraction data:', response.status);
        }
      } catch (error) {
        console.error('❌ Error loading existing extraction data:', error);
      }
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadExistingData();
  }, [assetId]);

  // Authentication check with proper timing
  useEffect(() => {
    if (isLoaded) {
      // Add a small delay to ensure all auth state is properly loaded
      const timeoutId = setTimeout(() => {
        if (!isSignedIn) {
          router.push('/');
        } else {
          setAuthChecked(true);
        }
      }, 200); // 200ms delay to ensure auth state is stable

      return () => clearTimeout(timeoutId);
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading while checking authentication
  if (!isLoaded || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {!isLoaded ? 'Loading...' : 'Verifying authentication...'}
          </p>
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
        backButtonHref={assetId ? `/assetForm1?assetId=${assetId}` : "/assetForm1"}
        nextButtonHref={assetId ? `/assetForm3?assetId=${assetId}` : "/assetForm3"}
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
        nextButtonEnabled={!!assetId}
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