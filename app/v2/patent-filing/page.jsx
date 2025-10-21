'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useV2Store from '@/store/v2Store';
import V2Navigation from '@/components/V2Navigation';
import InventionDetailsV2 from '@/components/V2/InventionDetailsV2';
import ExtractorDetailsV2 from '@/components/V2/ExtractorDetailsV2';
import TypeOfDraftV2 from '@/components/V2/TypeOfDraftV2';
import CompleteSpecificationV2 from '@/components/V2/CompleteSpecificationV2';
import ProvisionalApplicationV2 from '@/components/V2/ProvisionalApplicationV2';
import PCTApplicationV2 from '@/components/V2/PCTApplicationV2';
import NationalPhaseV2 from '@/components/V2/NationalPhaseV2';
import DecisionSheetV2 from '@/components/V2/DecisionSheetV2';
import InnovationV2 from '@/components/V2/InnovationV2';
import PatentFilingInnovationV2 from '@/components/V2/PatentFilingInnovationV2';
import PAExtractorV2 from '@/components/V2/PAExtractorV2';
import PatentFilingPAExtractorV2 from '@/components/V2/PatentFilingPAExtractorV2';
import AveragePatentabilityRatingV2 from '@/components/V2/AveragePatentabilityRatingV2';
import PatentFilingAverageRatingV2 from '@/components/V2/PatentFilingAverageRatingV2';
import EffortSheetDetailsV2 from '@/components/V2/EffortSheetDetailsV2';
import PatentFilingEffortSheetV2 from '@/components/V2/PatentFilingEffortSheetV2';
import ActivityStatusV2 from '@/components/V2/ActivityStatusV2';
import { Save, Loader2 } from 'lucide-react';

const PatentFilingV2 = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assetId = searchParams.get('assetId');
  const mode = searchParams.get('mode') || 'new';
  
  const { 
    patentFiling, 
    updateFormData, 
    currentAssetId,
    markFormAsSaved,
    refreshStoreAfterAPI
  } = useV2Store();

  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Ensure client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if no assetId (for both new and edit modes)
  useEffect(() => {
    if (mounted && !currentAssetId) {
      router.push('/v2/invention-recognition?new=true');
    }
  }, [mounted, currentAssetId, router]);

  // Save function
  const handleSave = async () => {
    if (!currentAssetId) {
      setSaveMessage('Error: No Asset ID found');
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      console.log('💾 Saving Patent Filing data for Asset ID:', currentAssetId);
      console.log('📦 Patent Filing data:', patentFiling);

      const response = await fetch('/api/patentFiling', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          asset_id: currentAssetId,
          ...patentFiling
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Patent Filing saved successfully:', result);
        setSaveMessage('Patent Filing saved successfully!');
        
        // Mark form as saved in the store
        markFormAsSaved('patentFiling');
        
        // Refresh store data with the latest from API
        try {
          await refreshStoreAfterAPI(currentAssetId, 'patentFiling');
          console.log('✅ Store refreshed with latest data from API');
        } catch (refreshError) {
          console.error('⚠️ Failed to refresh store after save:', refreshError);
          // Don't show error to user as save was successful
        }
        
        // Clear message after 3 seconds
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        console.error('❌ Save failed:', result.message);
        setSaveMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('❌ Save error:', error);
      setSaveMessage(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <V2Navigation />
      
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Patent Filing V2</h1>
                <p className="text-lg text-gray-600">Step 5: Patent Filing Process</p>
              </div>
              
              {/* Asset ID Display */}
              {currentAssetId && (
                <div className="bg-blue-100 border border-blue-200 rounded-lg px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-700">Asset ID:</span>
                    <span className="text-lg font-bold text-blue-900 font-mono">
                      {currentAssetId}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            {/* Invention Details (Read-only from Form 1) */}
            <div className="mb-8">
              <InventionDetailsV2 
                formData={null}
                isEditable={false}
                showRating={false}
                showPatentNumber={false}
                showOnlyBasicFields={true}
              />
            </div>

            {/* Extractor Details */}
            <div className="mb-8">
              <ExtractorDetailsV2 
                formData={patentFiling}
                updateFormData={(field, value) => updateFormData('patentFiling', field, value)}
                page="patentFiling"
              />
            </div>

            {/* Type of Draft Section */}
            <div className="mb-8">
              <TypeOfDraftV2 page="patentFiling" />
            </div>

            {/* All Draft Components with Correct Props */}
            {patentFiling?.draftType === 'complete' && (
              <div className="mb-8">
                <CompleteSpecificationV2 
                  page="patentFiling"
                />
              </div>
            )}

            {patentFiling?.draftType === 'provisional' && (
              <div className="mb-8">
                <ProvisionalApplicationV2 
                  page="patentFiling"
                />
              </div>
            )}

            {patentFiling?.draftType === 'pct' && (
              <div className="mb-8">
                <PCTApplicationV2 
                  page="patentFiling"
                />
              </div>
            )}

            {patentFiling?.draftType === 'national_phase' && (
              <div className="mb-8">
                <NationalPhaseV2 
                  page="patentFiling"
                />
              </div>
            )}

            {/* Decision Sheet */}
            <div className="mb-8">
              <DecisionSheetV2 
                page="patentFiling"
              />
            </div>

            {/* Innovation Analysis */}
            <div className="mb-8">
              <PatentFilingInnovationV2 
                page="patentFiling"
              />
            </div>

            {/* Patentability Extractor */}
            <div className="mb-8">
              <PatentFilingPAExtractorV2 
                page="patentFiling"
              />
            </div>

            {/* Average Patentability Rating */}
            <div className="mb-8">
              <PatentFilingAverageRatingV2 
                page="patentFiling"
              />
            </div>

            {/* Effort Sheet Details */}
            <div className="mb-8">
              <PatentFilingEffortSheetV2 
                page="patentFiling"
              />
            </div>

            {/* Activity Status */}
            <div className="mb-8">
              <ActivityStatusV2 
                page="patentFiling"
              />
            </div>

                        {/* Save Button */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">Save Patent Filing</h3>
                                <p className="text-sm text-gray-600">Save all form data to the database</p>
                              </div>
                              <button
                                onClick={handleSave}
                                disabled={isSaving || !currentAssetId}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                  isSaving || !currentAssetId
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg'
                                }`}
                              >
                                {isSaving ? (
                                  <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Saving...</span>
                                  </>
                                ) : (
                                  <>
                                    <Save className="w-5 h-5" />
                                    <span>Save Patent Filing</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            {saveMessage && (
                              <div className={`p-4 rounded-lg mb-4 ${
                                saveMessage.includes('Error') 
                                  ? 'bg-red-50 border border-red-200 text-red-700' 
                                  : 'bg-green-50 border border-green-200 text-green-700'
                              }`}>
                                {saveMessage}
                              </div>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Asset ID:</span> {currentAssetId || 'None'}
                              </div>
                              <div>
                                <span className="font-medium">Draft Type:</span> {patentFiling?.draftType || 'None'}
                              </div>
                              <div>
                                <span className="font-medium">Mode:</span> {mode}
                              </div>
                            </div>
                          </div>
                        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper component with Suspense boundary
const PatentFilingV2WithSuspense = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="bg-gray-50 border-b border-gray-200 sticky top-24 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-14">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold bg-gray-200 text-gray-400">
                  <span className="text-lg">📄</span>
                  <span className="text-sm font-mono">PF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Patent Filing V2</h1>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PatentFilingV2 />
    </Suspense>
  );
};

export default PatentFilingV2WithSuspense;