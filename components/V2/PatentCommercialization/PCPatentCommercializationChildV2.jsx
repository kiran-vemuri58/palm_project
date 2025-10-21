'use client';

import React from 'react';
import { FileText, Calendar, CheckCircle, Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PCPatentCommercializationChildV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};

  const handleChange = (field, value) => {
    if (updateFormData) {
      updateFormData(field, value);
    } else if (page) {
      useV2Store.getState().updateFormData(page, field, value);
    }
  };

  const handleFileChange = (field, files) => {
    const fileArray = Array.from(files);
    handleChange(field, fileArray);
  };

  const implementationStages = [
    'Idea',
    'Prototype', 
    'Testing',
    'MVP',
    'Real scale product',
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-yellow-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Patent Commercialization Details</h3>
            <p className="text-orange-100 text-sm mt-1">Implementation stage and working status</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stage of Implementation */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <CheckCircle className="h-4 w-4 text-orange-600" />
              <span>Stage of Implementation</span>
            </label>
            <select
              value={safeFormData.pcPatentCommercializationChildStage || ''}
              onChange={(e) => handleChange('pcPatentCommercializationChildStage', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">Select stage</option>
              {implementationStages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          {/* Working of Invention Filed */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <CheckCircle className="h-4 w-4 text-orange-600" />
              <span>Working of Invention Filed?</span>
            </label>
            <select
              value={safeFormData.pcPatentCommercializationChildWorkingFiled || ''}
              onChange={(e) => handleChange('pcPatentCommercializationChildWorkingFiled', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* File Upload for Stage Details */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Implementation Details
              <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, XLS, XLSX - Max 20MB)</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-orange-400 transition-colors">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={(e) => handleFileChange('pcPatentCommercializationChildImplementationFile', e.target.files)}
                className="hidden"
                id="implementation-upload"
              />
              <label
                htmlFor="implementation-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-600">Click to upload files</span>
              </label>
              
              {/* File List */}
              {safeFormData.pcPatentCommercializationChildImplementationFile && safeFormData.pcPatentCommercializationChildImplementationFile.length > 0 && (
                <div className="mt-4 space-y-2">
                  {safeFormData.pcPatentCommercializationChildImplementationFile.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                      <span className="text-sm text-gray-700 truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newFiles = safeFormData.pcPatentCommercializationChildImplementationFile.filter((_, i) => i !== index);
                          handleChange('pcPatentCommercializationChildImplementationFile', newFiles);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Date of First Working Filed */}
          <div className="md:col-span-3 space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Calendar className="h-4 w-4 text-orange-600" />
              <span>Date of First Working Of Invention Filed</span>
            </label>
            <input
              type="date"
              value={safeFormData.pcPatentCommercializationChildFirstWorkingDate || ''}
              onChange={(e) => handleChange('pcPatentCommercializationChildFirstWorkingDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCPatentCommercializationChildV2;
