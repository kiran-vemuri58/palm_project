'use client';

import React, { useState, useEffect } from 'react';
import { FileCheck, Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const DecisionSheetV2 = ({ page }) => {
  // Get form data from store using page parameter
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const safeFormData = formData || {};
  const [attachmentFiles, setAttachmentFiles] = useState([]);

  // Update local file state when formData changes
  useEffect(() => {
    if (safeFormData.ppds_attachments && Array.isArray(safeFormData.ppds_attachments)) {
      setAttachmentFiles(safeFormData.ppds_attachments);
    }
  }, [safeFormData.ppds_attachments]);

  const handleChange = (field, value) => {
    updateFormData(page, field, value);
  };

  const handleFileChange = (fileList) => {
    const files = Array.from(fileList);
    
    // Validate file types
    const allowedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.txt'];
    const invalidFiles = files.filter(file => {
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      return !allowedTypes.includes(extension);
    });

    if (invalidFiles.length > 0) {
      alert(`Invalid file types. Only PDF, DOC, DOCX, JPG, PNG, TXT files are allowed.`);
      return;
    }

    // Validate file size (20MB max)
    const oversizedFiles = files.filter(file => file.size > 20 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`File size too large. Maximum 20MB per file.`);
      return;
    }

    setAttachmentFiles(files);
    updateFormData(page, 'decisionAttachments', files);
  };

  const removeFile = (fileIndex) => {
    setAttachmentFiles(prev => {
      const newFiles = prev.filter((_, index) => index !== fileIndex);
      updateFormData(page, 'decisionAttachments', newFiles);
      return newFiles;
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <FileCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Decision Sheet</h3>
            <p className="text-sm text-gray-600">Patent decision and analysis information</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* First Row - 3 Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Name of Decision Maker
              </label>
              <input
                type="text"
                value={safeFormData.decisionNodc || ''}
                onChange={(e) => handleChange('decisionNodc', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
                placeholder="Enter Name of Decision Maker"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Decision in Brief
              </label>
              <input
                type="text"
                value={safeFormData.decisionDibrief || ''}
                onChange={(e) => handleChange('decisionDibrief', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
                placeholder="Enter decision in brief"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Attachment
                <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, JPG, PNG, TXT - Max 20MB)</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                  onChange={(e) => handleFileChange(e.target.files)}
                  className="hidden"
                  id="attachments-upload"
                />
                <label
                  htmlFor="attachments-upload"
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
                          onClick={() => removeFile(index)}
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
        </div>
      </div>
    </div>
  );
};

export default DecisionSheetV2;