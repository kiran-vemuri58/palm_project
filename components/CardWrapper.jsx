'use client';

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CardWrapper = ({ label, title, backButtonHref, nextButtonHref, onSave, children, requireSave = false, formData = null, validateForm = null, nextButtonEnabled = true }) => {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const handleSave = async () => {
    if (!onSave) return;
    try {
      setIsSaving(true);
      const success = await onSave();
      if (success) {
      toast.success("Saved successfully");
        setValidationError(false);
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
      setValidationError(false); // Reset validation error when opening dialog
      
      // Check validation immediately when opening dialog
      if (formData && validateForm) {
        const errors = validateForm(formData);
        const hasValidationErrors = Object.keys(errors).length > 0;
        setShowValidationMessage(hasValidationErrors);
        console.log('🔍 Validation check on Next click:', { errors, hasValidationErrors });
      } else {
        setShowValidationMessage(false);
      }
      
      setConfirmOpen(true);
    } else {
      router.push(nextButtonHref);
    }
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
            onClick={() => router.push(backButtonHref)}
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
            <div className="flex flex-col items-end">
              <button
                onClick={handleNext}
                disabled={!nextButtonEnabled}
                className={`px-6 py-2 rounded-lg text-base transition min-w-[120px] ${
                  nextButtonEnabled 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
              </button>
              {!nextButtonEnabled && (
                <p className="text-xs text-gray-500 mt-1">Save first to enable</p>
              )}
            </div>
          )}
        </div>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save required to continue</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {showValidationMessage 
              ? "Please enter those three fields: Invention Title, Common Name, and Inventor Details before proceeding to the next step."
              : "You must save your data before proceeding to the next step."
            }
          </p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button
              onClick={async () => {
                console.log('🔍 Save button clicked');
                const ok = await handleSave();
                console.log('🔍 handleSave result:', ok);
                if (ok) {
                  setConfirmOpen(false);
                  router.push(nextButtonHref);
                } else {
                  // Show validation error message
                  console.log('🔍 Setting showValidationMessage to true');
                  setShowValidationMessage(true);
                }
              }}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save & Continue"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CardWrapper;
