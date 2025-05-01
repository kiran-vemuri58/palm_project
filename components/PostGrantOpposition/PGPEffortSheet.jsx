'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

const PGPEffortSheetDetails = () => {
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
          <Label className="mb-1">Efforts Spent for opposition of Invention</Label>
          <Input
            className="p-2"
            placeholder="Efforts Spent for opposition of Invention"
            id="ipRecognizer"
            name="ipRecognizer"
            value={formData.ipRecognizer}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">Employee ID</Label>
          <Input
            className="p-2"
            placeholder="Enter Employee ID"
            id="hoursSpent"
            name="hoursSpent"
            type="number"
            value={formData.hoursSpent}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">Number of Hours Spent</Label>
          <Input
            className="p-2"
            placeholder="Enter Number of Hours Spent"
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
          <Label className="mb-1">External Agency opposer</Label>
          <Input
            className="p-2"
            placeholder="Enter External Agency opposer"
            id="agencyCost"
            name="agencyCost"
            type="number"
            value={formData.agencyCost}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">Cost Spent on Agency</Label>
          <Input
            className="p-2"
            placeholder="Enter in currency..."
            id="reviewEffort"
            name="reviewEffort"
            type="number"
            value={formData.reviewEffort}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">Efforts in Hours for review</Label>
          <Input
            className="p-2"
            placeholder="Enter Efforts in Hours for review"
            id="managerEmpId"
            name="managerEmpId"
            value={formData.managerEmpId}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">Manager Responsible (Emp ID)</Label>
          <Input
            className="p-2"
            placeholder="Enter manager ID..."
            id="managerEmpId"
            name="managerEmpId"
            value={formData.managerEmpId}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PGPEffortSheetDetails;
