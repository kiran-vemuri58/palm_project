'use client'

import CardWrapper from "@/components/CardWrapper";
import ExtractorDetails from "@/components/InventionExtraction/ExtractorDetails";
import UpdatesNBA from "@/components/InventionExtraction/UpdatesNBA";
import ActivityStatus from "@/components/InventionRecognition/ActivityStatus";
import EffortSheetDetails from "@/components/InventionRecognition/EffortSheet";
import InventionDetails from "@/components/InventionRecognition/InventionDetails";
import MiniHeader from "@/components/MiniHeader";
import useFormStore from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState, Suspense } from "react";
import SimpleProtectedRoute from "@/components/SimpleProtectedRoute";

// Component that uses useSearchParams - needs to be wrapped in Suspense
const InventionExtractionContent = () => {
  const { formData, formData2, uploadedPaths, assetId } = useFormStore();
  const updateFormData = useFormStore((state) => state.updateFormData);
  const updateFormData2 = useFormStore((state) => state.updateFormData2);
  const setAssetId = useFormStore((state) => state.setAssetId);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Handle assetId from query parameter
  useEffect(() => {
    const queryAssetId = searchParams.get('assetId');
    if (queryAssetId && queryAssetId !== assetId) {
      setAssetId(queryAssetId);
    }
  }, [searchParams, assetId, setAssetId]);

  // Load existing data when assetId changes
    // Map invention database fields to form fields
  const mapInventionToForm = (dbData) => {
    if (!dbData) return {};
    
    return {
      inventiontitle: dbData.inventiontitle || '',
      commonName: dbData.commonname || '', // Map snake_case to camelCase
      inventordetails: dbData.inventordetails || '',
      incrementalrenovation: dbData.incrementalrenovation || '',
      patentnumbers: dbData.patentnumbers || '',
      journalnumbers: dbData.journalnumbers || '',
      productidentity: dbData.productidentity || '',
      problemaddressed: dbData.problemaddressed || '',
      trainrun: dbData.trainrun || '',
      experimentresults: dbData.experimentresults || '',
      evidence: dbData.evidence || [],
      minuteofmeeting: dbData.minuteofmeeting || [],
      attachments: dbData.attachments || [],
      rating: dbData.rating || 0
    };
  };

  // Map extraction database fields to form fields
  const mapExtractionToForm = (dbData) => {
    if (!dbData) return {};
    
    return {
      extractorOne: dbData.extractorOne || '',
      extractortwo: dbData.extractortwo || '',
      iEDate: dbData.iEDate || '',
      iawpl: dbData.iawpl || '',
      nfeature: dbData.nfeature || '',
      ifeature: dbData.ifeature || '',
      idattachments: dbData.idattachments || [],
      scountry: dbData.scountry || '',
      oextractor: dbData.oextractor || '',
      ipRecognizer: dbData.ipRecognizer || '',
      hoursSpent: dbData.hoursSpent || '', // This field exists in Extraction table
      agencyRecognizer: dbData.agencyRecognizer || '',
      agencyCost: dbData.agencyCost || '',
      reviewEffort: dbData.reviewEffort || '',
      managerEmpId: dbData.managerEmpId || '',
      activityStatus: dbData.activityStatus || '',
      updatenba: dbData.updatenba || ''
    };
  };

  const loadExistingData = async () => {
    if (!assetId) return;

    setIsLoadingData(true);
    try {
      // Load invention data (form 1) first
      const inventionResponse = await fetch(`/api/invention?assetId=${assetId}`);
      if (inventionResponse.ok) {
        const inventionData = await inventionResponse.json();
        if (inventionData.success && inventionData.data) {
          const mappedData = mapInventionToForm(inventionData.data);
          updateFormData(mappedData);
        }
      }

      // Load extraction data (form 2)
      const extractionResponse = await fetch(`/api/extraction?assetId=${assetId}`);
      if (extractionResponse.ok) {
        const extractionData = await extractionResponse.json();
        if (extractionData.success && extractionData.data) {
          const mappedExtractionData = mapExtractionToForm(extractionData.data);
          updateFormData2(mappedExtractionData);
        }
      }
    } catch (error) {
      console.error('Error loading existing data:', error);
      toast.error("Failed to load existing data. Please try again.");
    } finally {
      setIsLoadingData(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadExistingData();
  }, [assetId]);

  // No complex authentication logic needed - SimpleProtectedRoute handles it

  const handleSave = async () => {
    // Prevent double API calls
    if (isSaving) return;

    setIsSaving(true);

    try {
      // Clear previous errors
      // setErrors({});

      // Prepare payload
      const payload = {
        ...formData2,
        assetId: assetId
      };

      // Save to database
      const response = await fetch('/api/extraction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Invention extraction form saved successfully!");
        // Optionally redirect to assets page
        // router.push('/assets');
      } else {
        toast.error(result.error || "Failed to save form. Please try again.");
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error("An error occurred while saving. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

    // Show loading state while fetching data
  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-gray-200/50 max-w-md mx-auto">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Loading Asset Data</h3>
          <p className="text-gray-600 mb-6">Please wait while we load the existing form data...</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <CardWrapper
        label={`Invention Extraction Form${assetId ? ` - Asset ID: ${assetId}` : ''}`}
        backButtonHref="/assetForm1"
        nextButtonHref="/assetForm3"
        onSave={handleSave}
        assetId={assetId}
      >
        <MiniHeader title="Invention Details" />
        <InventionDetails formKey="formData" updateFunction="updateFormData" disableCommon={true} />
        
        <MiniHeader title="Extractor Details" />
        <ExtractorDetails formKey="formData2" updateFunction="updateFormData2" />
        
        <MiniHeader title="Updates NBA" />
        <UpdatesNBA formKey="formData2" updateFunction="updateFormData2" />
        
        <MiniHeader title="Effort Sheet Details" />
        <EffortSheetDetails formKey="formData2" updateFunction="updateFormData2" />
        
        <MiniHeader title="Activity Status" />
        <ActivityStatus formKey="formData2" updateFunction="updateFormData2" />
      </CardWrapper>
    </div>
  );
};

// Main component with Suspense wrapper
const InventionExtraction = () => {
  return (
    <SimpleProtectedRoute>
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-gray-200/50 max-w-md mx-auto">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Loading Form</h3>
            <p className="text-gray-600 mb-6">Please wait while we load the invention extraction form...</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      }>
        <InventionExtractionContent />
      </Suspense>
    </SimpleProtectedRoute>
  );
};

export default InventionExtraction;