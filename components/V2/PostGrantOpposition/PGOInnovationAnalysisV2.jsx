'use client';

import React, { useState } from 'react';
import { FileText, Upload, X, Lightbulb, File } from 'lucide-react';

const PGOInnovationAnalysisV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};
  const [priorArtFiles, setPriorArtFiles] = useState([]);
  const [nplFiles, setNplFiles] = useState([]);

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
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Innovation Analysis</h3>
            <p className="text-purple-100 text-sm mt-1">Analysis of invention and prior art</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Is there more than an invention? */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Lightbulb className="h-4 w-4 text-purple-600" />
              <span>Is there more than an invention?</span>
            </label>
            <select
              value={safeFormData.trainRun || ''}
              onChange={(e) => handleChange('trainRun', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Conditional Fields - Show only if "Yes" is selected */}
          {safeFormData.trainRun === 'yes' && (
            <div className="space-y-6">
              {/* File Upload Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prior Art Documents */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Prior Art Documents
                    <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, JPG, PNG - Max 20MB)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e.target.files, setPriorArtFiles, 'minuteOfMeeting')}
                      className="hidden"
                      id="prior-art-upload"
                    />
                    <label
                      htmlFor="prior-art-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">Click to upload files</span>
                    </label>
                    
                    {/* File List */}
                    {priorArtFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {priorArtFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                            <span className="text-sm text-gray-700 truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index, setPriorArtFiles, 'minuteOfMeeting')}
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

                {/* NPL Documents */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    NPL Documents
                    <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, JPG, PNG - Max 20MB)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e.target.files, setNplFiles, 'innovationAttachments')}
                      className="hidden"
                      id="npl-upload"
                    />
                    <label
                      htmlFor="npl-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">Click to upload files</span>
                    </label>
                    
                    {/* File List */}
                    {nplFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {nplFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                            <span className="text-sm text-gray-700 truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index, setNplFiles, 'innovationAttachments')}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default PGOInnovationAnalysisV2;
