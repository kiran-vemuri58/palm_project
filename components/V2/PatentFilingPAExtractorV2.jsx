'use client';

import React, { useState, useEffect } from 'react';
import { Search, Star, Plus, Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PatentFilingPAExtractorV2 = ({ page }) => {
  // Get form data from store using page parameter
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const safeFormData = formData || {};
  const [rating, setRating] = useState(safeFormData.patentabilityRating || 0);
  const [attachmentFiles, setAttachmentFiles] = useState([]);

  // Update local state when formData changes
  useEffect(() => {
    if (safeFormData.patentabilityRating) {
      setRating(safeFormData.patentabilityRating);
    }
    if (safeFormData.attachment && Array.isArray(safeFormData.attachment)) {
      setAttachmentFiles(safeFormData.attachment);
    }
  }, [safeFormData.patentabilityRating, safeFormData.attachment]);

  const handleChange = (field, value) => {
    updateFormData(page, field, value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    updateFormData(page, 'patentabilityRating', newRating);
  };

  const handleFileChange = (fileList) => {
    const files = Array.from(fileList);
    
    // Validate file types
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const invalidFiles = files.filter(file => {
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      return !allowedTypes.includes(extension);
    });

    if (invalidFiles.length > 0) {
      alert(`Invalid file types. Only PDF, DOC, DOCX, TXT files are allowed.`);
      return;
    }

    // Validate file size (10MB max)
    const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`File size too large. Maximum 10MB per file.`);
      return;
    }

    // Validate max files (5)
    if (files.length > 5) {
      alert(`Maximum 5 files allowed.`);
      return;
    }

    setAttachmentFiles(files);
    updateFormData(page, 'attachment', files);
  };

  const removeFile = (fileIndex) => {
    setAttachmentFiles(prev => {
      const newFiles = prev.filter((_, index) => index !== fileIndex);
      updateFormData(page, 'attachment', newFiles);
      return newFiles;
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Patentability Extractor</h3>
            <p className="text-sm text-gray-600">Patent search and analysis assessment</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* First Row - Patent Searchers and Rating */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Name of Patent Searcher 1
              </label>
              <input
                type="text"
                value={safeFormData.psone || ''}
                onChange={(e) => handleChange('psone', e.target.value)}
                placeholder="Enter the Name of Patent Searcher 1"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Name of Patent Searcher 2
              </label>
              <input
                type="text"
                value={safeFormData.pstwo || ''}
                onChange={(e) => handleChange('pstwo', e.target.value)}
                placeholder="Enter the Name of Patent Searcher 2"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Patentability Rating
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
                <Plus
                  className="text-purple-500 cursor-pointer hover:text-purple-700 transition-colors"
                  onClick={() => alert("Add new searcher functionality")}
                />
              </div>
            </div>
          </div>

          {/* Second Row - Patent Laws Question */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Is Invention Accordance with Patent Laws?
              </label>
              <select
                value={safeFormData.collaboration || ''}
                onChange={(e) => handleChange('collaboration', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Conditional Fields - Show only if "Yes" is selected */}
          {safeFormData.collaboration === 'yes' && (
            <>
              {/* Third Row - Novel and Inventive Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Novel Feature (Assumed)
                  </label>
                  <input
                    type="text"
                    value={safeFormData.paNfeature || ''}
                    onChange={(e) => handleChange('paNfeature', e.target.value)}
                    placeholder="Enter Novel Feature"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Inventive Feature (Assumed)
                  </label>
                  <input
                    type="text"
                    value={safeFormData.paIfeature || ''}
                    onChange={(e) => handleChange('paIfeature', e.target.value)}
                    placeholder="Enter Inventive Feature"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>
              </div>

              {/* Fourth Row - Attachment */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Invention Detail Attachment
                  <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, TXT - Max 10MB, Max 5 files)</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => handleFileChange(e.target.files)}
                    className="hidden"
                    id="attachment-upload"
                  />
                  <label
                    htmlFor="attachment-upload"
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

              {/* Fifth Row - Country and Opinion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Specific Country
                  </label>
                  <select
                    value={safeFormData.paScountry || ''}
                    onChange={(e) => handleChange('paScountry', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
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

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Opinion Of Extractor
                  </label>
                  <input
                    type="text"
                    value={safeFormData.paOoextractor || ''}
                    onChange={(e) => handleChange('paOoextractor', e.target.value)}
                    placeholder="Enter Opinion Of Extractor"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
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

export default PatentFilingPAExtractorV2;
