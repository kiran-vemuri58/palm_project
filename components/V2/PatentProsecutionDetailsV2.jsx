'use client';

import React from 'react';
import useV2Store from '@/store/v2Store';
import { FileText } from 'lucide-react';

const PatentProsecutionDetailsV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (page) {
      // Use page-based store integration
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, name, value);
    } else {
      // Fallback to direct updateFormData prop
      updateFormData(name, value);
    }
  };

  const handleSelectChange = (fieldName, value) => {
    if (page) {
      // Use page-based store integration
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, fieldName, value);
    } else {
      // Fallback to direct updateFormData prop
      updateFormData(fieldName, value);
    }
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    const fileArray = Array.from(files);
    if (page) {
      // Use page-based store integration
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, name, fileArray);
    } else {
      // Fallback to direct updateFormData prop
      updateFormData(name, fileArray);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Patent Prosecution Details</h3>
            <p className="text-purple-100 text-sm">Legal proceedings and prosecution information</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Patent Published Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Publication Status
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Patent Published?
              </label>
              <select
                name="pppd_published"
                value={safeFormData?.pppd_published}
                onChange={(e) => handleSelectChange('pppd_published', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Conditional Publication Number */}
            {safeFormData?.pppd_published === 'yes' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Publication Number
                </label>
                <input
                  name="pppd_publication_number"
                  type="text"
                  placeholder="Enter Publication Number"
                  value={safeFormData?.pppd_publication_number || ''}
                  onChange={(e) => handleChange('pppd_publication_number', e.target.value)}
                  className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                />
              </div>
            )}
          </div>
        </div>

        {/* Post Grant Opposition Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Post Grant Opposition
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Post Grant Opposed?
              </label>
              <select
                name="pppd_any_person_opposed"
                value={safeFormData?.pppd_any_person_opposed}
                onChange={(e) => handleSelectChange('pppd_any_person_opposed', e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Conditional Opposition Fields */}
          {safeFormData?.pppd_any_person_opposed === 'yes' && (
            <div className="space-y-6">
              {/* Opposer Information */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h5 className="text-md font-semibold text-gray-700 mb-4">Opposer Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Opposer Name
                    </label>
                    <input
                      name="pppd_opponent_name"
                      type="text"
                      placeholder="Enter Opposer Name"
                      value={safeFormData?.pppd_opponent_name || ''}
                      onChange={(e) => handleChange('pppd_opponent_name', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Citations Filed by Opposer
                    </label>
                    <input
                      name="pppd_case_filed_by_opposer"
                      type="text"
                      placeholder="Enter Citations Filed by Opposer"
                      value={safeFormData?.pppd_case_filed_by_opposer || ''}
                      onChange={(e) => handleChange('pppd_case_filed_by_opposer', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Opposer Attachments
                    </label>
                    <input
                      name="attachments"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Response Information */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h5 className="text-md font-semibold text-gray-700 mb-4">Response Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Brief Opinion About Opposition Findings
                    </label>
                    <input
                      name="pppd_basis_of_action_of_filing"
                      type="text"
                      placeholder="Enter Opinion"
                      value={safeFormData?.pppd_basis_of_action_of_filing || ''}
                      onChange={(e) => handleChange('pppd_basis_of_action_of_filing', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Response Filed for Opposition
                    </label>
                    <input
                      name="pppd_reason_for_filing_opposition"
                      type="text"
                      placeholder="Enter Response"
                      value={safeFormData?.pppd_reason_for_filing_opposition || ''}
                      onChange={(e) => handleChange('pppd_reason_for_filing_opposition', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Personnel Information */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h5 className="text-md font-semibold text-gray-700 mb-4">Personnel & Agency Details</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Opposition Response Prepared By
                    </label>
                    <input
                      name="pppd_opinion_rendered_by_you"
                      type="text"
                      placeholder="Enter Employee ID"
                      value={safeFormData?.pppd_opinion_rendered_by_you || ''}
                      onChange={(e) => handleChange('pppd_opinion_rendered_by_you', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      External Agency (if prepared by them)
                    </label>
                    <input
                      name="pppd_external_agency"
                      type="text"
                      placeholder="Enter Agency Number"
                      value={safeFormData?.pppd_external_agency || ''}
                      onChange={(e) => handleChange('pppd_external_agency', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Reviewed By
                    </label>
                    <input
                      name="pppd_reviewed_by"
                      type="text"
                      placeholder="Enter Employee ID"
                      value={safeFormData?.pppd_reviewed_by || ''}
                      onChange={(e) => handleChange('pppd_reviewed_by', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Attachments */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h5 className="text-md font-semibold text-gray-700 mb-4">Additional Attachments</h5>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Response Attachments
                    </label>
                    <input
                      name="attachments"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Review Attachments (Versions of Response with Reviews)
                    </label>
                    <input
                      name="attachments"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatentProsecutionDetailsV2;