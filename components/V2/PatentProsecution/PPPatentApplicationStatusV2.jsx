'use client';

import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PPPatentApplicationStatusV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};
  const [patentAttachments, setPatentAttachments] = useState([]);
  const [rejectionAttachments, setRejectionAttachments] = useState([]);

  useEffect(() => {
    if (safeFormData.ppas_attachment && Array.isArray(safeFormData.ppas_attachment)) {
      setPatentAttachments(safeFormData.ppas_attachment);
    }
  }, [safeFormData.ppas_attachment]);

  useEffect(() => {
    if (safeFormData.ppas_rejection_reason_attachment && Array.isArray(safeFormData.ppas_rejection_reason_attachment)) {
      setRejectionAttachments(safeFormData.ppas_rejection_reason_attachment);
    }
  }, [safeFormData.ppas_rejection_reason_attachment]);

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
      case 'patent':
        setPatentAttachments(files);
        handleChange('ppas_attachment', files);
        break;
      case 'rejection':
        setRejectionAttachments(files);
        handleChange('ppas_rejection_reason_attachment', files);
        break;
      default:
        break;
    }
  };

  const removeFile = (index, attachmentType) => {
    switch (attachmentType) {
      case 'patent':
        const newPatentFiles = patentAttachments.filter((_, i) => i !== index);
        setPatentAttachments(newPatentFiles);
        handleChange('ppas_attachment', newPatentFiles);
        break;
      case 'rejection':
        const newRejectionFiles = rejectionAttachments.filter((_, i) => i !== index);
        setRejectionAttachments(newRejectionFiles);
        handleChange('ppas_rejection_reason_attachment', newRejectionFiles);
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
            <h3 className="text-xl font-semibold text-white">Patent Application Status</h3>
            <p className="text-purple-100 text-sm mt-1">Current status and details of the patent application</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Patent Status */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Patent Status
            </label>
            <select
              value={safeFormData.ppas_status || ''}
              onChange={(e) => handleChange('ppas_status', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
            >
              <option value="">Select status</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Patent Number */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Patent Number
            </label>
            <input
              type="text"
              value={safeFormData.ppas_number || ''}
              onChange={(e) => handleChange('ppas_number', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
              placeholder="Enter patent number"
            />
          </div>

          {/* Patent Attachments */}
          <div className="space-y-2">
            <label htmlFor="pp-patent-attachments-upload" className="block text-sm font-semibold text-gray-700 mb-3">
              Patent Attachments
            </label>
            <div className="flex flex-col items-center justify-center w-full">
              <label
                htmlFor="pp-patent-attachments-upload"
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
                  id="pp-patent-attachments-upload"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(e) => handleFileChange(e.target.files, 'patent')}
                />
              </label>
            </div>
            {patentAttachments.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                  {patentAttachments.map((file, index) => (
                    <li key={index} className="flex items-center justify-between p-3">
                      <span className="text-sm text-gray-800">{file.name || file}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index, 'patent')}
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

          {/* Conditional Fields - Only show when Patent Status is "yes" */}
          {safeFormData.ppas_status === 'yes' && (
            <>
              {/* Patent Grant Date */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Patent Grant Date
                </label>
                <input
                  type="date"
                  value={safeFormData.ppas_grant_date || ''}
                  onChange={(e) => handleChange('ppas_grant_date', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                />
              </div>

              {/* Rejection Reason Attachments */}
              <div className="space-y-2">
                <label htmlFor="pp-rejection-attachments-upload" className="block text-sm font-semibold text-gray-700 mb-3">
                  Why Patent is Rejected - Attachments
                </label>
                <div className="flex flex-col items-center justify-center w-full">
                  <label
                    htmlFor="pp-rejection-attachments-upload"
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
                      id="pp-rejection-attachments-upload"
                      type="file"
                      className="hidden"
                      multiple
                      onChange={(e) => handleFileChange(e.target.files, 'rejection')}
                    />
                  </label>
                </div>
                {rejectionAttachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                    <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                      {rejectionAttachments.map((file, index) => (
                        <li key={index} className="flex items-center justify-between p-3">
                          <span className="text-sm text-gray-800">{file.name || file}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'rejection')}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PPPatentApplicationStatusV2;
