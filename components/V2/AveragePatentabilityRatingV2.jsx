'use client';

import React from 'react';
import { Award, Star, Plus } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const AveragePatentabilityRatingV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};

  const handleChange = (fieldName, value) => {
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, fieldName, value);
    } else {
      updateFormData(fieldName, value);
    }
  };

  const handleRating = (value) => {
    handleChange('rating', value);
  };

  const handlePatentAppChange = (e) => {
    handleChange('patentApplicationNumber', e.target.value);
  };

  const rating = safeFormData.rating || 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 rounded-lg p-2">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Average Patentability Rating</h3>
            <p className="text-green-100 text-sm">Overall patentability assessment</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="w-full flex justify-center">
          <div className="flex gap-10 max-w-4xl w-full items-start justify-center">
            
            {/* Rating Block */}
            <div className="flex flex-col">
              <label className="mb-3 text-sm font-semibold text-gray-700">Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer transition-all duration-200 ${
                      rating >= star 
                        ? "text-yellow-500 hover:text-yellow-600 transform scale-110" 
                        : "text-gray-300 hover:text-gray-400"
                    }`}
                    onClick={() => handleRating(star)}
                    fill={rating >= star ? "#facc15" : "none"}
                  />
                ))}
                <Plus
                  className="text-green-500 cursor-pointer hover:text-green-700 transition-colors duration-200"
                  onClick={() => alert("Add clicked")}
                />
              </div>
            </div>

            {/* Patent Number Block */}
            <div className="flex flex-col">
              <label htmlFor="patentApplicationNumber" className="mb-3 text-sm font-semibold text-gray-700">
                Patent Application Number
              </label>
              <input
                id="patentApplicationNumber"
                type="text"
                placeholder="Enter Number"
                value={safeFormData.patentApplicationNumber || ''}
                onChange={handlePatentAppChange}
                className="w-64 px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AveragePatentabilityRatingV2;