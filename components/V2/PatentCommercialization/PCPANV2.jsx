'use client';

import React from 'react';
import { FileText, Hash } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PCPANV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};

  const handleChange = (field, value) => {
    if (updateFormData) {
      updateFormData(field, value);
    } else if (page) {
      useV2Store.getState().updateFormData(page, field, value);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-yellow-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Post Grant Opposition (PAN)</h3>
            <p className="text-orange-100 text-sm mt-1">Patent Application and Patent Numbers</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patent Application Number */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Hash className="h-4 w-4 text-orange-600" />
              <span>Patent Application Number</span>
            </label>
            <input
              type="text"
              value={safeFormData.pcPANPatentApplicationNumber || ''}
              onChange={(e) => handleChange('pcPANPatentApplicationNumber', e.target.value)}
              placeholder="Enter Patent Application Number"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>

          {/* Patent Number */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Hash className="h-4 w-4 text-orange-600" />
              <span>Patent Number</span>
            </label>
            <input
              type="text"
              value={safeFormData.pcPANPatentNumber || ''}
              onChange={(e) => handleChange('pcPANPatentNumber', e.target.value)}
              placeholder="Enter Patent Number"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCPANV2;
