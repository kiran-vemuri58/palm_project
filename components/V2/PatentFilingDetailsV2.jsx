'use client';

import React from 'react';
import useV2Store from '@/store/v2Store';

function PatentFilingDetailsV2({ page }) {
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

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Patent Filing Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Filing Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Filing Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filing Date
            </label>
            <input
              type="date"
              value={formData?.filingDate || ''}
              onChange={(e) => handleInputChange('filingDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application Number
            </label>
            <input
              type="text"
              value={formData?.applicationNumber || ''}
              onChange={(e) => handleInputChange('applicationNumber', e.target.value)}
              placeholder="Enter application number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filing Jurisdiction
            </label>
            <select
              value={formData?.filingJurisdiction || ''}
              onChange={(e) => handleInputChange('filingJurisdiction', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select jurisdiction</option>
              <option value="US">United States (USPTO)</option>
              <option value="EP">European Patent Office (EPO)</option>
              <option value="IN">India (IPO)</option>
              <option value="PCT">PCT International</option>
              <option value="CN">China (CNIPA)</option>
              <option value="JP">Japan (JPO)</option>
              <option value="KR">South Korea (KIPO)</option>
              <option value="CA">Canada (CIPO)</option>
              <option value="AU">Australia (IP Australia)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filing Type
            </label>
            <select
              value={formData?.filingType || ''}
              onChange={(e) => handleInputChange('filingType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select filing type</option>
              <option value="provisional">Provisional Application</option>
              <option value="non-provisional">Non-Provisional Application</option>
              <option value="pct">PCT Application</option>
              <option value="divisional">Divisional Application</option>
              <option value="continuation">Continuation Application</option>
              <option value="continuation-in-part">Continuation-in-Part</option>
            </select>
          </div>
        </div>

        {/* Priority Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Priority Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Claim
            </label>
            <select
              value={formData?.priorityClaim || ''}
              onChange={(e) => handleInputChange('priorityClaim', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select priority claim</option>
              <option value="none">No Priority Claim</option>
              <option value="domestic">Domestic Priority</option>
              <option value="foreign">Foreign Priority</option>
              <option value="pct">PCT Priority</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Date
            </label>
            <input
              type="date"
              value={formData?.priorityDate || ''}
              onChange={(e) => handleInputChange('priorityDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Number
            </label>
            <input
              type="text"
              value={formData?.priorityNumber || ''}
              onChange={(e) => handleInputChange('priorityNumber', e.target.value)}
              placeholder="Enter priority application number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Applicant Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Applicant Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Applicant Name
            </label>
            <input
              type="text"
              value={formData?.applicantName || ''}
              onChange={(e) => handleInputChange('applicantName', e.target.value)}
              placeholder="Enter applicant name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inventor Names
            </label>
            <textarea
              value={Array.isArray(formData?.inventorNames) ? formData.inventorNames.join(', ') : (formData?.inventorNames || '')}
              onChange={(e) => handleArrayChange('inventorNames', e.target.value)}
              placeholder="Enter inventor names (comma-separated)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attorney Name
            </label>
            <input
              type="text"
              value={formData?.attorneyName || ''}
              onChange={(e) => handleInputChange('attorneyName', e.target.value)}
              placeholder="Enter attorney name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Financial Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Financial Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filing Fees ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData?.filingFees || ''}
              onChange={(e) => handleInputChange('filingFees', parseFloat(e.target.value) || 0)}
              placeholder="Enter filing fees"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maintenance Fees ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData?.maintenanceFees || ''}
              onChange={(e) => handleInputChange('maintenanceFees', parseFloat(e.target.value) || 0)}
              placeholder="Enter maintenance fees"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Status Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Status Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filing Status
            </label>
            <select
              value={formData?.status || ''}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select status</option>
              <option value="filed">Filed</option>
              <option value="under-review">Under Review</option>
              <option value="published">Published</option>
              <option value="examined">Examined</option>
              <option value="granted">Granted</option>
              <option value="rejected">Rejected</option>
              <option value="abandoned">Abandoned</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Examination Date
            </label>
            <input
              type="date"
              value={formData?.examinationDate || ''}
              onChange={(e) => handleInputChange('examinationDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Publication Date
            </label>
            <input
              type="date"
              value={formData?.publicationDate || ''}
              onChange={(e) => handleInputChange('publicationDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grant Date
            </label>
            <input
              type="date"
              value={formData?.grantDate || ''}
              onChange={(e) => handleInputChange('grantDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              value={formData?.expiryDate || ''}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Renewal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Renewal Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Renewal Dates
            </label>
            <textarea
              value={Array.isArray(formData?.renewalDates) ? formData.renewalDates.join(', ') : (formData?.renewalDates || '')}
              onChange={(e) => handleArrayChange('renewalDates', e.target.value)}
              placeholder="Enter renewal dates (comma-separated)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatentFilingDetailsV2;
