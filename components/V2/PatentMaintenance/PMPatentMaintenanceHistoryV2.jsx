'use client';

import React, { useState } from 'react';
import { FileText, Calendar, DollarSign, Building, Upload, X, Clock } from 'lucide-react';

const PMPatentMaintenanceHistoryV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};
  const [attachmentFiles, setAttachmentFiles] = useState([]);
  const [filingAttachmentFiles, setFilingAttachmentFiles] = useState([]);

  const handleChange = (field, value) => {
    if (updateFormData) {
      updateFormData(field, value);
    } else if (page) {
      useV2Store.getState().updateFormData(page, field, value);
    }
  };

  const handleFileChange = (files, setFiles, field) => {
    const fileArray = Array.from(files);
    setFiles(fileArray);
    handleChange(field, fileArray);
  };

  const removeFile = (index, setFiles, field) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    handleChange(field, newFiles);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Patent Maintenance History</h3>
            <p className="text-blue-100 text-sm mt-1">Patent maintenance timeline and fees</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* First Row - Basic Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>Priority Date</span>
              </label>
              <input
                type="date"
                value={safeFormData.priorityDate || ''}
                onChange={(e) => handleChange('priorityDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>Grant Date</span>
              </label>
              <input
                type="date"
                value={safeFormData.grantDate || ''}
                onChange={(e) => handleChange('grantDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FileText className="h-4 w-4 text-blue-600" />
                <span>Number of Years Paid</span>
              </label>
              <input
                type="text"
                value={safeFormData.yearsPaid || ''}
                onChange={(e) => handleChange('yearsPaid', e.target.value)}
                placeholder="Enter number of years"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Second Row - Due Date and Maintenance Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>Next Due Date</span>
              </label>
              <input
                type="date"
                value={safeFormData.nextDueDate || ''}
                onChange={(e) => handleChange('nextDueDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>Whether Maintenance is Stopped?</span>
              </label>
              <input
                type="date"
                value={safeFormData.maintenanceStopped || ''}
                onChange={(e) => handleChange('maintenanceStopped', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Decision Page Attachment */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Decision Page Attachment
              <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, JPG, PNG - Max 20MB)</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e.target.files, setAttachmentFiles, 'attachments')}
                className="hidden"
                id="pm-maintenance-attachments-upload"
              />
              <label
                htmlFor="pm-maintenance-attachments-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-600">Click to upload files</span>
              </label>
              
              {/* File List */}
              {attachmentFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {attachmentFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                      <span className="text-sm text-gray-700 truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index, setAttachmentFiles, 'attachments')}
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

          {/* Working of Invention Statement Submit */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>Working of Invention Statement Submit?</span>
            </label>
            <select
              value={safeFormData.collaboration || ''}
              onChange={(e) => handleChange('collaboration', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Conditional Fields - Show only if "Yes" is selected */}
          {safeFormData.collaboration === 'yes' && (
            <div className="space-y-6">
              {/* Filing Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>Filing Date</span>
                  </label>
                  <input
                    type="date"
                    value={safeFormData.filingDate || ''}
                    onChange={(e) => handleChange('filingDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    <span>Maintenance Fee</span>
                  </label>
                  <input
                    type="text"
                    value={safeFormData.maintenanceFee || ''}
                    onChange={(e) => handleChange('maintenanceFee', e.target.value)}
                    placeholder="Enter maintenance fee"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Building className="h-4 w-4 text-blue-600" />
                    <span>External Agency</span>
                  </label>
                  <input
                    type="text"
                    value={safeFormData.externalAgency || ''}
                    onChange={(e) => handleChange('externalAgency', e.target.value)}
                    placeholder="Enter external agency"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Filing Attachment */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Filing Attachment
                  <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, JPG, PNG - Max 20MB)</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e.target.files, setFilingAttachmentFiles, 'filingAttachments')}
                    className="hidden"
                    id="pm-filing-attachments-upload"
                  />
                  <label
                    htmlFor="pm-filing-attachments-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-600">Click to upload files</span>
                  </label>
                  
                  {/* File List */}
                  {filingAttachmentFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {filingAttachmentFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                          <span className="text-sm text-gray-700 truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index, setFilingAttachmentFiles, 'filingAttachments')}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PMPatentMaintenanceHistoryV2;
