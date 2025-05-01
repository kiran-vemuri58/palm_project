'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

const DecisionSheet = () => {
  const { formData, updateFormData } = useFormStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };
  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    updateFormData({ [name]: files[0] || null }); // Store only the first file or null
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">

      {/* First Row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="mb-1">Name of Decision Maker</Label>
          <Input
            className="p-2"
            placeholder="Enter Name of Decision Maker"
            id="ipRecognizer"
            name="ipRecognizer"
            value={formData.ipRecognizer}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">decision in brief</Label>
          <Input
            className="p-2"
            placeholder="Enter decision in brief"
            id="hoursSpent"
            name="hoursSpent"
            type="number"
            value={formData.hoursSpent}
            onChange={handleChange}
          />
        </div>
        <div>
              <Label className="mb-1">Attachment</Label>
              <Input
                type="file"
                id="attachments"
                name="attachments"
                className="grid w-full max-w-sm items-center gap-1.5"
                onChange={handleFileUpload}
              />
            </div>
      </div>

      
    </div>
  );
};

export default DecisionSheet;
