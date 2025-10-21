'use client';

import React, { useState } from 'react';
import { FileText, Upload, X, User, CheckCircle } from 'lucide-react';

const PMDecisionSheetV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};
  const [attachmentFiles, setAttachmentFiles] = useState([]);

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
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Decision Sheet</h3>
            <p className="text-blue-100 text-sm mt-1">Decision making and documentation</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Name of Decision Maker */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <User className="h-4 w-4 text-blue-600" />
              <span>Name of Decision Maker</span>
            </label>
            <input
              type="text"
              value={safeFormData.nodc || ''}
              onChange={(e) => handleChange('nodc', e.target.value)}
              placeholder="Enter Name of Decision Maker"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Decision in Brief */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>Decision in Brief</span>
            </label>
            <input
              type="text"
              value={safeFormData.dibrief || ''}
              onChange={(e) => handleChange('dibrief', e.target.value)}
              placeholder="Enter decision in brief"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Attachment */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Upload className="h-4 w-4 text-blue-600" />
              <span>Attachment</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                onChange={(e) => handleFileChange(e.target.files, setAttachmentFiles, 'decisionAttachments')}
                className="hidden"
                id="pm-decision-attachments-upload"
              />
              <label
                htmlFor="pm-decision-attachments-upload"
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
                        onClick={() => removeFile(index, setAttachmentFiles, 'decisionAttachments')}
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
  );
};

export default PMDecisionSheetV2;
