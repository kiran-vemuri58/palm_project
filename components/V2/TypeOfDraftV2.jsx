'use client';

import React from 'react';
import useV2Store from '@/store/v2Store';

const TypeOfDraftV2 = ({ page }) => {
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const draftType = formData?.draftType || '';

  const handleDraftTypeChange = (e) => {
    const newValue = e.target.value;
    updateFormData(page, 'draftType', newValue);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Type of Draft</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Draft Type
        </label>
        <select
          value={draftType}
          onChange={handleDraftTypeChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
        >
          <option value="">Select draft type</option>
          <option value="complete">Complete Specification</option>
          <option value="provisional">Provisional Application</option>
          <option value="pct">PCT Application</option>
          <option value="national_phase">National Phase Entry</option>
        </select>
      </div>

      {draftType && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Selected:</span> {' '}
            {draftType === 'complete' && 'Complete Specification'}
            {draftType === 'provisional' && 'Provisional Application'}
            {draftType === 'pct' && 'PCT Application'}
            {draftType === 'national_phase' && 'National Phase Entry'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TypeOfDraftV2;

