'use client';

import React from 'react';
import { CheckCircle, Clock, PlayCircle } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PPActivityStatusV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};

  const handleChange = (field, value) => {
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, field, value);
    } else {
      updateFormData(field, value);
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

  const selectedStatus = statusOptions.find(option => option.value === safeFormData.ppact_status);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Activity Status</h3>
            <p className="text-sm text-gray-600">Track the current status of patent prosecution</p>
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
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statusOptions.map((option) => {
                const IconComponent = option.icon;
                const isSelected = safeFormData.ppact_status === option.value;
                
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange('ppact_status', option.value)}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      isSelected
                        ? `${option.bgColor} ${option.borderColor} ring-2 ring-offset-2 ring-indigo-500`
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    } cursor-pointer`}
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
                {safeFormData.ppact_status ? 
                  `${statusOptions.findIndex(opt => opt.value === safeFormData.ppact_status) + 1} of ${statusOptions.length}` 
                  : '0 of 3'
                }
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  safeFormData.ppact_status === 'initiated' ? 'bg-blue-500 w-1/3' :
                  safeFormData.ppact_status === 'inprogress' ? 'bg-yellow-500 w-2/3' :
                  safeFormData.ppact_status === 'completed' ? 'bg-green-500 w-full' :
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

export default PPActivityStatusV2;
