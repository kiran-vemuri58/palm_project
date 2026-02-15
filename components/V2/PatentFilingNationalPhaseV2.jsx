'use client';

import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

/**
 * Page 5 (Patent Filing) only: Simplified National Phase section with 5 headers.
 * Shown when user selects "National phase" as Type of filing.
 * 1. Date of filing of National phase application
 * 2. Application number
 * 3. Uploaded files (file upload)
 * 4. CBR receipt number
 * 5. Filing agency
 */
const PatentFilingNationalPhaseV2 = ({ page }) => {
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const safeFormData = formData || {};
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const files = safeFormData.filedForms;
    if (Array.isArray(files) && files.length > 0) {
      setFileList(files);
    } else {
      setFileList([]);
    }
  }, [safeFormData.filedForms]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setFileList(files);
    updateFormData(page, 'filedForms', files);
  };

  const removeFile = (index) => {
    const newFiles = fileList.filter((_, i) => i !== index);
    setFileList(newFiles);
    updateFormData(page, 'filedForms', newFiles);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">National Phase Entry</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Date of filing of National phase application */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of filing of National phase application
          </label>
          <input
            type="date"
            value={safeFormData.npFilingDate || ''}
            onChange={(e) => updateFormData(page, 'npFilingDate', e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* 2. Application number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Application number
          </label>
          <input
            type="text"
            value={safeFormData.npApplicationNumber || ''}
            onChange={(e) => updateFormData(page, 'npApplicationNumber', e.target.value)}
            placeholder="Enter application number"
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* 3. Uploaded files : File upload provision */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Uploaded files
            <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, XLS, XLSX - Max 20MB)</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors">
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleFileChange}
              className="hidden"
              id="pf-nationalphase-upload"
            />
            <label htmlFor="pf-nationalphase-upload" className="cursor-pointer flex flex-col items-center space-y-2">
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-600">Click to upload files</span>
            </label>
            {fileList.length > 0 && (
              <div className="mt-4 space-y-2">
                {fileList.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                    <span className="text-sm text-gray-700 truncate">
                      {file.name || (typeof file === 'string' ? file : 'File')}
                    </span>
                    <button type="button" onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 4. CBR receipt number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CBR receipt number
          </label>
          <input
            type="text"
            value={safeFormData.npCbrReceiptNumber || ''}
            onChange={(e) => updateFormData(page, 'npCbrReceiptNumber', e.target.value)}
            placeholder="Enter CBR receipt number"
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* 5. Filing agency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filing agency
          </label>
          <input
            type="text"
            value={safeFormData.npAgencyRecognizer || ''}
            onChange={(e) => updateFormData(page, 'npAgencyRecognizer', e.target.value)}
            placeholder="Enter filing agency"
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default PatentFilingNationalPhaseV2;
