'use client';

import React, { useState } from 'react';
import { FileText, Upload, X, User, Star, CheckCircle, Globe, MessageSquare } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PGOPatentabilityExtractorV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};
  const [rating, setRating] = useState(safeFormData.rating || 0);
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

  const removeFile = (index, currentFiles, setFiles, field) => {
    const newFiles = currentFiles.filter((_, i) => i !== index);
    setFiles(newFiles);
    handleChange(field, newFiles);
  };

  const handleRatingChange = (starValue) => {
    setRating(starValue);
    handleChange('rating', starValue);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Star className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Patentability Extractor</h3>
            <p className="text-purple-100 text-sm mt-1">Patent searcher details and analysis</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* First Row - Patent Searchers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <User className="h-4 w-4 text-purple-600" />
                <span>Name of Patent Searcher 1</span>
              </label>
              <input
                type="text"
                value={safeFormData.psone || ''}
                onChange={(e) => handleChange('psone', e.target.value)}
                placeholder="Enter the Name of Patent Searcher 1"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <User className="h-4 w-4 text-purple-600" />
                <span>Name of Patent Searcher 2</span>
              </label>
              <input
                type="text"
                value={safeFormData.pstwo || ''}
                onChange={(e) => handleChange('pstwo', e.target.value)}
                placeholder="Enter the Name of Patent Searcher 2"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Star Rating */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Star className="h-4 w-4 text-purple-600" />
                <span>Rating</span>
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer transition-colors ${
                      rating >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => handleRatingChange(star)}
                    fill={rating >= star ? "#facc15" : "none"}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">{rating}/5</span>
              </div>
            </div>
          </div>

          {/* Second Row - Invention Accordance */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <CheckCircle className="h-4 w-4 text-purple-600" />
              <span>Is Invention Accordance with Patent Laws?</span>
            </label>
            <select
              value={safeFormData.collaboration || ''}
              onChange={(e) => handleChange('collaboration', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Conditional Fields - Show only if "Yes" is selected */}
          {safeFormData.collaboration === 'yes' && (
            <div className="space-y-6">
              {/* Third Row - Novel and Inventive Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span>Novel Feature (Assumed)</span>
                  </label>
                  <input
                    type="text"
                    value={safeFormData.paNovelFeature || ''}
                    onChange={(e) => handleChange('paNovelFeature', e.target.value)}
                    placeholder="Enter Novel Feature"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span>Inventive Feature (Assumed)</span>
                  </label>
                  <input
                    type="text"
                    value={safeFormData.paInventiveFeature || ''}
                    onChange={(e) => handleChange('paInventiveFeature', e.target.value)}
                    placeholder="Enter Inventive Feature"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Fourth Row - Country and Opinion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Globe className="h-4 w-4 text-purple-600" />
                    <span>Specific Country</span>
                  </label>
                  <select
                    value={safeFormData.paSpecificCountry || ''}
                    onChange={(e) => handleChange('paSpecificCountry', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a country</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Japan">Japan</option>
                    <option value="India">India</option>
                    <option value="China">China</option>
                    <option value="Australia">Australia</option>
                    <option value="Brazil">Brazil</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <MessageSquare className="h-4 w-4 text-purple-600" />
                    <span>Opinion Of Extractor</span>
                  </label>
                  <textarea
                    value={safeFormData.paOpinionOfExtractor || ''}
                    onChange={(e) => handleChange('paOpinionOfExtractor', e.target.value)}
                    placeholder="Enter Opinion Of Extractor"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>
              </div>

              {/* Fifth Row - Invention Detail Attachment */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Invention Detail Attachment
                  <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, TXT - Max 10MB, Max 5 files)</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => handleFileChange(e.target.files, setAttachmentFiles, 'patentabilityAttachments')}
                    className="hidden"
                    id="patentability-attachments-upload"
                  />
                  <label
                    htmlFor="patentability-attachments-upload"
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
                              onClick={() => removeFile(index, attachmentFiles, setAttachmentFiles, 'patentabilityAttachments')}
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

export default PGOPatentabilityExtractorV2;
