'use client';

import React, { useState, useEffect } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PPInnovationAnalysisV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};
  const [priorArtFiles, setPriorArtFiles] = useState([]);
  const [nplFiles, setNplFiles] = useState([]);

  useEffect(() => {
    if (safeFormData.ppi_prior_art_documents && Array.isArray(safeFormData.ppi_prior_art_documents)) {
      setPriorArtFiles(safeFormData.ppi_prior_art_documents);
    }
    if (safeFormData.ppi_npl_documents && Array.isArray(safeFormData.ppi_npl_documents)) {
      setNplFiles(safeFormData.ppi_npl_documents);
    }
  }, [safeFormData.ppi_prior_art_documents, safeFormData.ppi_npl_documents]);

  const handleChange = (field, value) => {
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, field, value);
    } else {
      updateFormData(field, value);
    }
  };

  const handleFileChange = (fileList, type) => {
    const files = Array.from(fileList);
    if (type === 'priorArt') {
      setPriorArtFiles(files);
      handleChange('ppi_prior_art_documents', files);
    } else if (type === 'npl') {
      setNplFiles(files);
      handleChange('ppi_npl_documents', files);
    }
  };

  const removeFile = (index, type) => {
    if (type === 'priorArt') {
      const newFiles = priorArtFiles.filter((_, i) => i !== index);
      setPriorArtFiles(newFiles);
      handleChange('ppi_prior_art_documents', newFiles);
    } else if (type === 'npl') {
      const newFiles = nplFiles.filter((_, i) => i !== index);
      setNplFiles(newFiles);
      handleChange('ppi_npl_documents', newFiles);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Innovation Analysis</h3>
            <p className="text-purple-100 text-sm mt-1">Analysis of invention scope and documentation</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Is there more than an invention?
            </label>
            <select
              value={safeFormData.ppi_more_than_invention || ''}
              onChange={(e) => handleChange('ppi_more_than_invention', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Show file uploads only if "Yes" is selected */}
          {safeFormData.ppi_more_than_invention === 'yes' && (
            <div className="space-y-6">
              {/* Prior Art Documents */}
              <div className="space-y-2">
                <label htmlFor="pp-prior-art-upload" className="block text-sm font-semibold text-gray-700 mb-3">
                  Prior Art Documents
                </label>
                <div className="flex flex-col items-center justify-center w-full">
                  <label
                    htmlFor="pp-prior-art-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-500" />
                      <p className="mb-1 text-sm text-gray-600">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOCX, JPG, PNG, TXT (MAX. 5MB)</p>
                    </div>
                    <input
                      id="pp-prior-art-upload"
                      type="file"
                      className="hidden"
                      multiple
                      onChange={(e) => handleFileChange(e.target.files, 'priorArt')}
                    />
                  </label>
                </div>
                {priorArtFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Prior Art Documents:</p>
                    <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                      {priorArtFiles.map((file, index) => (
                        <li key={index} className="flex items-center justify-between p-3">
                          <span className="text-sm text-gray-800">{file.name || file}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'priorArt')}
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

              {/* NPL Documents */}
              <div className="space-y-2">
                <label htmlFor="pp-npl-upload" className="block text-sm font-semibold text-gray-700 mb-3">
                  NPL Documents
                </label>
                <div className="flex flex-col items-center justify-center w-full">
                  <label
                    htmlFor="pp-npl-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-500" />
                      <p className="mb-1 text-sm text-gray-600">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOCX, JPG, PNG, TXT (MAX. 5MB)</p>
                    </div>
                    <input
                      id="pp-npl-upload"
                      type="file"
                      className="hidden"
                      multiple
                      onChange={(e) => handleFileChange(e.target.files, 'npl')}
                    />
                  </label>
                </div>
                {nplFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">NPL Documents:</p>
                    <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                      {nplFiles.map((file, index) => (
                        <li key={index} className="flex items-center justify-between p-3">
                          <span className="text-sm text-gray-800">{file.name || file}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'npl')}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PPInnovationAnalysisV2;
