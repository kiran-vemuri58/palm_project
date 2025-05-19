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
  
    //  Experiments
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

    // Effort Sheet
    ipRecognizer: '',
    hoursSpent: '',
    agencyRecognizer: '',
    agencyCost: '',
    reviewEffort: '',
    managerEmpId: '',

    // Activity Status
    activityStatus: '',

  },

  formData2: {

    // Extractor Details-9
    extractorOne: '',
    extractortwo: '',
    iEDate:'',
    iawpl: '',
    nfeature: '',
    ifeature: '',
    idattachments: '',
    scountry: '',
    oextractor:'',

    
    // Effort Sheet-6
    ipRecognizer: '',
    hoursSpent: '',
    agencyRecognizer: '',
    agencyCost: '',
    reviewEffort: '',
    managerEmpId: '',

    // Activity Status
    activityStatus: '',
    
    // Updates NBA
    updatenba: '',
    
  },
  formData3: {
    // Extractor Details
    psone: '',
    pstwo: '',
    rating: '',
    nfeature: '',
    ifeature: '',
    scountry: '',
    ooextractor: '',

    // Invention Details
    trainRun: '',

    // Decission sheet
    nodc: '',
    dibrief: '',

      // Effort Sheet-6
      ipRecognizer: '',
      hoursSpent: '',
      agencyRecognizer: '',
      agencyCost: '',
      reviewEffort: '',
      managerEmpId: '',
  
      // Activity Status
      activityStatus: '',

  },

  formData4:{
    nodrafter: '',
    noreviewer: '',

    bned: '',
    ifdescribed: '',
    toinvention: '',
    esfd: '',
    pdrafter: '',
    nohspent: '',
    eafd: '',
    csoagency: '',
    eihfr: '',
    mres: '',
  },
  formData5:{

  },
  
  
  formData6:{
    //PPInvention Details
    
    // Patent Prosecution
    apopposed: '',
    oname: '',
    cfbopposer:'',
    boaof: '',
    rffo: '',

    orpby: '',
    eagency: '',
    revby: '',

    // Patent Application status
    pstatus: '',
    pnumber: '',

    pgdate: '',

    pgdate: '',
    
    //FER
    
  },
  formData7:{
    // Patent Prosecution
    apopposed: '',
    oname: '',
    cfbopposer:'',
    boaof: '',
    rffo: '',

    orpby: '',
    eagency: '',
    revby: '',

    // Patent Application status
    pstatus: '',
    pnumber: '',

    pgdate: '',

    pgdate: '',
    
    //FER
    
  },
  formData8:{

  },
  formData9:{

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
      updateFormData3: (data) =>
        set((state) => ({
          formData2: { ...state.formData3, ...data },
        })),
        updateFormData4: (data) =>
          set((state) => ({
            formData2: { ...state.formData4, ...data },
          })),
          updateFormData5: (data) =>
            set((state) => ({
              formData2: { ...state.formData5, ...data },
            })),
            updateFormData6: (data) =>
              set((state) => ({
                formData2: { ...state.formData6, ...data },
              })),
              updateFormData7: (data) =>
                set((state) => ({
                  formData2: { ...state.formData7, ...data },
                })),
                updateFormData8: (data) =>
                  set((state) => ({
                    formData2: { ...state.formData2, ...data },
                  })),  
                updateFormData9: (data) =>
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
