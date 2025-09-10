import { create } from "zustand";
import { devtools } from 'zustand/middleware';

const useFormStore = create(devtools((set) => ({
  uploadedPaths: {},
  assetId: '',
  formData: {
    // Invention Details
    inventiontitle: '',
    commonName: '',
    inventordetails: '',

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
    evidence: [],
    minuteOfMeeting: [],
    attachments: [],

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
    entityJournalNumbers: '',       // Entity-specific journal numbers
    entityProductIdentity: '',      // Entity-specific product identity

    // Activity Status
    activityStatus: '',

    uploadedFilePaths: {
      evidence: [],
      minuteOfMeeting: [],
      attachments: []
    }

  },

  formData2: {

    // Extractor Details-9
    extractorOne: '',
    extractortwo: '',
    iEDate: '',
    iawpl: '',
    nfeature: '',
    ifeature: '',
    idattachments: [],
    scountry: '',
    oextractor: '',


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
    rating: 0,
    nfeature: '',
    ifeature: '',
    scountry: '',
    ooextractor: '',

    // Invention Details
    trainRun: '',

    // Decission sheet
    nodc: '',
    dibrief: '',
    attachment: [],

    // Effort Sheet-6
    esfsearcher: '',
    ipRecognizer: '',
    hoursSpent: '',
    agencyRecognizer: '',
    agencyCost: '',
    reviewEffort: '',
    managerEmpId: '',

    // Activity Status
    activityStatus: '',

  },

  formData4: {
    activityStatus: '',
    draftType: '',
    rating: 0, // Default rating value

    //national Phase

    npPCTDate: '',
    npApplicationNumber: '',
    npPCTPublication: '',
    npSearchReport: [],
    npPCTOrProvisionalDate: '',
    npApplicationCountry: '',
    npDrafterName: '',
    npClaimSheet: [],
    npFormsPrepared: 'No',
    npCountryFiling: '',
    npReviewBy: '',
    npCitedPatent: '',
    npIndependentClaim: '',
    npDependentClaim: '',
    npBroadenedFeature: '',
    npIsProfit: 'No',
    npIsDefensive: 'No',
    npAllDrafts: [],
    npDraftingEffort: '',
    npDrafterEmpId: '',
    npHoursSpent: '',
    npAgencyRecognizer: '',
    npAgencyCost: '',
    npReviewEffort: '',
    npManagerEmpId: '',
    npActivityStatus: 'Initiated',

    // File attachments
    npSearchReport: [],
    npClaimSheet: [],
    npAllDrafts: [],
    pctParentPermission: [],
    pctClaimSheet: [],
    pctAllDrafts: [],
    draftVersions: [],

    // PCT

    isDirectPCT: 'No', // default No or empty string as fits your app
    pctParentPermission: [], // file type - empty array initially
    pctProvisionalDate: '',
    pctApplicationNumber: '',
    pctDrafterName: '',
    pctClaimSheet: [],
    pctFormsPrepared: 'No',
    pctCountryFiling: '',
    pctReviewBy: '',
    pctCitedPatent: '',
    pctIndependentClaim: '',
    pctDependentClaim: '',
    pctBroadenedFeature: '',
    pctIsProfit: 'No',
    pctIsDefensive: 'No',
    pctAllDrafts: [],
    pctDraftingEffort: '',
    pctDrafterEmpId: '',
    pctHoursSpent: '',
    pctAgencyRecognizer: '',
    pctAgencyCost: '',
    pctReviewEffort: '',
    pctManagerEmpId: '',
    pctActivityStatus: 'Initiated',

    // Complete

    isProvisionalFiled: '',          // e.g. '' or 'No'
    provisionalSpecDate: '',         // date string
    applicationNumber: '',
    isPCTFiled: '',
    pctFilingDate: '',
    isPCTPublished: '',
    citedPatent: '',
    independentClaim: '',
    dependentClaim: '',
    broadenedFeature: '',
    isProfitPatent: '',
    isDefensivePatent: '',
    draftVersions: [],             // file or empty array initially
    draftingEffort: '',
    drafterEmpId: '',
    hoursSpent: '',
    agencyRecognizer: '',
    agencyCost: '',
    reviewEffort: '',
    managerEmpId: '',
    activityStatus: '',

    // Provisional

    nodrafter: '',
    noreviewer: '',
    attachments: [],         // files initialized as empty array
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
  formData5: {

    draftType: '',
    activityStatus: '',
    rating: 0,
    patentApplicationNumber: '',

    // provisional

    "patentFilingName": "",
    "provisionalPatent": [],
    "attachment": [],
    "dateProvision": "",
    "applicantName": "",
    "isProfilePatent": "",
    "isDefensivePatent": "",
    "claimingStartup": [],
    "poaOffice": "",
    "effortsSpent": "",
    "patentFiler": "",
    "hoursSpent": "",
    "agencyRecognizer": "",
    "agencyCost": "",
    "managerResponsible": "",

    // PCT


    "postDated": "",
    "dateProvision": "",
    "applicationProvisionalNumber": "",
    "datePatentApplication": "",
    "pctFilingPermission": "",
    "effortsSpent": "",
    "patentFiler": "",
    "hoursSpent": "",
    "agencyRecognizer": "",
    "agencyCost": "",
    "managerResponsible": "",

    //  National Phase

    "postDated": "",
    "dateProvisionalPatent": "",
    "applicationProvisionalNumber": "",
    "dateCompletePatentApplication": "",
    "datePCTPatentApplication": "",
    "finalSubmitted": "",
    "filedForms": [],
    "dateProvision": "",
    "effortsSpent": "",
    "patentFiler": "",
    "hoursSpent": "",
    "agencyRecognizer": "",
    "agencyCost": "",
    "managerResponsible": "",

    // Complete

    "dateOfPatent": "",
    "provisionalNumber": "",
    "specificationFiling": "",
    "agentFiling": "",
    "filedDraft": "",
    "filedFormsComplete": "",
    "dateOfComplete": "",
    "postDated": "",
    "isPostDated": "",
    "effortsSpent": "",
    "patentFiler": "",
    "hoursSpent": "",
    "agencyRecognizer": "",
    "agencyCost": "",
    "managerResponsible": "",

    // File attachments
    "provisionalPatent": [],
    "attachment": [],
    "claimingStartup": [],
    "filedForms": [],
    "filedDraft": [],
    "filedFormsComplete": []

  },


  formData6: {

    rating: 0,
    patentApplicationNumber: '',

    patentStatus: 'yes',              // string, either 'yes' or 'no'
    patentNumber: '',                 // string, for entering the patent number
    patentAttachment: [],          // File | null, stores uploaded file
    patentGrantDate: '',             // string (YYYY-MM-DD), date picker value
    rejectionReasonAttachment: [], // File | null, file explaining rejection reason

    patentPublished: '',
    publicationNumber: '',
    apopposed: '',
    oname: '',
    attachments: [],                // Used for multiple files (can be overwritten if reused)
    cfbopposer: '',
    boaof: '',
    rffo: '',
    orpby: '',
    eagency: '',
    revby: '',

    ferList: [{
      ferReceived: "",
      ferDate: "",
      ferArgument: "",
      examinerCitations: [],
      relevancyDetails: "",
      decisionPage: [],
      ferPrepared: "",
      ferPreparer: "",
      ferFilingDate: "",
      amendments: "",
      patentProsecutor: "",
      externalAgency: "",
      agencyCost: "",
      relevancyPreparer: "",
    }],

    hearingList: [{
      noticeReceived: '',
      hearingDate: '',
      hearingType: '',
      mainArgument: '',
      references: '',
      relevancy: '',
      decisionPage: [],
      responsePrepared: '',
      appearance: '',
      responsePreparer: '',
      responseFilingDate: '',
      amendments: '',
      people: '',
      hearingMinutes: [],
      controllerName: '',
      rejectionAfterFinal: '',
      patentProsecutor: '',
      externalAgency: '',
      agencyCost: '',
      relevancyPreparer: '',
      hours: '',
    }],

    ipRecognizer: "",
    hoursSpent: "",
    agencyRecognizer: "",
    agencyCost: "",
    activityStatus: ""

  },
  formData7: {

    patentApplicationNumber: '',
    patentPublished: '',              // "yes" or "no"
    publicationNumber: '',           // string

    apopposed: '',                   // "yes" or "no"

    oname: '',                       // Opposer Name
    opposerAttachment: [],

    boaof: '',                       // Brief Opinion About Opposition Findings
    rffo: '',                        // Response Filed for Opposition
    responseAttachment: [],         // File path for Response Attachment

    orpby: '',                       // Opposition Response Prepared By
    eagency: '',                     // External Agency (if prepared by them)
    revby: '',                       // Reviewed By
    reviewAttachment: [],

    ipRecognizer: '',       // Efforts Spent for opposition of Invention
    hoursSpent: '',         // Employee ID
    agencyRecognizer: '',   // Number of Hours Spent
    agencyCost: '',         // External Agency opposer
    reviewEffort: '',       // Cost Spent on Agency
    managerEmpId: '',

    activityStatus: '',     // Activity Status of the opposition

  },
  formData8: {

    patentApplicationNumber: '',
    priorityDate: "",
    grantDate: "",
    yearsPaid: "",
    nextDueDate: "",
    maintenanceStopped: "",
    decisionPageAttachment: [],
    collaboration: "",
    filingDate: "",
    filingAttachment: [],
    maintenanceFee: "",
    externalAgency: "",
    effortsSpent: "",
    employeeId: "",
    hoursSpent: "",
    agencyManager: "",
    agencyCost: "",
    reviewEfforts: "",
    managerResponsible: "",
    activityStatus: '',

    // File attachments
    decisionPageAttachment: [],
    filingAttachment: []

  },


  formData9: {
    // InventionDetails (add/adjust fields as per your actual component)
    inventionTitle: "",
    inventorName: "",
    inventorDepartment: "",
    inventionSummary: "",

    // PAN
    patentApplicationNumber: "",
    patentNumber: "",

    // PatentCommercializationChild (adjust as per your actual fields)
    commercializationType: "",
    commercializationStatus: "",
    commercializationDate: "",
    commercializationRevenue: "",
    
    // PatentCommercializationChild specific fields
    inventionStage: "",
    isWorkingFiled: "",
    firstWorkingDate: "",

    // PCEfforts
    effortsSpent: "",
    employeeId: "",
    hoursSpent: "",
    agencyManager: "",
    agencyCost: "",
    reviewEfforts: "",
    managerResponsible: "",
    
    // PCEfforts specific fields
    periodicSales: "",
    productId: "",
    isLicensed: "",
    isCrossLicensed: "",
    isCompulsoryLicenseFiled: "",

    // ActivityStatus
    activityStatus: "",

    // File attachments
    salesFile: [],
    invoiceFile: [],
    implementationFile: []
  },


  errors: {},


  setAssetId: (id) => set({ assetId: id }),

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
      formData3: { ...state.formData3, ...data },
    })),
  updateFormData4: (data) =>
    set((state) => ({
      formData4: { ...state.formData4, ...data },
    })),
  updateFormData5: (data) =>
    set((state) => ({
      formData5: { ...state.formData5, ...data },
    })),
  updateFormData6: (data) =>
    set((state) => ({
      formData6: { ...state.formData6, ...data },
    })),
  updateFormData7: (data) =>
    set((state) => ({
      formData7: { ...state.formData7, ...data },
    })),
  updateFormData8: (data) =>
    set((state) => ({
      formData8: { ...state.formData8, ...data },
    })),
  updateFormData9: (data) =>
    set((state) => ({
      formData9: { ...state.formData9, ...data },
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
  
  // Clear all form data and reset to initial state
  clearAllData: () => set({
    uploadedPaths: {},
    assetId: '',
    formData: {
      inventiontitle: '',
      commonName: '',
      inventordetails: '',
      inventors: [],
      incrementalRenovation: '',
      patentNumbers: '',
      journalNumbers: '',
      productIdentity: '',
      problemAddressed: '',
      trainRun: '',
      experimentResults: '',
      evidence: [],
      minuteOfMeeting: [],
      attachments: [],
      ipRecognizer: '',
      hoursSpent: '',
      agencyRecognizer: '',
      agencyCost: '',
      reviewEffort: '',
      managerEmpId: '',
      entity: '',
      date: '',
      inventionCountry: '',
      creationCountry: '',
      collaboration: '',
      collaboratorName: '',
      collaboratorCountry: '',
      stakeholders: '',
      entityJournalNumbers: '',
      entityProductIdentity: '',
      activityStatus: '',
      uploadedFilePaths: {
        evidence: [],
        minuteOfMeeting: [],
        attachments: []
      }
    },
    formData2: {
      extractorOne: '',
      extractortwo: '',
      iEDate: '',
      iawpl: '',
      nfeature: '',
      ifeature: '',
      idattachments: [],
      scountry: '',
      oextractor: '',
      ipRecognizer: '',
      hoursSpent: '',
      agencyRecognizer: '',
      agencyCost: '',
      reviewEffort: '',
      managerEmpId: '',
      activityStatus: '',
      updatenba: '',
    },
    formData3: {
      psone: '',
      pstwo: '',
      rating: 0,
      nfeature: '',
      ifeature: '',
      scountry: '',
      ooextractor: '',
      trainRun: '',
      nodc: '',
      dibrief: '',
      attachment: [],
      esfsearcher: '',
      ipRecognizer: '',
      hoursSpent: '',
      agencyRecognizer: '',
      agencyCost: '',
      reviewEffort: '',
      managerEmpId: '',
      activityStatus: '',
    },
    formData4: {
      activityStatus: '',
      draftType: '',
      rating: 0,
      npPCTDate: '',
      npApplicationNumber: '',
      npPCTPublication: '',
      npSearchReport: [],
      npPCTOrProvisionalDate: '',
      npApplicationCountry: '',
      npDrafterName: '',
      npClaimSheet: [],
      npFormsPrepared: 'No',
      npCountryFiling: '',
      npReviewBy: '',
      npCitedPatent: '',
      npIndependentClaim: '',
      npDependentClaim: '',
      npBroadenedFeature: '',
      npIsProfit: 'No',
      npIsDefensive: 'No',
      npAllDrafts: [],
      npDraftingEffort: '',
      npDrafterEmpId: '',
      npHoursSpent: '',
      npAgencyRecognizer: '',
      npAgencyCost: '',
      npReviewEffort: '',
      npManagerEmpId: '',
      npActivityStatus: 'Initiated',
      isDirectPCT: 'No',
      pctParentPermission: [],
      pctProvisionalDate: '',
      pctApplicationNumber: '',
      pctDrafterName: '',
      pctClaimSheet: [],
      pctFormsPrepared: 'No',
      pctCountryFiling: '',
      pctReviewBy: '',
      pctCitedPatent: '',
      pctIndependentClaim: '',
      pctDependentClaim: '',
      pctBroadenedFeature: '',
      pctIsProfit: 'No',
      pctIsDefensive: 'No',
      pctAllDrafts: [],
      pctDraftingEffort: '',
      pctDrafterEmpId: '',
      pctHoursSpent: '',
      pctAgencyRecognizer: '',
      pctAgencyCost: '',
      pctReviewEffort: '',
      pctManagerEmpId: '',
      pctActivityStatus: 'Initiated',
      isProvisionalFiled: '',
      provisionalSpecDate: '',
      applicationNumber: '',
      isPCTFiled: '',
      pctFilingDate: '',
      isPCTPublished: '',
      citedPatent: '',
      independentClaim: '',
      dependentClaim: '',
      broadenedFeature: '',
      isProfitPatent: '',
      isDefensivePatent: '',
      draftVersions: [],
      draftingEffort: '',
      drafterEmpId: '',
      hoursSpent: '',
      agencyRecognizer: '',
      agencyCost: '',
      reviewEffort: '',
      managerEmpId: '',
      nodrafter: '',
      noreviewer: '',
      attachments: [],
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
    formData5: {
      draftType: '',
      activityStatus: '',
      rating: 0,
      patentApplicationNumber: '',
      patentFilingName: "",
      provisionalPatent: [],
      attachment: [],
      dateProvision: "",
      applicantName: "",
      isProfilePatent: "",
      isDefensivePatent: "",
      claimingStartup: [],
      poaOffice: "",
      effortsSpent: "",
      patentFiler: "",
      hoursSpent: "",
      agencyRecognizer: "",
      agencyCost: "",
      managerResponsible: "",
      postDated: "",
      applicationProvisionalNumber: "",
      datePatentApplication: "",
      pctFilingPermission: "",
      dateProvisionalPatent: "",
      dateCompletePatentApplication: "",
      datePCTPatentApplication: "",
      finalSubmitted: "",
      filedForms: [],
      dateOfPatent: "",
      provisionalNumber: "",
      specificationFiling: "",
      agentFiling: "",
      filedDraft: "",
      filedFormsComplete: "",
      dateOfComplete: "",
      isPostDated: "",
    },
    formData6: {
      rating: 0,
      patentApplicationNumber: '',
      patentStatus: 'yes',
      patentNumber: '',
      patentAttachment: [],
      patentGrantDate: '',
      rejectionReasonAttachment: [],
      patentPublished: '',
      publicationNumber: '',
      apopposed: '',
      oname: '',
      attachments: [],
      cfbopposer: '',
      boaof: '',
      rffo: '',
      orpby: '',
      eagency: '',
      revby: '',
      ferList: [{
        ferReceived: "",
        ferDate: "",
        ferArgument: "",
        examinerCitations: [],
        relevancyDetails: "",
        decisionPage: [],
        ferPrepared: "",
        ferPreparer: "",
        ferFilingDate: "",
        amendments: "",
        patentProsecutor: "",
        externalAgency: "",
        agencyCost: "",
        relevancyPreparer: "",
      }],
      hearingList: [{
        noticeReceived: '',
        hearingDate: '',
        hearingType: '',
        mainArgument: '',
        references: '',
        relevancy: '',
        decisionPage: [],
        responsePrepared: '',
        appearance: '',
        responsePreparer: '',
        responseFilingDate: '',
        amendments: '',
        people: '',
        hearingMinutes: [],
        controllerName: '',
        rejectionAfterFinal: '',
        patentProsecutor: '',
        externalAgency: '',
        agencyCost: '',
        relevancyPreparer: '',
        hours: '',
      }],
      ipRecognizer: "",
      hoursSpent: "",
      agencyRecognizer: "",
      agencyCost: "",
      activityStatus: ""
    },
    formData7: {
      patentApplicationNumber: '',
      patentPublished: '',
      publicationNumber: '',
      apopposed: '',
      oname: '',
      opposerAttachment: [],
      boaof: '',
      rffo: '',
      responseAttachment: [],
      orpby: '',
      eagency: '',
      revby: '',
      reviewAttachment: [],
      ipRecognizer: '',
      hoursSpent: '',
      agencyRecognizer: '',
      agencyCost: '',
      reviewEffort: '',
      managerEmpId: '',
      activityStatus: '',
    },
    formData8: {
      patentApplicationNumber: '',
      priorityDate: "",
      grantDate: "",
      yearsPaid: "",
      nextDueDate: "",
      maintenanceStopped: "",
      decisionPageAttachment: [],
      collaboration: "",
      filingDate: "",
      filingAttachment: [],
      maintenanceFee: "",
      externalAgency: "",
      effortsSpent: "",
      employeeId: "",
      hoursSpent: "",
      agencyManager: "",
      agencyCost: "",
      reviewEfforts: "",
      managerResponsible: "",
      activityStatus: '',
    },
    formData9: {
      inventionTitle: "",
      inventorName: "",
      inventorDepartment: "",
      inventionSummary: "",
      patentApplicationNumber: "",
      patentNumber: "",
      commercializationType: "",
      commercializationStatus: "",
      commercializationDate: "",
      commercializationRevenue: "",
      inventionStage: "",
      isWorkingFiled: "",
      firstWorkingDate: "",
      effortsSpent: "",
      employeeId: "",
      hoursSpent: "",
      agencyManager: "",
      agencyCost: "",
      reviewEfforts: "",
      managerResponsible: "",
      periodicSales: "",
      productId: "",
      isLicensed: "",
      isCrossLicensed: "",
      isCompulsoryLicenseFiled: "",
      activityStatus: "",
      salesFile: [],
      invoiceFile: [],
      implementationFile: []
    },
    errors: {},
  }),
})));

export default useFormStore;
