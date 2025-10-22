'use client';

import React, { useState, useEffect } from 'react';
import { Upload, X, Star, Plus, Search } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PPPatentabilityExtractorV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    if (safeFormData.pppe_attachment && Array.isArray(safeFormData.pppe_attachment)) {
      setAttachments(safeFormData.pppe_attachment);
    }
  }, [safeFormData.pppe_attachment]);

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
    setAttachments(files);
    handleChange('pppe_attachment', files);
  };

  const removeFile = (index) => {
    const newFiles = attachments.filter((_, i) => i !== index);
    setAttachments(newFiles);
    handleChange('pppe_attachment', newFiles);
  };

  const handleRatingChange = (rating) => {
    handleChange('pppe_rating', rating);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Search className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Patentability Extractor</h3>
            <p className="text-purple-100 text-sm mt-1">Patent search analysis and rating</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* First Row - Searchers and Rating */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Name of Patent Searcher 1
              </label>
              <input
                type="text"
                value={safeFormData.pppe_searcher1 || ''}
                onChange={(e) => handleChange('pppe_searcher1', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                placeholder="Enter the Name of Patent Searcher 1"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Name of Patent Searcher 2
              </label>
              <input
                type="text"
                value={safeFormData.pppe_searcher2 || ''}
                onChange={(e) => handleChange('pppe_searcher2', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                placeholder="Enter the Name of Patent Searcher 2"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Patentability Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer transition-colors duration-200 ${
                      (safeFormData.pppe_rating || 0) >= star 
                        ? "text-yellow-500" 
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                    onClick={() => handleRatingChange(star)}
                    fill={(safeFormData.pppe_rating || 0) >= star ? "#facc15" : "none"}
                  />
                ))}
                <Plus className="text-purple-500 cursor-pointer hover:text-purple-700 transition-colors duration-200" />
              </div>
            </div>
          </div>

          {/* Second Row - Invention Accordance */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Is Invention Accordance with Patent Laws?
            </label>
            <select
              value={safeFormData.pppe_invention_accordance || ''}
              onChange={(e) => handleChange('pppe_invention_accordance', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Show additional fields only if "Yes" is selected */}
          {safeFormData.pppe_invention_accordance === 'yes' && (
            <div className="space-y-6">
              {/* Third Row - Novel and Inventive Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Novel Feature (Assumed)
                  </label>
                  <input
                    type="text"
                    value={safeFormData.pppe_novel_feature || ''}
                    onChange={(e) => handleChange('pppe_novel_feature', e.target.value)}
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
                    value={safeFormData.pppe_inventive_feature || ''}
                    onChange={(e) => handleChange('pppe_inventive_feature', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                    placeholder="Enter Inventive Feature"
                  />
                </div>
              </div>

              {/* File Upload Section */}
              <div className="space-y-2">
                <label htmlFor="pp-patentability-attachment-upload" className="block text-sm font-semibold text-gray-700 mb-3">
                  Invention Detail Attachment
                </label>
                <div className="flex flex-col items-center justify-center w-full">
                  <label
                    htmlFor="pp-patentability-attachment-upload"
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
                      id="pp-patentability-attachment-upload"
                      type="file"
                      className="hidden"
                      multiple
                      onChange={(e) => handleFileChange(e.target.files)}
                    />
                  </label>
                </div>
                {attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                    <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                      {attachments.map((file, index) => (
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

              {/* Fourth Row - Country and Opinion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Specific Country
                  </label>
                  <select
                    value={safeFormData.pppe_specific_country || ''}
                    onChange={(e) => handleChange('pppe_specific_country', e.target.value)}
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
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Opinion Of Extractor
                  </label>
                  <input
                    type="text"
                    value={safeFormData.pppe_opinion_of_extractor || ''}
                    onChange={(e) => handleChange('pppe_opinion_of_extractor', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                    placeholder="Enter Opinion Of Extractor"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PPPatentabilityExtractorV2;
