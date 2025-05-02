import { create } from "zustand";

const useFormStore = create((set) => ({
  uploadedPaths: {},
  formData: {
    // Invention Details
    inventiontitle: '',
    commonName: '',
    inventorDetails: '',
  
    // Inventors
    inventors: [],
  
    // Technology Details
    incrementalRenovation: '',      // Yes/No
    patentNumbers: '',
    journalNumbers: '',             // Used in multiple places, okay to share
    productIdentity: '',
    problemAddressed: '',
  
    // Train Run / Experimentation
    trainRun: '',                   // Yes/No
    experimentResults: '',
    evidence: null,
    minuteOfMeeting: null,
    attachments: null,
  
    // IP Review Section
    ipRecognizer: '',
    hoursSpent: '',
    agencyRecognizer: '',
    agencyCost: '',
    reviewEffort: '',
    managerEmpId: '',
  
    // Entity Details
    entity: '',
    date: '',                       // Format: YYYY-MM-DD
    inventionCountry: '',
    creationCountry: '',
    collaboration: '',              // Yes/No
    collaboratorName: '',
    collaboratorCountry: '',
    stakeholders: '', 
    journalNumbers: '',          // 💡 Required for collaboration: 'yes'
    productIdentity: '', 
  },

  formData2: {

    // Extractor Details
    extractorOne: '',
    extractortwo: '',
    iedate:'',
    iawpl: '',
    nfeature: '',
    ifeature: '',
    idattachments: '',
    scountry: '',
    oextractor:'',

    // Invention Details
    
  },
  
  errors: {},

  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
    updateFormData2: (data) =>
      set((state) => ({
        formData2: { ...state.formData2, ...data },
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
