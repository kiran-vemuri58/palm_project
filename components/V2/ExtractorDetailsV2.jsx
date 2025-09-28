'use client';

import React from 'react';
import { FileText, Upload, AlertCircle } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const ExtractorDetailsV2 = ({ page, errors = {} }) => {
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(page, name, value);
  };

  const handleSelectChange = (name, value) => {
    updateFormData(page, name, value);
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    // For now, just store the file name - actual file handling will be implemented later
    updateFormData(page, name, files[0]?.name || '');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Extraction Details</h3>
            <p className="text-sm text-gray-600">Invention extraction information and analysis</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6">
      
        <div className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Name of the Extractor 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="extractorOne"
                value={formData.extractorOne || ''}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                  errors.extractorOne 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
                placeholder="Enter the name of Extractor 1"
              />
              {errors.extractorOne && (
                <div className="flex items-center space-x-1 mt-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-sm text-red-600">{errors.extractorOne}</p>
                </div>
              )}
            </div>
        
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Name of the Extractor 2 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="extractortwo"
                value={formData.extractortwo || ''}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                  errors.extractortwo 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
                placeholder="Enter the name of Extractor 2"
              />
              {errors.extractortwo && (
                <div className="flex items-center space-x-1 mt-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-sm text-red-600">{errors.extractortwo}</p>
                </div>
              )}
            </div>
        
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Invention Extraction Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="iEDate"
                value={formData.iEDate || ''}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                  errors.iEDate 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
              />
              {errors.iEDate && (
                <div className="flex items-center space-x-1 mt-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-sm text-red-600">{errors.iEDate}</p>
                </div>
              )}
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Is Invention Accordance with Patent Laws?
              </label>
              <select
                value={formData.iawpl || ''}
                onChange={(e) => handleSelectChange('iawpl', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {formData?.iawpl === 'yes' && (
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="w-5 h-5 text-blue-600" />
                <h4 className="text-lg font-semibold text-blue-900">Additional Details</h4>
              </div>
              
              {/* Third Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Novel Feature (Assumed)
                  </label>
                  <input
                    type="text"
                    name="nfeature"
                    value={formData.nfeature || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="Enter Novel Feature"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Inventive Feature (Assumed)
                  </label>
                  <input
                    type="text"
                    name="ifeature"
                    value={formData.ifeature || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="Enter Inventive Feature"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Invention Detail Attachment
                    <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, XLS, XLSX)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      name="idattachments"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="idattachments-upload"
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                    />
                    <label
                      htmlFor="idattachments-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">Click to upload files</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Fourth Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Specific Country
                  </label>
                  <input
                    type="text"
                    name="scountry"
                    value={formData.scountry || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="Enter specific country"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Opinion Of Extractor
                  </label>
                  <input
                    type="text"
                    name="oextractor"
                    value={formData.oextractor || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="Enter Opinion Of Extractor"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtractorDetailsV2;
