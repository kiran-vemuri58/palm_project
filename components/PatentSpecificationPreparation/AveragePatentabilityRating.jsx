'use client';

import React from 'react';
import { Star, Plus } from 'lucide-react';
import useFormStore from '@/store/store';

const AveragePatentabilityRating = ({ formKey, storeKey, updateFunctionKey }) => {
  const formData = useFormStore((state) => state[storeKey]);
  const updateFormData = useFormStore((state) => state[updateFunctionKey]);

  const rating = formData?.[formKey] || 0;

  const handleRating = (value) => {
    updateFormData({ [formKey]: value });
  };

  return (
    <div className="flex justify-center">
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
          onClick={() => alert("You clicked the add icon!")}
        />
      </div>
    </div>
  );
};

export default AveragePatentabilityRating;
