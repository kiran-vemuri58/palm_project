'use client';

import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PCTApplicationV2 = ({ page, isPage4 = false }) => {
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

  const isDirectPCTYes = safeFormData.isDirectPCT === 'Yes';

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">PCT Application</h2>

      {/* Row 1 - Is Direct PCT */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Is Direct PCT?
          </label>
          <select
            value={safeFormData.isDirectPCT || 'No'}
            onChange={(e) => handleSelectChange('isDirectPCT', e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {!isDirectPCTYes && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Provisional Application
              </label>
              <input
                type="date"
                name="pctProvisionalDate"
                value={safeFormData.pctProvisionalDate || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application number
              </label>
              <input
                type="text"
                name="pctApplicationNumber"
                placeholder="Enter Application number"
                value={safeFormData.pctApplicationNumber || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </>
        )}
      </div>

      {/* Conditional Row (only if isDirectPCT is No) */}
      {!isDirectPCTYes && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name Of Drafter
            </label>
            <input
              type="text"
              name="pctDrafterName"
              placeholder="Name Of Drafter"
              value={safeFormData.pctDrafterName || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Forms Prepared
            </label>
            <select
              value={safeFormData.pctFormsPrepared || 'No'}
              onChange={(e) => handleSelectChange('pctFormsPrepared', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country Prior Filing
            </label>
            <input
              type="text"
              name="pctCountryFiling"
              placeholder="Country Prior Filing"
              value={safeFormData.pctCountryFiling || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {/* Row 3 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {!isDirectPCTYes && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review By
            </label>
            <input
              type="text"
              name="pctReviewBy"
              placeholder="Review By"
              value={safeFormData.pctReviewBy || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Which Cited in Patent Document
          </label>
          <input
            type="text"
            name="pctCitedPatent"
            placeholder="Which Cited in Patent Document"
            value={safeFormData.pctCitedPatent || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Independent Claim
          </label>
          <input
            type="text"
            name="pctIndependentClaim"
            placeholder="Independent Claim"
            value={safeFormData.pctIndependentClaim || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Row 4 - Page 4: hide Is it a Profitable Patent? */}
      <div className={`grid grid-cols-3 gap-4 mb-4 ${isPage4 ? 'grid-cols-2' : ''}`}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dependent Claim
          </label>
          <input
            type="text"
            name="pctDependentClaim"
            placeholder="Dependent Claim"
            value={safeFormData.pctDependentClaim || ''}
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
            name="pctBroadenedFeature"
            placeholder="Broadened claimed invention feature"
            value={safeFormData.pctBroadenedFeature || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        {!isPage4 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Is it a Profitable Patent?
            </label>
            <select
              value={safeFormData.pctIsProfit || 'No'}
              onChange={(e) => handleSelectChange('pctIsProfit', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        )}
      </div>

      {/* Row 5 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Is it a Defensive Patent?
          </label>
          <select
            value={safeFormData.pctIsDefensive || 'No'}
            onChange={(e) => handleSelectChange('pctIsDefensive', e.target.value)}
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
            name="pctDraftingEffort"
            placeholder="Enter efforts spent"
            value={safeFormData.pctDraftingEffort || ''}
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
            name="pctDrafterEmpId"
            placeholder="Enter Patent Drafter"
            value={safeFormData.pctDrafterEmpId || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Row 6 - Page 4: hide Number of hours spent and External Agency Recognizer */}
      <div className={`grid grid-cols-3 gap-4 mb-4 ${isPage4 ? 'grid-cols-1' : ''}`}>
        {!isPage4 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of hours spent
              </label>
              <input
                type="number"
                name="pctHoursSpent"
                placeholder="Enter hours spent"
                value={safeFormData.pctHoursSpent || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                External Agency Recognizer
              </label>
              <input
                type="text"
                name="pctAgencyRecognizer"
                placeholder="Enter external agency recognizer"
                value={safeFormData.pctAgencyRecognizer || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cost spent on Agency
          </label>
          <input
            type="number"
            name="pctAgencyCost"
            placeholder="Enter agency cost"
            value={safeFormData.pctAgencyCost || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Row 7 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Efforts in Hours for review
          </label>
          <input
            type="number"
            name="pctReviewEffort"
            placeholder="Efforts in Hours for review"
            value={safeFormData.pctReviewEffort || ''}
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
            name="pctManagerEmpId"
            placeholder="Enter manager responsible"
            value={safeFormData.pctManagerEmpId || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Page 4 only: Foreign filing permission fields - inside PCT */}
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
                  id="pct-foreign-filing-upload"
                />
                <label htmlFor="pct-foreign-filing-upload" className="cursor-pointer flex flex-col items-center space-y-2">
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

export default PCTApplicationV2;

