'use client';

import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FileInput from "@/components/ui/file-input";
import useV2Store from '@/store/v2Store';
import { Briefcase, Calendar, DollarSign, FileText, TrendingUp } from 'lucide-react';

const PatentCommercializationChildV2 = ({ formData, updateFormData, page }) => {
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

  const removeFile = (fieldName, index) => {
    const currentFiles = safeFormData[fieldName] || [];
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    if (page) {
      // Use page-based store integration
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, fieldName, updatedFiles);
    } else {
      // Fallback to direct updateFormData prop
      updateFormData(fieldName, updatedFiles);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Patent Commercialization</h3>
            <p className="text-orange-100 text-sm">Commercialization efforts and implementation</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Implementation Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <span>Implementation Information</span>
          </h4>
          
          <div>
            <Label className="text-gray-700 font-medium">Implementation File</Label>
            <FileInput
              name="pcImplementationFile"
              multiple={true}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
              value={formData.pcImplementationFile || []}
              onChange={handleFileUpload}
              maxFiles={10}
              maxFileSize={20 * 1024 * 1024}
              className="mt-2"
            />
            {formData.pcImplementationFile && formData.pcImplementationFile.length > 0 && (
              <div className="mt-2 space-y-1">
                {formData.pcImplementationFile.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile('pcImplementationFile', index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="pcFirstWorkingDate" className="text-gray-700 font-medium">
                First Working Date
              </Label>
              <Input
                id="pcFirstWorkingDate"
                name="pcFirstWorkingDate"
                type="date"
                value={formData.pcFirstWorkingDate || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="pcCommercializationStatus" className="text-gray-700 font-medium">
                Commercialization Status
              </Label>
              <select
                id="pcCommercializationStatus"
                name="pcCommercializationStatus"
                value={formData.pcCommercializationStatus || ''}
                onChange={handleChange}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="">Select Status</option>
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Commercialization Details */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-orange-600" />
            <span>Commercialization Details</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="pcRevenueGenerated" className="text-gray-700 font-medium">
                Revenue Generated
              </Label>
              <Input
                id="pcRevenueGenerated"
                name="pcRevenueGenerated"
                type="number"
                placeholder="Enter revenue amount"
                value={formData.pcRevenueGenerated || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="pcMarketValue" className="text-gray-700 font-medium">
                Market Value
              </Label>
              <Input
                id="pcMarketValue"
                name="pcMarketValue"
                type="number"
                placeholder="Enter market value"
                value={formData.pcMarketValue || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="pcLicensingFee" className="text-gray-700 font-medium">
                Licensing Fee
              </Label>
              <Input
                id="pcLicensingFee"
                name="pcLicensingFee"
                type="number"
                placeholder="Enter licensing fee"
                value={formData.pcLicensingFee || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="pcRoyaltyRate" className="text-gray-700 font-medium">
                Royalty Rate (%)
              </Label>
              <Input
                id="pcRoyaltyRate"
                name="pcRoyaltyRate"
                type="number"
                step="0.01"
                placeholder="Enter royalty rate"
                value={formData.pcRoyaltyRate || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Partnership Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-orange-600" />
            <span>Partnership Information</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="pcPartnerName" className="text-gray-700 font-medium">
                Partner Name
              </Label>
              <Input
                id="pcPartnerName"
                name="pcPartnerName"
                type="text"
                placeholder="Enter partner name"
                value={formData.pcPartnerName || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="pcPartnershipType" className="text-gray-700 font-medium">
                Partnership Type
              </Label>
              <select
                id="pcPartnershipType"
                name="pcPartnershipType"
                value={formData.pcPartnershipType || ''}
                onChange={handleChange}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="">Select Type</option>
                <option value="licensing">Licensing</option>
                <option value="joint-venture">Joint Venture</option>
                <option value="strategic-alliance">Strategic Alliance</option>
                <option value="distribution">Distribution</option>
                <option value="manufacturing">Manufacturing</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="pcPartnershipDetails" className="text-gray-700 font-medium">
              Partnership Details
            </Label>
            <textarea
              id="pcPartnershipDetails"
              name="pcPartnershipDetails"
              rows={4}
              placeholder="Describe partnership details..."
              value={formData.pcPartnershipDetails || ''}
              onChange={handleChange}
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Timeline Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-orange-600" />
            <span>Timeline Information</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="pcStartDate" className="text-gray-700 font-medium">
                Start Date
              </Label>
              <Input
                id="pcStartDate"
                name="pcStartDate"
                type="date"
                value={formData.pcStartDate || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="pcExpectedCompletionDate" className="text-gray-700 font-medium">
                Expected Completion Date
              </Label>
              <Input
                id="pcExpectedCompletionDate"
                name="pcExpectedCompletionDate"
                type="date"
                value={formData.pcExpectedCompletionDate || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="pcActualCompletionDate" className="text-gray-700 font-medium">
                Actual Completion Date
              </Label>
              <Input
                id="pcActualCompletionDate"
                name="pcActualCompletionDate"
                type="date"
                value={formData.pcActualCompletionDate || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatentCommercializationChildV2;