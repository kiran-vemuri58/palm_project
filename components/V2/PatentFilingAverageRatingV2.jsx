'use client';

import React, { useState, useEffect } from 'react';
import { Star, Plus, Award } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const PatentFilingAverageRatingV2 = ({ page }) => {
  // Get form data from store using page parameter
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const safeFormData = formData || {};
  const [rating, setRating] = useState(safeFormData.averageRating || 0);

  // Update local state when formData changes
  useEffect(() => {
    if (safeFormData.averageRating) {
      setRating(safeFormData.averageRating);
    }
  }, [safeFormData.averageRating]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    updateFormData(page, 'averageRating', newRating);
  };

  const handleChange = (field, value) => {
    updateFormData(page, field, value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Average Patentability Rating</h3>
            <p className="text-sm text-gray-600">Overall patentability assessment and application details</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Rating Section */}
          <div className="flex flex-col items-center space-y-4">
            <label className="text-lg font-semibold text-gray-700">
              Average Patentability Rating
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  className={`cursor-pointer transition-all duration-200 hover:scale-110 ${
                    rating >= star ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => handleRatingChange(star)}
                  fill={rating >= star ? "#facc15" : "none"}
                />
              ))}
              <Plus
                size={24}
                className="text-green-500 cursor-pointer hover:text-green-700 transition-colors ml-2"
                onClick={() => alert("Add new evaluator functionality")}
              />
            </div>
            <div className="text-sm text-gray-500">
              {rating > 0 ? `${rating} out of 5 stars` : 'No rating selected'}
            </div>
          </div>

          {/* Patent Application Number Section */}
          <div className="flex flex-col items-center space-y-4">
            <label className="text-lg font-semibold text-gray-700">
              Patent Application Number
            </label>
            <input
              type="text"
              value={safeFormData.patentApplicationNumber || ''}
              onChange={(e) => handleChange('patentApplicationNumber', e.target.value)}
              placeholder="Enter Patent Application Number"
              className="w-80 px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-green-500 focus:ring-green-500/20 text-center"
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-700">
              <strong>Rating Scale:</strong> 1 = Low Patentability, 5 = High Patentability
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatentFilingAverageRatingV2;
