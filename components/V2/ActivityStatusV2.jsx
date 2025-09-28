'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, PlayCircle, AlertCircle } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const ActivityStatusV2 = ({
  page = 'inventionRecognition',
  errors = {},
  isEditable = true,
  isNewAsset = false,
  title = 'Activity Status',
  description = 'Track the current status of this process',
  showDescription = true
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

  const statusOptions = [
    {
      value: 'initiated',
      label: 'Initiated',
      description: 'Process has been started',
      icon: PlayCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      value: 'inprogress',
      label: 'In Progress',
      description: 'Currently being worked on',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      value: 'completed',
      label: 'Completed',
      description: 'Process has been finished',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  const selectedStatus = statusOptions.find(option => option.value === localData.activityStatus);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            {showDescription && (
              <p className="text-sm text-gray-600">{description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Status Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Current Status
              {errors.activityStatus && (
                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.activityStatus}
                </span>
              )}
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statusOptions.map((option) => {
                const IconComponent = option.icon;
                const isSelected = localData.activityStatus === option.value;
                
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange('activityStatus', option.value)}
                    disabled={!isEditable}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      isSelected
                        ? `${option.bgColor} ${option.borderColor} ring-2 ring-offset-2 ring-indigo-500`
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    } ${
                      !isEditable
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? option.bgColor : 'bg-gray-100'
                      }`}>
                        <IconComponent className={`w-5 h-5 ${
                          isSelected ? option.color : 'text-gray-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold text-sm ${
                          isSelected ? option.color : 'text-gray-900'
                        }`}>
                          {option.label}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {option.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Status Display */}
          {selectedStatus && (
            <div className={`p-4 rounded-xl border-2 ${selectedStatus.bgColor} ${selectedStatus.borderColor}`}>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg ${selectedStatus.bgColor} flex items-center justify-center`}>
                  <selectedStatus.icon className={`w-6 h-6 ${selectedStatus.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold text-lg ${selectedStatus.color}`}>
                    {selectedStatus.label}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedStatus.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Status</div>
                  <div className={`font-semibold ${selectedStatus.color}`}>
                    Active
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Status Progress Indicator */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">Progress</h4>
              <span className="text-sm text-gray-600">
                {localData.activityStatus ? 
                  `${statusOptions.findIndex(opt => opt.value === localData.activityStatus) + 1} of ${statusOptions.length}` 
                  : '0 of 3'
                }
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  localData.activityStatus === 'initiated' ? 'bg-blue-500 w-1/3' :
                  localData.activityStatus === 'inprogress' ? 'bg-yellow-500 w-2/3' :
                  localData.activityStatus === 'completed' ? 'bg-green-500 w-full' :
                  'bg-gray-300 w-0'
                }`}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Initiated</span>
              <span>In Progress</span>
              <span>Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityStatusV2;
