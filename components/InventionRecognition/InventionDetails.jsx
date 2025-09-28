'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFormStore from '@/store/store';
import { Star, Plus } from 'lucide-react';
import { getSafeFormValue } from '@/utils/formUtils';

const InventionDetails = ({
  isPAN = false,
  showRating = false,
  patentNumber = false,  // ✅ New flag
  formKey,
  updateFunction,
  disableCommon = false,
}) => {
  // Use the correct form data based on formKey prop
  const formData = useFormStore((state) => state[formKey] || {});
  const updateFormData = useFormStore((state) => state[updateFunction]);
  const errors = useFormStore((state) => state.errors);
  
  // Debug logging
  console.log('🔍 InventionDetails Debug:', {
    formKey,
    updateFunction,
    formData,
    hasUpdateFunction: !!updateFormData
  });
  
  // Safety check to ensure formData is defined
  const safeFormData = formData || {};
  const [rating, setRating] = useState(safeFormData.rating || 0);

  // Define base fields
  const fields = [
    { id: "inventiontitle", label: "Invention Title" },
    { id: "commonName", label: "Common Name" },
    { id: "inventordetails", label: "Inventor Details" },
  ];

  // Conditionally add extra fields
  if (showRating) {
    fields.push({ id: "rating", label: "Average Patentability Rating", isRating: true });
  }
  if (isPAN) {
    fields.push({ id: "PAN", label: "Patent Application Number" });
  }
  if (patentNumber) {
    fields.push({ id: "patentNumber", label: "Patent Number" }); // ✅ New field
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      const { setErrors } = useFormStore.getState();
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fields && fields.length > 0 ? fields.map((field) => (
          <div key={field?.id || 'unknown'} className="flex flex-col w-full">
            <Label htmlFor={field?.id || 'unknown'} className="text-gray-700 font-medium mb-2">
              {field?.label || 'Unknown Field'}
            </Label>

            {field?.isRating ? (
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
                    onClick={() => {
                      setRating(star);
                      updateFormData({ rating: star });
                    }}
                    fill={rating >= star ? "#facc15" : "none"}
                  />
                ))}
                <Plus
                  className="text-blue-500 cursor-pointer hover:text-blue-700"
                  onClick={() => alert("You clicked the add icon!")}
                />
              </div>
            ) : (
              <Input
                id={field?.id || 'unknown'}
                name={field?.id || 'unknown'}
                type="text"
                value={getSafeFormValue(formData, field?.id)}
                onChange={handleChange}
                className={`px-4 py-2 rounded-md ${
                  errors && errors[field?.id] 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder={field?.label || 'Enter value'}
                disabled={disableCommon && field?.id && ["inventiontitle", "commonName", "inventordetails"].includes(field.id)}
              />
            )}

            {errors && errors[field?.id] && (
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <p className="text-red-500 text-sm">{errors[field.id]}</p>
              </div>
            )}
          </div>
        )) : (
          <div className="col-span-full text-center text-gray-500 py-4">
            No fields available to display
          </div>
        )}
      </div>
    </div>
  );
};

export default InventionDetails;
