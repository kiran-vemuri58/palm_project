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
import useFormStore from "@/store/store";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Patentability_Analysis = () => {
  const { formData3, assetId } = useFormStore();
  const updateFormData3 = useFormStore((state) => state.updateFormData3);
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  // Load existing data if assetId exists
  const loadExistingData = async () => {
    if (assetId) {
      try {
        const response = await fetch(`/api/patentability?assetId=${assetId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Map the data back to form format - using correct field names from Patentability table
            const formData = {
              psone: data.data.psone || '',
              pstwo: data.data.pstwo || '',
              rating: data.data.rating || '',
              nfeature: data.data.nfeature || '',
              ifeature: data.data.ifeature || '',
              scountry: data.data.scountry || '',
              ooextractor: data.data.ooextractor || '',
              trainRun: data.data.trainRun || '',
              nodc: data.data.nodc || '',
              dibrief: data.data.dibrief || '',
              attachment: data.data.attachment || [],
              esfsearcher: data.data.esfsearcher || '',
              ipRecognizer: data.data.ipRecognizer || '',
              hoursSpent: data.data.hoursSpent || '',
              agencyRecognizer: data.data.agencyRecognizer || '',
              agencyCost: data.data.agencyCost || '',
              reviewEffort: data.data.reviewEffort || '',
              managerEmpId: data.data.managerEmpId || '',
              activityStatus: data.data.activityStatus || '',
            };
            updateFormData3(formData);
            console.log('✅ Existing patentability data loaded:', formData);
          } else {
            console.log('ℹ️ No patentability data found for assetId:', assetId);
          }
        } else if (response.status === 404) {
          console.log('ℹ️ No patentability data found for assetId:', assetId);
        } else {
          console.error('❌ Error loading patentability data:', response.status);
        }
      } catch (error) {
        console.error('❌ Error loading existing patentability data:', error);
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
      ...formData3,
      asset_id: assetId,
    };

    // Submit to invention API
    const saveRes = await fetch('/api/patentability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const resultDB = await saveRes.json();
    console.log('Patentability saved:', resultDB);

    if (resultDB.success) {
      router.push('/assetForm4'); // Navigate to next page on success
    } else {
      console.error('❌ Failed to save patentability:', resultDB.message);
      alert(`Failed to save patentability: ${resultDB.message}`);
    }

  }

  return (
    <div className="min-h-screen flex flex-col pt-14">
      <CardWrapper
        label={`3- Patentability Analysis${assetId ? ` - ${assetId}` : ''}`}
        title="Register"
        backButtonHref={assetId ? `/assetForm2?assetId=${assetId}` : "/assetForm2"}
        nextButtonHref={assetId ? `/assetForm4?assetId=${assetId}` : "/assetForm4"}
        className="w-full max-w-[90%] mx-auto p-8"
        onSave={handleSave}
        nextButtonEnabled={!!assetId}
      >
        <MiniHeader title="Invention Details" />
        <InventionDetails disableCommon={true} />
        <MiniHeader title="Extractor Details" />
        <PAExtractor formKey="formData3" updateFunction="updateFormData3" />
        <MiniHeader title="Innovation" />
        <Innovation formKey="formData3" updateFunction="updateFormData3" />
        <MiniHeader title="Decision Sheet" />
        <DecisionSheet formKey="formData3" updateFunction="updateFormData3" />
        <MiniHeader title="Efforts Sheet" />
        <PAEffortSheetDetails formKey="formData3" updateFunction="updateFormData3" />
        <MiniHeader title="Activity Status" />
        <ActivityStatus formKey="formData3" updateFunction="updateFormData3" />

      </CardWrapper>
    </div>
  )
}

export default Patentability_Analysis;