'use client';

import React, { useState } from 'react';
import { Search, Star, Plus, Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PAExtractorV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};
  const [rating, setRating] = useState(safeFormData.rating || 0);

  const handleChange = (fieldName, value) => {
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, fieldName, value);
    } else {
      updateFormData(fieldName, value);
    }
  };

  const handleFileUpload = (files) => {
    const fileArray = Array.from(files);
    handleChange('attachment', fileArray);
  };

  const removeFile = (fileIndex) => {
    const currentFiles = safeFormData.attachment || [];
    const newFiles = currentFiles.filter((_, index) => index !== fileIndex);
    handleChange('attachment', newFiles);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 rounded-lg p-2">
            <Search className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Patentability Extractor</h3>
            <p className="text-purple-100 text-sm">Patentability analysis and scoring</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Name of Patent Searcher 1
              </label>
              <input
                type="text"
                placeholder="Enter the Name of Patent Searcher 1"
                value={safeFormData.psone || ''}
                onChange={(e) => handleChange('psone', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Name of Patent Searcher 2
              </label>
              <input
                type="text"
                placeholder="Enter the Name of Patent Searcher 2"
                value={safeFormData.pstwo || ''}
                onChange={(e) => handleChange('pstwo', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer transition-all duration-200 ${
                      rating >= star 
                        ? "text-yellow-500 hover:text-yellow-600 transform scale-110" 
                        : "text-gray-300 hover:text-gray-400"
                    }`}
                    onClick={() => {
                      setRating(star);
                      handleChange('rating', star);
                    }}
                    fill={rating >= star ? "#facc15" : "none"}
                  />
                ))}
                <Plus
                  className="text-purple-500 cursor-pointer hover:text-purple-700 transition-colors duration-200"
                  onClick={() => alert("You clicked the add icon!")}
                />
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                is Invention Accordance with Patent Laws?
              </label>
              <select
                value={safeFormData.collaboration || ''}
                onChange={(e) => handleChange('collaboration', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Conditional Fields - Only show if collaboration = 'yes' */}
          {safeFormData.collaboration === 'yes' && (
            <>
              {/* Third Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Novel Feature(Assumed)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Novel Feature"
                    value={safeFormData.nfeature || ''}
                    onChange={(e) => handleChange('nfeature', e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Inventive Feature (Assumed)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Inventive Feature"
                    value={safeFormData.ifeature || ''}
                    onChange={(e) => handleChange('ifeature', e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Invention Detail Attachment
                    <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, TXT - Max 10MB)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => handleFileUpload(e.target.files)}
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
                    {safeFormData.attachment && safeFormData.attachment.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {safeFormData.attachment.map((file, fileIndex) => (
                          <div key={fileIndex} className="flex items-center justify-between bg-white p-2 rounded border">
                            <span className="text-sm text-gray-700 truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(fileIndex)}
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
                  <select
                    value={safeFormData.scountry || ''}
                    onChange={(e) => handleChange('scountry', e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
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
                    placeholder="Enter Opinion Of Extractor"
                    value={safeFormData.ooextractor || ''}
                    onChange={(e) => handleChange('ooextractor', e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
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

export default PAExtractorV2;