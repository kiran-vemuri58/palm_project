'use client';

import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FileInput from "@/components/ui/file-input";
import useV2Store from '@/store/v2Store';
import { Calendar, DollarSign, FileText, Clock } from 'lucide-react';

const PatentMaintenanceHistoryV2 = ({ formData, updateFormData, page }) => {
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
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Patent Maintenance History</h3>
            <p className="text-green-100 text-sm">Maintenance fees and renewal schedules</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Priority and Grant Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-green-600" />
            <span>Priority & Grant Information</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="pmPriorityDate" className="text-gray-700 font-medium">
                Priority Date
              </Label>
              <Input
                id="pmPriorityDate"
                name="pmPriorityDate"
                type="date"
                value={formData.pmPriorityDate || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="pmGrantDate" className="text-gray-700 font-medium">
                Grant Date
              </Label>
              <Input
                id="pmGrantDate"
                name="pmGrantDate"
                type="date"
                value={formData.pmGrantDate || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Maintenance Payment Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span>Maintenance Payment Information</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="pmYearsPaid" className="text-gray-700 font-medium">
                Years Paid
              </Label>
              <Input
                id="pmYearsPaid"
                name="pmYearsPaid"
                type="text"
                placeholder="Enter number of years..."
                value={formData.pmYearsPaid || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="pmNextDueDate" className="text-gray-700 font-medium">
                Next Due Date
              </Label>
              <Input
                id="pmNextDueDate"
                name="pmNextDueDate"
                type="date"
                value={formData.pmNextDueDate || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="pmMaintenanceStopped" className="text-gray-700 font-medium">
                Maintenance Stopped Date
              </Label>
              <Input
                id="pmMaintenanceStopped"
                name="pmMaintenanceStopped"
                type="date"
                value={formData.pmMaintenanceStopped || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Maintenance Attachments</Label>
            <FileInput
              name="pmAttachments"
              multiple={true}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              value={formData.pmAttachments || []}
              onChange={handleFileUpload}
              maxFiles={10}
              maxFileSize={20 * 1024 * 1024}
              className="mt-2"
            />
            {formData.pmAttachments && formData.pmAttachments.length > 0 && (
              <div className="mt-2 space-y-1">
                {formData.pmAttachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile('pmAttachments', index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filing Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-green-600" />
            <span>Filing Information</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="pmFilingDate" className="text-gray-700 font-medium">
                Filing Date
              </Label>
              <Input
                id="pmFilingDate"
                name="pmFilingDate"
                type="date"
                value={formData.pmFilingDate || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="pmMaintenanceFee" className="text-gray-700 font-medium">
                Maintenance Fee
              </Label>
              <Input
                id="pmMaintenanceFee"
                name="pmMaintenanceFee"
                type="text"
                placeholder="Enter maintenance fee..."
                value={formData.pmMaintenanceFee || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Filing Attachments</Label>
            <FileInput
              name="pmFilingAttachments"
              multiple={true}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              value={formData.pmFilingAttachments || []}
              onChange={handleFileUpload}
              maxFiles={10}
              maxFileSize={20 * 1024 * 1024}
              className="mt-2"
            />
            {formData.pmFilingAttachments && formData.pmFilingAttachments.length > 0 && (
              <div className="mt-2 space-y-1">
                {formData.pmFilingAttachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile('pmFilingAttachments', index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* External Agency Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            External Agency Information
          </h4>
          
          <div>
            <Label htmlFor="pmExternalAgency" className="text-gray-700 font-medium">
              External Agency
            </Label>
            <Input
              id="pmExternalAgency"
              name="pmExternalAgency"
              type="text"
              placeholder="Enter external agency..."
              value={formData.pmExternalAgency || ''}
              onChange={handleChange}
              className="mt-2 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatentMaintenanceHistoryV2;