'use client';

import React from 'react';
import useV2Store from '@/store/v2Store';

const PatentabilityTooltip = ({ children, assetId, isEnabled = true }) => {
  const formData = useV2Store((state) => state.getFormData('patentabilityAnalysis'));
  const page1Data = useV2Store((state) => state.getFormData('inventionRecognition'));

  // Get data from Page 1 for Invention ID/Title
  const inventionTitle = page1Data?.inventiontitle || 'Not specified';
  const inventionId = assetId || 'Not available';

  // Get data from Page 3 for patentability analysis
  const patentabilityConcludingDate = formData?.analysisDate || 'Not specified';
  const novelFeature = formData?.nfeature || 'Not specified';
  const inventiveFeature = formData?.ifeature || 'Not specified';
  const patentabilityRating = formData?.patentabilityRating || 'Not specified';
  const relevantPatent = formData?.patentReferences || 'Not specified';
  const decisionAfterSearch = formData?.dibrief || 'Not specified';

  return (
    <div className={`relative ${isEnabled ? 'group' : ''}`}>
      {children}
      
      {/* Tooltip - only show if tile is enabled */}
      {isEnabled && (
        <div className="absolute z-50 bg-gray-900 text-white p-4 rounded-lg shadow-xl max-w-sm w-80 transform -translate-x-1/2 left-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
          
          <div className="space-y-2 text-sm">
            <div className="font-semibold text-blue-300 mb-2">Patentability Analysis Details</div>
            
            <div>
              <span className="text-gray-300">Invention ID/Title:</span>
              <span className="text-white ml-1">{inventionId} - {inventionTitle}</span>
            </div>
            
            <div>
              <span className="text-gray-300">Patentability concluding date:</span>
              <span className="text-white ml-1">{patentabilityConcludingDate}</span>
            </div>
            
            <div>
              <span className="text-gray-300">Novel feature (Analysed):</span>
              <span className="text-white ml-1">{novelFeature}</span>
            </div>
            
            <div>
              <span className="text-gray-300">Inventive feature (Analysed):</span>
              <span className="text-white ml-1">{inventiveFeature}</span>
            </div>
            
            <div>
              <span className="text-gray-300">Patentability rating:</span>
              <span className="text-white ml-1">{patentabilityRating}</span>
            </div>
            
            <div>
              <span className="text-gray-300">Relevant Patent:</span>
              <span className="text-white ml-1">{relevantPatent}</span>
            </div>
            
            <div>
              <span className="text-gray-300">Decision after search:</span>
              <span className="text-white ml-1">{decisionAfterSearch}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatentabilityTooltip;
