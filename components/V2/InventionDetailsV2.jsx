'use client';

import React, { useState } from 'react';
import { Star, Plus, Edit3, Save, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const InventionDetailsV2 = ({
  page = 'inventionRecognition',
  errors = {},
  isEditable = true,
  showRating = false,
  showPatentNumber = false,
  isNewAsset = false,
  showOnlyBasicFields = false,
  formData: externalFormData = null, // Accept external form data
  updateFormData: externalUpdateFormData = null // Accept external update function
}) => {
  const [isEditing, setIsEditing] = useState(isNewAsset); // Start in edit mode for new assets
  
  // Get form data and actions from store (use external data if provided)
  const storeFormData = useV2Store((state) => state.getFormData(page));
  const storeUpdateFormData = useV2Store((state) => state.updateFormData);
  const setErrors = useV2Store((state) => state.setErrors);
  
  // Use external data if provided, otherwise use store data
  const formData = externalFormData || storeFormData;
  const updateFormData = externalUpdateFormData || storeUpdateFormData;
  
  const [localData, setLocalData] = useState(formData);

  const handleChange = (field, value) => {
    // Don't update store if not editable
    if (!isEditable) {
      return;
    }
    
    // Validate rating field
    if (field === 'rating') {
      // Allow empty string or valid numbers between 0-5
      if (value !== '' && (isNaN(parseInt(value)) || parseInt(value) < 0 || parseInt(value) > 5)) {
        return; // Don't update if invalid rating
      }
    }
    
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    
    // Always update the store immediately for real-time saving
    updateFormData(page, field, value);
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleSave = () => {
    // Validate required fields for the first three fields
    const requiredFields = ['inventiontitle', 'commonname', 'inventordetails'];
    const newErrors = {};
    
    requiredFields.forEach(field => {
      if (!localData[field] || !localData[field].trim()) {
        newErrors[field] = `${field === 'inventiontitle' ? 'Invention Title' : 
                          field === 'commonname' ? 'Common Name' : 
                          'Inventor Details'} is required`;
      }
    });
    
    // If there are validation errors, don't save
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Clear any existing errors
    setErrors({});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalData(formData);
    setIsEditing(false);
  };

  // Define all possible fields
  const allFields = [
    { 
      id: "inventiontitle", 
      label: "Invention Title", 
      placeholder: "Enter the title of your invention",
      required: true,
      type: "text"
    },
    { 
      id: "commonname", 
      label: "Common Name", 
      placeholder: "Enter the common name or trade name",
      required: true,
      type: "text"
    },
    { 
      id: "inventordetails", 
      label: "Inventor Details", 
      placeholder: "Enter inventor names",
      required: true,
      type: "text"
    },
    { 
      id: "patentNumber",
      label: "Patent Number",
      placeholder: "Enter patent number if available",
      required: false,
      type: "text"
    },
    { 
      id: "rating",
      label: "Patentability Rating",
      placeholder: "Rate the patentability",
      required: false,
      type: "rating"
    }
  ];

  // Filter fields based on props
  let fields = allFields;

  if (showOnlyBasicFields) {
    // Only show first 3 fields for basic forms
    fields = allFields.slice(0, 3);
  } else {
    // Show fields based on individual flags
    fields = allFields.filter(field => {
      if (field.id === "patentNumber") return showPatentNumber;
      if (field.id === "rating") return showRating;
      return true; // Always show the first 3 basic fields
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Edit3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Invention Details</h3>
              <p className="text-sm text-gray-600">Basic information about your invention</p>
            </div>
          </div>
          
          {isEditable && !isNewAsset && (
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span className="text-sm font-medium">Edit</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span className="text-sm font-medium">Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span className="text-sm font-medium">Cancel</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {isNewAsset && (
            <div className="flex items-center space-x-2">
              <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                <span className="text-sm font-medium">Creating New Asset</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.id} className={`${field.type === 'textarea' ? 'lg:col-span-2' : ''}`}>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
                {errors[field.id] && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors[field.id]}
                  </span>
                )}
              </label>

              {field.type === 'rating' ? (
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleChange('rating', star)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={28}
                        className={`transition-colors ${
                          (localData.rating || 0) >= star 
                            ? "text-yellow-400 fill-current" 
                            : "text-gray-300 hover:text-yellow-300"
                        }`}
                      />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => alert("Add more rating options")}
                    className="ml-2 p-1 text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                  <span className="ml-2 text-sm text-gray-600">
                    {localData.rating ? `${localData.rating}/5` : 'Not rated'}
                  </span>
                </div>
              ) : field.type === 'textarea' ? (
                <textarea
                  value={localData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  disabled={!isEditable}
                  rows={4}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors[field.id] 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                  } ${
                    !isEditable 
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
                      : 'bg-white'
                  }`}
                />
              ) : (
                <input
                  type={field.type}
                  value={localData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  disabled={!isEditable}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors[field.id] 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                  } ${
                    !isEditable 
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
                      : 'bg-white'
                  }`}
                />
              )}

            </div>
          ))}
        </div>

        {/* Status Indicator */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                isEditing ? 'bg-yellow-400' : 'bg-green-400'
              }`}></div>
              <span className="text-sm font-medium text-gray-600">
                {isEditing ? 'Editing mode' : 'View mode'}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventionDetailsV2;
