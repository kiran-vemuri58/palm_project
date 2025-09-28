'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

const PAEffortSheetDetails = ({formKey, updateFunction}) => {
  const formData = useFormStore((state) => state[formKey]);
  const updateFormDataByKey = useFormStore((state) => state[updateFunction]);
  
  const safeFormData = formData || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      updateFormDataByKey({ [name]: value });
    } else {
      console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">

      {/* First Row */}
      <div className="grid grid-cols-3 gap-4">
      <div>
          <Label className="mb-1">Efforts spent for searcher</Label>
          <Input
            className="p-2"
            placeholder="Enter employee ID..."
            id="esfsearcher"
            name="esfsearcher"
            value={safeFormData.esfsearcher || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">IP searcher (Emp ID)</Label>
          <Input
            className="p-2"
            placeholder="Enter employee ID..."
            id="ipsearcher"
            name="ipRecognizer"
            value={safeFormData.ipRecognizer || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">No of Hours Spent</Label>
          <Input
            className="p-2"
            placeholder="Enter hours..."
            id="hoursSpent"
            name="hoursSpent"
            type="number"
            value={safeFormData.hoursSpent || ''}
            onChange={handleChange}
          />
        </div>
        
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
      <div>
          <Label className="mb-1">External Agency Recognizer</Label>
          <Input
            className="p-2"
            placeholder="Enter agency name..."
            id="agencyRecognizer"
            name="agencyRecognizer"
            value={safeFormData.agencyRecognizer || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">Cost Spent on Agency</Label>
          <Input
            className="p-2"
            placeholder="Enter cost..."
            id="agencyCost"
            name="agencyCost"
            type="number"
            value={safeFormData.agencyCost || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">Effort Hours for Review</Label>
          <Input
            className="p-2"
            placeholder="Enter review hours..."
            id="reviewEffort"
            name="reviewEffort"
            type="number"
            value={safeFormData.reviewEffort || ''}
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
            value={safeFormData.managerEmpId || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PAEffortSheetDetails;
