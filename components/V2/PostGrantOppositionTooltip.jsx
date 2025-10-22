'use client';

import React, { useRef, useState, useEffect } from 'react';
import useV2Store from '@/store/v2Store';

const PostGrantOppositionTooltip = ({ children, assetId, tileIndex, totalTiles, isEnabled = true }) => {
  const tooltipRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState('center');
  
  const formData = useV2Store((state) => state.getFormData('postGrantOpposition'));
  
  // Determine tooltip position based on tile index
  useEffect(() => {
    if (tileIndex === 0) {
      setTooltipPosition('left');
    } else if (tileIndex === totalTiles - 1) {
      setTooltipPosition('right');
    } else {
      setTooltipPosition('center');
    }
  }, [tileIndex, totalTiles]);

  // Get the data for tooltip - 5 random values excluding FER/hearing
  const getTooltipData = () => {
    return {
      rating: formData.rating || 'Empty',
      extractorOne: formData.extractorOne || 'Empty',
      extractortwo: formData.extractortwo || 'Empty',
      patentApplicationNumber: formData.patentApplicationNumber || 'Empty',
      oname: formData.oname || 'Empty'
    };
  };

  const tooltipData = getTooltipData();

  // Get positioning classes based on position
  const getPositionClasses = () => {
    switch (tooltipPosition) {
      case 'left':
        return 'left-0';
      case 'right':
        return 'right-0';
      case 'center':
      default:
        return 'left-1/2 transform -translate-x-1/2';
    }
  };

  // Get arrow positioning based on position
  const getArrowClasses = () => {
    switch (tooltipPosition) {
      case 'left':
        return 'left-6';
      case 'right':
        return 'right-6';
      case 'center':
      default:
        return 'left-1/2 transform -translate-x-1/2';
    }
  };

  return (
    <div className="relative group">
      {children}
      
      {/* Tooltip - only show if tile is enabled */}
      {isEnabled && (
        <div 
          ref={tooltipRef}
          className={`absolute bottom-full ${getPositionClasses()} mb-2 px-6 py-4 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 min-w-96 max-w-[28rem]`}
        >
          {/* Arrow */}
          <div className={`absolute top-full ${getArrowClasses()} w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900`}></div>
          
          {/* Tooltip Content */}
          <div className="space-y-2">
            <div className="font-semibold text-blue-300 border-b border-gray-700 pb-1 mb-2">
              Post Grant Opposition Details
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-300">Rating:</span>
                <span className="text-white font-medium">{tooltipData.rating}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Extractor One:</span>
                <span className="text-white">{tooltipData.extractorOne}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Extractor Two:</span>
                <span className="text-white">{tooltipData.extractortwo}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Patent App Number:</span>
                <span className="text-white">{tooltipData.patentApplicationNumber}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Opposer Name:</span>
                <span className="text-white">{tooltipData.oname}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostGrantOppositionTooltip;
