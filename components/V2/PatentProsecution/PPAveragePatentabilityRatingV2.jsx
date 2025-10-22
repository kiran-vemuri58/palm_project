'use client';

import React from 'react';
import { Star, Plus, TrendingUp } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PPAveragePatentabilityRatingV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};

  const handleChange = (field, value) => {
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, field, value);
    } else {
      updateFormData(field, value);
    }
  };

  const handleRating = (rating) => {
    handleChange('ppapr_rating', rating);
  };

  const handlePatentAppChange = (e) => {
    handleChange('ppapr_patent_application_number', e.target.value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Average Patentability Rating</h3>
            <p className="text-purple-100 text-sm mt-1">Overall patentability assessment</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* Rating Block */}
          <div className="flex flex-col items-center space-y-4">
            <label className="text-lg font-semibold text-gray-700">Overall Rating</label>
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  className={`cursor-pointer transition-all duration-200 ${
                    (safeFormData.ppapr_rating || 0) >= star 
                      ? "text-yellow-500 scale-110" 
                      : "text-gray-300 hover:text-yellow-400 hover:scale-105"
                  }`}
                  onClick={() => handleRating(star)}
                  fill={(safeFormData.ppapr_rating || 0) >= star ? "#facc15" : "none"}
                />
              ))}
              <Plus 
                className="text-purple-500 cursor-pointer hover:text-purple-700 transition-colors duration-200 ml-2" 
                size={24}
                onClick={() => alert("Add clicked")}
              />
            </div>
            <div className="text-sm text-gray-600">
              {safeFormData.ppapr_rating ? `${safeFormData.ppapr_rating} out of 5 stars` : 'No rating selected'}
            </div>
          </div>

          {/* Patent Number Block */}
          <div className="flex flex-col space-y-4 w-full lg:w-auto">
            <label className="text-lg font-semibold text-gray-700 text-center lg:text-left">
              Patent Application Number
            </label>
            <input
              type="text"
              placeholder="Enter Patent Application Number"
              value={safeFormData.ppapr_patent_application_number || ''}
              onChange={handlePatentAppChange}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20 w-full lg:w-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPAveragePatentabilityRatingV2;
