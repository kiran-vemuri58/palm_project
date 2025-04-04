import { create } from "zustand";

const useFormStore = create((set) => ({
  formData: {
    inventors: [], // 🛑 Add inventors array
  },
  errors: {},

  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  // ✅ Update specific inventor field
  updateInventor: (index, field, value) =>
    set((state) => {
      const updatedInventors = [...state.formData.inventors];
      updatedInventors[index] = { ...updatedInventors[index], [field]: value };
      return { formData: { ...state.formData, inventors: updatedInventors } };
    }),

  // ✅ Add a new empty inventor
  addInventor: () =>
    set((state) => ({
      formData: {
        ...state.formData,
        inventors: [...state.formData.inventors, { name: "", deptId: "", empId: "" }],
      },
    })),

  // ✅ Remove inventor by index
  removeInventor: (index) =>
    set((state) => ({
      formData: {
        ...state.formData,
        inventors: state.formData.inventors.filter((_, i) => i !== index),
      },
    })),

    markInventorAsSaved: (index) => // ✅ Add this function
    set((state) => {
      const updatedInventors = [...state.formData.inventors];
      if (updatedInventors[index]) {
        updatedInventors[index].isSaved = true; // Mark as saved
      }
      return { formData: { ...state.formData, inventors: updatedInventors } };
    }),

  setErrors: (errors) => set({ errors }),
  resetForm: () => set({ formData: { inventors: [] }, errors: {} }), // 🛑 Reset inventors too
}));

export default useFormStore;
