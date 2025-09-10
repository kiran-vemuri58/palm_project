'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import FileInput from '@/components/ui/file-input';
import { Label } from '@/components/ui/label';
import React from 'react';

const DecisionSheet = ({formKey, updateFunction}) => {
  const formData = useFormStore((state) => state[formKey]);
  const updateFormDataByKey = useFormStore((state) => state[updateFunction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormDataByKey({ [name]: value });
  };
  const handleFileUpload = (e) => {
    const { name, value } = e.target; // value is array of File
    updateFormDataByKey({ [name]: value });
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
            name="nodc"
            value={formData.nodc || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">decision in brief</Label>
          <Input
            className="p-2"
            placeholder="Enter decision in brief"
            id="dibrief"
            name="dibrief"
            value={formData.dibrief || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">Attachment</Label>
          <FileInput
            id="attachments"
            name="attachments"
            multiple={true}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
            value={formData.attachments || []}
            onChange={handleFileUpload}
            maxFiles={10}
            maxFileSize={20 * 1024 * 1024}
          />
        </div>
      </div>

      
    </div>
  );
};

export default DecisionSheet;
