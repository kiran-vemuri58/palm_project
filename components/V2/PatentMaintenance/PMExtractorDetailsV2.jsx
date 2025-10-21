'use client';

import React, { useState } from 'react';
import { FileText, Calendar, CheckCircle, Upload, X, User } from 'lucide-react';

const PMExtractorDetailsV2 = ({ formData, updateFormData, page }) => {
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
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Extractor Details</h3>
            <p className="text-blue-100 text-sm mt-1">Patent maintenance extraction and analysis details</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Name of the Extractor 1 */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <User className="h-4 w-4 text-blue-600" />
              <span>Name of the Extractor 1</span>
            </label>
            <input
              type="text"
              value={safeFormData.extractorOne || ''}
              onChange={(e) => handleChange('extractorOne', e.target.value)}
              placeholder="Enter the name of Extractor 1"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Name of the Extractor 2 */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <User className="h-4 w-4 text-blue-600" />
              <span>Name of the Extractor 2</span>
            </label>
            <input
              type="text"
              value={safeFormData.extractortwo || ''}
              onChange={(e) => handleChange('extractortwo', e.target.value)}
              placeholder="Enter the name of Extractor 2"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Invention Extraction Date */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span>Invention Extraction Date</span>
            </label>
            <input
              type="date"
              value={safeFormData.iEDate || ''}
              onChange={(e) => handleChange('iEDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Is Invention Accordance with Patent Laws? */}
        <div className="mt-6 space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <span>Is Invention Accordance with Patent Laws?</span>
          </label>
          <select
            value={safeFormData.iawpl || ''}
            onChange={(e) => handleChange('iawpl', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Conditional fields when iawpl is 'yes' */}
        {safeFormData.iawpl === 'yes' && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Novel Feature (Assumed) */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>Novel Feature (Assumed)</span>
                </label>
                <input
                  type="text"
                  value={safeFormData.nfeature || ''}
                  onChange={(e) => handleChange('nfeature', e.target.value)}
                  placeholder="Enter Novel Feature"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Inventive Feature (Assumed) */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>Inventive Feature (Assumed)</span>
                </label>
                <input
                  type="text"
                  value={safeFormData.ifeature || ''}
                  onChange={(e) => handleChange('ifeature', e.target.value)}
                  placeholder="Enter Inventive Feature"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Specific Country */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>Specific Country</span>
                </label>
                <input
                  type="text"
                  value={safeFormData.scountry || ''}
                  onChange={(e) => handleChange('scountry', e.target.value)}
                  placeholder="Enter specific country"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Opinion Of Extractor */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FileText className="h-4 w-4 text-blue-600" />
                <span>Opinion Of Extractor</span>
              </label>
              <input
                type="text"
                value={safeFormData.oextractor || ''}
                onChange={(e) => handleChange('oextractor', e.target.value)}
                placeholder="Enter Opinion Of Extractor"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Invention Detail Attachment */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Invention Detail Attachment
                <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, XLS, XLSX - Max 20MB)</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={(e) => handleFileChange(e.target.files, setAttachmentFiles, 'idattachments')}
                  className="hidden"
                  id="pm-idattachments-upload"
                />
                <label
                  htmlFor="pm-idattachments-upload"
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
                          onClick={() => removeFile(index, setAttachmentFiles, 'idattachments')}
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
  );
};

export default PMExtractorDetailsV2;