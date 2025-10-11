'use client';

import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const ProvisionalApplicationV2 = ({ page }) => {
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const safeFormData = formData || {};
  const [attachmentFiles, setAttachmentFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(page, name, value);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Provisional Application</h2>

      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name of Drafter
          </label>
          <input
            type="text"
            name="nodrafter"
            placeholder="Enter Name of Drafter"
            value={safeFormData.nodrafter || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name Of Reviewer
          </label>
          <input
            type="text"
            name="noreviewer"
            placeholder="Enter Reviewer Name"
            value={safeFormData.noreviewer || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Attachment For All Versions
            <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, XLS, XLSX - Max 20MB)</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors">
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setAttachmentFiles(files);
                updateFormData(page, 'attachments', files);
              }}
              className="hidden"
              id="provisional-attachments-upload"
            />
            <label
              htmlFor="provisional-attachments-upload"
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
                      onClick={() => {
                        const newFiles = attachmentFiles.filter((_, i) => i !== index);
                        setAttachmentFiles(newFiles);
                        updateFormData(page, 'attachments', newFiles);
                      }}
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

      {/* Row 2 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Broadest Novel Element Described
          </label>
          <input
            type="text"
            name="bned"
            placeholder="Broadest Novel Element Described"
            value={safeFormData.bned || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Inventive Feature Described
          </label>
          <input
            type="text"
            name="ifdescribed"
            placeholder="Inventive Feature Described"
            value={safeFormData.ifdescribed || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title of invention
          </label>
          <input
            type="text"
            name="toinvention"
            placeholder="Enter Title of invention"
            value={safeFormData.toinvention || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Efforts spent for drafting
          </label>
          <input
            type="number"
            name="esfd"
            placeholder="Enter Efforts spent for drafting"
            value={safeFormData.esfd || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patent Drafter (Employee ID)
          </label>
          <input
            type="text"
            name="pdrafter"
            placeholder="Enter Patent Drafter"
            value={safeFormData.pdrafter || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of hours spent
          </label>
          <input
            type="number"
            name="nohspent"
            placeholder="Enter Number of hours spent"
            value={safeFormData.nohspent || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            External Agency for drafting
          </label>
          <input
            type="text"
            name="eafd"
            placeholder="External Agency for drafting"
            value={safeFormData.eafd || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cost spent on Agency
          </label>
          <input
            type="number"
            name="csoagency"
            placeholder="Enter Agency cost"
            value={safeFormData.csoagency || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Efforts in Hours for review
          </label>
          <input
            type="number"
            name="eihfr"
            placeholder="Enter Efforts in Hours for review"
            value={safeFormData.eihfr || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Row 5 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Manager Responsible (Employee ID)
          </label>
          <input
            type="text"
            name="mres"
            placeholder="Enter Manager Responsible (Employee ID)"
            value={safeFormData.mres || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ProvisionalApplicationV2;

