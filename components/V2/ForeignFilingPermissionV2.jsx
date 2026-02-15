'use client';

import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const ForeignFilingPermissionV2 = ({ page }) => {
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const safeFormData = formData || {};
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const files = safeFormData.foreignFilingPermissionFile;
    if (Array.isArray(files) && files.length > 0) {
      setFileList(files);
    } else {
      setFileList([]);
    }
  }, [safeFormData.foreignFilingPermissionFile]);

  const displayFileName = fileList.length > 0 ? (fileList[0].name || (typeof fileList[0] === 'string' ? fileList[0] : 'File')) : null;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    const singleFile = files.slice(0, 1);
    setFileList(singleFile);
    updateFormData(page, 'foreignFilingPermissionFile', singleFile);
  };

  const removeFile = () => {
    setFileList([]);
    updateFormData(page, 'foreignFilingPermissionFile', []);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Application for permission for foreign filing
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of application for permission for foreign filing
          </label>
          <input
            type="date"
            value={safeFormData.foreignFilingPermissionDate || ''}
            onChange={(e) => updateFormData(page, 'foreignFilingPermissionDate', e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            File upload
            <span className="text-xs text-gray-500 ml-2">(Single file - PDF, DOC, DOCX, XLS, XLSX - Max 20MB)</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleFileChange}
              className="hidden"
              id="foreign-filing-permission-upload"
            />
            <label
              htmlFor="foreign-filing-permission-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-600">Click to upload file</span>
            </label>
            {fileList.length > 0 && (
              <div className="mt-4 flex items-center justify-between bg-white p-2 rounded border">
                <span className="text-sm text-gray-700 truncate">{displayFileName}</span>
                <button type="button" onClick={removeFile} className="text-red-500 hover:text-red-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          External agency drafter
        </label>
        <input
          type="text"
          value={safeFormData.externalAgencyDrafter || ''}
          onChange={(e) => updateFormData(page, 'externalAgencyDrafter', e.target.value)}
          placeholder="Enter external agency drafter"
          className="w-full max-w-md px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default ForeignFilingPermissionV2;
