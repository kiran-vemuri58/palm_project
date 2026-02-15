'use client';

import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const NationalPhaseV2 = ({ page, isPage4 = false }) => {
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const safeFormData = formData || {};
  const [foreignFilingFileList, setForeignFilingFileList] = useState([]);

  useEffect(() => {
    const files = safeFormData.foreignFilingPermissionFile;
    if (Array.isArray(files) && files.length > 0) {
      setForeignFilingFileList(files);
    } else {
      setForeignFilingFileList([]);
    }
  }, [safeFormData.foreignFilingPermissionFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(page, name, value);
  };

  const handleSelectChange = (name, value) => {
    updateFormData(page, name, value);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">National Phase Entry</h2>

      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of PCT Application
          </label>
          <input
            type="date"
            name="npPCTDate"
            value={safeFormData.npPCTDate || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Application Number
          </label>
          <input
            type="text"
            name="npApplicationNumber"
            placeholder="Enter Application Number"
            value={safeFormData.npApplicationNumber || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PCT Publication Number
          </label>
          <input
            type="text"
            name="npPCTPublication"
            placeholder="Enter Publication Number"
            value={safeFormData.npPCTPublication || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of PCT or Provisional Application Number
          </label>
          <input
            type="date"
            name="npPCTOrProvisionalDate"
            value={safeFormData.npPCTOrProvisionalDate || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Application Country
          </label>
          <input
            type="text"
            name="npApplicationCountry"
            placeholder="Enter Country"
            value={safeFormData.npApplicationCountry || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name Of Drafter
          </label>
          <input
            type="text"
            name="npDrafterName"
            placeholder="Name Of Drafter"
            value={safeFormData.npDrafterName || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Forms Prepared
          </label>
          <select
            value={safeFormData.npFormsPrepared || 'No'}
            onChange={(e) => handleSelectChange('npFormsPrepared', e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Review By
          </label>
          <input
            type="text"
            name="npReviewBy"
            placeholder="Review By"
            value={safeFormData.npReviewBy || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Which Cited in Patent Document
          </label>
          <input
            type="text"
            name="npCitedPatent"
            placeholder="Which Cited in Patent Document"
            value={safeFormData.npCitedPatent || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Independent Claim
          </label>
          <input
            type="text"
            name="npIndependentClaim"
            placeholder="Independent Claim"
            value={safeFormData.npIndependentClaim || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dependent Claim
          </label>
          <input
            type="text"
            name="npDependentClaim"
            placeholder="Dependent Claim"
            value={safeFormData.npDependentClaim || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Broadened claimed invention feature
          </label>
          <input
            type="text"
            name="npBroadenedFeature"
            placeholder="Broadened claimed invention feature"
            value={safeFormData.npBroadenedFeature || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Row 5 - Page 4: hide Is it a Profitable Patent? */}
      <div className={`grid grid-cols-3 gap-4 mb-4 ${isPage4 ? 'grid-cols-2' : ''}`}>
        {!isPage4 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Is it a Profitable Patent?
            </label>
            <select
              value={safeFormData.npIsProfit || 'No'}
              onChange={(e) => handleSelectChange('npIsProfit', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Is it a Defensive Patent?
          </label>
          <select
            value={safeFormData.npIsDefensive || 'No'}
            onChange={(e) => handleSelectChange('npIsDefensive', e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Efforts spent for drafting
          </label>
          <input
            type="number"
            name="npDraftingEffort"
            placeholder="Enter efforts spent"
            value={safeFormData.npDraftingEffort || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Row 6 - Page 4: hide Number of hours spent */}
      <div className={`grid grid-cols-3 gap-4 mb-4 ${isPage4 ? 'grid-cols-2' : ''}`}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patent Drafter (Employee ID)
          </label>
          <input
            type="text"
            name="npDrafterEmpId"
            placeholder="Enter Patent Drafter"
            value={safeFormData.npDrafterEmpId || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        {!isPage4 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of hours spent
            </label>
            <input
              type="number"
              name="npHoursSpent"
              placeholder="Enter hours spent"
              value={safeFormData.npHoursSpent || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            External Agency Recognizer
          </label>
          <input
            type="text"
            name="npAgencyRecognizer"
            placeholder="Enter external agency recognizer"
            value={safeFormData.npAgencyRecognizer || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Row 7 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cost spent on Agency
          </label>
          <input
            type="number"
            name="npAgencyCost"
            placeholder="Enter agency cost"
            value={safeFormData.npAgencyCost || ''}
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
            name="npReviewEffort"
            placeholder="Efforts in Hours for review"
            value={safeFormData.npReviewEffort || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Manager Responsible (Employee ID)
          </label>
          <input
            type="text"
            name="npManagerEmpId"
            placeholder="Enter manager responsible"
            value={safeFormData.npManagerEmpId || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Page 4 only: Foreign filing permission fields - inside National Phase */}
      {isPage4 && (
        <div className="mt-8">
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
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    const single = files.slice(0, 1);
                    setForeignFilingFileList(single);
                    updateFormData(page, 'foreignFilingPermissionFile', single);
                  }}
                  className="hidden"
                  id="np-foreign-filing-upload"
                />
                <label htmlFor="np-foreign-filing-upload" className="cursor-pointer flex flex-col items-center space-y-2">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Click to upload file</span>
                </label>
                {foreignFilingFileList.length > 0 && (
                  <div className="mt-4 flex items-center justify-between bg-white p-2 rounded border">
                    <span className="text-sm text-gray-700 truncate">
                      {foreignFilingFileList[0].name || (typeof foreignFilingFileList[0] === 'string' ? foreignFilingFileList[0] : 'File')}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setForeignFilingFileList([]);
                        updateFormData(page, 'foreignFilingPermissionFile', []);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NationalPhaseV2;

