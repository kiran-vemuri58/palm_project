'use client';

import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const IE2ExtractorDetailsV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};
  const [attachmentFiles, setAttachmentFiles] = useState([]);

  // Update local file state when formData changes
  useEffect(() => {
    if (safeFormData.idattachments && Array.isArray(safeFormData.idattachments)) {
      setAttachmentFiles(safeFormData.idattachments);
    }
  }, [safeFormData.idattachments]);

  const handleChange = (field, value) => {
    // Always use the updateFormData prop passed from the parent
    updateFormData(field, value);
  };

  const handleFileChange = (fileList) => {
    const files = Array.from(fileList);
    setAttachmentFiles(files);
    handleChange('idattachments', files);
  };

  const removeFile = (index) => {
    const newFiles = attachmentFiles.filter((_, i) => i !== index);
    setAttachmentFiles(newFiles);
    handleChange('idattachments', newFiles);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Upload className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Extractor Details</h3>
            <p className="text-blue-100 text-sm mt-1">Invention extraction and analysis details</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* First Row - Extractors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Name of the Extractor 1
              </label>
              <input
                type="text"
                value={safeFormData.extractorOne || ''}
                onChange={(e) => handleChange('extractorOne', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
                placeholder="Enter the name of Extractor 1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Name of the Extractor 2
              </label>
              <input
                type="text"
                value={safeFormData.extractortwo || ''}
                onChange={(e) => handleChange('extractortwo', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
                placeholder="Enter the name of Extractor 2"
              />
            </div>
          </div>

          {/* Second Row - Date and Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Invention Extraction Date
              </label>
              <input
                type="date"
                value={safeFormData.iEDate || ''}
                onChange={(e) => handleChange('iEDate', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Invention Analysis with Patent Laws
              </label>
              <select
                value={safeFormData.iawpl || ''}
                onChange={(e) => handleChange('iawpl', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Conditional Fields - Show only if "Yes" is selected */}
          {safeFormData.iawpl === 'yes' && (
            <div className="space-y-6">
              {/* Novel and Inventive Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Novel feature assumed
                  </label>
                  <input
                    type="text"
                    value={safeFormData.nfeature || ''}
                    onChange={(e) => handleChange('nfeature', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="Enter novel feature"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Inventive feature assumed
                  </label>
                  <input
                    type="text"
                    value={safeFormData.ifeature || ''}
                    onChange={(e) => handleChange('ifeature', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="Enter inventive feature"
                  />
                </div>
              </div>

              {/* Country and Opinion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Countries consider for analysis
                  </label>
                  <input
                    type="text"
                    value={safeFormData.scountry || ''}
                    onChange={(e) => handleChange('scountry', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="Enter specific country"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Opinion of Extractor
                  </label>
                  <input
                    type="text"
                    value={safeFormData.oextractor || ''}
                    onChange={(e) => handleChange('oextractor', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="Enter opinion of extractor"
                  />
                </div>
              </div>
            </div>
          )}

          {/* File Upload Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Invention Details Attachment
              <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, JPG, PNG - Max 20MB)</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e.target.files)}
                className="hidden"
                id="ie2-extractor-attachments-upload"
              />
              <label
                htmlFor="ie2-extractor-attachments-upload"
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
  );
};

export default IE2ExtractorDetailsV2;
