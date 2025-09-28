'use client';

import React, { useState, useEffect } from 'react';
import { FlaskConical, FileText, Upload, X, AlertCircle } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const TrainRunExperimentationV2 = ({
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

  // File upload states
  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [minuteFiles, setMinuteFiles] = useState([]);
  const [attachmentFiles, setAttachmentFiles] = useState([]);

  // Update local data when formData changes
  useEffect(() => {
    setLocalData(formData);
  }, [formData]);

  const handleChange = (field, value) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    
    // If user selects "No" for train run, clear all experimentation detail fields
    if (field === 'trainrun' && value === 'no') {
      const clearedData = {
        ...newData,
        experimentresults: '',
        evidence: [],
        minuteofmeeting: [],
        attachments: []
      };
      setLocalData(clearedData);
      updateFormData(page, {
        [field]: value,
        experimentresults: '',
        evidence: [],
        minuteofmeeting: [],
        attachments: []
      });
      // Clear file states
      setEvidenceFiles([]);
      setMinuteFiles([]);
      setAttachmentFiles([]);
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

  const isTrainRun = localData.trainrun === 'yes';

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Train Run / Experimentation</h3>
            <p className="text-sm text-gray-600">Experimentation results and document uploads</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Train Run Question */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Train Run / Experimentation?
            </label>
            <select
              value={localData.trainrun || ''}
              onChange={(e) => handleChange('trainrun', e.target.value)}
              disabled={!isEditable}
              className={`w-full max-w-xs px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
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

          {/* Experimentation Details - Only show if "Yes" is selected */}
          {isTrainRun && (
            <div className="mt-8 p-6 bg-teal-50 rounded-xl border border-teal-200">
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="w-5 h-5 text-teal-600" />
                <h4 className="text-lg font-semibold text-teal-900">Experimentation Details</h4>
              </div>
              
              {/* Experimentation Results */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Experimentation Results
                </label>
                <textarea
                  value={localData.experimentresults || ''}
                  onChange={(e) => handleChange('experimentresults', e.target.value)}
                  placeholder="Enter experimentation results..."
                  rows={4}
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

              {/* File Upload Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Evidence Available */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Evidence Available
                    <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, XLS, XLSX - Max 20MB)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-teal-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      onChange={(e) => handleFileChange(e.target.files, setEvidenceFiles, 'evidence')}
                      disabled={!isEditable}
                      className="hidden"
                      id="evidence-upload"
                    />
                    <label
                      htmlFor="evidence-upload"
                      className={`cursor-pointer flex flex-col items-center space-y-2 ${
                        !isEditable ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">Click to upload files</span>
                    </label>
                    
                    {/* File List */}
                    {evidenceFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {evidenceFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                            <span className="text-sm text-gray-700 truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index, setEvidenceFiles, 'evidence')}
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
                </div>

                {/* Minute of Meeting */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Minute of Meeting
                    <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, XLS, XLSX - Max 20MB)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-teal-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      onChange={(e) => handleFileChange(e.target.files, setMinuteFiles, 'minuteofmeeting')}
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
                              onClick={() => removeFile(index, setMinuteFiles, 'minuteofmeeting')}
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
                </div>

                {/* Attachments */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Attachments
                    <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, XLS, XLSX - Max 20MB)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-teal-400 transition-colors">
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
                </div>
              </div>
            </div>
          )}

          {/* Show message when "No" is selected */}
          {localData.trainrun === 'no' && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600">
                  No train run or experimentation conducted. Experimentation detail fields have been cleared and no additional details are required.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainRunExperimentationV2;
