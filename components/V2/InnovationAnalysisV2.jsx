'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Upload, X, AlertCircle } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const InnovationAnalysisV2 = ({ page = 'patentabilityAnalysis', errors = {}, isEditable = true }) => {
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);
  const setErrors = useV2Store((state) => state.setErrors);
  const [localData, setLocalData] = useState(formData);

  // File upload states
  const [minuteFiles, setMinuteFiles] = useState([]);
  const [attachmentFiles, setAttachmentFiles] = useState([]);

  // Update local data when formData changes
  useEffect(() => {
    setLocalData(formData);
  }, [formData]);

  const handleChange = (field, value) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    
    // Always update the store immediately for the main field
    updateFormData(page, field, value);
    
    // If user selects "No" for train run, clear all document fields
    if (field === 'trainRun' && value === 'no') {
      const clearedData = {
        ...newData,
        minuteOfMeeting: [],
        attachments: []
      };
      setLocalData(clearedData);
      
      // Update store with cleared fields individually
      updateFormData(page, 'minuteOfMeeting', []);
      updateFormData(page, 'attachments', []);
      
      // Clear file states
      setMinuteFiles([]);
      setAttachmentFiles([]);
    }
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleFileChange = (fileList, setFileState, fieldName) => {
    const files = Array.from(fileList);
    
    // Validate file types
    const allowedTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx'];
    const invalidFiles = files.filter(file => {
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      return !allowedTypes.includes(extension);
    });

    if (invalidFiles.length > 0) {
      alert(`Invalid file types. Only PDF, DOC, DOCX, XLS, XLSX files are allowed.`);
      return;
    }

    // Validate file size (20MB max)
    const oversizedFiles = files.filter(file => file.size > 20 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`File size too large. Maximum 20MB per file.`);
      return;
    }

    setFileState(files);
    updateFormData(page, fieldName, files);
  };

  const removeFile = (fileIndex, setFileState, fieldName) => {
    setFileState(prev => {
      const newFiles = prev.filter((_, index) => index !== fileIndex);
      updateFormData(page, fieldName, newFiles);
      return newFiles;
    });
  };

  const isTrainRun = localData.trainRun === 'yes';

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Innovation Analysis</h3>
            <p className="text-sm text-gray-600">Additional invention analysis and document uploads</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Debug: Component is rendering */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <p className="text-green-800 text-sm">
              <strong>✅ InnovationAnalysisV2 Component is rendering!</strong>
            </p>
          </div>
          
          {/* Is there more than an invention? */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Is there more than an invention?
            </label>
            <select
              value={localData.trainRun || ''}
              onChange={(e) => handleChange('trainRun', e.target.value)}
              disabled={!isEditable}
              className={`w-full max-w-xs px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                'border-gray-200 focus:border-purple-500 focus:ring-purple-500/20'
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
            {errors.trainRun && (
              <p className="mt-1 text-sm text-red-600">{errors.trainRun}</p>
            )}
          </div>

          {/* Show additional fields only if "Yes" is selected */}
          {isTrainRun && (
            <div className="space-y-6 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-purple-600 mr-2" />
                Additional Documents Required
              </h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Prior Art Documents */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Prior Art Documents
                    <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, XLS, XLSX - Max 20MB)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      onChange={(e) => handleFileChange(e.target.files, setMinuteFiles, 'minuteOfMeeting')}
                      disabled={!isEditable}
                      className="hidden"
                      id="minute-upload"
                    />
                    <label
                      htmlFor="minute-upload"
                      className={`cursor-pointer flex flex-col items-center space-y-2 ${
                        !isEditable ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">Click to upload files</span>
                    </label>
                    
                    {/* File List */}
                    {minuteFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {minuteFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                            <span className="text-sm text-gray-700 truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index, setMinuteFiles, 'minuteOfMeeting')}
                              disabled={!isEditable}
                              className="text-red-500 hover:text-red-700 disabled:opacity-50"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.minuteOfMeeting && (
                    <p className="mt-1 text-sm text-red-600">{errors.minuteOfMeeting}</p>
                  )}
                </div>

                {/* NPL Documents */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    NPL Documents
                    <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, XLS, XLSX - Max 20MB)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      onChange={(e) => handleFileChange(e.target.files, setAttachmentFiles, 'attachments')}
                      disabled={!isEditable}
                      className="hidden"
                      id="attachment-upload"
                    />
                    <label
                      htmlFor="attachment-upload"
                      className={`cursor-pointer flex flex-col items-center space-y-2 ${
                        !isEditable ? 'cursor-not-allowed opacity-50' : ''
                      }`}
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
                              disabled={!isEditable}
                              className="text-red-500 hover:text-red-700 disabled:opacity-50"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.attachments && (
                    <p className="mt-1 text-sm text-red-600">{errors.attachments}</p>
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

export default InnovationAnalysisV2;
