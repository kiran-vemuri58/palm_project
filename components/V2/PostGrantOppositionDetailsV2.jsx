'use client';

import React from 'react';
import useV2Store from '@/store/v2Store';

function PostGrantOppositionDetailsV2({ page }) {
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const handleInputChange = (field, value) => {
    updateFormData(page, field, value);
  };

  const handleArrayChange = (field, value) => {
    // Convert string to array if needed
    const arrayValue = Array.isArray(value) ? value : value.split(',').map(item => item.trim()).filter(item => item);
    updateFormData(page, field, arrayValue);
  };

  const handleBooleanChange = (field, value) => {
    updateFormData(page, field, value === 'true');
  };

  const handleNumberChange = (field, value) => {
    updateFormData(page, field, parseFloat(value) || 0);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Post Grant Opposition Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Opposition Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Opposition Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opposition Date
            </label>
            <input
              type="date"
              value={formData?.oppositionDate || ''}
              onChange={(e) => handleInputChange('oppositionDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patent Number
            </label>
            <input
              type="text"
              value={formData?.patentNumber || ''}
              onChange={(e) => handleInputChange('patentNumber', e.target.value)}
              placeholder="Enter patent number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opponent Name
            </label>
            <input
              type="text"
              value={formData?.opponentName || ''}
              onChange={(e) => handleInputChange('opponentName', e.target.value)}
              placeholder="Enter opponent name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opposition Grounds
            </label>
            <textarea
              value={Array.isArray(formData?.oppositionGrounds) ? formData.oppositionGrounds.join(', ') : (formData?.oppositionGrounds || '')}
              onChange={(e) => handleArrayChange('oppositionGrounds', e.target.value)}
              placeholder="Enter opposition grounds (comma-separated)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Legal Proceedings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Legal Proceedings</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Evidence Filed
            </label>
            <textarea
              value={Array.isArray(formData?.evidenceFiled) ? formData.evidenceFiled.join(', ') : (formData?.evidenceFiled || '')}
              onChange={(e) => handleArrayChange('evidenceFiled', e.target.value)}
              placeholder="Enter evidence filed (comma-separated)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hearing Date
            </label>
            <input
              type="date"
              value={formData?.hearingDate || ''}
              onChange={(e) => handleInputChange('hearingDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Decision Date
            </label>
            <input
              type="date"
              value={formData?.decisionDate || ''}
              onChange={(e) => handleInputChange('decisionDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opposition Outcome
            </label>
            <select
              value={formData?.oppositionOutcome || ''}
              onChange={(e) => handleInputChange('oppositionOutcome', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select outcome</option>
              <option value="upheld">Opposition Upheld</option>
              <option value="dismissed">Opposition Dismissed</option>
              <option value="partially-upheld">Partially Upheld</option>
              <option value="settled">Settled</option>
              <option value="withdrawn">Withdrawn</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Appeal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Appeal Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appeal Filed
            </label>
            <select
              value={formData?.appealFiled ? 'true' : 'false'}
              onChange={(e) => handleBooleanChange('appealFiled', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appeal Date
            </label>
            <input
              type="date"
              value={formData?.appealDate || ''}
              onChange={(e) => handleInputChange('appealDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Final Decision
            </label>
            <select
              value={formData?.finalDecision || ''}
              onChange={(e) => handleInputChange('finalDecision', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select final decision</option>
              <option value="patent-revoked">Patent Revoked</option>
              <option value="patent-maintained">Patent Maintained</option>
              <option value="patent-amended">Patent Amended</option>
              <option value="appeal-dismissed">Appeal Dismissed</option>
              <option value="appeal-upheld">Appeal Upheld</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Costs Awarded ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData?.costsAwarded || ''}
              onChange={(e) => handleNumberChange('costsAwarded', e.target.value)}
              placeholder="Enter costs awarded"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Status and Strategy */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Status and Strategy</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData?.status || ''}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select status</option>
              <option value="filed">Filed</option>
              <option value="under-review">Under Review</option>
              <option value="hearing-scheduled">Hearing Scheduled</option>
              <option value="hearing-completed">Hearing Completed</option>
              <option value="decision-pending">Decision Pending</option>
              <option value="decided">Decided</option>
              <option value="appealed">Appealed</option>
              <option value="final">Final</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Next Steps
            </label>
            <textarea
              value={formData?.nextSteps || ''}
              onChange={(e) => handleInputChange('nextSteps', e.target.value)}
              placeholder="Describe next steps"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Legal Representation
            </label>
            <input
              type="text"
              value={formData?.legalRepresentation || ''}
              onChange={(e) => handleInputChange('legalRepresentation', e.target.value)}
              placeholder="Enter legal representation"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opposition Strategy
            </label>
            <textarea
              value={formData?.oppositionStrategy || ''}
              onChange={(e) => handleInputChange('oppositionStrategy', e.target.value)}
              placeholder="Describe opposition strategy"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostGrantOppositionDetailsV2;
