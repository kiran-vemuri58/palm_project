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

const PatentCommercializationChild = ({formKey,updateFunction}) => {

  const formData = useFormStore((state) => state[formKey]);
  const updateFormData = useFormStore((state) => state[updateFunction]);
  //const { formData, updateFormData } = useFormStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    updateFormData({ ...formData, [name]: files[0] || null });
  };

  const handleSelectChange = (name, value) => {
    updateFormData({ ...formData, [name]: value });
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
            value={formData.inventionStage || ''}
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
          <Input
            type="file"
            name="implementationFile"
            onChange={handleFileUpload}
          />
        </div>

        {/* Working of Invention filed */}
        <div>
          <Label>Working of Invention filed?</Label>
          <Select
            value={formData.isWorkingFiled || ''}
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
            value={formData.firstWorkingDate || ''}
            onChange={handleChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PatentCommercializationChild;
