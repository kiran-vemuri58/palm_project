'use client';

import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useV2Store from '@/store/v2Store';
import { FileText, Hash } from 'lucide-react';

const PANV2 = ({ formData, updateFormData, page }) => {
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

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Post Grant Opposition (PAN)</h3>
            <p className="text-red-100 text-sm">Opposition proceedings and application details</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Patent Application Number */}
          <div>
            <Label htmlFor="pgoPatentApplicationNumber" className="text-gray-700 font-medium flex items-center space-x-2">
              <Hash className="w-4 h-4" />
              <span>Patent Application Number</span>
            </Label>
            <Input
              id="pgoPatentApplicationNumber"
              name="pgoPatentApplicationNumber"
              type="text"
              placeholder="Enter Patent Application Number"
              value={formData.pgoPatentApplicationNumber || ''}
              onChange={handleChange}
              className="mt-2 border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter the patent application number for which opposition is being filed
            </p>
          </div>

          {/* Additional PAN Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="pgoOppositionFilingDate" className="text-gray-700 font-medium">
                Opposition Filing Date
              </Label>
              <Input
                id="pgoOppositionFilingDate"
                name="pgoOppositionFilingDate"
                type="date"
                value={formData.pgoOppositionFilingDate || ''}
                onChange={handleChange}
                className="mt-2 border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="pgoOppositionStatus" className="text-gray-700 font-medium">
                Opposition Status
              </Label>
              <select
                id="pgoOppositionStatus"
                name="pgoOppositionStatus"
                value={formData.pgoOppositionStatus || ''}
                onChange={handleChange}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-red-500"
              >
                <option value="">Select Status</option>
                <option value="filed">Filed</option>
                <option value="under-review">Under Review</option>
                <option value="hearing-scheduled">Hearing Scheduled</option>
                <option value="decided">Decided</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>
          </div>

          {/* Opposition Details */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Opposition Details
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="pgoOppositionGrounds" className="text-gray-700 font-medium">
                  Opposition Grounds
                </Label>
                <textarea
                  id="pgoOppositionGrounds"
                  name="pgoOppositionGrounds"
                  rows={4}
                  placeholder="Describe the grounds for opposition..."
                  value={formData.pgoOppositionGrounds || ''}
                  onChange={handleChange}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div>
                <Label htmlFor="pgoOppositionEvidence" className="text-gray-700 font-medium">
                  Evidence Submitted
                </Label>
                <textarea
                  id="pgoOppositionEvidence"
                  name="pgoOppositionEvidence"
                  rows={4}
                  placeholder="Describe evidence submitted..."
                  value={formData.pgoOppositionEvidence || ''}
                  onChange={handleChange}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Personnel Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Personnel Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="pgoOppositionFiler" className="text-gray-700 font-medium">
                  Opposition Filer
                </Label>
                <Input
                  id="pgoOppositionFiler"
                  name="pgoOppositionFiler"
                  type="text"
                  placeholder="Enter filer name"
                  value={formData.pgoOppositionFiler || ''}
                  onChange={handleChange}
                  className="mt-2 border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg"
                />
              </div>

              <div>
                <Label htmlFor="pgoOppositionAttorney" className="text-gray-700 font-medium">
                  Attorney/Agent
                </Label>
                <Input
                  id="pgoOppositionAttorney"
                  name="pgoOppositionAttorney"
                  type="text"
                  placeholder="Enter attorney name"
                  value={formData.pgoOppositionAttorney || ''}
                  onChange={handleChange}
                  className="mt-2 border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg"
                />
              </div>

              <div>
                <Label htmlFor="pgoOppositionCost" className="text-gray-700 font-medium">
                  Opposition Cost
                </Label>
                <Input
                  id="pgoOppositionCost"
                  name="pgoOppositionCost"
                  type="number"
                  placeholder="Enter cost"
                  value={formData.pgoOppositionCost || ''}
                  onChange={handleChange}
                  className="mt-2 border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PANV2;