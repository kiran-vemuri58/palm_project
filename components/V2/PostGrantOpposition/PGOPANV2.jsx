'use client';

import React from 'react';
import { FileText, Hash } from 'lucide-react';

const PGOPANV2 = ({ formData, updateFormData, page }) => {
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
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Hash className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">PAN</h3>
            <p className="text-purple-100 text-sm mt-1">Patent Application Number</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Patent Application Number */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <FileText className="h-4 w-4 text-purple-600" />
              <span>Patent Application Number</span>
            </label>
            <input
              type="text"
              value={safeFormData.patentApplicationNumber || ''}
              onChange={(e) => handleChange('patentApplicationNumber', e.target.value)}
              placeholder="Enter Patent Application Number"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PGOPANV2;