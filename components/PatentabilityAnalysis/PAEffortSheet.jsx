'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

const PAEffortSheetDetails = () => {
  const { formData, updateFormData } = useFormStore();
 
  // const formData = useFormStore((state) => state[formKey]);
  ///const updateFormDataByKey = useFormStore((state) => state[updateFunction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormDataByKey({ ...formData, [name]: value });
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
            value={formData.esfsearcher}
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
            value={formData.ipsearcher}
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
            value={formData.hoursSpent}
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
            value={formData.agencyRecognizer}
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
            value={formData.agencyCost}
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
            value={formData.reviewEffort}
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

export default PAEffortSheetDetails;
