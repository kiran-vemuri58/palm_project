'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFormStore from '@/store/store';

const TypeOfDraft = ({ onChange, value }) => {

  const formData4 = useFormStore((state) => state.formData4);
  const setFormData4 = useFormStore((state) => state.updateFormData4);


  // Handler for selection change
  const handleValueChange = (newDraftType) => {
    // Update parent's state
    onChange(newDraftType);

    // Update Zustand store's formData4 draft type
    // assuming formData4 is an object and has a 'draftType' field
    setFormData4({
      ...formData4,
      draftType: newDraftType,
    });
  };

  return (
    <div className="type-of-draft w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Type of Draft
      </label>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full border-gray-300">
          <SelectValue placeholder="Select draft type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="provisional">Provisional</SelectItem>
          <SelectItem value="complete">Complete</SelectItem>
          <SelectItem value="pct">PCT</SelectItem>
          <SelectItem value="national_phase">National Phase</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TypeOfDraft;
