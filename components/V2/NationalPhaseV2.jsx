'use client';

import React from 'react';
import useV2Store from '@/store/v2Store';

const NationalPhaseV2 = ({ page }) => {
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

      {/* Row 5 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
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

      {/* Row 6 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
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
    </div>
  );
};

export default NationalPhaseV2;

