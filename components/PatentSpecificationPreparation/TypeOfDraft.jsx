'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TypeOfDraft = ({ onChange, value }) => {
  return (
    <div className="type-of-draft w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Type of Draft
      </label>
      <Select value={value} onValueChange={onChange}>
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
