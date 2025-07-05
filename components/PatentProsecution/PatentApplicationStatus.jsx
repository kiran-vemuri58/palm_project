'use client';

import React, { useEffect } from 'react';
import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';

const PatentStatusSection = () => {
  const { formData, updateFormData } = useFormStore();

  useEffect(() => {
    if (!formData.patentStatus) {
      updateFormData({ ...formData, patentStatus: 'yes' }); // default to yes
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    updateFormData({ ...formData, [name]: files[0] || null });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* ✅ Always Visible First Row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="mb-1">Patent Status</Label>
          <Select
            value={formData.patentStatus}
            onValueChange={(value) =>
              updateFormData({ ...formData, patentStatus: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1">Patent Number</Label>
          <Input
            placeholder="Enter patent number"
            name="patentNumber"
            value={formData.patentNumber || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label className="mb-1">Patent Attachment</Label>
          <Input
            type="file"
            name="patentAttachment"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* ✅ Conditionally Visible Second Row */}
      {formData.patentStatus === 'yes' && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <Label className="mb-1">Patent Grant Date</Label>
            <Input
              type="date"
              name="patentGrantDate"
              value={formData.patentGrantDate || ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2">
            <Label className="mb-1">Why Patent is Rejected</Label>
            <Input
              type="file"
              name="rejectionReasonAttachment"
              onChange={handleFileUpload}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PatentStatusSection;
