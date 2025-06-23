'use client';

import React from 'react';
import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const PCT = () => {
  const { formData, updateFormData } = useFormStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    updateFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Post Dated</Label>
          <Input
            placeholder="Enter Post Dated"
            name="postDated"
            value={formData.postDated || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Date Provision</Label>
          <Input
            type="date"
            name="dateProvision"
            value={formData.dateProvision || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Application Provisional Number</Label>
          <Input
            placeholder="Enter Application Provisional Number"
            name="applicationProvisionalNumber"
            value={formData.applicationProvisionalNumber || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Date of Patent Application</Label>
          <Input
            type="date"
            name="datePatentApplication"
            value={formData.datePatentApplication || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Is permission for PCT filing is obtained?</Label>
          <Select
            value={formData.pctFilingPermission || ''}
            onValueChange={(value) =>
              handleSelectChange('pctFilingPermission', value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Efforts Spent</Label>
          <Input
            placeholder="Enter Efforts Spent"
            name="effortsSpent"
            value={formData.effortsSpent || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Patent Filer</Label>
          <Input
            placeholder="Enter Patent Filer"
            name="patentFiler"
            value={formData.patentFiler || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Hours Spent</Label>
          <Input
            placeholder="Enter Hours Spent"
            name="hoursSpent"
            value={formData.hoursSpent || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>External Agency Recognizer</Label>
          <Input
            placeholder="Enter External Agency Recognizer"
            name="agencyRecognizer"
            value={formData.agencyRecognizer || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Agency Cost</Label>
          <Input
            placeholder="Enter Agency Cost"
            name="agencyCost"
            value={formData.agencyCost || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Manager Responsible</Label>
          <Input
            placeholder="Enter Manager Responsible"
            name="managerResponsible"
            value={formData.managerResponsible || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PCT;
