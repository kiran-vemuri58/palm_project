'use client';

import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PPExtractorDetailsV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};
  const [attachmentFiles, setAttachmentFiles] = useState([]);

  useEffect(() => {
    if (safeFormData.pped_attachments && Array.isArray(safeFormData.pped_attachments)) {
      setAttachmentFiles(safeFormData.pped_attachments);
    }
  }, [safeFormData.pped_attachments]);

  const handleChange = (field, value) => {
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, field, value);
    } else {
      updateFormData(field, value);
    }
  };

  const handleFileChange = (fileList) => {
    const files = Array.from(fileList);
    setAttachmentFiles(files);
    handleChange('pped_attachments', files);
  };

  const removeFile = (index) => {
    const newFiles = attachmentFiles.filter((_, i) => i !== index);
    setAttachmentFiles(newFiles);
    handleChange('pped_attachments', newFiles);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Upload className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Extractor Details</h3>
            <p className="text-purple-100 text-sm mt-1">Details about the invention extraction process</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Name of the Extractor 1
              </label>
              <input
                type="text"
                value={safeFormData.pped_one || ''}
                onChange={(e) => handleChange('pped_one', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                placeholder="Enter the name of Extractor 1"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Name of the Extractor 2
              </label>
              <input
                type="text"
                value={safeFormData.pped_two || ''}
                onChange={(e) => handleChange('pped_two', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                placeholder="Enter the name of Extractor 2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Invention Extraction Date
              </label>
              <input
                type="date"
                value={safeFormData.pped_extraction_date || ''}
                onChange={(e) => handleChange('pped_extraction_date', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Is Invention Available with Prior Literature?
              </label>
              <select
                value={safeFormData.pped_available_with_prior_literature || ''}
                onChange={(e) => handleChange('pped_available_with_prior_literature', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {safeFormData.pped_available_with_prior_literature === 'yes' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Novel Feature (Assumed)
                </label>
                <input
                  type="text"
                  value={safeFormData.pped_novel_feature || ''}
                  onChange={(e) => handleChange('pped_novel_feature', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                  placeholder="Enter Novel Feature"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Inventive Feature (Assumed)
                </label>
                <input
                  type="text"
                  value={safeFormData.pped_inventive_feature || ''}
                  onChange={(e) => handleChange('pped_inventive_feature', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                  placeholder="Enter Inventive Feature"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Specific Country
                </label>
                <input
                  type="text"
                  value={safeFormData.pped_specific_country || ''}
                  onChange={(e) => handleChange('pped_specific_country', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                  placeholder="Enter Specific Country"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Opinion of Extractor
                </label>
                <input
                  type="text"
                  value={safeFormData.pped_opinion || ''}
                  onChange={(e) => handleChange('pped_opinion', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                  placeholder="Enter Opinion of Extractor"
                />
              </div>
            </div>
            {/* File Upload Section */}
            <div className="space-y-2">
              <label htmlFor="pp-extractor-attachments-upload" className="block text-sm font-semibold text-gray-700 mb-3">
                Invention Detail Attachments
              </label>
              <div className="flex flex-col items-center justify-center w-full">
                <label
                  htmlFor="pp-extractor-attachments-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-500" />
                    <p className="mb-1 text-sm text-gray-600">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOCX, JPG, PNG (MAX. 5MB)</p>
                  </div>
                  <input
                    id="pp-extractor-attachments-upload"
                    type="file"
                    className="hidden"
                    multiple
                    onChange={(e) => handleFileChange(e.target.files)}
                  />
                </label>
              </div>
              {attachmentFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                  <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                    {attachmentFiles.map((file, index) => (
                      <li key={index} className="flex items-center justify-between p-3">
                        <span className="text-sm text-gray-800">{file.name || file}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-800 focus:outline-none"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PPExtractorDetailsV2;
