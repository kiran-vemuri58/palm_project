'use client';

import React, { useState, useEffect } from 'react';
import { Lightbulb, Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PatentFilingInnovationV2 = ({ page }) => {
  // Get form data from store using page parameter
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const safeFormData = formData || {};
  const [priorArtFiles, setPriorArtFiles] = useState([]);
  const [nplFiles, setNplFiles] = useState([]);

  // Update local file state when formData changes
  useEffect(() => {
    if (safeFormData.minuteOfMeeting && Array.isArray(safeFormData.minuteOfMeeting)) {
      setPriorArtFiles(safeFormData.minuteOfMeeting);
    }
    if (safeFormData.attachments && Array.isArray(safeFormData.attachments)) {
      setNplFiles(safeFormData.attachments);
    }
  }, [safeFormData.minuteOfMeeting, safeFormData.attachments]);

  const handleChange = (field, value) => {
    updateFormData(page, field, value);
  };

  const handleFileChange = (fileList, setFileState, fieldName) => {
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

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Innovation Analysis</h3>
            <p className="text-sm text-gray-600">Innovation assessment and document analysis</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* First Row - Is there more than an invention? */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Is there more than an invention?
              </label>
              <select
                value={safeFormData.trainRun || ''}
                onChange={(e) => handleChange('trainRun', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Show file uploads only if "Yes" is selected */}
          {safeFormData.trainRun === 'yes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prior Art Documents */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Prior Art Documents
                  <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, JPG, PNG, TXT - Max 20MB)</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-yellow-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  NPL Documents
                  <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, JPG, PNG, TXT - Max 20MB)</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-yellow-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                    onChange={(e) => handleFileChange(e.target.files, setNplFiles, 'attachments')}
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
                            onClick={() => removeFile(index, setNplFiles, 'attachments')}
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
    </div>
  );
};

export default PatentFilingInnovationV2;
