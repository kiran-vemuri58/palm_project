'use client';

import React, { useState } from 'react';
import { FileText, Calendar, CheckCircle, Upload, X, AlertCircle, User } from 'lucide-react';

const PGOPatentProsecutionDetailsV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};
  const [opposerFiles, setOpposerFiles] = useState([]);
  const [responseFiles, setResponseFiles] = useState([]);
  const [reviewFiles, setReviewFiles] = useState([]);

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
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Patent Prosecution Details</h3>
            <p className="text-purple-100 text-sm mt-1">Patent prosecution and opposition details</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Patent Published? */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <CheckCircle className="h-4 w-4 text-purple-600" />
              <span>Patent Published?</span>
            </label>
            <select
              value={safeFormData.patentPublished || ''}
              onChange={(e) => handleChange('patentPublished', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Conditional Publication Number */}
          {safeFormData.patentPublished === 'yes' && (
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FileText className="h-4 w-4 text-purple-600" />
                <span>Publication Number</span>
              </label>
              <input
                type="text"
                value={safeFormData.publicationNumber || ''}
                onChange={(e) => handleChange('publicationNumber', e.target.value)}
                placeholder="Enter Publication Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          )}

          {/* Post Grant Opposed? */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <AlertCircle className="h-4 w-4 text-purple-600" />
              <span>Post Grant Opposed?</span>
            </label>
            <select
              value={safeFormData.apopposed || ''}
              onChange={(e) => handleChange('apopposed', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Conditional Opposition Fields */}
          {safeFormData.apopposed === 'yes' && (
            <div className="space-y-6">
              {/* First Row - Opposer Name, Citations Filed by Opposer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <User className="h-4 w-4 text-purple-600" />
                    <span>Opposer Name</span>
                  </label>
                  <input
                    type="text"
                    value={safeFormData.oname || ''}
                    onChange={(e) => handleChange('oname', e.target.value)}
                    placeholder="Enter Opposer Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span>Citations Filed by Opposer</span>
                  </label>
                  <input
                    type="text"
                    value={safeFormData.cfbopposer || ''}
                    onChange={(e) => handleChange('cfbopposer', e.target.value)}
                    placeholder="Enter Citations Filed by Opposer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Second Row - Opinion and Response */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span>Brief Opinion About Opposition Findings</span>
                  </label>
                  <textarea
                    value={safeFormData.boaof || ''}
                    onChange={(e) => handleChange('boaof', e.target.value)}
                    placeholder="Enter Opinion"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span>Response Filed for Opposition</span>
                  </label>
                  <textarea
                    value={safeFormData.rffo || ''}
                    onChange={(e) => handleChange('rffo', e.target.value)}
                    placeholder="Enter Response"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>
              </div>

              {/* Third Row - Prepared By, External Agency, Reviewed By */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <User className="h-4 w-4 text-purple-600" />
                    <span>Opposition Response Prepared By</span>
                  </label>
                  <input
                    type="text"
                    value={safeFormData.orpby || ''}
                    onChange={(e) => handleChange('orpby', e.target.value)}
                    placeholder="Enter Employee ID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span>External Agency (if prepared by them)</span>
                  </label>
                  <input
                    type="text"
                    value={safeFormData.eagency || ''}
                    onChange={(e) => handleChange('eagency', e.target.value)}
                    placeholder="Enter Agency Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <User className="h-4 w-4 text-purple-600" />
                    <span>Reviewed By</span>
                  </label>
                  <input
                    type="text"
                    value={safeFormData.revby || ''}
                    onChange={(e) => handleChange('revby', e.target.value)}
                    placeholder="Enter Employee ID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* File Upload Sections */}
              <div className="space-y-6">
                {/* Opposer Attachment */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Opposer Attachment
                    <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, JPG, PNG - Max 20MB)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e.target.files, setOpposerFiles, 'opposerAttachment')}
                      className="hidden"
                      id="opposer-upload"
                    />
                    <label
                      htmlFor="opposer-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">Click to upload files</span>
                    </label>
                    
                    {/* File List */}
                    {opposerFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {opposerFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                            <span className="text-sm text-gray-700 truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index, setOpposerFiles, 'opposerAttachment')}
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

                {/* Response Attachment */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Response Attachment
                    <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, JPG, PNG - Max 20MB)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e.target.files, setResponseFiles, 'responseAttachment')}
                      className="hidden"
                      id="response-upload"
                    />
                    <label
                      htmlFor="response-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">Click to upload files</span>
                    </label>
                    
                    {/* File List */}
                    {responseFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {responseFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                            <span className="text-sm text-gray-700 truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index, setResponseFiles, 'responseAttachment')}
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

                {/* Review Attachment */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Review Attachment (Versions of Response with Reviews)
                    <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, JPG, PNG - Max 20MB)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e.target.files, setReviewFiles, 'reviewAttachment')}
                      className="hidden"
                      id="review-upload"
                    />
                    <label
                      htmlFor="review-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">Click to upload files</span>
                    </label>
                    
                    {/* File List */}
                    {reviewFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {reviewFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                            <span className="text-sm text-gray-700 truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index, setReviewFiles, 'reviewAttachment')}
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

export default PGOPatentProsecutionDetailsV2;