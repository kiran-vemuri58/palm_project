'use client';

import React from 'react';
import useV2Store from '@/store/v2Store';

function PatentMaintenanceDetailsV2({ page }) {
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

  const handleObjectChange = (field, value) => {
    // Convert string to object if needed
    try {
      const objectValue = typeof value === 'string' ? JSON.parse(value) : value;
      updateFormData(page, field, objectValue);
    } catch {
      // If parsing fails, store as string
      updateFormData(page, field, value);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Patent Maintenance Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Maintenance Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Maintenance Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maintenance Date
            </label>
            <input
              type="date"
              value={formData?.maintenanceDate || ''}
              onChange={(e) => handleInputChange('maintenanceDate', e.target.value)}
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
              Maintenance Fees ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData?.maintenanceFees || ''}
              onChange={(e) => handleNumberChange('maintenanceFees', e.target.value)}
              placeholder="Enter maintenance fees"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Status
            </label>
            <select
              value={formData?.paymentStatus || ''}
              onChange={(e) => handleInputChange('paymentStatus', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select payment status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="waived">Waived</option>
              <option value="exempt">Exempt</option>
            </select>
          </div>
        </div>

        {/* Due Dates and Periods */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Due Dates and Periods</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={formData?.dueDate || ''}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grace Period
            </label>
            <input
              type="text"
              value={formData?.gracePeriod || ''}
              onChange={(e) => handleInputChange('gracePeriod', e.target.value)}
              placeholder="e.g., 6 months"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Late Fees ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData?.lateFees || ''}
              onChange={(e) => handleNumberChange('lateFees', e.target.value)}
              placeholder="Enter late fees"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Renewal Period
            </label>
            <select
              value={formData?.renewalPeriod || ''}
              onChange={(e) => handleInputChange('renewalPeriod', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select renewal period</option>
              <option value="3-4">3-4 Years</option>
              <option value="7-8">7-8 Years</option>
              <option value="11-12">11-12 Years</option>
              <option value="15-16">15-16 Years</option>
              <option value="19-20">19-20 Years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Next Renewal
            </label>
            <input
              type="date"
              value={formData?.nextRenewal || ''}
              onChange={(e) => handleInputChange('nextRenewal', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Maintenance History */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Maintenance History</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maintenance History
            </label>
            <textarea
              value={Array.isArray(formData?.maintenanceHistory) ? formData.maintenanceHistory.join(', ') : (formData?.maintenanceHistory || '')}
              onChange={(e) => handleArrayChange('maintenanceHistory', e.target.value)}
              placeholder="Enter maintenance history (comma-separated)"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cost Breakdown
            </label>
            <textarea
              value={typeof formData?.costBreakdown === 'object' ? JSON.stringify(formData.costBreakdown, null, 2) : (formData?.costBreakdown || '')}
              onChange={(e) => handleObjectChange('costBreakdown', e.target.value)}
              placeholder="Enter cost breakdown (JSON format)"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Payment and Agency Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Payment and Agency Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={formData?.paymentMethod || ''}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select payment method</option>
              <option value="credit-card">Credit Card</option>
              <option value="bank-transfer">Bank Transfer</option>
              <option value="check">Check</option>
              <option value="wire-transfer">Wire Transfer</option>
              <option value="online-portal">Online Portal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              External Agency
            </label>
            <input
              type="text"
              value={formData?.externalAgency || ''}
              onChange={(e) => handleInputChange('externalAgency', e.target.value)}
              placeholder="Enter external agency name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reminder Set
            </label>
            <select
              value={formData?.reminderSet ? 'true' : 'false'}
              onChange={(e) => handleBooleanChange('reminderSet', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Automatic Renewal
            </label>
            <select
              value={formData?.automaticRenewal ? 'true' : 'false'}
              onChange={(e) => handleBooleanChange('automaticRenewal', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

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
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="lapsed">Lapsed</option>
              <option value="reinstated">Reinstated</option>
              <option value="abandoned">Abandoned</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatentMaintenanceDetailsV2;
