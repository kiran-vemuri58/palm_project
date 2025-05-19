'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFormStore from '@/store/store';
import { Star } from 'lucide-react';


const PPInventionDetails = ({ showRating = false ,formKey,updateFunction }) => {
  const { formData, updateFormData, errors } = useFormStore();
  const [rating, setRating] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  const fields = [
    { id: "inventiontitle", label: "Invention Title" },
    { id: "commonName", label: "Common Name" },
    { id: "InventorDetails", label: "Inventor Details" },
  ];

  // Add rating as 4th element only if flag is true
  const allFields = [...fields];

  if (showRating) {
    allFields.push({ id: "rating", label: "Average Patentability Rating", isRating: true });
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {allFields.map((field) => (
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
                    className={`cursor-pointer ${
                      rating >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => {
                      setRating(star);
                      updateFormData({ rating: star });
                    }}
                    fill={rating >= star ? "#facc15" : "none"}
                  />
                ))}
                              </div>
            ) : (
              <Input
                id={field.id}
                type="text"
                value={formData[field.id] || ""}
                onChange={(e) => updateFormData({ [field.id]: e.target.value })}
                className="border-gray-300 focus:border-blue-500 px-4 py-2 rounded-md"
                placeholder={field.label}
              />
            )}

            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
            )}
          </div>
        ))}
      <div>
          <Label className="mb-1">Name of Decision Maker</Label>
          <Input
            className="p-2"
            placeholder="Enter Name of Decision Maker"
            id="ipRecognizer"
            name="ipRecognizer"
            value={formData.ipRecognizer}
            onChange={handleChange}
          />
        </div>
      </div>
      
    </div>
  );
};

export default PPInventionDetails;
