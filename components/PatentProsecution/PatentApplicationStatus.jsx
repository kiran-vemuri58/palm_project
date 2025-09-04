'use client';

import React, { useEffect } from 'react';
import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import FileInput from '@/components/ui/file-input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';

const PatentStatusSection = ({formKey,updateFunction}) => {

  const formData = useFormStore((state) => state[formKey]);
  const updateFormData = useFormStore((state) => state[updateFunction]);

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
    const { name, value } = e.target; // array of File
    updateFormData({ ...formData, [name]: value });
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
          <FileInput
            name="patentAttachment"
            multiple={true}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            value={formData.patentAttachment || []}
            onChange={handleFileUpload}
            maxFiles={10}
            maxFileSize={20 * 1024 * 1024}
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
            <FileInput
              name="rejectionReasonAttachment"
              multiple={true}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              value={formData.rejectionReasonAttachment || []}
              onChange={handleFileUpload}
              maxFiles={10}
              maxFileSize={20 * 1024 * 1024}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PatentStatusSection;
