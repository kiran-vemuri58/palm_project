'use client';

import React from 'react';
import { FileText, User, Clock, DollarSign, Building, Briefcase } from 'lucide-react';

const PMEffortSheetDetailsV2 = ({ formData, updateFormData, page }) => {
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
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Effort Sheet Details</h3>
            <p className="text-blue-100 text-sm mt-1">Efforts and costs for maintenance</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FileText className="h-4 w-4 text-blue-600" />
                <span>Efforts Spent for maintenance of Invention</span>
              </label>
              <input
                type="text"
                value={safeFormData.ipRecognizer || ''}
                onChange={(e) => handleChange('ipRecognizer', e.target.value)}
                placeholder="Efforts Spent for maintenance of Invention"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <User className="h-4 w-4 text-blue-600" />
                <span>Employee ID</span>
              </label>
              <input
                type="text"
                value={safeFormData.hoursSpent || ''}
                onChange={(e) => handleChange('hoursSpent', e.target.value)}
                placeholder="Enter Employee ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Hours Spent</span>
              </label>
              <input
                type="text"
                value={safeFormData.agencyRecognizer || ''}
                onChange={(e) => handleChange('agencyRecognizer', e.target.value)}
                placeholder="Enter Hours Spent"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Building className="h-4 w-4 text-blue-600" />
                <span>Agency Manager</span>
              </label>
              <input
                type="text"
                value={safeFormData.agencyCost || ''}
                onChange={(e) => handleChange('agencyCost', e.target.value)}
                placeholder="Enter Agency Manager"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <span>Agency Cost</span>
              </label>
              <input
                type="text"
                value={safeFormData.reviewEffort || ''}
                onChange={(e) => handleChange('reviewEffort', e.target.value)}
                placeholder="Enter Agency Cost"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <User className="h-4 w-4 text-blue-600" />
                <span>Manager Responsible</span>
              </label>
              <input
                type="text"
                value={safeFormData.managerEmpId || ''}
                onChange={(e) => handleChange('managerEmpId', e.target.value)}
                placeholder="Enter Manager Responsible"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Efforts in Hours for review</span>
              </label>
              <input
                type="text"
                value={safeFormData.reviewEffortHours || ''}
                onChange={(e) => handleChange('reviewEffortHours', e.target.value)}
                placeholder="Enter Efforts in Hours for review"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PMEffortSheetDetailsV2;
