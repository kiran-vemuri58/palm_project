'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useFormStore from '@/store/store';

const PMEffortSheet = () => {
  const { formData, updateFormData } = useFormStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Efforts Spent for management of Invention</Label>
          <Input
            name="effortsSpent"
            placeholder="Enter efforts spent"
            value={formData.effortsSpent || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Employee ID</Label>
          <Input
            name="employeeId"
            placeholder="Enter employee ID"
            value={formData.employeeId || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Number of Hours Spent</Label>
          <Input
            name="hoursSpent"
            placeholder="Enter number of hours spent"
            value={formData.hoursSpent || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>External Agency Manager</Label>
          <Input
            name="agencyManager"
            placeholder="Type the name of entity or vendor code"
            value={formData.agencyManager || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Cost Spent on Agency</Label>
          <Input
            name="agencyCost"
            placeholder="Type in currency"
            value={formData.agencyCost || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Efforts in Hours for review</Label>
          <Input
            name="reviewEfforts"
            placeholder="Efforts in Hours for review"
            value={formData.reviewEfforts || ''}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-3">
          <Label>Manager Responsible</Label>
          <Input
            name="managerResponsible"
            placeholder="Enter name of manager responsible"
            value={formData.managerResponsible || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PMEffortSheet;
