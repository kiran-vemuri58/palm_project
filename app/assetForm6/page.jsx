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
import { Average } from "next/font/google";
import AveragePatentabilityRating from "@/components/PatentProsecution/AveragePatentabilityRating";
import { useRouter, useSearchParams } from "next/navigation";
import useFormStore from "@/store/store";
import { useEffect, useState, Suspense } from "react";
import SimpleProtectedRoute from "@/components/SimpleProtectedRoute";

const PatentProsecutionContent = () => {
  const assetId = useFormStore((state) => state.assetId);
  const formData6 = useFormStore((state) => state.formData6);
  const updateFormData6 = useFormStore((state) => state.updateFormData6);
  const setAssetId = useFormStore((state) => state.setAssetId);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle assetId from query parameter
  useEffect(() => {
    const queryAssetId = searchParams.get('assetId');
    if (queryAssetId && queryAssetId !== assetId) {
      console.log('🔍 Setting assetId from URL:', queryAssetId);
      setAssetId(queryAssetId);
    }
  }, [searchParams, assetId, setAssetId]);

  // Load existing data when assetId changes
  const loadExistingData = async () => {
    if (!assetId) return;

    try {
      const response = await fetch(`/api/patent-prosecution?assetId=${assetId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Update form data with existing data
          updateFormData6(data.data);
        }
      }
    } catch (error) {
      console.error('Error loading existing data:', error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadExistingData();
  }, [assetId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <MiniHeader title="Patent Prosecution" />
        
        <div className="space-y-8">
          <CardWrapper>
            <PPInventionDetails
              formData={formData6}
              updateFormData={updateFormData6}
              formKey="formData6"
            />
          </CardWrapper>

          <CardWrapper>
            <ExtractorDetails
              formData={formData6}
              updateFormData={updateFormData6}
              formKey="formData6"
            />
          </CardWrapper>

          <CardWrapper>
            <PatentProsectionDetails
              formData={formData6}
              updateFormData={updateFormData6}
              formKey="formData6"
            />
          </CardWrapper>

          <CardWrapper>
            <PatentApplicationStatus
              formData={formData6}
              updateFormData={updateFormData6}
              formKey="formData6"
            />
          </CardWrapper>

          <CardWrapper>
            <FER
              formData={formData6}
              updateFormData={updateFormData6}
              formKey="formData6"
            />
          </CardWrapper>

          <CardWrapper>
            <Hearing
              formData={formData6}
              updateFormData={updateFormData6}
              formKey="formData6"
            />
          </CardWrapper>

          <CardWrapper>
            <DecisionSheet
              formData={formData6}
              updateFormData={updateFormData6}
              formKey="formData6"
            />
          </CardWrapper>

          <CardWrapper>
            <Innovation
              formData={formData6}
              updateFormData={updateFormData6}
              formKey="formData6"
            />
          </CardWrapper>

          <CardWrapper>
            <PAExtractor
              formData={formData6}
              updateFormData={updateFormData6}
              formKey="formData6"
            />
          </CardWrapper>

          <CardWrapper>
            <AveragePatentabilityRating
              formData={formData6}
              updateFormData={updateFormData6}
              formKey="formData6"
            />
          </CardWrapper>

          <CardWrapper>
            <PPEffortSheet
              formData={formData6}
              updateFormData={updateFormData6}
              formKey="formData6"
            />
          </CardWrapper>

          <CardWrapper>
            <ActivityStatus
              formData={formData6}
              updateFormData={updateFormData6}
              formKey="formData6"
            />
          </CardWrapper>
        </div>
      </div>
    </div>
  );
};

// Main component with Suspense wrapper
const PatentProsecution = () => {
  return (
    <SimpleProtectedRoute>
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-gray-200/50 max-w-md mx-auto">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Loading Form</h3>
            <p className="text-gray-600 mb-6">Please wait while we load the patent prosecution form...</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      }>
        <PatentProsecutionContent />
      </Suspense>
    </SimpleProtectedRoute>
  );
};

export default PatentProsecution;