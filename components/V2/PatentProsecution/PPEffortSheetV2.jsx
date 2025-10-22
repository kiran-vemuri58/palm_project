'use client';

import React from 'react';
import { Clock, DollarSign, User, Building } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PPEffortSheetV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};

  const handleChange = (field, value) => {
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, field, value);
    } else {
      updateFormData(field, value);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Effort Sheet Details</h3>
            <p className="text-purple-100 text-sm mt-1">Time and cost tracking for patent prosecution</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <User className="h-4 w-4 text-purple-600" />
                Request for Review Submitter
              </label>
              <input
                type="text"
                value={safeFormData.ppes_ip_recognizer || ''}
                onChange={(e) => handleChange('ppes_ip_recognizer', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                placeholder="Enter Employee ID"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
                Hours Spent
              </label>
              <input
                type="number"
                value={safeFormData.ppes_hours_spent || ''}
                onChange={(e) => handleChange('ppes_hours_spent', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                placeholder="Enter Hours Spent"
                min="0"
                step="0.5"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Building className="h-4 w-4 text-purple-600" />
                Agency Recognizer
              </label>
              <input
                type="text"
                value={safeFormData.ppes_agency_recognizer || ''}
                onChange={(e) => handleChange('ppes_agency_recognizer', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                placeholder="Enter Agency Recognizer"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-purple-600" />
                Cost Spent on Agency
              </label>
              <input
                type="number"
                value={safeFormData.ppes_agency_cost || ''}
                onChange={(e) => handleChange('ppes_agency_cost', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                placeholder="Enter Cost Spent on Agency"
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <User className="h-4 w-4 text-purple-600" />
                Review Effort
              </label>
              <input
                type="text"
                value={safeFormData.ppes_review_effort || ''}
                onChange={(e) => handleChange('ppes_review_effort', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                placeholder="Enter Review Effort"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <User className="h-4 w-4 text-purple-600" />
                Manager Employee ID
              </label>
              <input
                type="text"
                value={safeFormData.ppes_manager_emp_id || ''}
                onChange={(e) => handleChange('ppes_manager_emp_id', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                placeholder="Enter Manager Employee ID"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPEffortSheetV2;
