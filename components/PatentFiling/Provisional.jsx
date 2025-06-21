'use client';

import React from 'react';
import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const Provisional = () => {
  const { formData, updateFormData } = useFormStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    updateFormData({ [name]: files[0] || null });
  };

  const handleSelectChange = (name, value) => {
    updateFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Name of Patent Filing</Label>
          <Input
            placeholder="Enter Name of Patent Filing"
            name="patentFilingName"
            value={formData.patentFilingName || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Submitted Provisional Patent Application</Label>
          <Input
            type="file"
            name="provisionalPatent"
            onChange={handleFileUpload}
          />
        </div>
        <div>
          <Label>Attachment</Label>
          <Input
            type="file"
            name="attachment"
            onChange={handleFileUpload}
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
          <Label>Applicant Name</Label>
          <Input
            placeholder="Enter Applicant Name"
            name="applicantName"
            value={formData.applicantName || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Is Profile Patent?</Label>
          <Select
            value={formData.isProfilePatent || ''}
            onValueChange={(value) => handleSelectChange('isProfilePatent', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Is Defensive Patent?</Label>
          <Select
            value={formData.isDefensivePatent || ''}
            onValueChange={(value) => handleSelectChange('isDefensivePatent', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Claiming Any Startup?</Label>
          <Input
            type="file"
            name="claimingStartup"
            onChange={handleFileUpload}
          />
        </div>
        <div>
          <Label>POA Sent to Office</Label>
          <Input
            placeholder="Enter POA Sent Office"
            name="poaOffice"
            value={formData.poaOffice || ''}
            onChange={handleChange}
          />
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

export default Provisional;
