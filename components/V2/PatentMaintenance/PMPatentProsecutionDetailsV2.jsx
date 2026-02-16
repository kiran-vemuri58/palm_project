'use client';

import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PMPatentProsecutionDetailsV2 = ({ formData, updateFormData, page }) => {
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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Patent Prosecution Details</h3>
            <p className="text-blue-100 text-sm mt-1">Patent maintenance prosecution and opposition details</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Patent Published? */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span>Patent Published?</span>
            </label>
            <select
              value={safeFormData.patentPublished || ''}
              onChange={(e) => handleChange('patentPublished', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Conditional Publication Number */}
          {safeFormData.patentPublished === 'yes' && (
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FileText className="h-4 w-4 text-blue-600" />
                <span>Publication Number</span>
              </label>
              <input
                type="text"
                value={safeFormData.publicationNumber || ''}
                onChange={(e) => handleChange('publicationNumber', e.target.value)}
                placeholder="Enter Publication Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PMPatentProsecutionDetailsV2;