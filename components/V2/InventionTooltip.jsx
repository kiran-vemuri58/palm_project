'use client';

import React from 'react';
import useV2Store from '@/store/v2Store';

const InventionTooltip = ({ children, assetId }) => {
  const formData = useV2Store((state) => state.getFormData('inventionRecognition'));
  
  // Get the data for tooltip
  const getTooltipData = () => {
    return {
      inventionId: assetId || 'Not Generated',
      inventionTitle: formData.inventiontitle || 'Empty',
      incrementalInnovation: formData.incrementalrenovation || 'Empty',
      collaboration: formData.collaboration || 'Empty',
      inventionCountry: formData.inventioncountry || 'Empty',
      productIdentity: formData.productidentity || 'Empty',
      experimentation: formData.trainrun || 'Empty'
    };
  };

  const tooltipData = getTooltipData();

  return (
    <div className="relative group">
      {children}
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-0 transform mb-2 px-6 py-4 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 min-w-96 max-w-[28rem]">
        {/* Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        
        {/* Tooltip Content */}
        <div className="space-y-2">
          <div className="font-semibold text-blue-300 border-b border-gray-700 pb-1 mb-2">
            Invention Details
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-300">Invention ID/Title:</span>
              <span className="text-white font-medium">{tooltipData.inventionId} / {tooltipData.inventionTitle}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Incremental Innovation over:</span>
              <span className="text-white">{tooltipData.incrementalInnovation}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">In collaboration with:</span>
              <span className="text-white">{tooltipData.collaboration}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Invention arriving country:</span>
              <span className="text-white">{tooltipData.inventionCountry}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Related Product Number:</span>
              <span className="text-white">{tooltipData.productIdentity}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Experimentation done:</span>
              <span className="text-white">{tooltipData.experimentation}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventionTooltip;
