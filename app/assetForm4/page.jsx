'use client'

import React, { useState, useEffect, Suspense } from 'react';

import CardWrapper from "@/components/CardWrapper";
import ActivityStatus from "@/components/InventionRecognition/ActivityStatus";
import InventionDetails from "@/components/InventionRecognition/InventionDetails";
import MiniHeader from "@/components/MiniHeader";
import TypeOfDraft from '@/components/PatentSpecificationPreparation/TypeOfDraft';
import Complete from '@/components/PatentSpecificationPreparation/Complete';
import Provisional from '@/components/PatentSpecificationPreparation/Provisional';
import PCT from '@/components/PatentSpecificationPreparation/PCT';
import NationalPhase from '@/components/PatentSpecificationPreparation/NationalPhase';
import { useRouter, useSearchParams } from 'next/navigation';
import useFormStore from '@/store/store';
import { buildPatentSpecificPayload } from '@/utils/PageField4Payload'; // Assuming this utility function exists
import AveragePatentabilityRating from '@/components/PatentSpecificationPreparation/AveragePatentabilityRating';
import SimpleProtectedRoute from "@/components/SimpleProtectedRoute";

const PatentSpecificationPreparationContent = () => {
  const assetId = useFormStore((state) => state.assetId);
  const formData4 = useFormStore((state) => state.formData4);
  const updateFormData4 = useFormStore((state) => state.updateFormData4);
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
      const response = await fetch(`/api/patent-specification?assetId=${assetId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Update form data with existing data
          updateFormData4(data.data);
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
        <MiniHeader title="Patent Specification Preparation" />
        
        <div className="space-y-8">
          <CardWrapper>
            <InventionDetails
              formData={formData4}
              updateFormData={updateFormData4}
              formKey="formData4"
            />
          </CardWrapper>

          <CardWrapper>
            <TypeOfDraft
              formData={formData4}
              updateFormData={updateFormData4}
              formKey="formData4"
            />
          </CardWrapper>

          <CardWrapper>
            <Complete
              formData={formData4}
              updateFormData={updateFormData4}
              formKey="formData4"
            />
          </CardWrapper>

          <CardWrapper>
            <Provisional
              formData={formData4}
              updateFormData={updateFormData4}
              formKey="formData4"
            />
          </CardWrapper>

          <CardWrapper>
            <PCT
              formData={formData4}
              updateFormData={updateFormData4}
              formKey="formData4"
            />
          </CardWrapper>

          <CardWrapper>
            <NationalPhase
              formData={formData4}
              updateFormData={updateFormData4}
              formKey="formData4"
            />
          </CardWrapper>

          <CardWrapper>
            <AveragePatentabilityRating
              formData={formData4}
              updateFormData={updateFormData4}
              formKey="formData4"
            />
          </CardWrapper>

          <CardWrapper>
            <ActivityStatus
              formData={formData4}
              updateFormData={updateFormData4}
              formKey="formData4"
            />
          </CardWrapper>
        </div>
      </div>
    </div>
  );
};

// Main component with Suspense wrapper
const PatentSpecificationPreparation = () => {
  return (
    <SimpleProtectedRoute>
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-gray-200/50 max-w-md mx-auto">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Loading Form</h3>
            <p className="text-gray-600 mb-6">Please wait while we load the patent specification preparation form...</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      }>
        <PatentSpecificationPreparationContent />
      </Suspense>
    </SimpleProtectedRoute>
  );
};

export default PatentSpecificationPreparation;