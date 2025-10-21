'use client';

import React from 'react';

const PSPInventionDetailsV2 = ({ formData, updateFormData }) => {
  const safeFormData = formData || {};

  const handleChange = (field, value) => {
    updateFormData(field, value);
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Invention Title
          </label>
          <input
            type="text"
            value={safeFormData.inventionTitle || ''}
            onChange={(e) => handleChange('inventionTitle', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter invention title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patent Number
          </label>
          <input
            type="text"
            value={safeFormData.patentNumber || ''}
            onChange={(e) => handleChange('patentNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter patent number"
          />
        </div>
      </div>

      {/* Maintenance Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maintenance Status
          </label>
          <select
            value={safeFormData.maintenanceStatus || ''}
            onChange={(e) => handleChange('maintenanceStatus', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="lapsed">Lapsed</option>
            <option value="maintained">Maintained</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Maintenance Date
          </label>
          <input
            type="date"
            value={safeFormData.lastMaintenanceDate || ''}
            onChange={(e) => handleChange('lastMaintenanceDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Maintenance Notes
        </label>
        <textarea
          value={safeFormData.maintenanceNotes || ''}
          onChange={(e) => handleChange('maintenanceNotes', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter maintenance notes and observations"
        />
      </div>
    </div>
  );
};

export default PSPInventionDetailsV2;
