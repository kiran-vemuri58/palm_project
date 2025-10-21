'use client';

import React from 'react';
import useV2Store from '@/store/v2Store';
import { FileCheck, Calendar, AlertCircle } from 'lucide-react';

const PatentApplicationStatusV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (page) {
      // Use page-based store integration
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, name, value);
    } else {
      // Fallback to direct updateFormData prop
      updateFormData(name, value);
    }
  };

  const handleSelectChange = (fieldName, value) => {
    if (page) {
      // Use page-based store integration
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, fieldName, value);
    } else {
      // Fallback to direct updateFormData prop
      updateFormData(fieldName, value);
    }
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    const fileArray = Array.from(files);
    if (page) {
      // Use page-based store integration
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, name, fileArray);
    } else {
      // Fallback to direct updateFormData prop
      updateFormData(name, fileArray);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <FileCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Patent Application Status</h3>
            <p className="text-blue-100 text-sm">Current status and grant information</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Patent Status Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Patent Status
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Patent Status
              </label>
              <select
                name="ppas_status"
                value={safeFormData?.ppas_status || 'yes'}
                onChange={(e) => handleSelectChange('ppas_status', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Patent Number
              </label>
              <input
                name="ppas_number"
                type="text"
                placeholder="Enter patent number"
                value={safeFormData?.ppas_number || ''}
                onChange={(e) => handleChange('ppas_number', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Patent Attachment
              </label>
              <input
                name="patentAttachment"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Conditional Grant Information */}
        {safeFormData?.patentStatus === 'yes' && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Grant Information
            </h4>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Patent Grant Date
                  </label>
                  <input
                    name="patentGrantDate"
                    type="date"
                    value={safeFormData?.ppas_grant_date || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Rejection Reason Attachment
                  </label>
                  <input
                    name="rejectionReasonAttachment"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatentApplicationStatusV2;