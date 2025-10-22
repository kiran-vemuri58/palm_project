'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  
  const { 
    updateFormData, 
    currentAssetId,
    markFormAsSaved,
  // No need for API refresh functions - data is pre-loaded from assets page
  } = useV2Store();
  
  const patentFiling = useV2Store((state) => state.getFormData('patentFiling'));

  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Ensure client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000); // Hide after 3 seconds - same as Forms 1, 2, 3 & 4
  };

  // Redirect if no assetId
  useEffect(() => {
    if (mounted && !currentAssetId) {
      router.push('/v2/invention-recognition?new=true');
    }
  }, [mounted, currentAssetId, router]);

  // Save function
  const handleSave = async () => {
    if (!currentAssetId) {
      showNotification('Error: No Asset ID found', 'error');
      return;
    }

    setIsSaving(true);

    try {
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
        showNotification('Patent Filing saved successfully!', 'success');
        
        // Mark form as saved in the store
        markFormAsSaved('patentFiling');
        
        // No need to refresh store - data is pre-loaded from assets page
        
        // Clear message after 3 seconds
        // Auto-hide success message after 3 seconds
        setTimeout(() => {}, 3000);
      } else {
        console.error('❌ Save failed:', result.message);
        showNotification(`Error: ${result.message}`, 'error');
      }
    } catch (error) {
      console.error('❌ Save error:', error);
      showNotification(`Error: ${error.message}`, 'error');
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
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Asset ID:</span> {currentAssetId || 'None'}
                              </div>
                              <div>
                                <span className="font-medium">Draft Type:</span> {patentFiling?.draftType || 'None'}
                              </div>
                              <div>
                                <span className="font-medium">Mode:</span> {currentAssetId ? 'Edit' : 'New'}
                              </div>
                            </div>
                          </div>
                        </div>

          </div>
        </div>
      </div>

      {/* Beautiful Notification Popup - Same as Forms 1, 2, 3 & 4 */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className={`px-6 py-4 rounded-lg shadow-lg border-l-4 flex items-center space-x-3 ${
            notification.type === 'success' 
              ? 'bg-green-50 border-green-400 text-green-800' 
              : 'bg-red-50 border-red-400 text-red-800'
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              notification.type === 'success' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {notification.type === 'success' ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div>
              <p className="font-semibold text-sm">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification({ show: false, message: '', type: '' })}
              className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatentFilingV2;