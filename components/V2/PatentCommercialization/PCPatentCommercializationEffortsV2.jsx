'use client';

import React, { useState, useEffect } from 'react';
import { FileText, DollarSign, Calendar, Hash, CheckCircle, Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PCPatentCommercializationEffortsV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};
  const [localData, setLocalData] = useState(safeFormData);

  // File upload states
  const [salesFiles, setSalesFiles] = useState([]);
  const [invoiceFiles, setInvoiceFiles] = useState([]);

  // Update local data when formData changes
  useEffect(() => {
    setLocalData(safeFormData);
  }, [safeFormData]);

  const handleChange = (field, value) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    
    if (updateFormData) {
      updateFormData(field, value);
    } else if (page) {
      useV2Store.getState().updateFormData(page, field, value);
    }
  };

  const handleFileChange = (fileList, setFileState, fieldName) => {
    const files = Array.from(fileList);
    
    // Validate file types
    const allowedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.xls', '.xlsx'];
    const invalidFiles = files.filter(file => {
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      return !allowedTypes.includes(extension);
    });

    if (invalidFiles.length > 0) {
      alert(`Invalid file types. Only PDF, DOC, DOCX, JPG, PNG, XLS, XLSX files are allowed.`);
      return;
    }

    // Validate file size (20MB max)
    const oversizedFiles = files.filter(file => file.size > 20 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`File size too large. Maximum 20MB per file.`);
      return;
    }

    setFileState(files);
    handleChange(fieldName, files);
  };

  const removeFile = (fileIndex, setFileState, fieldName) => {
    setFileState(prev => {
      const newFiles = prev.filter((_, index) => index !== fileIndex);
      handleChange(fieldName, newFiles);
      return newFiles;
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-yellow-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Patent Commercialization Efforts</h3>
            <p className="text-orange-100 text-sm mt-1">Sales, licensing, and commercialization details</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sales File Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Sales (In case of MVP/Real scale)
              <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, XLS, XLSX - Max 20MB)</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-orange-400 transition-colors">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={(e) => handleFileChange(e.target.files, setSalesFiles, 'pcPatentCommercializationEffortsSalesFile')}
                className="hidden"
                id="sales-upload"
              />
              <label
                htmlFor="sales-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-600">Click to upload files</span>
              </label>
              
              {/* File List */}
              {salesFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {salesFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                      <span className="text-sm text-gray-700 truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index, setSalesFiles, 'pcPatentCommercializationEffortsSalesFile')}
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

          {/* Periodic Sales */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <DollarSign className="h-4 w-4 text-orange-600" />
              <span>Periodic Sales of Product</span>
            </label>
            <input
              type="text"
              value={localData.pcPatentCommercializationEffortsPeriodicSales || ''}
              onChange={(e) => handleChange('pcPatentCommercializationEffortsPeriodicSales', e.target.value)}
              placeholder="Enter amount in numbers"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>

          {/* Invoice File Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Invoices, Sales Sheets, etc.
              <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, XLS, XLSX - Max 20MB)</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-orange-400 transition-colors">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={(e) => handleFileChange(e.target.files, setInvoiceFiles, 'pcPatentCommercializationEffortsInvoiceFile')}
                className="hidden"
                id="invoice-upload"
              />
              <label
                htmlFor="invoice-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-600">Click to upload files</span>
              </label>
              
              {/* File List */}
              {invoiceFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {invoiceFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                      <span className="text-sm text-gray-700 truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index, setInvoiceFiles, 'pcPatentCommercializationEffortsInvoiceFile')}
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

          {/* Date of Commercialization */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Calendar className="h-4 w-4 text-orange-600" />
              <span>Date of Commercialization</span>
            </label>
            <input
              type="date"
              value={localData.pcPatentCommercializationEffortsCommercializationDate || ''}
              onChange={(e) => handleChange('pcPatentCommercializationEffortsCommercializationDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>

          {/* Product ID */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Hash className="h-4 w-4 text-orange-600" />
              <span>Product ID (If generated)</span>
            </label>
            <input
              type="text"
              value={localData.pcPatentCommercializationEffortsProductId || ''}
              onChange={(e) => handleChange('pcPatentCommercializationEffortsProductId', e.target.value)}
              placeholder="Enter Product ID"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>

          {/* Whether Patent is Licensed */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <CheckCircle className="h-4 w-4 text-orange-600" />
              <span>Whether Patent is Licensed</span>
            </label>
            <select
              value={localData.pcPatentCommercializationEffortsIsLicensed || ''}
              onChange={(e) => handleChange('pcPatentCommercializationEffortsIsLicensed', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Whether Patent is Cross Licensed */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <CheckCircle className="h-4 w-4 text-orange-600" />
              <span>Whether Patent is Cross Licensed</span>
            </label>
            <select
              value={localData.pcPatentCommercializationEffortsIsCrossLicensed || ''}
              onChange={(e) => handleChange('pcPatentCommercializationEffortsIsCrossLicensed', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Whether Patent Filed for Compulsory License */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <CheckCircle className="h-4 w-4 text-orange-600" />
              <span>Whether Patent Filed for Compulsory License</span>
            </label>
            <select
              value={localData.pcPatentCommercializationEffortsIsCompulsoryLicenseFiled || ''}
              onChange={(e) => handleChange('pcPatentCommercializationEffortsIsCompulsoryLicenseFiled', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCPatentCommercializationEffortsV2;
