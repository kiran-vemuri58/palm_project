'use client';

import React from 'react';
import useV2Store from '@/store/v2Store';

const ExtractionTooltip = ({ children, assetId }) => {
  const formData = useV2Store((state) => state.getFormData('inventionExtraction'));
  
  // Get the data for tooltip
  const getTooltipData = () => {
    const page1Data = useV2Store.getState().getFormData('inventionRecognition');
    
    return {
      inventionId: assetId || 'Not Generated',
      inventionTitle: page1Data.inventiontitle || 'Empty',
      extractionDate: formData.iEDate || 'Empty',
      novelFeature: formData.nfeature || 'Empty',
      inventiveFeature: formData.ifeature || 'Empty'
    };
  };

  const tooltipData = getTooltipData();

  return (
    <div className="relative group">
      {children}
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-6 py-4 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 min-w-96 max-w-[28rem]">
        {/* Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        
        {/* Tooltip Content */}
        <div className="space-y-2">
          <div className="font-semibold text-blue-300 border-b border-gray-700 pb-1 mb-2">
            Extraction Details
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-300">Invention ID/Title:</span>
              <span className="text-white font-medium">{tooltipData.inventionId} / {tooltipData.inventionTitle}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Invention Extraction date:</span>
              <span className="text-white">{tooltipData.extractionDate}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Assumed Novel Feature:</span>
              <span className="text-white">{tooltipData.novelFeature}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Assumed inventive feature:</span>
              <span className="text-white">{tooltipData.inventiveFeature}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractionTooltip;
