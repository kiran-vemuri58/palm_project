'use client';

import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PPPatentProsecutionDetailsV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};
  const [opposerAttachments, setOpposerAttachments] = useState([]);
  const [responseAttachments, setResponseAttachments] = useState([]);
  const [reviewAttachments, setReviewAttachments] = useState([]);

  useEffect(() => {
    if (safeFormData.pppd_attachments && Array.isArray(safeFormData.pppd_attachments)) {
      setOpposerAttachments(safeFormData.pppd_attachments);
    }
  }, [safeFormData.pppd_attachments]);

  const handleChange = (field, value) => {
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, field, value);
    } else {
      updateFormData(field, value);
    }
  };

  const handleFileChange = (fileList, attachmentType) => {
    const files = Array.from(fileList);
    switch (attachmentType) {
      case 'opposer':
        setOpposerAttachments(files);
        handleChange('pppd_attachments', files);
        break;
      case 'response':
        setResponseAttachments(files);
        handleChange('pppd_response_attachments', files);
        break;
      case 'review':
        setReviewAttachments(files);
        handleChange('pppd_review_attachments', files);
        break;
      default:
        break;
    }
  };

  const removeFile = (index, attachmentType) => {
    switch (attachmentType) {
      case 'opposer':
        const newOpposerFiles = opposerAttachments.filter((_, i) => i !== index);
        setOpposerAttachments(newOpposerFiles);
        handleChange('pppd_attachments', newOpposerFiles);
        break;
      case 'response':
        const newResponseFiles = responseAttachments.filter((_, i) => i !== index);
        setResponseAttachments(newResponseFiles);
        handleChange('pppd_response_attachments', newResponseFiles);
        break;
      case 'review':
        const newReviewFiles = reviewAttachments.filter((_, i) => i !== index);
        setReviewAttachments(newReviewFiles);
        handleChange('pppd_review_attachments', newReviewFiles);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Upload className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Patent Prosecution Details</h3>
            <p className="text-purple-100 text-sm mt-1">Details about patent prosecution and opposition</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Patent Published? */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Patent Published?
            </label>
            <select
              value={safeFormData.pppd_published || ''}
              onChange={(e) => handleChange('pppd_published', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Conditional Publication Number */}
          {safeFormData.pppd_published === 'yes' && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Publication Number
              </label>
              <input
                type="text"
                value={safeFormData.pppd_publication_number || ''}
                onChange={(e) => handleChange('pppd_publication_number', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                placeholder="Enter Publication Number"
              />
            </div>
          )}

          {/* Post Grant Opposed? */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Post Grant Opposed?
            </label>
            <select
              value={safeFormData.pppd_any_person_opposed || ''}
              onChange={(e) => handleChange('pppd_any_person_opposed', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Conditional Opposition Fields */}
          {safeFormData.pppd_any_person_opposed === 'yes' && (
            <>
              {/* Opposer Name, Citations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Opposer Name
                  </label>
                  <input
                    type="text"
                    value={safeFormData.pppd_opponent_name || ''}
                    onChange={(e) => handleChange('pppd_opponent_name', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                    placeholder="Enter Opposer Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Citations Filed by Opposer
                  </label>
                  <input
                    type="text"
                    value={safeFormData.pppd_case_filed_by_opposer || ''}
                    onChange={(e) => handleChange('pppd_case_filed_by_opposer', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                    placeholder="Enter Citations Filed by Opposer"
                  />
                </div>
              </div>

              {/* Opinion, Response */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Brief Opinion About Opposition Findings
                  </label>
                  <input
                    type="text"
                    value={safeFormData.pppd_basis_of_action_of_filing || ''}
                    onChange={(e) => handleChange('pppd_basis_of_action_of_filing', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                    placeholder="Enter Opinion"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Response Filed for Opposition
                  </label>
                  <input
                    type="text"
                    value={safeFormData.pppd_reason_for_filing_opposition || ''}
                    onChange={(e) => handleChange('pppd_reason_for_filing_opposition', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                    placeholder="Enter Response"
                  />
                </div>
              </div>

              {/* Prepared By, External Agency, Reviewed By */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Opposition Response Prepared By
                  </label>
                  <input
                    type="text"
                    value={safeFormData.pppd_opinion_rendered_by_you || ''}
                    onChange={(e) => handleChange('pppd_opinion_rendered_by_you', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                    placeholder="Enter Employee ID"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    External Agency (if prepared by them)
                  </label>
                  <input
                    type="text"
                    value={safeFormData.pppd_external_agency || ''}
                    onChange={(e) => handleChange('pppd_external_agency', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                    placeholder="Enter Agency Number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Reviewed By
                  </label>
                  <input
                    type="text"
                    value={safeFormData.pppd_reviewed_by || ''}
                    onChange={(e) => handleChange('pppd_reviewed_by', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                    placeholder="Enter Employee ID"
                  />
                </div>
              </div>

              {/* File Upload Sections */}
              <div className="space-y-6">
                {/* Opposer Attachments */}
                <div className="space-y-2">
                  <label htmlFor="pp-opposer-attachments-upload" className="block text-sm font-semibold text-gray-700 mb-3">
                    Opposer Attachments
                  </label>
                  <div className="flex flex-col items-center justify-center w-full">
                    <label
                      htmlFor="pp-opposer-attachments-upload"
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
                        id="pp-opposer-attachments-upload"
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => handleFileChange(e.target.files, 'opposer')}
                      />
                    </label>
                  </div>
                  {opposerAttachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                      <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                        {opposerAttachments.map((file, index) => (
                          <li key={index} className="flex items-center justify-between p-3">
                            <span className="text-sm text-gray-800">{file.name || file}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index, 'opposer')}
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

                {/* Response Attachments */}
                <div className="space-y-2">
                  <label htmlFor="pp-response-attachments-upload" className="block text-sm font-semibold text-gray-700 mb-3">
                    Response Attachments
                  </label>
                  <div className="flex flex-col items-center justify-center w-full">
                    <label
                      htmlFor="pp-response-attachments-upload"
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
                        id="pp-response-attachments-upload"
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => handleFileChange(e.target.files, 'response')}
                      />
                    </label>
                  </div>
                  {responseAttachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                      <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                        {responseAttachments.map((file, index) => (
                          <li key={index} className="flex items-center justify-between p-3">
                            <span className="text-sm text-gray-800">{file.name || file}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index, 'response')}
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

                {/* Review Attachments */}
                <div className="space-y-2">
                  <label htmlFor="pp-review-attachments-upload" className="block text-sm font-semibold text-gray-700 mb-3">
                    Review Attachments (Versions of Response with Reviews)
                  </label>
                  <div className="flex flex-col items-center justify-center w-full">
                    <label
                      htmlFor="pp-review-attachments-upload"
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
                        id="pp-review-attachments-upload"
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => handleFileChange(e.target.files, 'review')}
                      />
                    </label>
                  </div>
                  {reviewAttachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                      <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                        {reviewAttachments.map((file, index) => (
                          <li key={index} className="flex items-center justify-between p-3">
                            <span className="text-sm text-gray-800">{file.name || file}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index, 'review')}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PPPatentProsecutionDetailsV2;
