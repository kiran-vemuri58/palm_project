'use client';

import React from 'react';
import { Briefcase } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PCEffortsV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};

  const handleChange = (fieldName, value) => {
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, fieldName, value);
    } else {
      updateFormData(fieldName, value);
    }
  };

  const handleFileUpload = (fieldName, files) => {
    const fileArray = Array.from(files);
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, fieldName, fileArray);
    } else {
      updateFormData(fieldName, fileArray);
    }
  };

  const removeFile = (fieldName, indexToRemove) => {
    const currentFiles = safeFormData[fieldName] || [];
    const updatedFiles = currentFiles.filter((_, index) => index !== indexToRemove);
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, fieldName, updatedFiles);
    } else {
      updateFormData(fieldName, updatedFiles);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 rounded-lg p-2">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Patent Commercialization Efforts</h3>
            <p className="text-orange-100 text-sm">Sales tracking and commercialization management</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sales (In case of MVP/Real scale)
              </label>
              <div className="space-y-2">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                  onChange={(e) => handleFileUpload('salesFile', e.target.files)}
                  className="hidden"
                  id="salesFile"
                />
                <label
                  htmlFor="salesFile"
                  className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors"
                >
                  <span className="text-sm text-gray-600">Choose files...</span>
                </label>
                {safeFormData.salesFile && safeFormData.salesFile.length > 0 && (
                  <div className="space-y-1">
                    {safeFormData.salesFile.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile('salesFile', index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Periodic Sales of Product
              </label>
              <input
                type="text"
                placeholder="Enter amount in numbers"
                value={safeFormData.periodicSales || ''}
                onChange={(e) => handleChange('periodicSales', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Invoices, Sales Sheets, etc.
              </label>
              <div className="space-y-2">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                  onChange={(e) => handleFileUpload('invoiceFile', e.target.files)}
                  className="hidden"
                  id="invoiceFile"
                />
                <label
                  htmlFor="invoiceFile"
                  className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors"
                >
                  <span className="text-sm text-gray-600">Choose files...</span>
                </label>
                {safeFormData.invoiceFile && safeFormData.invoiceFile.length > 0 && (
                  <div className="space-y-1">
                    {safeFormData.invoiceFile.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile('invoiceFile', index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Date of Commercialization
              </label>
              <input
                type="date"
                value={safeFormData.commercializationDate || ''}
                onChange={(e) => handleChange('commercializationDate', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Product ID (If generated)
              </label>
              <input
                type="text"
                placeholder="Enter Product ID"
                value={safeFormData.productId || ''}
                onChange={(e) => handleChange('productId', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Whether Patent is Licensed
              </label>
              <select
                value={safeFormData.isLicensed || ''}
                onChange={(e) => handleChange('isLicensed', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Whether Patent is Cross Licensed
              </label>
              <select
                value={safeFormData.isCrossLicensed || ''}
                onChange={(e) => handleChange('isCrossLicensed', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Whether Patent Filed for Compulsory License
              </label>
              <select
                value={safeFormData.isCompulsoryLicenseFiled || ''}
                onChange={(e) => handleChange('isCompulsoryLicenseFiled', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCEffortsV2;