'use client';

import React from 'react';
import { Star, Plus } from 'lucide-react';
import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AveragePatentabilityRating = ({ formKey, storeKey, updateFunctionKey }) => {
  const formData = useFormStore((state) => state[storeKey]);
  const updateFormData = useFormStore((state) => state[updateFunctionKey]);

  const rating = formData?.[formKey] || 0;
  const patentAppNumber = formData?.patentApplicationNumber || '';

  const handleRating = (value) => {
    updateFormData({ [formKey]: value });
  };

  const handlePatentAppChange = (e) => {
    updateFormData({ patentApplicationNumber: e.target.value });
  };

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="flex gap-10 max-w-4xl w-full items-start justify-center">

        {/* Rating Block */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Rating</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={`cursor-pointer ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
                onClick={() => handleRating(star)}
                fill={rating >= star ? "#facc15" : "none"}
              />
            ))}
            <Plus
              className="text-blue-500 cursor-pointer hover:text-blue-700"
              onClick={() => alert("Add clicked")}
            />
          </div>
        </div>

        {/* Patent Number Block */}
        <div className="flex flex-col">
          <label htmlFor="patentApplicationNumber" className="mb-1 text-sm font-medium text-gray-700">
            Patent Application Number
          </label>
          <input
            id="patentApplicationNumber"
            type="text"
            placeholder="Enter Number"
            value={patentAppNumber}
            onChange={handlePatentAppChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-64"
          />
        </div>

      </div>
    </div>

  );
};

export default AveragePatentabilityRating;
