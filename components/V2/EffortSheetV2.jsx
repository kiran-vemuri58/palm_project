'use client';

import React, { useState, useEffect } from 'react';
import { Clock, User, DollarSign, Users, FileText } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const EffortSheetV2 = ({
  page = 'inventionRecognition',
  errors = {},
  isEditable = true,
  isNewAsset = false,
  title = 'Effort Sheet Details',
  description = 'Track time, costs, and responsibilities for this process'
}) => {
  // Get form data and actions from store
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);
  const setErrors = useV2Store((state) => state.setErrors);
  const [localData, setLocalData] = useState(formData);

  // Update local data when formData changes
  useEffect(() => {
    setLocalData(formData);
  }, [formData]);

  const handleChange = (field, value) => {
    // Validate numeric fields (integers only)
    if (['hoursspent', 'agencycost', 'revieweffort', 'extractionEffort'].includes(field)) {
      // Allow empty string or valid integers
      if (value !== '' && (isNaN(parseInt(value)) || parseInt(value) < 0 || !Number.isInteger(parseFloat(value)))) {
        return; // Don't update if invalid integer
      }
    }
    
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    
    // Always update the store immediately for real-time saving
    updateFormData(page, field, value);
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6">
        <div className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* IP Recognizer (Emp ID) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                IP Recognizer (Emp ID)
                {errors.iprecognizer && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.iprecognizer}
                  </span>
                )}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={localData.iprecognizer || ''}
                  onChange={(e) => handleChange('iprecognizer', e.target.value)}
                  placeholder="Enter employee ID"
                  disabled={!isEditable}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors.iprecognizer 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                  } ${
                    !isEditable
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                      : 'bg-white'
                  }`}
                />
              </div>
            </div>

            {/* Hours Spent */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Hours Spent
                {errors.hoursspent && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.hoursspent}
                  </span>
                )}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={localData.hoursspent || ''}
                  onChange={(e) => handleChange('hoursspent', e.target.value)}
                  placeholder="Enter hours"
                  disabled={!isEditable}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors.hoursspent 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                  } ${
                    !isEditable
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                      : 'bg-white'
                  }`}
                />
              </div>
            </div>

            {/* External Agency Recognizer */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                External Agency Recognizer
                {errors.agencyrecognizer && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.agencyrecognizer}
                  </span>
                )}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={localData.agencyrecognizer || ''}
                  onChange={(e) => handleChange('agencyrecognizer', e.target.value)}
                  placeholder="Enter agency name"
                  disabled={!isEditable}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors.agencyrecognizer 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                  } ${
                    !isEditable
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                      : 'bg-white'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cost Spent on Agency */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Cost Spent on Agency
                {errors.agencycost && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.agencycost}
                  </span>
                )}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={localData.agencycost || ''}
                  onChange={(e) => handleChange('agencycost', e.target.value)}
                  placeholder="Enter cost"
                  disabled={!isEditable}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors.agencycost 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                  } ${
                    !isEditable
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                      : 'bg-white'
                  }`}
                />
              </div>
            </div>

            {/* Effort Hours for Review */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Effort Hours for Review
                {errors.revieweffort && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.revieweffort}
                  </span>
                )}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={localData.revieweffort || ''}
                  onChange={(e) => handleChange('revieweffort', e.target.value)}
                  placeholder="Enter review hours"
                  disabled={!isEditable}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors.revieweffort 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                  } ${
                    !isEditable
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                      : 'bg-white'
                  }`}
                />
              </div>
            </div>

            {/* Manager Responsible (Emp ID) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Manager Responsible (Emp ID)
                {errors.managerempid && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.managerempid}
                  </span>
                )}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={localData.managerempid || ''}
                  onChange={(e) => handleChange('managerempid', e.target.value)}
                  placeholder="Enter manager ID"
                  disabled={!isEditable}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors.managerempid 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                  } ${
                    !isEditable
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                      : 'bg-white'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Efforts Spent for Extraction */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Efforts Spent for Extraction
                {errors.extractionEffort && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.extractionEffort}
                  </span>
                )}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={localData.extractionEffort || ''}
                  onChange={(e) => handleChange('extractionEffort', e.target.value)}
                  placeholder="Enter extraction effort hours"
                  disabled={!isEditable}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors.extractionEffort 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                  } ${
                    !isEditable
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                      : 'bg-white'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EffortSheetV2;
