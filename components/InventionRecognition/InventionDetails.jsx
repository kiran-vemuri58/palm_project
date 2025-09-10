'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFormStore from '@/store/store';
import { Star, Plus } from 'lucide-react';

const InventionDetails = ({
  isPAN = false,
  showRating = false,
  patentNumber = false,  // ✅ New flag
  formKey,
  updateFunction,
  disableCommon = false,
}) => {
  const { formData, updateFormData, errors } = useFormStore();
  const [rating, setRating] = useState(formData.rating || 0);

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
        {fields.map((field) => (
          <div key={field.id} className="flex flex-col w-full">
            <Label htmlFor={field.id} className="text-gray-700 font-medium mb-2">
              {field.label}
            </Label>

            {field.isRating ? (
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
                id={field.id}
                name={field.id}
                type="text"
                value={formData[field.id] || ""}
                onChange={handleChange}
                className="border-gray-300 focus:border-blue-500 px-4 py-2 rounded-md"
                placeholder={field.label}
                disabled={disableCommon && ["inventiontitle", "commonName", "inventordetails"].includes(field.id)}
              />
            )}

            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventionDetails;
