'use client';

import React from 'react';
import { FileCheck, AlertCircle } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const UpdatesNBAV2 = ({ page, errors = {} }) => {
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const handleSelectChange = (value) => {
    updateFormData(page, 'updatenba', value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <FileCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">NBA Updates</h3>
            <p className="text-sm text-gray-600">National Biodiversity Authority requirements</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Is there need of NBA for applying patent?
          </label>
          <select
            value={formData.updatenba || ''}
            onChange={(e) => handleSelectChange(e.target.value)}
            className={`w-full max-w-xs px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
              errors.updatenba 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20'
            }`}
          >
            <option value="">Select status</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.updatenba && (
            <div className="flex items-center space-x-1 mt-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-sm text-red-600">{errors.updatenba}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdatesNBAV2;
