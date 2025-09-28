'use client';

import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFormStore from '@/store/store';

const InventionDetails = ({ disableCommon = false }) => {
  const { formData, updateFormData, errors } = useFormStore();
  
  // Safety check to ensure formData is defined
  const safeFormData = formData || {};

  const fields = [
    { id: "inventiontitle", label: "Invention Title" },
    { id: "commonName", label: "Common Name" },
    { id: "InventorDetails", label: "Inventor Details" },
  ];

  return (
    <div className="flex gap-6 w-full">
      {fields.map((field) => (
        <div key={field.id} className="flex flex-col w-full px-2">
          <Label            htmlFor={field.id}
            className="text-gray-700 font-medium mb-2 px-1"
          >
            {field.label}
          </Label>
          <Input
            id={field.id}
            type="text"
            value={safeFormData[field.id] || ""}
            onChange={(e) => updateFormData({ [field.id]: e.target.value })}
            className="border-gray-300 focus:border-blue-500 px-4 py-2 rounded-md"
            placeholder={field.label}
            disabled={disableCommon && ["inventiontitle", "commonName", "inventordetails", "InventorDetails"].includes(field.id)}
          />
          {errors[field.id] && (
            <p className="text-red-500 text-sm mt-1 px-1">{errors[field.id]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default InventionDetails;
