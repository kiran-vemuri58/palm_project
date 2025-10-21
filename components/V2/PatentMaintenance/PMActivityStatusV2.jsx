'use client';

import React from 'react';
import { CheckCircle, Clock, Play, Pause } from 'lucide-react';

const PMActivityStatusV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};

  const handleChange = (field, value) => {
    if (updateFormData) {
      updateFormData(field, value);
    } else if (page) {
      useV2Store.getState().updateFormData(page, field, value);
    }
  };

  const statusOptions = [
    { value: 'initiated', label: 'Initiated', icon: Play, color: 'text-blue-600' },
    { value: 'inprogress', label: 'In Progress', icon: Clock, color: 'text-yellow-600' },
    { value: 'completed', label: 'Completed', icon: CheckCircle, color: 'text-green-600' }
  ];

  const currentStatus = statusOptions.find(status => status.value === safeFormData.activityStatus) || statusOptions[0];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Activity Status</h3>
            <p className="text-blue-100 text-sm mt-1">Current status of the maintenance</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Status Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Activity Status
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statusOptions.map((status) => {
                const IconComponent = status.icon;
                const isSelected = safeFormData.activityStatus === status.value;
                
                return (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() => handleChange('activityStatus', status.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <IconComponent className={`h-6 w-6 ${status.color}`} />
                      <span className={`text-sm font-medium ${
                        isSelected ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                        {status.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Progress
            </label>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  safeFormData.activityStatus === 'initiated' ? 'bg-blue-500 w-1/3' :
                  safeFormData.activityStatus === 'inprogress' ? 'bg-yellow-500 w-2/3' :
                  safeFormData.activityStatus === 'completed' ? 'bg-green-500 w-full' :
                  'bg-gray-400 w-0'
                }`}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PMActivityStatusV2;
