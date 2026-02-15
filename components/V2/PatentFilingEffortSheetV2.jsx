'use client';

import React from 'react';
import { Clock, Users, DollarSign } from 'lucide-react';
import useV2Store from '@/store/v2Store';

/**
 * Page 5 (Patent Filing) only: Effort Sheet with 3 options.
 * 1. Cost of filing
 * 2. Review Manager: Employee ID
 * 3. Hours for review: Number of hours
 */
const PatentFilingEffortSheetV2 = ({ page }) => {
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const safeFormData = formData || {};

  const handleChange = (field, value) => {
    updateFormData(page, field, value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Effort Sheet</h3>
            <p className="text-sm text-gray-600">Cost of filing, review manager, and hours for review</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Cost of filing */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Cost of filing
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                min="0"
                step="0.01"
                value={safeFormData.agencyCost || ''}
                onChange={(e) => handleChange('agencyCost', e.target.value)}
                placeholder="Enter cost"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-orange-500 focus:ring-orange-500/20"
              />
            </div>
          </div>

          {/* 2. Review Manager: Employee ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Review Manager: Employee ID
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={safeFormData.managerEmpId || ''}
                onChange={(e) => handleChange('managerEmpId', e.target.value)}
                placeholder="Enter employee ID"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-orange-500 focus:ring-orange-500/20"
              />
            </div>
          </div>

          {/* 3. Hours for review: Number of hours */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Hours for review: Number of hours
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                min="0"
                step="0.5"
                value={safeFormData.reviewEffort || ''}
                onChange={(e) => handleChange('reviewEffort', e.target.value)}
                placeholder="Enter hours"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-orange-500 focus:ring-orange-500/20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatentFilingEffortSheetV2;
