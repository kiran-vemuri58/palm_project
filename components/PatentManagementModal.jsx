'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PatentManagementModal = ({ isOpen, onClose, assetId, assetData }) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  // Compact workflow stages
  const stages = [
    {
      id: 'invention-recognition',
      title: "Invention Recognition",
      shortTitle: "Recognition",
      formNumber: "1",
      route: '/assetForm1',
      hasData: assetData?.inventionRecognition || false,
      icon: "🔍"
    },
    {
      id: 'invention-extraction',
      title: "Invention Extraction", 
      shortTitle: "Extraction",
      formNumber: "2",
      route: '/assetForm2',
      hasData: assetData?.inventionExtraction || false,
      icon: "📋"
    },
    {
      id: 'patent-search',
      title: "Patent Search",
      shortTitle: "Search",
      formNumber: "3",
      route: '/assetForm3',
      hasData: assetData?.patentSearch || false,
      icon: "🔎"
    },
    {
      id: 'pct-application',
      title: "PCT Application",
      shortTitle: "PCT",
      formNumber: "4",
      route: '/assetForm4',
      hasData: assetData?.pctApplication || false,
      icon: "📄"
    },
    {
      id: 'complete-spec',
      title: "Complete Spec",
      shortTitle: "Spec",
      formNumber: "5",
      route: '/assetForm5',
      hasData: assetData?.completeSpec || false,
      icon: "📝"
    },
    {
      id: 'patent-prosecution',
      title: "Patent Prosecution",
      shortTitle: "Prosecution",
      formNumber: "6",
      route: '/assetForm6',
      hasData: assetData?.patentProsecution || false,
      icon: "⚖️"
    },
    {
      id: 'post-grant-opposition',
      title: "Post Grant Opposition",
      shortTitle: "Opposition",
      formNumber: "7",
      route: '/assetForm7',
      hasData: assetData?.postGrantOpposition || false,
      icon: "🛡️"
    },
    {
      id: 'patent-management',
      title: "Patent Management",
      shortTitle: "Management",
      formNumber: "8",
      route: '/assetForm8',
      hasData: assetData?.patentManagement || false,
      icon: "⚙️"
    },
    {
      id: 'patent-commercialisation',
      title: "Patent Commercialisation",
      shortTitle: "Commercial",
      formNumber: "9",
      route: '/assetForm9',
      hasData: assetData?.patentCommercialisation || false,
      icon: "💰"
    }
  ];

  const handleStageClick = async (stage) => {
    if (!stage.hasData) return;
    
    setIsNavigating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      router.push(`${stage.route}?assetId=${assetId}`);
      onClose();
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsNavigating(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
        {/* Loading Overlay */}
        {isNavigating && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl">
            <div className="text-center bg-white rounded-xl p-6 shadow-xl border border-gray-100">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-3"></div>
              <p className="text-gray-700 font-semibold">Navigating...</p>
            </div>
          </div>
        )}
        
        <DialogHeader className="text-center pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 -mx-6 -mt-6 mb-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Patent Workflow
              </DialogTitle>
              <p className="text-gray-600 text-sm">Asset ID: <span className="text-blue-600 font-bold">{assetId}</span></p>
            </div>
          </div>
        </DialogHeader>
        
        {/* Compact Workflow Grid - 3x3 */}
        <div className="grid grid-cols-3 gap-3 px-4 pb-6">
          {stages.map((stage, index) => (
            <div key={stage.id} className="relative group">
              <div
                className={`relative p-3 rounded-xl border-2 transition-all duration-200 text-center min-h-[80px] flex flex-col items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105 ${
                  stage.hasData
                    ? 'border-blue-500 bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 cursor-pointer active:scale-95'
                    : 'border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 cursor-not-allowed opacity-60'
                }`}
                onClick={() => handleStageClick(stage)}
              >
                {/* Form Number Badge */}
                <div className={`absolute top-1 left-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  stage.hasData ? 'bg-white/30 text-white' : 'bg-gray-400 text-white'
                }`}>
                  {stage.formNumber}
                </div>
                
                {/* Status Indicator */}
                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                  stage.hasData ? 'bg-green-400' : 'bg-gray-400'
                }`}></div>
                
                {/* Stage Icon */}
                <div className="text-2xl mb-1">{stage.icon}</div>
                
                {/* Stage Title */}
                <div className="text-xs font-bold leading-tight mb-1">
                  {stage.shortTitle}
                </div>
                
                {/* Completion Status */}
                {stage.hasData && (
                  <div className="text-xs opacity-90 font-medium">
                    ✓ Done
                  </div>
                )}
              </div>
              
              {/* Arrow to next stage (for visual flow) */}
              {index < stages.length - 1 && (index + 1) % 3 !== 0 && (
                <div className="absolute top-1/2 -right-1.5 transform -translate-y-1/2 z-10">
                  <div className="w-3 h-0.5 bg-gray-400"></div>
                </div>
              )}
              
              {/* Arrow down for next row */}
              {index < stages.length - 3 && (
                <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-0.5 h-3 bg-gray-400"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 text-xs text-gray-600 bg-gray-50 rounded-lg p-3 mx-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span>Pending</span>
          </div>
          <div className="text-gray-500">
            Click completed stages to navigate
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatentManagementModal;