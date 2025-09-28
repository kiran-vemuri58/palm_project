'use client';

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CardWrapper = ({ label, title, backButtonHref, nextButtonHref, onSave, children, requireSave = false, formData = null, validateForm = null, assetId = null }) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleSave = async () => {
    if (!onSave) return;
    
    // Validate form before saving
    if (formData && validateForm) {
      const validationResult = validateForm(formData);
      if (!validationResult.isValid) {
        setValidationErrors(validationResult.errors);
        toast.error("Please fix validation errors before saving");
        return false;
      }
    }
    
    try {
      setIsSaving(true);
      const success = await onSave();
      if (success) {
        toast.success("Saved successfully");
        setValidationErrors({});
        return true;
      } else {
        return false;
      }
    } catch (e) {
      toast.error(e?.message || "Failed to save");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = () => {
    if (requireSave) {
      // For page 1: Check validation before navigating
      if (formData && validateForm) {
        const validationResult = validateForm(formData);
        if (!validationResult.isValid) {
          setValidationErrors(validationResult.errors);
          toast.error("Please fix validation errors before proceeding");
          return;
        }
      }
    }
    
    // Navigate to next page with assetId if available
    const nextUrl = assetId ? `${nextButtonHref}?assetId=${assetId}` : nextButtonHref;
    router.push(nextUrl);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-10 border border-gray-200">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-5 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">{label}</h2>
      </div>

      {/* Form Content */}
      <div className="mb-8">{children}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4">
        {backButtonHref && (
          <button
            onClick={() => {
              const backUrl = assetId ? `${backButtonHref}?assetId=${assetId}` : backButtonHref;
              router.push(backUrl);
            }}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg text-base hover:bg-gray-400 transition min-w-[120px]"
          >
            Back
          </button>
        )}
        
        <div className="flex gap-3 ml-auto">
          {onSave && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg text-base hover:bg-blue-600 transition min-w-[120px] disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          )}
          {nextButtonHref && (
            <button
              onClick={handleNext}
              className="bg-green-500 text-white px-6 py-2 rounded-lg text-base hover:bg-green-600 transition min-w-[120px]"
            >
              Next
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default CardWrapper;
