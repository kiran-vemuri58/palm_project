'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, FileText, AlertCircle } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const TechnologyDetailsV2 = ({
  page = 'inventionRecognition',
  errors = {},
  isEditable = true,
  isNewAsset = false
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
    
    // If user selects "No" for incremental renovation, clear all technology detail fields
    if (field === 'incrementalrenovation' && value === 'no') {
      const clearedData = {
        ...newData,
        patentnumbers: '',
        journalnumbers: '',
        productidentity: '',
        problemaddressed: ''
      };
      setLocalData(clearedData);
      updateFormData(page, {
        [field]: value,
        patentnumbers: '',
        journalnumbers: '',
        productidentity: '',
        problemaddressed: ''
      });
    } else {
      // Always update the store immediately for real-time saving
      updateFormData(page, field, value);
    }
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const isIncrementalRenovation = localData.incrementalrenovation === 'yes';

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Technology Details</h3>
            <p className="text-sm text-gray-600">Technology classification and renovation information</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Technology Incremental Renovation Question */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Is Technology Incremental Renovation?
            </label>
            <select
              value={localData.incrementalrenovation || ''}
              onChange={(e) => handleChange('incrementalrenovation', e.target.value)}
              disabled={!isEditable}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
              } ${
                !isEditable
                  ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                  : 'bg-white'
              }`}
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Technology Details - Only show if "Yes" is selected */}
          {isIncrementalRenovation && (
            <div className="mt-8 p-6 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="w-5 h-5 text-orange-600" />
                <h4 className="text-lg font-semibold text-orange-900">Incremental Renovation Details</h4>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Patent Numbers */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Patent Numbers
                  </label>
                  <input
                    type="text"
                    value={localData.patentnumbers || ''}
                    onChange={(e) => handleChange('patentnumbers', e.target.value)}
                    placeholder="Enter patent numbers"
                    disabled={!isEditable}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                    } ${
                      !isEditable
                        ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                        : 'bg-white'
                    }`}
                  />
                </div>

                {/* Journal Numbers */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Journal Numbers
                  </label>
                  <input
                    type="text"
                    value={localData.journalnumbers || ''}
                    onChange={(e) => handleChange('journalnumbers', e.target.value)}
                    placeholder="Enter journal numbers"
                    disabled={!isEditable}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                    } ${
                      !isEditable
                        ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                        : 'bg-white'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Product Identity Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Product Identity Number
                  </label>
                  <input
                    type="text"
                    value={localData.productidentity || ''}
                    onChange={(e) => handleChange('productidentity', e.target.value)}
                    placeholder="Enter product identity number"
                    disabled={!isEditable}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                    } ${
                      !isEditable
                        ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                        : 'bg-white'
                    }`}
                  />
                </div>

                {/* Problem the Invention Addresses */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Problem the Invention Addresses
                  </label>
                  <textarea
                    value={localData.problemaddressed || ''}
                    onChange={(e) => handleChange('problemaddressed', e.target.value)}
                    placeholder="Describe the problem addressed by the invention"
                    rows={3}
                    disabled={!isEditable}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                    } ${
                      !isEditable
                        ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                        : 'bg-white'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Show message when "No" is selected */}
          {localData.incrementalrenovation === 'no' && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600">
                  This technology is not an incremental renovation. Technology detail fields have been cleared and no additional details are required.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnologyDetailsV2;
