'use client';

import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const ExtractorDetailsV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};
  const [attachmentFiles, setAttachmentFiles] = useState([]);

  // Update local file state when formData changes
  useEffect(() => {
    if (safeFormData.idattachments && Array.isArray(safeFormData.idattachments)) {
      setAttachmentFiles(safeFormData.idattachments);
    }
  }, [safeFormData.idattachments]);

  const handleChange = (field, value) => {
    if (page) {
      // Use page-based store integration
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, field, value);
    } else {
      // Fallback to direct updateFormData prop
      updateFormData(field, value);
    }
  };

  const handleFileChange = (fileList) => {
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

    setAttachmentFiles(files);
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, 'idattachments', files);
    } else {
      updateFormData('idattachments', files);
    }
  };

  const removeFile = (fileIndex) => {
    setAttachmentFiles(prev => {
      const newFiles = prev.filter((_, index) => index !== fileIndex);
      if (page) {
        const storeUpdateFormData = useV2Store.getState().updateFormData;
        storeUpdateFormData(page, 'idattachments', newFiles);
      } else {
        updateFormData('idattachments', newFiles);
      }
      return newFiles;
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
            <Upload className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Extractor Details</h3>
            <p className="text-sm text-gray-600">Patent extraction information and documents</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="space-y-6">
      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Is Invention Accordance with Patent Laws?
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

      {safeFormData.iawpl === 'yes' && (
        <>
          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Novel Feature (Assumed)
              </label>
              <input
                type="text"
                value={safeFormData.nfeature || ''}
                onChange={(e) => handleChange('nfeature', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
                placeholder="Enter Novel Feature"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Inventive Feature (Assumed)
              </label>
              <input
                type="text"
                value={safeFormData.ifeature || ''}
                onChange={(e) => handleChange('ifeature', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
                placeholder="Enter Inventive Feature"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Invention Detail Attachment
                <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, XLS, XLSX - Max 20MB)</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={(e) => handleFileChange(e.target.files)}
                  className="hidden"
                  id="idattachments-upload"
                />
                <label
                  htmlFor="idattachments-upload"
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
          
          {/* Fourth Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Specific Country
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
                Opinion Of Extractor
              </label>
              <input
                type="text"
                value={safeFormData.oextractor || ''}
                onChange={(e) => handleChange('oextractor', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
                placeholder="Enter Opinion Of Extractor"
              />
            </div>
          </div>
        </>
      )}
        </div>
      </div>
    </div>
  );
};

export default ExtractorDetailsV2;