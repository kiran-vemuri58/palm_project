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
import { useEffect, useState } from "react";

const PatentCommercialisation = () => {
  const assetId = useFormStore((state) => state.assetId);
  const formData9 = useFormStore((state) => state.formData9);
  const updateFormData9 = useFormStore((state) => state.updateFormData9);
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  // Load existing data if assetId exists
  const loadExistingData = async () => {
    if (assetId) {
      try {
        const response = await fetch(`/api/pc?assetId=${assetId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Map the data back to form format
            const formData = {
              activityStatus: data.data.activityStatus || '',
              patentApplicationNumber: data.data.patentApplicationNumber || '',
              patentNumber: data.data.patentNumber || '',
              // Add other fields based on the API response structure
            };
            updateFormData9(formData);
            console.log('✅ Existing patent commercialisation data loaded:', formData);
          } else {
            console.log('ℹ️ No patent commercialisation data found for assetId:', assetId);
          }
        } else if (response.status === 404) {
          console.log('ℹ️ No patent commercialisation data found for assetId:', assetId);
        } else {
          console.error('❌ Error loading patent commercialisation data:', response.status);
        }
      } catch (error) {
        console.error('❌ Error loading existing patent commercialisation data:', error);
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
        backButtonHref={assetId ? `/assetForm8?assetId=${assetId}` : "/assetForm8"}
        nextButtonHref={assetId ? `/assetForm1?assetId=${assetId}` : "/assetForm1"}
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
        nextButtonEnabled={!!assetId}
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