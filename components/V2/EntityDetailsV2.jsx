'use client';

import React, { useState, useEffect } from 'react';
import { Building2, Calendar, Globe, Users, FileText, Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const EntityDetailsV2 = ({
  page = 'inventionRecognition',
  errors = {},
  isEditable = true,
  isNewAsset = false
}) => {
  
  // Get form data and actions from store
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);
  const setErrors = useV2Store((state) => state.setErrors);
  const [localData, setLocalData] = useState(formData);
  const [agreementFiles, setAgreementFiles] = useState([]);

  // Update local data when formData changes
  useEffect(() => {
    setLocalData(formData);
  }, [formData]);

  const handleChange = (field, value) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    
    // If user selects "No" for collaboration, clear all collaboration detail fields
    if (field === 'collaboration' && value === 'no') {
      const clearedData = {
        ...newData,
        collaboratorname: '',
        collaboratorcountry: '',
        stakeholders: '',
        entityJournalNumbers: '',
        entityProductIdentity: '',
        agreementDocuments: []
      };
      setLocalData(clearedData);
      setAgreementFiles([]);
      updateFormData(page, {
        [field]: value,
        collaboratorname: '',
        collaboratorcountry: '',
        stakeholders: '',
        entityJournalNumbers: '',
        entityProductIdentity: '',
        agreementDocuments: []
      });
    } else {
      // Always update the store immediately for real-time saving
      updateFormData(page, field, value);
    }
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleAgreementFileChange = (fileList) => {
    const files = Array.from(fileList || []);
    const allowedTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx'];
    const invalidFiles = files.filter(file => {
      const ext = '.' + (file.name.split('.').pop() || '').toLowerCase();
      return !allowedTypes.includes(ext);
    });
    if (invalidFiles.length > 0) {
      alert('Invalid file types. Only PDF, DOC, DOCX, XLS, XLSX are allowed.');
      return;
    }
    if (files.some(f => f.size > 20 * 1024 * 1024)) {
      alert('File size too large. Maximum 20MB per file.');
      return;
    }
    setAgreementFiles(files);
    updateFormData(page, 'agreementDocuments', files);
  };

  const removeAgreementFile = (index) => {
    setAgreementFiles(prev => {
      const next = prev.filter((_, i) => i !== index);
      updateFormData(page, 'agreementDocuments', next);
      return next;
    });
  };

  const isCollaboration = localData.collaboration === 'yes';

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Entity Details</h3>
              <p className="text-sm text-gray-600">Organization and collaboration information</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6">
        {/* Basic Entity Information */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Entity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Entity <span className="text-red-500 ml-1">*</span>
                {errors.entity && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.entity}
                  </span>
                )}
              </label>
              <input
                type="text"
                value={localData.entity || ''}
                onChange={(e) => handleChange('entity', e.target.value)}
                placeholder="Enter entity name"
                disabled={!isEditable}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                  errors.entity 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                } ${
                  !isEditable
                    ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                    : 'bg-white'
                }`}
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Date <span className="text-red-500 ml-1">*</span>
                {errors.date && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.date}
                  </span>
                )}
              </label>
              <input
                type="date"
                value={localData.date || ''}
                onChange={(e) => handleChange('date', e.target.value)}
                disabled={!isEditable}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                  errors.date 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                } ${
                  !isEditable
                    ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                    : 'bg-white'
                }`}
              />
            </div>

            {/* Invention Arriving Country */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Invention Arriving Country <span className="text-red-500 ml-1">*</span>
                {errors.inventioncountry && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.inventioncountry}
                  </span>
                )}
              </label>
              <input
                type="text"
                value={localData.inventioncountry || ''}
                onChange={(e) => handleChange('inventioncountry', e.target.value)}
                placeholder="Enter country of arrival"
                disabled={!isEditable}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                  errors.inventioncountry 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                } ${
                  !isEditable
                    ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                    : 'bg-white'
                }`}
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Country of Invention Creation */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Country of Invention Creation <span className="text-red-500 ml-1">*</span>
                {errors.creationcountry && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.creationcountry}
                  </span>
                )}
              </label>
              <input
                type="text"
                value={localData.creationcountry || ''}
                onChange={(e) => handleChange('creationcountry', e.target.value)}
                placeholder="Enter country of invention"
                disabled={!isEditable}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                  errors.creationcountry 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                } ${
                  !isEditable
                    ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                    : 'bg-white'
                }`}
              />
            </div>

            {/* Collaboration Innovation */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Collaboration Innovation
              </label>
              <select
                value={localData.collaboration || ''}
                onChange={(e) => handleChange('collaboration', e.target.value)}
                disabled={!isEditable}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                  'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                } ${
                  !isEditable
                    ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                    : 'bg-white'
                }`}
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Collaboration Details - Only show if collaboration is "yes" */}
          {isCollaboration && (
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-2 mb-6">
                <Users className="w-5 h-5 text-blue-600" />
                <h4 className="text-lg font-semibold text-blue-900">Collaboration Details</h4>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Collaborator Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Collaborator Name
                  </label>
                  <input
                    type="text"
                    value={localData.collaboratorName || ''}
                    onChange={(e) => handleChange('collaboratorName', e.target.value)}
                    placeholder="Enter collaborator name"
                    disabled={!isEditable}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                    } ${
                      !isEditable
                        ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                        : 'bg-white'
                    }`}
                  />
                </div>

                {/* Collaborator Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Collaborator Country
                  </label>
                  <input
                    type="text"
                    value={localData.collaboratorCountry || ''}
                    onChange={(e) => handleChange('collaboratorCountry', e.target.value)}
                    placeholder="Enter collaborator country"
                    disabled={!isEditable}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                    } ${
                      !isEditable
                        ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                        : 'bg-white'
                    }`}
                  />
                </div>

                {/* Stakeholders */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Stakeholders
                  </label>
                  <input
                    type="text"
                    value={localData.stakeholders || ''}
                    onChange={(e) => handleChange('stakeholders', e.target.value)}
                    placeholder="Enter stakeholders"
                    disabled={!isEditable}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                    } ${
                      !isEditable
                        ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                        : 'bg-white'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Journal Numbers */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Journal Numbers
                  </label>
                  <input
                    type="text"
                    value={localData.entityJournalNumbers || ''}
                    onChange={(e) => handleChange('entityJournalNumbers', e.target.value)}
                    placeholder="Enter journal numbers"
                    disabled={!isEditable}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                    } ${
                      !isEditable
                        ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                        : 'bg-white'
                    }`}
                  />
                </div>

                {/* Product Identity Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Product Identity Number
                  </label>
                  <input
                    type="text"
                    value={localData.entityProductIdentity || ''}
                    onChange={(e) => handleChange('entityProductIdentity', e.target.value)}
                    placeholder="Enter product identity number"
                    disabled={!isEditable}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                      'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                    } ${
                      !isEditable
                        ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                        : 'bg-white'
                    }`}
                  />
                </div>
              </div>

              {/* Upload agreements */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Upload agreements
                </label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={(e) => handleAgreementFileChange(e.target.files)}
                  disabled={!isEditable}
                  className="hidden"
                  id="agreement-documents-upload"
                />
                <label
                  htmlFor="agreement-documents-upload"
                  className={`flex flex-col items-center justify-center w-full min-h-[120px] border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                    !isEditable
                      ? 'bg-gray-50 border-gray-200 cursor-not-allowed'
                      : 'bg-white border-blue-300 hover:border-blue-500 hover:bg-blue-50/50'
                  }`}
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Click to upload agreements (PDF, DOC, DOCX, XLS, XLSX, max 20MB)</span>
                </label>
                {agreementFiles.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {agreementFiles.map((file, index) => (
                      <li key={index} className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-gray-200">
                        <span className="text-sm text-gray-700 truncate flex-1">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeAgreementFile(index)}
                          disabled={!isEditable}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                          aria-label="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Show message when "No" is selected for collaboration */}
          {localData.collaboration === 'no' && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-gray-600">
                  This is not a collaboration innovation. Collaboration detail fields have been cleared and no additional details are required.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntityDetailsV2;
