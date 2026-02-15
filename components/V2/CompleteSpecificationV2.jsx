'use client';

import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const CompleteSpecificationV2 = ({ page, isPage4 = false }) => {
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const safeFormData = formData || {};
  const [draftFiles, setDraftFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(page, name, value);
  };

  const handleSelectChange = (name, value) => {
    updateFormData(page, name, value);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Complete Specification</h2>

      {/* Row 1 - Provisional Filed */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Is Provisional Filed?
          </label>
          <select
            value={safeFormData.isProvisionalFiled || ''}
            onChange={(e) => handleSelectChange('isProvisionalFiled', e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {safeFormData.isProvisionalFiled === 'Yes' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Provisional Spec filing
              </label>
              <input
                type="date"
                name="provisionalSpecDate"
                value={safeFormData.provisionalSpecDate || ''}
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
                name="applicationNumber"
                placeholder="Enter Application number"
                value={safeFormData.applicationNumber || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </>
        )}
      </div>

      {/* Row 2 - PCT Filed */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Is PCT Filed?
          </label>
          <select
            value={safeFormData.isPCTFiled || ''}
            onChange={(e) => handleSelectChange('isPCTFiled', e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {safeFormData.isPCTFiled === 'Yes' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of PCT filing
            </label>
            <input
              type="date"
              name="pctFilingDate"
              value={safeFormData.pctFilingDate || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Is PCT Published?
          </label>
          <select
            value={safeFormData.isPCTPublished || ''}
            onChange={(e) => handleSelectChange('isPCTPublished', e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Which Cited in Patent Document
          </label>
          <input
            type="text"
            name="citedPatent"
            placeholder="Which Cited in Patent Document"
            value={safeFormData.citedPatent || ''}
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
            name="independentClaim"
            placeholder="Independent Claim"
            value={safeFormData.independentClaim || ''}
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
            name="dependentClaim"
            placeholder="Dependent Claim"
            value={safeFormData.dependentClaim || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Row 4 - Page 4: hide Is it a Profitable Patent? */}
      <div className={`grid grid-cols-3 gap-4 mb-4 ${isPage4 ? 'grid-cols-2' : ''}`}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Broadened claimed invention feature
          </label>
          <input
            type="text"
            name="broadenedFeature"
            placeholder="Broadened claimed invention feature"
            value={safeFormData.broadenedFeature || ''}
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
              value={safeFormData.isProfitPatent || ''}
              onChange={(e) => handleSelectChange('isProfitPatent', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select</option>
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
            value={safeFormData.isDefensivePatent || ''}
            onChange={(e) => handleSelectChange('isDefensivePatent', e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      {/* Row 5 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Versions of All Drafts
            <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, XLS, XLSX - Max 20MB)</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors">
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setDraftFiles(files);
                updateFormData(page, 'draftVersions', files);
              }}
              className="hidden"
              id="draft-versions-upload"
            />
            <label
              htmlFor="draft-versions-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-600">Click to upload files</span>
            </label>
            
            {/* File List */}
            {draftFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {draftFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                    <span className="text-sm text-gray-700 truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newFiles = draftFiles.filter((_, i) => i !== index);
                        setDraftFiles(newFiles);
                        updateFormData(page, 'draftVersions', newFiles);
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Efforts spent for drafting
          </label>
          <input
            type="number"
            name="draftingEffort"
            placeholder="Enter efforts spent"
            value={safeFormData.draftingEffort || ''}
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
            name="drafterEmpId"
            placeholder="Enter Patent Drafter"
            value={safeFormData.drafterEmpId || ''}
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
                name="hoursSpent"
                placeholder="Enter hours spent"
                value={safeFormData.hoursSpent || ''}
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
                name="agencyRecognizer"
                placeholder="Enter external agency recognizer"
                value={safeFormData.agencyRecognizer || ''}
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
            name="agencyCost"
            placeholder="Enter agency cost"
            value={safeFormData.agencyCost || ''}
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
            name="reviewEffort"
            placeholder="Efforts in Hours for review"
            value={safeFormData.reviewEffort || ''}
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
            name="managerEmpId"
            placeholder="Enter manager responsible"
            value={safeFormData.managerEmpId || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default CompleteSpecificationV2;

