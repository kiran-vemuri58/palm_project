'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

const PPEffortSheet = () => {
  const { formData, updateFormData } = useFormStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">

      {/* First Row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="mb-1">Request for review submitter</Label>
          <Input
            className="p-2"
            placeholder="Enter employee ID..."
            id="ipRecognizer"
            name="ipRecognizer"
            value={formData.ipRecognizer}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">External Agency</Label>
          <Input
            className="p-2"
            placeholder="Enter External Agency"
            id="hoursSpent"
            name="hoursSpent"
            type="number"
            value={formData.hoursSpent}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">Cost spent on Agency</Label>
          <Input
            className="p-2"
            placeholder="Enter Cost spent on Agency"
            id="agencyRecognizer"
            name="agencyRecognizer"
            value={formData.agencyRecognizer}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <Label className="mb-1">Request for Review Reviewer
          </Label>
          <Input
            className="p-2"
            placeholder="Enter Enter Employee ID"
            id="agencyCost"
            name="agencyCost"
            type="number"
            value={formData.agencyCost}
            onChange={handleChange}
          />
        </div>
        
      </div>
    </div>
  );
};

export default PPEffortSheet;
