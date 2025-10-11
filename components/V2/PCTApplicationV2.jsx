'use client';

import React from 'react';
import useV2Store from '@/store/v2Store';

const PCTApplicationV2 = ({ page }) => {
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const safeFormData = formData || {};

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

      {/* Row 4 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
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

      {/* Row 6 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
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
    </div>
  );
};

export default PCTApplicationV2;

