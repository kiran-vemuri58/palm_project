'use client';

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CardWrapper = ({ label, title, backButtonHref, nextButtonHref, onSave, children }) => {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!onSave) return;
    try {
      setIsSaving(true);
      await onSave();
      toast.success("Saved successfully");
      return true;
    } catch (e) {
      toast.error(e?.message || "Failed to save");
      return false;
    } finally {
      setIsSaving(false);
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
      <div className={`flex ${backButtonHref && nextButtonHref ? "justify-between" : "justify-center"}`}>
        {backButtonHref && (
          <button
            onClick={() => router.push(backButtonHref)}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg text-base hover:bg-gray-400 transition min-w-[120px]"
          >
            Back
          </button>
        )}
        {nextButtonHref && (
          <button
            onClick={() => setConfirmOpen(true)}
            className="bg-green-500 text-white px-6 py-2 rounded-lg text-base hover:bg-green-600 transition min-w-[120px]"
          >
            Save & Next
          </button>
        )}
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save and continue?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">We will save your data and move to the next step.</p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button
              onClick={async () => {
                const ok = await handleSave();
                if (ok) {
                  setConfirmOpen(false);
                  router.push(nextButtonHref);
                }
              }}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save & Next"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CardWrapper;
