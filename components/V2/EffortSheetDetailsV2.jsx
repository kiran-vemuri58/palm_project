'use client';

import React from 'react';
import { Clock } from 'lucide-react';

const EffortSheetDetailsV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};

  const handleChange = (fieldName, value) => {
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, fieldName, value);
    } else {
      updateFormData(fieldName, value);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 rounded-lg p-2">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Effort Sheet Details</h3>
            <p className="text-orange-100 text-sm">Time tracking and effort management</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                IP Recognizer (Emp ID)
              </label>
              <input
                type="text"
                placeholder="Enter employee ID..."
                value={safeFormData.ipRecognizer || ''}
                onChange={(e) => handleChange('ipRecognizer', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Hours Spent
              </label>
              <input
                type="number"
                placeholder="Enter hours..."
                value={safeFormData.hoursSpent || ''}
                onChange={(e) => handleChange('hoursSpent', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                External Agency Recognizer
              </label>
              <input
                type="text"
                placeholder="Enter agency name..."
                value={safeFormData.agencyRecognizer || ''}
                onChange={(e) => handleChange('agencyRecognizer', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Cost Spent on Agency
              </label>
              <input
                type="number"
                placeholder="Enter cost..."
                value={safeFormData.agencyCost || ''}
                onChange={(e) => handleChange('agencyCost', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Effort Hours for Review
              </label>
              <input
                type="number"
                placeholder="Enter review hours..."
                value={safeFormData.reviewEffort || ''}
                onChange={(e) => handleChange('reviewEffort', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Manager Responsible (Emp ID)
              </label>
              <input
                type="text"
                placeholder="Enter manager ID..."
                value={safeFormData.managerEmpId || ''}
                onChange={(e) => handleChange('managerEmpId', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Efforts Spent for Extraction
              </label>
              <input
                type="number"
                placeholder="Enter extraction effort hours..."
                value={safeFormData.extractionEffort || ''}
                onChange={(e) => handleChange('extractionEffort', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EffortSheetDetailsV2;