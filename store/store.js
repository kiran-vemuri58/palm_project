import { create } from "zustand";

const useFormStore = create((set) => ({
  formData: {}, // Store all form data
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  resetForm: () => set({ formData: {} }), // Function to reset the form
}));

export default useFormStore;
