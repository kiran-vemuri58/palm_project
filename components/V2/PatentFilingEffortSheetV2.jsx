'use client';

import React from 'react';
import { Clock, Users, DollarSign } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PatentFilingEffortSheetV2 = ({ page }) => {
  // Get form data from store using page parameter
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const safeFormData = formData || {};

  const handleChange = (field, value) => {
    updateFormData(page, field, value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Effort Sheet Details</h3>
            <p className="text-sm text-gray-600">Track effort hours, costs, and responsible personnel</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* First Row - IP Recognizer, Hours Spent, External Agency */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                IP Recognizer (Emp ID)
              </label>
              <input
                type="text"
                value={safeFormData.ipRecognizer || ''}
                onChange={(e) => handleChange('ipRecognizer', e.target.value)}
                placeholder="Enter employee ID"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-orange-500 focus:ring-orange-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Hours Spent
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={safeFormData.hoursSpent || ''}
                onChange={(e) => handleChange('hoursSpent', e.target.value)}
                placeholder="Enter hours"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-orange-500 focus:ring-orange-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                External Agency Recognizer
              </label>
              <input
                type="text"
                value={safeFormData.agencyRecognizer || ''}
                onChange={(e) => handleChange('agencyRecognizer', e.target.value)}
                placeholder="Enter agency name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-orange-500 focus:ring-orange-500/20"
              />
            </div>
          </div>

          {/* Second Row - Agency Cost, Review Effort, Manager */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Cost Spent on Agency
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

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Effort Hours for Review
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={safeFormData.reviewEffort || ''}
                  onChange={(e) => handleChange('reviewEffort', e.target.value)}
                  placeholder="Enter review hours"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-orange-500 focus:ring-orange-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Manager Responsible (Emp ID)
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={safeFormData.managerEmpId || ''}
                  onChange={(e) => handleChange('managerEmpId', e.target.value)}
                  placeholder="Enter manager ID"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-orange-500 focus:ring-orange-500/20"
                />
              </div>
            </div>
          </div>

          {/* Third Row - Extraction Effort */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Efforts Spent for Extraction
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={safeFormData.extractionEffort || ''}
                  onChange={(e) => handleChange('extractionEffort', e.target.value)}
                  placeholder="Enter extraction effort hours"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-orange-500 focus:ring-orange-500/20"
                />
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-orange-800 mb-2">Effort Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-orange-700">
              <div>
                <span className="font-medium">Total Hours:</span> {safeFormData.hoursSpent || 0}
              </div>
              <div>
                <span className="font-medium">Review Hours:</span> {safeFormData.reviewEffort || 0}
              </div>
              <div>
                <span className="font-medium">Extraction Hours:</span> {safeFormData.extractionEffort || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatentFilingEffortSheetV2;
