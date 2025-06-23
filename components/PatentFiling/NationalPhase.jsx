'use client';

import React from 'react';
import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const NationalPhase = () => {
  const { formData, updateFormData } = useFormStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    updateFormData({ [name]: files[0] || null });
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
          <Label>Date of Provisional Patent Application</Label>
          <Input
            type="date"
            name="dateProvisionalPatent"
            value={formData.dateProvisionalPatent || ''}
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
          <Label>Date Complete Patent Application</Label>
          <Input
            type="date"
            name="dateCompletePatentApplication"
            value={formData.dateCompletePatentApplication || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Date of PCT Patent Application</Label>
          <Input
            type="date"
            name="datePCTPatentApplication"
            value={formData.datePCTPatentApplication || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Final Submitted</Label>
          <Input
            placeholder="Enter Final Submitted"
            name="finalSubmitted"
            value={formData.finalSubmitted || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Filed Forms</Label>
          <Input
            type="file"
            name="filedForms"
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

export default NationalPhase;
