'use client';

import React from 'react';
import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import FileInput from '@/components/ui/file-input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const PatentCommercializationChild = ({formKey,updateFunction}) => {

  const formData = useFormStore((state) => state[formKey]);
  const updateFormData = useFormStore((state) => state[updateFunction]);
  //const { formData, updateFormData } = useFormStore();
  
  // Safety check to ensure formData is defined
  const safeFormData = formData || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...safeFormData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const { name, value } = e.target; // array of File
    updateFormData({ ...safeFormData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    updateFormData({ ...safeFormData, [name]: value });
  };

  const implementationStages = [
    'Idea',
    'Prototype',
    'Testing',
    'MVP',
    'Real scale product',
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">

      <div className="grid grid-cols-3 gap-4">
        {/* Stage of Implementation */}
        <div>
          <Label>Stage of Implementation of Invention</Label>
          <Select
            value={safeFormData.inventionStage || ''}
            onValueChange={(value) =>
              handleSelectChange('inventionStage', value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {implementationStages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* File Upload for Stage Details */}
        <div>
          <Label>Brief details of stage of Implementation</Label>
          <FileInput
            name="implementationFile"
            multiple={true}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
            value={safeFormData.implementationFile || []}
            onChange={handleFileUpload}
            maxFiles={20}
            maxFileSize={20 * 1024 * 1024}
          />
        </div>

        {/* Working of Invention filed */}
        <div>
          <Label>Working of Invention filed?</Label>
          <Select
            value={safeFormData.isWorkingFiled || ''}
            onValueChange={(value) =>
              handleSelectChange('isWorkingFiled', value)
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

        {/* Date of First Working Filed */}
        <div className="col-span-3">
          <Label>Date of First Working Of Invention Filed</Label>
          <Input
            type="date"
            name="firstWorkingDate"
            value={safeFormData.firstWorkingDate || ''}
            onChange={handleChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PatentCommercializationChild;
