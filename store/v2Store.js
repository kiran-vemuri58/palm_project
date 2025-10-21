import { create } from 'zustand';

// Helper function to get initial form data
function getInitialFormData(page) {
  const initialData = {
    inventionRecognition: {
      // Invention Details
      inventiontitle: '',
      commonname: '',
      inventordetails: '',
      rating: 0,
      
      // Entity Details
      entity: '',
      date: '',
      inventioncountry: '',
      creationcountry: '',
      collaboration: '',
      collaboratorName: '',
      collaboratorCountry: '',
      stakeholders: '',
      entityJournalNumbers: '',
      entityProductIdentity: '',
      
      // Technology Details
      incrementalrenovation: '',
      patentnumbers: '',
      journalnumbers: '',
      productidentity: '',
      problemaddressed: '',
      
      // Train Run / Experimentation
      trainrun: '',
      experimentresults: '',
      evidence: [],
      minuteOfMeeting: [],
      attachments: [],
      
      // Effort Sheet
      iprecognizer: '',
      hoursspent: 0,
      agencyrecognizer: '',
      agencycost: 0,
      revieweffort: 0,
      managerempid: '',
      extractionEffort: 0,
      
      // Activity Status
      activityStatus: '',
      
      // Inventors
      inventors: []
    },
    
    inventionExtraction: {
      // Extractor Details (matching Prisma schema exactly)
      extractorOne: '',
      extractortwo: '',
      iEDate: '',
      iawpl: '',
      nfeature: '',
      ifeature: '',
      idattachments: [],
      scountry: '',
      oextractor: '',
      
      // NBA Updates
      updatenba: '',
      
      // Effort Sheet Details
      iprecognizer: '',
      hoursspent: 0,
      agencyrecognizer: '',
      agencycost: 0,
      revieweffort: 0,
      managerempid: '',
      extractionEffort: 0,
      
      // Activity Status
      activityStatus: ''
    },
    
    patentabilityAnalysis: {
      // Patentability Analysis fields
      analysisType: '',
      analysisDate: '',
      priorArtScope: '',
      patentabilityRating: '',
      analysisSummary: '',
      patentReferences: '',
      nonPatentLiterature: '',
      priorArtSearch: '',
      noveltyAssessment: '',
      inventiveStep: '',
      industrialApplicability: '',
      patentabilityConclusion: '',
      recommendations: '',
      riskAssessment: '',
      competitorAnalysis: '',
      marketPotential: '',
      technicalFeasibility: '',
      legalCompliance: '',
      costBenefitAnalysis: '',
      timelineEstimate: '',
      nextSteps: '',
      // Extractor Details fields
      extractorOne: '',
      extractortwo: '',
      iEDate: '',
      iawpl: '',
      nfeature: '',
      ifeature: '',
      idattachments: null,
      scountry: '',
      oextractor: '',
      
      // Innovation Analysis fields
      trainRun: '',
      minuteOfMeeting: [],
      attachments: [],
      
      // Decision Sheet fields
      nodc: '',
      dibrief: '',
      
      // Patentability Extractor fields
      psone: '',
      pstwo: '',
      rating: 0,
      collaboration: '',
      // Effort Sheet fields
      iprecognizer: '',
      hoursspent: 0,
      agencyrecognizer: '',
      agencycost: 0,
      revieweffort: 0,
      managerempid: '',
      extractionEffort: 0,
      // Activity Status
      activityStatus: ''
    },
    
    patentSpecification: {
      // Common fields
      rating: 0,
      activityStatus: '',
      draftType: '',
      
      // Complete Specification fields
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
      
      // Provisional Application fields
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
      
      // PCT Application fields
      isDirectPCT: '',
      pctParentPermission: [],
      pctProvisionalDate: '',
      pctApplicationNumber: '',
      pctDrafterName: '',
      pctClaimSheet: [],
      pctFormsPrepared: '',
      pctCountryFiling: '',
      pctReviewBy: '',
      pctCitedPatent: '',
      pctIndependentClaim: '',
      pctDependentClaim: '',
      pctBroadenedFeature: '',
      pctIsProfit: '',
      pctIsDefensive: '',
      pctAllDrafts: [],
      pctDraftingEffort: '',
      pctDrafterEmpId: '',
      pctHoursSpent: '',
      pctAgencyRecognizer: '',
      pctAgencyCost: '',
      pctReviewEffort: '',
      pctManagerEmpId: '',
      pctActivityStatus: '',
      
      // National Phase fields
      npPCTDate: '',
      npApplicationNumber: '',
      npPCTPublication: '',
      npSearchReport: [],
      npPCTOrProvisionalDate: '',
      npApplicationCountry: '',
      npDrafterName: '',
      npClaimSheet: [],
      npFormsPrepared: '',
      npCountryFiling: '',
      npReviewBy: '',
      npCitedPatent: '',
      npIndependentClaim: '',
      npDependentClaim: '',
      npBroadenedFeature: '',
      npIsProfit: '',
      npIsDefensive: '',
      npAllDrafts: [],
      npDraftingEffort: '',
      npDrafterEmpId: '',
      npHoursSpent: '',
      npAgencyRecognizer: '',
      npAgencyCost: '',
      npReviewEffort: '',
      npManagerEmpId: '',
      npActivityStatus: ''
    },
    
    patentFiling: {
      // Patent Filing fields (matching API response)
      activityStatus: '',
      rating: 0,
      draftType: '',
      
      // Extractor Details fields (for ExtractorDetailsV2 component)
      extractorOne: '',
      extractortwo: '',
      iEDate: '',
      iawpl: '',
      idattachments: [],
      
      // Innovation Analysis fields
      trainRun: '',
      minuteOfMeeting: [],
      attachments: [],
      
      // Patentability Extractor fields
      psone: '',
      pstwo: '',
      collaboration: '',
      paNfeature: '',
      paIfeature: '',
      attachment: [],
      paScountry: '',
      paOoextractor: '',
      
      // Decision Sheet fields
      nodc: '',
      dibrief: '',
      
      // Average Rating fields
      patentApplicationNumber: '',
      
      // Effort Sheet fields (corrected field names)
      ipRecognizer: '',
      hoursSpent: '',
      agencyRecognizer: '',
      agencyCost: '',
      reviewEffort: '',
      managerEmpId: '',
      extractionEffort: '',
      
      // Provisional fields
      patentFilingName: '',
      provisionalPatent: [],
      dateProvision: '',
      applicantName: '',
      isProfilePatent: '',
      isDefensivePatent: '',
      claimingStartup: [],
      poaOffice: '',
      effortsSpent: '',
      patentFiler: '',
      managerResponsible: '',

      // PCT fields
      postDated: '',
      applicationProvisionalNumber: '',
      datePatentApplication: '',
      pctFilingPermission: '',

      // National Phase fields
      dateProvisionalPatent: '',
      dateCompletePatentApplication: '',
      datePCTPatentApplication: '',
      finalSubmitted: '',
      filedForms: [],

      // Complete fields
      dateOfPatent: '',
      provisionalNumber: '',
      specificationFiling: '',
      agentFiling: '',
      filedDraft: [],
      filedFormsComplete: [],
      dateOfComplete: '',
      isPostDated: '',
    },
    
    patentProsecution: {
      // PP Invention Details fields (ppid_)
      ppid_title: '',
      ppid_common_name: '',
      ppid_inventor_details: '',
      ppid_entity: '',
      ppid_date: '',
      ppid_country: '',
      ppid_creation_country: '',
      ppid_collaboration: '',
      ppid_collaborator_name: '',
      ppid_collaborator_country: '',
      ppid_stakeholders: '',
      
      // PP Extractor Details fields (pped_)
      pped_one: '',
      pped_two: '',
      pped_extraction_date: '',
      pped_available_with_prior_literature: '',
      pped_novel_feature: '',
      pped_inventive_feature: '',
      pped_specific_country: '',
      pped_opinion: '',
      pped_attachments: [],
      
      // PP Patent Prosecution Details fields (pppd_)
      pppd_published: '',
      pppd_publication_number: '',
      pppd_any_person_opposed: '',
      pppd_opponent_name: '',
      pppd_attachments: [],
      pppd_case_filed_by_opposer: '',
      pppd_basis_of_action_of_filing: '',
      pppd_reason_for_filing_opposition: '',
      pppd_opinion_rendered_by_you: '',
      pppd_external_agency: '',
      pppd_reviewed_by: '',
      
      // PP Patent Application Status fields (ppas_)
      ppas_status: '',
      ppas_number: '',
      ppas_attachment: [],
      ppas_grant_date: '',
      ppas_rejection_reason_attachment: [],
      
      // PP FER fields (ppfer_)
      ppfer_list: [],
      
      // PP Hearing fields (pph_)
      pph_list: [],
      
      // PP Decision Sheet fields (ppds_)
      ppds_name_of_decision_maker: '',
      ppds_decision_in_brief: '',
      ppds_attachments: [],
      
      // PP Innovation Analysis fields (ppi_)
      ppi_more_than_invention: '',
      ppi_prior_art_documents: [],
      ppi_npl_documents: [],
      
      // PP Patentability Extractor fields (pppe_)
      pppe_searcher1: '',
      pppe_searcher2: '',
      pppe_rating: 0,
      pppe_invention_accordance: '',
      pppe_novel_feature: '',
      pppe_inventive_feature: '',
      pppe_attachment: [],
      pppe_specific_country: '',
      pppe_opinion_of_extractor: '',
      
      // PP Average Patentability Rating fields (ppapr_)
      ppapr_rating: 0,
      ppapr_patent_application_number: '',
      
      // PP Effort Sheet fields (ppes_)
      ppes_ip_recognizer: '',
      ppes_hours_spent: '',
      ppes_agency_recognizer: '',
      ppes_agency_cost: '',
      ppes_review_effort: '',
      ppes_manager_emp_id: '',
      
      // PP Activity Status fields (ppact_)
      ppact_status: '',
      ppact_description: '',
      ppact_last_updated: ''
    },
    
    patentMaintenance: {
      // PM Invention Details fields (pmInventionDetails prefix)
      pmInventionDetailsTitle: '',
      pmInventionDetailsCommonName: '',
      pmInventionDetailsInventorDetails: '',
      pmInventionDetailsEntity: '',
      pmInventionDetailsDate: '',
      pmInventionDetailsCountry: '',
      pmInventionDetailsCreationCountry: '',
      pmInventionDetailsCollaboration: '',
      pmInventionDetailsCollaboratorName: '',
      pmInventionDetailsCollaboratorCountry: '',
      pmInventionDetailsStakeholders: '',
      
      // PM Extractor Details fields (pmExtractorDetails prefix)
      pmExtractorDetailsOne: '',
      pmExtractorDetailsTwo: '',
      pmExtractorDetailsExtractionDate: '',
      pmExtractorDetailsAvailableWithPriorLiterature: '',
      pmExtractorDetailsNovelFeature: '',
      pmExtractorDetailsInventiveFeature: '',
      pmExtractorDetailsSpecificCountry: '',
      pmExtractorDetailsOpinion: '',
      pmExtractorDetailsAttachments: [],
      
      // PM Patent Prosecution Details fields (pmPatentProsecutionDetails prefix)
      pmPatentProsecutionDetailsPublished: '',
      pmPatentProsecutionDetailsPublicationNumber: '',
      pmPatentProsecutionDetailsAnyPersonOpposed: '',
      pmPatentProsecutionDetailsOpponentName: '',
      pmPatentProsecutionDetailsAttachments: [],
      pmPatentProsecutionDetailsCaseFiledByOpposer: '',
      pmPatentProsecutionDetailsBasisOfActionOfFiling: '',
      pmPatentProsecutionDetailsReasonForFilingOpposition: '',
      pmPatentProsecutionDetailsOpinionRenderedByYou: '',
      pmPatentProsecutionDetailsExternalAgency: '',
      pmPatentProsecutionDetailsReviewedBy: '',
      
      // PM Patent Maintenance History fields (pmPatentMaintenanceHistory prefix)
      pmPatentMaintenanceHistoryPriorityDate: '',
      pmPatentMaintenanceHistoryGrantDate: '',
      pmPatentMaintenanceHistoryYearsPaid: '',
      pmPatentMaintenanceHistoryNextDueDate: '',
      pmPatentMaintenanceHistoryMaintenanceStopped: '',
      pmPatentMaintenanceHistoryAttachments: [],
      pmPatentMaintenanceHistoryFilingDate: '',
      pmPatentMaintenanceHistoryMaintenanceFee: '',
      pmPatentMaintenanceHistoryExternalAgency: '',
      pmPatentMaintenanceHistoryFilingAttachments: [],
      
      // PM PAN fields (pmPAN prefix)
      pmPANPatentApplicationNumber: '',
      
      // PM Decision Sheet fields (pmDecisionSheet prefix)
      pmDecisionSheetNameOfDecisionMaker: '',
      pmDecisionSheetDecisionInBrief: '',
      pmDecisionSheetAttachments: [],
      
      // PM Innovation Analysis fields (pmInnovationAnalysis prefix)
      pmInnovationAnalysisMoreThanInvention: '',
      pmInnovationAnalysisPriorArtDocuments: [],
      pmInnovationAnalysisNPLDocuments: [],
      
      // PM Patentability Extractor fields (pmPatentabilityExtractor prefix)
      pmPatentabilityExtractorSearcher1: '',
      pmPatentabilityExtractorSearcher2: '',
      pmPatentabilityExtractorRating: 0,
      pmPatentabilityExtractorInventionAccordance: '',
      pmPatentabilityExtractorNovelFeature: '',
      pmPatentabilityExtractorInventiveFeature: '',
      pmPatentabilityExtractorAttachment: [],
      pmPatentabilityExtractorSpecificCountry: '',
      pmPatentabilityExtractorOpinionOfExtractor: '',
      
      // PM Effort Sheet fields (pmEffortSheet prefix)
      pmEffortSheetEffortsSpent: '',
      pmEffortSheetEmployeeId: '',
      pmEffortSheetHoursSpent: '',
      pmEffortSheetAgencyManager: '',
      pmEffortSheetAgencyCost: '',
      pmEffortSheetReviewEfforts: '',
      pmEffortSheetManagerResponsible: '',
      
      // PM Activity Status fields (pmActivityStatus prefix)
      pmActivityStatusStatus: '',
      pmActivityStatusDescription: '',
      pmActivityStatusLastUpdated: ''
    },
    
    patentCommercialization: {
      // PC Invention Details fields (pcInventionDetails prefix)
      pcInventionDetailsTitle: '',
      pcInventionDetailsCommonName: '',
      pcInventionDetailsInventorDetails: '',
      pcInventionDetailsEntity: '',
      pcInventionDetailsDate: '',
      pcInventionDetailsCountry: '',
      pcInventionDetailsCreationCountry: '',
      pcInventionDetailsCollaboration: '',
      pcInventionDetailsCollaboratorName: '',
      pcInventionDetailsCollaboratorCountry: '',
      pcInventionDetailsStakeholders: '',
      
      // PC Patent Commercialization Child fields (pcPatentCommercializationChild prefix)
      pcPatentCommercializationChildStage: '',
      pcPatentCommercializationChildWorkingFiled: '',
      pcPatentCommercializationChildImplementationFile: [],
      pcPatentCommercializationChildFirstWorkingDate: '',
      pcPatentCommercializationChildCommercializationStatus: '',
      pcPatentCommercializationChildRevenueGenerated: '',
      pcPatentCommercializationChildMarketValue: '',
      pcPatentCommercializationChildLicensingFee: '',
      pcPatentCommercializationChildRoyaltyRate: '',
      pcPatentCommercializationChildPartnerName: '',
      pcPatentCommercializationChildPartnershipType: '',
      pcPatentCommercializationChildPartnershipDetails: '',
      pcPatentCommercializationChildStartDate: '',
      pcPatentCommercializationChildExpectedCompletionDate: '',
      pcPatentCommercializationChildActualCompletionDate: '',
      
      // PC PAN fields (pcPAN prefix)
      pcPANPatentApplicationNumber: '',
      pcPANPatentNumber: '',
      
      // PC Patent Commercialization Efforts fields (pcPatentCommercializationEfforts prefix)
      pcPatentCommercializationEffortsSalesFile: [],
      pcPatentCommercializationEffortsPeriodicSales: '',
      pcPatentCommercializationEffortsInvoiceFile: [],
      pcPatentCommercializationEffortsCommercializationDate: '',
      pcPatentCommercializationEffortsProductId: '',
      pcPatentCommercializationEffortsIsLicensed: '',
      pcPatentCommercializationEffortsIsCrossLicensed: '',
      pcPatentCommercializationEffortsIsCompulsoryLicenseFiled: '',
      
      // PC Activity Status fields (pcActivityStatus prefix)
      pcActivityStatusStatus: '',
      pcActivityStatusDescription: '',
      pcActivityStatusLastUpdated: ''
    },
    
    postGrantOpposition: {
      // PGO Extractor Details fields (from old ExtractorDetails component)
      extractorOne: '',
      extractortwo: '',
      iEDate: '',
      iawpl: '',
      nfeature: '',
      ifeature: '',
      idattachments: [],
      scountry: '',
      oextractor: '',
      
      // PGO Innovation Analysis fields (from old Innovation component)
      trainRun: '',
      minuteOfMeeting: [],
      innovationAttachments: [],
      
      // PGO Patentability Extractor fields (from old PAExtractor component)
      psone: '',
      pstwo: '',
      rating: 0,
      collaboration: '',
      paNovelFeature: '',
      paInventiveFeature: '',
      paSpecificCountry: '',
      paOpinionOfExtractor: '',
      patentabilityAttachments: [],
      
      // PGO Decision Sheet fields (from old DecisionSheet component)
      nodc: '',
      dibrief: '',
      decisionAttachments: [],
      
      // PGO fields matching old formData7 structure
      patentApplicationNumber: '',
      patentPublished: '',
      publicationNumber: '',
      apopposed: '',
      oname: '',
      opposerAttachment: [],
      cfbopposer: '',
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
      reviewEffortHours: '',
      managerEmpId: '',
      activityStatus: ''
    },
  };
  
  return initialData[page] || {};
}

const useV2Store = create((set, get) => ({
  // Store state
  inventionRecognition: getInitialFormData('inventionRecognition'),
  inventionExtraction: getInitialFormData('inventionExtraction'),
  patentabilityAnalysis: getInitialFormData('patentabilityAnalysis'),
  patentSpecification: getInitialFormData('patentSpecification'),
  patentFiling: getInitialFormData('patentFiling'),
  patentProsecution: getInitialFormData('patentProsecution'),
  patentMaintenance: getInitialFormData('patentMaintenance'),
  patentCommercialization: getInitialFormData('patentCommercialization'),
  postGrantOpposition: getInitialFormData('postGrantOpposition'),
  
  currentAssetId: null,
  errors: {},
  savedForms: new Set(), // Track which forms have been saved for current asset

  // Store actions
  updateFormData: (page, field, value) => {
    set((state) => ({
      [page]: {
        ...state[page],
        [field]: value
      }
    }));
  },

  setCurrentAssetId: (assetId) => {
    set({ currentAssetId: assetId });
    console.log('🆔 Asset ID set in store:', assetId);
  },

  // Track saved forms
  markFormAsSaved: (formName) => {
    set((state) => ({
      savedForms: new Set([...state.savedForms, formName])
    }));
    console.log('✅ Form marked as saved:', formName);
  },

  isFormSaved: (formName) => {
    return get().savedForms.has(formName);
  },

  getSavedForms: () => {
    return Array.from(get().savedForms);
  },

  clearSavedForms: () => {
    set({ savedForms: new Set() });
    console.log('🧹 Cleared saved forms tracking');
  },

  setStoreData: (page, data) => {
    set((state) => ({
      ...state,
      [page]: {
        ...state[page],
        ...data
      }
    }));
    console.log('🔄 Store data updated for page:', page);
  },

  setErrors: (newErrors) => {
    set({ errors: newErrors });
  },

  getFormData: (page) => {
    return get()[page] || getInitialFormData(page);
  },

  // Load form data from API and map to respective store
  loadFormDataFromAPI: async (assetId, page = 'inventionRecognition') => {
    try {
      console.log('🌐 Loading form data from API for Asset ID:', assetId, 'Page:', page);
      
      // Use different API endpoints based on page
      let apiEndpoint;
      if (page === 'inventionExtraction') {
        apiEndpoint = `/api/extraction/get/${assetId}`;
      } else if (page === 'patentabilityAnalysis') {
        apiEndpoint = `/api/patentability/get/${assetId}`;
      } else if (page === 'patentSpecification') {
        apiEndpoint = `/api/psp?assetId=${assetId}`;
      } else if (page === 'patentFiling') {
        apiEndpoint = `/api/patentFiling?assetId=${assetId}`;
      } else if (page === 'patentProsecution') {
        apiEndpoint = `/api/patentProsecution?assetId=${assetId}`;
      } else if (page === 'postGrantOpposition') {
        apiEndpoint = `/api/pgo?assetId=${assetId}`;
      } else if (page === 'patentMaintenance') {
        apiEndpoint = `/api/pm?assetId=${assetId}`;
      } else if (page === 'patentCommercialization') {
        apiEndpoint = `/api/pc?assetId=${assetId}`;
      } else {
        apiEndpoint = `/api/invention/get/${assetId}`;
      }
        
      const response = await fetch(apiEndpoint);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          console.log('✅ Loaded form data from API:', data.data);
          
          // Map API data to the respective page store
          const mappedData = get().mapAPIDataToStore(data.data, page);
          
          // Update the store with mapped data
          set((state) => ({
            [page]: mappedData
          }));
          
          console.log('✅ Mapped and stored data for page:', page);
          return mappedData;
        }
      }
      console.log('❌ Failed to load form data from API');
      return null;
    } catch (error) {
      console.error('Error loading form data from API:', error);
      return null;
    }
  },

  // Ensure page data is loaded (check store first, then API if needed)
  ensurePageDataLoaded: async (assetId, page = 'inventionRecognition') => {
    try {
      console.log('🔄 Ensuring page data is loaded for:', page);
      
      const currentState = get();
      const pageData = currentState[page];
      
      // Check if we have meaningful data in store
      const hasData = pageData && Object.values(pageData).some(value => 
        value !== '' && value !== null && value !== undefined && 
        (Array.isArray(value) ? value.length > 0 : true)
      );
      
      if (hasData) {
        console.log('✅ Store already has data for page:', page);
        return pageData;
      } else if (assetId) {
        console.log('🔄 No store data found, loading from API for page:', page);
        
        // Load data from API directly
        try {
          let apiEndpoint;
          if (page === 'inventionExtraction') {
            apiEndpoint = `/api/extraction/get/${assetId}`;
          } else if (page === 'patentabilityAnalysis') {
            apiEndpoint = `/api/patentability/get/${assetId}`;
          } else if (page === 'patentSpecification') {
            apiEndpoint = `/api/psp?assetId=${assetId}`;
          } else if (page === 'patentFiling') {
            apiEndpoint = `/api/patentFiling?assetId=${assetId}`;
          } else if (page === 'patentProsecution') {
            apiEndpoint = `/api/patentProsecution?assetId=${assetId}`;
          } else if (page === 'postGrantOpposition') {
            apiEndpoint = `/api/pgo?assetId=${assetId}`;
          } else if (page === 'patentMaintenance') {
            apiEndpoint = `/api/pm?assetId=${assetId}`;
          } else if (page === 'patentCommercialization') {
            apiEndpoint = `/api/pc?assetId=${assetId}`;
          } else {
            apiEndpoint = `/api/invention/get/${assetId}`;
          }
            
          const response = await fetch(apiEndpoint);
          
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data) {
              console.log('✅ Loaded data from API for page:', page);
              
              // Map API data to store format
              const mappedData = get().mapAPIDataToStore(data.data, page);
              
              // Update the store with mapped data
              set((state) => ({
                [page]: mappedData
              }));
              
              return mappedData;
            }
          }
        } catch (error) {
          console.error('Error loading data from API:', error);
        }
      } else {
        console.log('⚠️ No asset ID provided for page:', page);
        return getInitialFormData(page);
      }
    } catch (error) {
      console.error('Error ensuring page data loaded:', error);
      return getInitialFormData(page);
    }
  },

  // Ensure Page 1 data is loaded for Invention Details display on other pages
  ensurePage1DataLoaded: async (assetId) => {
    try {
      console.log('🔄 Ensuring Page 1 data is loaded for Invention Details display');
      
      const currentState = get();
      const page1Data = currentState.inventionRecognition;
      
      // Check if we have Page 1 data with Invention Details
      const hasInventionDetails = page1Data && (
        page1Data.inventiontitle || 
        page1Data.commonname || 
        page1Data.inventordetails
      );
      
      if (hasInventionDetails) {
        console.log('✅ Page 1 Invention Details already available in store');
        return page1Data;
      } else if (assetId) {
        console.log('🔄 Loading Page 1 data from API for Invention Details display');
        
        // Load Page 1 data from API directly
        try {
          const response = await fetch(`/api/invention/get/${assetId}`);
          
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data) {
              console.log('✅ Page 1 data loaded from API for Invention Details display');
              
              // Map API data to store format
              const mappedData = get().mapAPIDataToStore(data.data, 'inventionRecognition');
              
              // Update the store with the loaded data
              set((state) => ({
                inventionRecognition: mappedData
              }));
              
              return mappedData;
            }
          }
        } catch (error) {
          console.error('Error loading Page 1 data:', error);
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error ensuring Page 1 data loaded:', error);
      return null;
    }
  },

  // Refresh store data after API operations (save, update, etc.)
  refreshStoreAfterAPI: async (assetId, page = 'inventionRecognition') => {
    try {
      console.log('🔄 Refreshing store data after API operation for Asset ID:', assetId, 'Page:', page);
      
      // Use different API endpoints based on page
      let apiEndpoint;
      if (page === 'inventionExtraction') {
        apiEndpoint = `/api/extraction/get/${assetId}`;
      } else if (page === 'patentabilityAnalysis') {
        apiEndpoint = `/api/patentability/get/${assetId}`;
      } else if (page === 'patentSpecification') {
        apiEndpoint = `/api/psp?assetId=${assetId}`;
      } else if (page === 'patentFiling') {
        apiEndpoint = `/api/patentFiling?assetId=${assetId}`;
      } else if (page === 'patentProsecution') {
        apiEndpoint = `/api/patentProsecution?assetId=${assetId}`;
      } else if (page === 'postGrantOpposition') {
        apiEndpoint = `/api/pgo?assetId=${assetId}`;
      } else if (page === 'patentMaintenance') {
        apiEndpoint = `/api/pm?assetId=${assetId}`;
      } else if (page === 'patentCommercialization') {
        apiEndpoint = `/api/pc?assetId=${assetId}`;
      } else {
        apiEndpoint = `/api/invention/get/${assetId}`;
      }
        
      const response = await fetch(apiEndpoint);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          console.log('✅ Loaded fresh data from API:', data.data);
          
          // Map API data to the respective page store
          const mappedData = get().mapAPIDataToStore(data.data, page);
          
          // Update the store with mapped data
          set((state) => ({
            [page]: mappedData
          }));
          
          console.log('✅ Store refreshed with latest data from API');
          return mappedData;
        }
      }
      
      console.log('⚠️ No fresh data received from API');
      return null;
    } catch (error) {
      console.error('Error refreshing store after API operation:', error);
      return null;
    }
  },

  // Refresh all relevant store data after any API operation
  refreshAllRelevantData: async (assetId) => {
    try {
      console.log('🔄 Refreshing all relevant store data after API operation');
      
      // Refresh Page 1 data (always relevant for Invention Details)
      await get().refreshStoreAfterAPI(assetId, 'inventionRecognition');
      
      // Refresh Page 2 data if we're on Page 2
      const currentPath = window.location.pathname;
      if (currentPath.includes('invention-extraction')) {
        await get().refreshStoreAfterAPI(assetId, 'inventionExtraction');
      }
      
      console.log('✅ All relevant store data refreshed');
    } catch (error) {
      console.error('Error refreshing all relevant data:', error);
    }
  },

  clearFormData: (page) => {
    set((state) => ({
      [page]: getInitialFormData(page)
    }));
  },

  // Helper function to map API data to store format
  mapAPIDataToStore: (apiData, page) => {
    console.log('🔄 Mapping API data for page:', page);
    
    switch (page) {
      case 'inventionRecognition':
        return {
          // Invention Details
          inventiontitle: apiData.inventiontitle || '',
          commonname: apiData.commonname || '',
          inventordetails: apiData.inventordetails || '',
          rating: apiData.rating || 0,
          
          // Entity Details
          entity: apiData.entity || '',
          date: apiData.date || '',
          inventioncountry: apiData.inventioncountry || '',
          creationcountry: apiData.creationcountry || '',
          collaboration: apiData.collaboration || '',
          collaboratorName: apiData.collaboratorName || '',
          collaboratorCountry: apiData.collaboratorCountry || '',
          stakeholders: apiData.stakeholders || '',
          entityJournalNumbers: apiData.entityJournalNumbers || '',
          entityProductIdentity: apiData.entityProductIdentity || '',
          
          // Technology Details
          incrementalrenovation: apiData.incrementalrenovation || '',
          patentnumbers: apiData.patentnumbers || '',
          journalnumbers: apiData.journalnumbers || '',
          productidentity: apiData.productidentity || '',
          problemaddressed: apiData.problemaddressed || '',
          
          // Train Run / Experimentation
          trainrun: apiData.trainrun || '',
          experimentresults: apiData.experimentresults || '',
          evidence: apiData.evidence || [],
          minuteOfMeeting: apiData.minuteOfMeeting || [],
          attachments: apiData.attachments || [],
          
          // Effort Sheet
          iprecognizer: apiData.iprecognizer || '',
          hoursspent: apiData.hoursspent || 0,
          agencyrecognizer: apiData.agencyrecognizer || '',
          agencycost: apiData.agencycost || 0,
          revieweffort: apiData.revieweffort || 0,
          managerempid: apiData.managerempid || '',
          extractionEffort: apiData.extractionEffort || 0,
          
          // Activity Status
          activityStatus: apiData.activityStatus || '',
          
          // Inventors
          inventors: apiData.inventors || []
        };
        
      case 'inventionExtraction':
        return {
          // Extractor Details (matching Prisma schema exactly)
          extractorOne: apiData.extractorOne || '',
          extractortwo: apiData.extractortwo || '',
          iEDate: apiData.iEDate || '',
          iawpl: apiData.iawpl || '',
          nfeature: apiData.nfeature || '',
          ifeature: apiData.ifeature || '',
          idattachments: apiData.idattachments || [],
          scountry: apiData.scountry || '',
          oextractor: apiData.oextractor || '',
          
          // NBA Updates
          updatenba: apiData.updatenba || '',
          
          // Effort Sheet Details
          iprecognizer: apiData.iprecognizer || '',
          hoursspent: apiData.hoursspent || 0,
          agencyrecognizer: apiData.agencyrecognizer || '',
          agencycost: apiData.agencycost || 0,
          revieweffort: apiData.revieweffort || 0,
          managerempid: apiData.managerempid || '',
          extractionEffort: apiData.extractionEffort || 0,
          
          // Activity Status
          activityStatus: apiData.activityStatus || ''
        };
        
      case 'patentabilityAnalysis':
        return {
          // Patentability Analysis fields
          analysisType: apiData.analysisType || '',
          analysisDate: apiData.analysisDate || '',
          priorArtScope: apiData.priorArtScope || '',
          patentabilityRating: apiData.patentabilityRating || '',
          analysisSummary: apiData.analysisSummary || '',
          patentReferences: apiData.patentReferences || '',
          nonPatentLiterature: apiData.nonPatentLiterature || '',
          priorArtSearch: apiData.priorArtSearch || '',
          noveltyAssessment: apiData.noveltyAssessment || '',
          inventiveStep: apiData.inventiveStep || '',
          industrialApplicability: apiData.industrialApplicability || '',
          patentabilityConclusion: apiData.patentabilityConclusion || '',
          recommendations: apiData.recommendations || '',
          riskAssessment: apiData.riskAssessment || '',
          competitorAnalysis: apiData.competitorAnalysis || '',
          marketPotential: apiData.marketPotential || '',
          technicalFeasibility: apiData.technicalFeasibility || '',
          legalCompliance: apiData.legalCompliance || '',
          costBenefitAnalysis: apiData.costBenefitAnalysis || '',
          timelineEstimate: apiData.timelineEstimate || '',
          nextSteps: apiData.nextSteps || '',
          
          // Extractor Details fields
          extractorOne: apiData.extractorOne || '',
          extractortwo: apiData.extractortwo || '',
          iEDate: apiData.iEDate || '',
          iawpl: apiData.iawpl || '',
          nfeature: apiData.nfeature || '',
          ifeature: apiData.ifeature || '',
          idattachments: apiData.idattachments || [],
          scountry: apiData.scountry || '',
          oextractor: apiData.oextractor || '',
          
          // Innovation Analysis fields
          trainRun: apiData.trainRun || '',
          minuteOfMeeting: apiData.minuteOfMeeting || [],
          attachments: apiData.attachments || [],
          
          // Decision Sheet fields
          nodc: apiData.nodc || '',
          dibrief: apiData.dibrief || '',
          
          // Patentability Extractor fields
          psone: apiData.psone || '',
          pstwo: apiData.pstwo || '',
          rating: apiData.rating || 0,
          collaboration: apiData.collaboration || '',
          
          // Effort Sheet fields
          iprecognizer: apiData.iprecognizer || '',
          hoursspent: apiData.hoursspent || 0,
          agencyrecognizer: apiData.agencyrecognizer || '',
          agencycost: apiData.agencycost || 0,
          revieweffort: apiData.revieweffort || 0,
          managerempid: apiData.managerempid || '',
          extractionEffort: apiData.extractionEffort || 0,
          
          // Activity Status
          activityStatus: apiData.activityStatus || ''
        };
        
      case 'patentSpecification':
        return {
          // Common fields
          rating: apiData.rating || 0,
          activityStatus: apiData.activityStatus || '',
          draftType: apiData.draftType || '',
          
          // Complete Specification fields
          isProvisionalFiled: apiData.isProvisionalFiled || '',
          provisionalSpecDate: apiData.provisionalSpecDate || '',
          applicationNumber: apiData.applicationNumber || '',
          isPCTFiled: apiData.isPCTFiled || '',
          pctFilingDate: apiData.pctFilingDate || '',
          isPCTPublished: apiData.isPCTPublished || '',
          citedPatent: apiData.citedPatent || '',
          independentClaim: apiData.independentClaim || '',
          dependentClaim: apiData.dependentClaim || '',
          broadenedFeature: apiData.broadenedFeature || '',
          isProfitPatent: apiData.isProfitPatent || '',
          isDefensivePatent: apiData.isDefensivePatent || '',
          draftVersions: apiData.draftVersions || [],
          draftingEffort: apiData.draftingEffort || '',
          drafterEmpId: apiData.drafterEmpId || '',
          hoursSpent: apiData.hoursSpent || '',
          agencyRecognizer: apiData.agencyRecognizer || '',
          agencyCost: apiData.agencyCost || '',
          reviewEffort: apiData.reviewEffort || '',
          managerEmpId: apiData.managerEmpId || '',
          
          // Provisional Application fields
          nodrafter: apiData.nodrafter || '',
          noreviewer: apiData.noreviewer || '',
          attachments: apiData.attachments || [],
          bned: apiData.bned || '',
          ifdescribed: apiData.ifdescribed || '',
          toinvention: apiData.toinvention || '',
          esfd: apiData.esfd || '',
          pdrafter: apiData.pdrafter || '',
          nohspent: apiData.nohspent || '',
          eafd: apiData.eafd || '',
          csoagency: apiData.csoagency || '',
          eihfr: apiData.eihfr || '',
          mres: apiData.mres || '',
          
          // PCT Application fields
          isDirectPCT: apiData.isDirectPCT || '',
          pctParentPermission: apiData.pctParentPermission || [],
          pctProvisionalDate: apiData.pctProvisionalDate || '',
          pctApplicationNumber: apiData.pctApplicationNumber || '',
          pctDrafterName: apiData.pctDrafterName || '',
          pctClaimSheet: apiData.pctClaimSheet || [],
          pctFormsPrepared: apiData.pctFormsPrepared || '',
          pctCountryFiling: apiData.pctCountryFiling || '',
          pctReviewBy: apiData.pctReviewBy || '',
          pctCitedPatent: apiData.pctCitedPatent || '',
          pctIndependentClaim: apiData.pctIndependentClaim || '',
          pctDependentClaim: apiData.pctDependentClaim || '',
          pctBroadenedFeature: apiData.pctBroadenedFeature || '',
          pctIsProfit: apiData.pctIsProfit || '',
          pctIsDefensive: apiData.pctIsDefensive || '',
          pctAllDrafts: apiData.pctAllDrafts || [],
          pctDraftingEffort: apiData.pctDraftingEffort || '',
          pctDrafterEmpId: apiData.pctDrafterEmpId || '',
          pctHoursSpent: apiData.pctHoursSpent || '',
          pctAgencyRecognizer: apiData.pctAgencyRecognizer || '',
          pctAgencyCost: apiData.pctAgencyCost || '',
          pctReviewEffort: apiData.pctReviewEffort || '',
          pctManagerEmpId: apiData.pctManagerEmpId || '',
          pctActivityStatus: apiData.pctActivityStatus || '',
          
          // National Phase fields
          npPCTDate: apiData.npPCTDate || '',
          npApplicationNumber: apiData.npApplicationNumber || '',
          npPCTPublication: apiData.npPCTPublication || '',
          npSearchReport: apiData.npSearchReport || [],
          npPCTOrProvisionalDate: apiData.npPCTOrProvisionalDate || '',
          npApplicationCountry: apiData.npApplicationCountry || '',
          npDrafterName: apiData.npDrafterName || '',
          npClaimSheet: apiData.npClaimSheet || [],
          npFormsPrepared: apiData.npFormsPrepared || '',
          npCountryFiling: apiData.npCountryFiling || '',
          npReviewBy: apiData.npReviewBy || '',
          npCitedPatent: apiData.npCitedPatent || '',
          npIndependentClaim: apiData.npIndependentClaim || '',
          npDependentClaim: apiData.npDependentClaim || '',
          npBroadenedFeature: apiData.npBroadenedFeature || '',
          npIsProfit: apiData.npIsProfit || '',
          npIsDefensive: apiData.npIsDefensive || '',
          npAllDrafts: apiData.npAllDrafts || [],
          npDraftingEffort: apiData.npDraftingEffort || '',
          npDrafterEmpId: apiData.npDrafterEmpId || '',
          npHoursSpent: apiData.npHoursSpent || '',
          npAgencyRecognizer: apiData.npAgencyRecognizer || '',
          npAgencyCost: apiData.npAgencyCost || '',
          npReviewEffort: apiData.npReviewEffort || '',
          npManagerEmpId: apiData.npManagerEmpId || '',
          npActivityStatus: apiData.npActivityStatus || ''
        };
        
      case 'patentFiling':
        return {
          // Patent Filing fields (matching API response)
          activityStatus: apiData.activityStatus || '',
          rating: apiData.rating || 0,
          draftType: apiData.draftType || '',
          
          // Provisional fields
          patentFilingName: apiData.patentFilingName || '',
          provisionalPatent: apiData.provisionalPatent || [],
          attachment: apiData.attachment || [],
          dateProvision: apiData.dateProvision || '',
          applicantName: apiData.applicantName || '',
          isProfilePatent: apiData.isProfilePatent || '',
          isDefensivePatent: apiData.isDefensivePatent || '',
          claimingStartup: apiData.claimingStartup || [],
          poaOffice: apiData.poaOffice || '',
          effortsSpent: apiData.effortsSpent || '',
          patentFiler: apiData.patentFiler || '',
          hoursSpent: apiData.hoursSpent || '',
          agencyRecognizer: apiData.agencyRecognizer || '',
          agencyCost: apiData.agencyCost || '',
          managerResponsible: apiData.managerResponsible || '',

          // PCT fields
          postDated: apiData.postDated || '',
          applicationProvisionalNumber: apiData.applicationProvisionalNumber || '',
          datePatentApplication: apiData.datePatentApplication || '',
          pctFilingPermission: apiData.pctFilingPermission || '',

          // National Phase fields
          dateProvisionalPatent: apiData.dateProvisionalPatent || '',
          dateCompletePatentApplication: apiData.dateCompletePatentApplication || '',
          datePCTPatentApplication: apiData.datePCTPatentApplication || '',
          finalSubmitted: apiData.finalSubmitted || '',
          filedForms: apiData.filedForms || [],

          // Complete fields
          dateOfPatent: apiData.dateOfPatent || '',
          provisionalNumber: apiData.provisionalNumber || '',
          specificationFiling: apiData.specificationFiling || '',
          agentFiling: apiData.agentFiling || '',
          filedDraft: apiData.filedDraft || [],
          filedFormsComplete: apiData.filedFormsComplete || [],
          dateOfComplete: apiData.dateOfComplete || '',
          isPostDated: apiData.isPostDated || '',
        };
        
      case 'patentProsecution':
        return {
          // Patent Prosecution Details fields (matching old component)
          patentPublished: apiData.patentPublished || '',
          publicationNumber: apiData.publicationNumber || '',
          apopposed: apiData.apopposed || '',
          oname: apiData.oname || '',
          attachments: apiData.attachments || [],
          cfbopposer: apiData.cfbopposer || '',
          boaof: apiData.boaof || '',
          rffo: apiData.rffo || '',
          orpby: apiData.orpby || '',
          eagency: apiData.eagency || '',
          revby: apiData.revby || '',
          
          // Patent Application Status fields
          patentStatus: apiData.patentStatus || 'yes',
          patentNumber: apiData.patentNumber || '',
          patentAttachment: apiData.patentAttachment || [],
          patentGrantDate: apiData.patentGrantDate || '',
          rejectionReasonAttachment: apiData.rejectionReasonAttachment || [],
          
          // FER (First Examination Report) fields - as array
          ferList: apiData.ferList || [],
          
          // Hearing Details fields - as array
          hearingList: apiData.hearingList || [],
          
          // Decision Sheet fields - with decision prefix
          decisionNodc: apiData.decisionNodc || '',
          decisionDibrief: apiData.decisionDibrief || '',
          decisionAttachments: apiData.decisionAttachments || [],
          
          // Also map old field names for backward compatibility
          ppNodc: apiData.decisionNodc || '',
          ppDibrief: apiData.decisionDibrief || '',
          ppDecisionAttachments: apiData.decisionAttachments || [],
          
          // Innovation Analysis fields (pp prefix)
          ppTrainRun: apiData.ppTrainRun || '',
          ppMinuteOfMeeting: apiData.ppMinuteOfMeeting || [],
          ppInnovationAttachments: apiData.ppInnovationAttachments || [],
          
          // Patentability Extractor fields (pp prefix)
          ppPsone: apiData.ppPsone || '',
          ppPstwo: apiData.ppPstwo || '',
          ppCollaboration: apiData.ppCollaboration || '',
          ppNfeature: apiData.ppNfeature || '',
          ppIfeature: apiData.ppIfeature || '',
          ppAttachment: apiData.ppAttachment || [],
          ppScountry: apiData.ppScountry || '',
          ppOextractor: apiData.ppOextractor || '',
          
          // Average Patentability Rating fields (pp prefix)
          ppRating: apiData.ppRating || 0,
          ppPatentApplicationNumber: apiData.ppPatentApplicationNumber || '',
          
          // Effort Sheet fields (pp prefix)
          ppIpRecognizer: apiData.ppIpRecognizer || '',
          ppHoursSpent: apiData.ppHoursSpent || '',
          ppAgencyRecognizer: apiData.ppAgencyRecognizer || '',
          ppAgencyCost: apiData.ppAgencyCost || '',
          ppReviewEffort: apiData.ppReviewEffort || '',
          ppManagerEmpId: apiData.ppManagerEmpId || '',
          ppExtractionEffort: apiData.ppExtractionEffort || '',

          ipRecognizer: apiData.ipRecognizer || '',
          hoursSpent: apiData.hoursSpent || '',
          agencyRecognizer: apiData.agencyRecognizer || '',
          agencyCost: apiData.agencyCost || '',
          activityStatus: apiData.activityStatus || ''
        };
        
      case 'postGrantOpposition':
        return {
          // PGO Extractor Details fields
          extractorOne: apiData.extractorOne || '',
          extractortwo: apiData.extractortwo || '',
          iEDate: apiData.iEDate || '',
          iawpl: apiData.iawpl || '',
          nfeature: apiData.nfeature || '',
          ifeature: apiData.ifeature || '',
          idattachments: apiData.idattachments || [],
          scountry: apiData.scountry || '',
          oextractor: apiData.oextractor || '',
          
          // PGO Innovation Analysis fields
          trainRun: apiData.trainRun || '',
          minuteOfMeeting: apiData.minuteOfMeeting || [],
          innovationAttachments: apiData.innovationAttachments || [],
          
          // PGO Patentability Extractor fields
          psone: apiData.psone || '',
          pstwo: apiData.pstwo || '',
          rating: apiData.rating || 0,
          collaboration: apiData.collaboration || '',
          paNovelFeature: apiData.paNovelFeature || '',
          paInventiveFeature: apiData.paInventiveFeature || '',
          paSpecificCountry: apiData.paSpecificCountry || '',
          paOpinionOfExtractor: apiData.paOpinionOfExtractor || '',
          patentabilityAttachments: apiData.patentabilityAttachments || [],
          
          // PGO Decision Sheet fields
          nodc: apiData.nodc || '',
          dibrief: apiData.dibrief || '',
          decisionAttachments: apiData.decisionAttachments || [],
          
          // PGO fields matching old formData7 structure
          patentApplicationNumber: apiData.patentApplicationNumber || '',
          patentPublished: apiData.patentPublished || '',
          publicationNumber: apiData.publicationNumber || '',
          apopposed: apiData.apopposed || '',
          oname: apiData.oname || '',
          opposerAttachment: apiData.opposerAttachment || [],
          cfbopposer: apiData.cfbopposer || '',
          boaof: apiData.boaof || '',
          rffo: apiData.rffo || '',
          responseAttachment: apiData.responseAttachment || [],
          orpby: apiData.orpby || '',
          eagency: apiData.eagency || '',
          revby: apiData.revby || '',
          reviewAttachment: apiData.reviewAttachment || [],
          ipRecognizer: apiData.ipRecognizer || '',
          hoursSpent: apiData.hoursSpent || '',
          agencyRecognizer: apiData.agencyRecognizer || '',
          agencyCost: apiData.agencyCost || '',
          reviewEffort: apiData.reviewEffort || '',
          reviewEffortHours: apiData.reviewEffortHours || '',
          managerEmpId: apiData.managerEmpId || '',
          activityStatus: apiData.activityStatus || ''
        };
        
      case 'patentMaintenance':
        return {
          // Patent Maintenance fields
          maintenanceDate: apiData.maintenanceDate || '',
          patentNumber: apiData.patentNumber || '',
          maintenanceFees: apiData.maintenanceFees || 0,
          paymentStatus: apiData.paymentStatus || '',
          dueDate: apiData.dueDate || '',
          gracePeriod: apiData.gracePeriod || '',
          lateFees: apiData.lateFees || 0,
          renewalPeriod: apiData.renewalPeriod || '',
          nextRenewal: apiData.nextRenewal || '',
          maintenanceHistory: apiData.maintenanceHistory || [],
          costBreakdown: apiData.costBreakdown || {},
          paymentMethod: apiData.paymentMethod || '',
          reminderSet: apiData.reminderSet || false,
          automaticRenewal: apiData.automaticRenewal || false,
          status: apiData.status || '',
          rating: apiData.rating || 0,
          activityStatus: apiData.activityStatus || ''
        };
        
      case 'patentCommercialization':
        return {
          // Patent Commercialization fields
          commercializationDate: apiData.commercializationDate || '',
          patentNumber: apiData.patentNumber || '',
          commercializationStrategy: apiData.commercializationStrategy || '',
          targetMarkets: apiData.targetMarkets || [],
          licensingOpportunities: apiData.licensingOpportunities || '',
          potentialLicensees: apiData.potentialLicensees || [],
          royaltyRates: apiData.royaltyRates || {},
          licensingTerms: apiData.licensingTerms || '',
          marketAnalysis: apiData.marketAnalysis || '',
          competitiveAdvantage: apiData.competitiveAdvantage || '',
          revenueProjections: apiData.revenueProjections || {},
          partnershipOpportunities: apiData.partnershipOpportunities || [],
          technologyTransfer: apiData.technologyTransfer || '',
          IPPortfolio: apiData.IPPortfolio || '',
          valuation: apiData.valuation || 0,
          commercializationStatus: apiData.commercializationStatus || '',
          rating: apiData.rating || 0,
          activityStatus: apiData.activityStatus || ''
        };
        
      default:
        console.log('⚠️ Unknown page for mapping:', page);
        return {};
    }
  },

  clearAllData: () => {
    set({
      inventionRecognition: getInitialFormData('inventionRecognition'),
      inventionExtraction: getInitialFormData('inventionExtraction'),
      patentabilityAnalysis: getInitialFormData('patentabilityAnalysis'),
      patentSpecification: getInitialFormData('patentSpecification'),
      patentFiling: getInitialFormData('patentFiling'),
      patentProsecution: getInitialFormData('patentProsecution'),
      patentMaintenance: getInitialFormData('patentMaintenance'),
      patentCommercialization: getInitialFormData('patentCommercialization'),
      postGrantOpposition: getInitialFormData('postGrantOpposition'),
      currentAssetId: null,
      errors: {}
    });
  },

  clearAllDataAndAssetId: () => {
    set({
      inventionRecognition: getInitialFormData('inventionRecognition'),
      inventionExtraction: getInitialFormData('inventionExtraction'),
      patentabilityAnalysis: getInitialFormData('patentabilityAnalysis'),
      patentSpecification: getInitialFormData('patentSpecification'),
      patentFiling: getInitialFormData('patentFiling'),
      patentProsecution: getInitialFormData('patentProsecution'),
      patentMaintenance: getInitialFormData('patentMaintenance'),
      patentCommercialization: getInitialFormData('patentCommercialization'),
      postGrantOpposition: getInitialFormData('postGrantOpposition'),
      currentAssetId: null,
      errors: {}
    });
    console.log('🗑️ All store data and asset ID cleared');
  },

  // Form 9 (Patent Commercialization) - Complete Field Names Reference
  getPCFieldNames: () => {
    return {
      // PC Invention Details fields (pcInventionDetails prefix)
      inventionDetails: [
        'pcInventionDetailsTitle',
        'pcInventionDetailsCommonName',
        'pcInventionDetailsInventorDetails',
        'pcInventionDetailsEntity',
        'pcInventionDetailsDate',
        'pcInventionDetailsCountry',
        'pcInventionDetailsCreationCountry',
        'pcInventionDetailsCollaboration',
        'pcInventionDetailsCollaboratorName',
        'pcInventionDetailsCollaboratorCountry',
        'pcInventionDetailsStakeholders'
      ],
      
      // PC Patent Commercialization Child fields (pcPatentCommercializationChild prefix)
      patentCommercializationChild: [
        'pcPatentCommercializationChildStage',
        'pcPatentCommercializationChildWorkingFiled',
        'pcPatentCommercializationChildImplementationFile',
        'pcPatentCommercializationChildFirstWorkingDate',
        'pcPatentCommercializationChildCommercializationStatus',
        'pcPatentCommercializationChildRevenueGenerated',
        'pcPatentCommercializationChildMarketValue',
        'pcPatentCommercializationChildLicensingFee',
        'pcPatentCommercializationChildRoyaltyRate',
        'pcPatentCommercializationChildPartnerName',
        'pcPatentCommercializationChildPartnershipType',
        'pcPatentCommercializationChildPartnershipDetails',
        'pcPatentCommercializationChildStartDate',
        'pcPatentCommercializationChildExpectedCompletionDate',
        'pcPatentCommercializationChildActualCompletionDate'
      ],
      
      // PC PAN fields (pcPAN prefix)
      pan: [
        'pcPANPatentApplicationNumber',
        'pcPANPatentNumber'
      ],
      
      // PC Patent Commercialization Efforts fields (pcPatentCommercializationEfforts prefix)
      patentCommercializationEfforts: [
        'pcPatentCommercializationEffortsSalesFile',
        'pcPatentCommercializationEffortsPeriodicSales',
        'pcPatentCommercializationEffortsInvoiceFile',
        'pcPatentCommercializationEffortsCommercializationDate',
        'pcPatentCommercializationEffortsProductId',
        'pcPatentCommercializationEffortsIsLicensed',
        'pcPatentCommercializationEffortsIsCrossLicensed',
        'pcPatentCommercializationEffortsIsCompulsoryLicenseFiled'
      ],
      
      // PC Activity Status fields (pcActivityStatus prefix)
      activityStatus: [
        'pcActivityStatusStatus',
        'pcActivityStatusDescription',
        'pcActivityStatusLastUpdated'
      ],
      
      // All PC fields combined
      all: [
        // Invention Details
        'pcInventionDetailsTitle', 'pcInventionDetailsCommonName', 'pcInventionDetailsInventorDetails',
        'pcInventionDetailsEntity', 'pcInventionDetailsDate', 'pcInventionDetailsCountry',
        'pcInventionDetailsCreationCountry', 'pcInventionDetailsCollaboration',
        'pcInventionDetailsCollaboratorName', 'pcInventionDetailsCollaboratorCountry',
        'pcInventionDetailsStakeholders',
        
        // Patent Commercialization Child
        'pcPatentCommercializationChildStage', 'pcPatentCommercializationChildWorkingFiled',
        'pcPatentCommercializationChildImplementationFile', 'pcPatentCommercializationChildFirstWorkingDate',
        'pcPatentCommercializationChildCommercializationStatus', 'pcPatentCommercializationChildRevenueGenerated',
        'pcPatentCommercializationChildMarketValue', 'pcPatentCommercializationChildLicensingFee',
        'pcPatentCommercializationChildRoyaltyRate', 'pcPatentCommercializationChildPartnerName',
        'pcPatentCommercializationChildPartnershipType', 'pcPatentCommercializationChildPartnershipDetails',
        'pcPatentCommercializationChildStartDate', 'pcPatentCommercializationChildExpectedCompletionDate',
        'pcPatentCommercializationChildActualCompletionDate',
        
        // PAN
        'pcPANPatentApplicationNumber', 'pcPANPatentNumber',
        
        // Patent Commercialization Efforts
        'pcPatentCommercializationEffortsSalesFile', 'pcPatentCommercializationEffortsPeriodicSales',
        'pcPatentCommercializationEffortsInvoiceFile', 'pcPatentCommercializationEffortsCommercializationDate',
        'pcPatentCommercializationEffortsProductId', 'pcPatentCommercializationEffortsIsLicensed',
        'pcPatentCommercializationEffortsIsCrossLicensed', 'pcPatentCommercializationEffortsIsCompulsoryLicenseFiled',
        
        // Activity Status
        'pcActivityStatusStatus', 'pcActivityStatusDescription', 'pcActivityStatusLastUpdated'
      ]
    };
  },

  // Form 7 (Post Grant Opposition) - Complete Field Names Reference
  getPGOFieldNames: () => {
    return {
      // PGO Invention Details fields (pgoInventionDetails prefix)
      inventionDetails: [
        'pgoInventionDetailsTitle',
        'pgoInventionDetailsCommonName',
        'pgoInventionDetailsInventorDetails',
        'pgoInventionDetailsEntity',
        'pgoInventionDetailsDate',
        'pgoInventionDetailsCountry',
        'pgoInventionDetailsCreationCountry',
        'pgoInventionDetailsCollaboration',
        'pgoInventionDetailsCollaboratorName',
        'pgoInventionDetailsCollaboratorCountry',
        'pgoInventionDetailsStakeholders'
      ],
      
      // PGO Extractor Details fields (pgoExtractorDetails prefix)
      extractorDetails: [
        'pgoExtractorDetailsOne',
        'pgoExtractorDetailsTwo',
        'pgoExtractorDetailsExtractionDate',
        'pgoExtractorDetailsAvailableWithPriorLiterature',
        'pgoExtractorDetailsNovelFeature',
        'pgoExtractorDetailsInventiveFeature',
        'pgoExtractorDetailsSpecificCountry',
        'pgoExtractorDetailsOpinion',
        'pgoExtractorDetailsAttachments'
      ],
      
      // PGO Patent Prosecution Details fields (pgoPatentProsecutionDetails prefix)
      patentProsecutionDetails: [
        'pgoPatentProsecutionDetailsPublished',
        'pgoPatentProsecutionDetailsPublicationNumber',
        'pgoPatentProsecutionDetailsAnyPersonOpposed',
        'pgoPatentProsecutionDetailsOpponentName',
        'pgoPatentProsecutionDetailsAttachments',
        'pgoPatentProsecutionDetailsCaseFiledByOpposer',
        'pgoPatentProsecutionDetailsBasisOfActionOfFiling',
        'pgoPatentProsecutionDetailsReasonForFilingOpposition',
        'pgoPatentProsecutionDetailsOpinionRenderedByYou',
        'pgoPatentProsecutionDetailsExternalAgency',
        'pgoPatentProsecutionDetailsReviewedBy'
      ],
      
      // PGO PAN fields (pgoPAN prefix)
      pan: [
        'pgoPANPatentApplicationNumber',
        'pgoPANPatentNumber'
      ],
      
      // PGO Decision Sheet fields (pgoDecisionSheet prefix)
      decisionSheet: [
        'pgoDecisionSheetNameOfDecisionMaker',
        'pgoDecisionSheetDecisionInBrief',
        'pgoDecisionSheetAttachments'
      ],
      
      // PGO Innovation Analysis fields (pgoInnovationAnalysis prefix)
      innovationAnalysis: [
        'pgoInnovationAnalysisMoreThanInvention',
        'pgoInnovationAnalysisPriorArtDocuments',
        'pgoInnovationAnalysisNPLDocuments'
      ],
      
      // PGO Patentability Extractor fields (pgoPatentabilityExtractor prefix)
      patentabilityExtractor: [
        'pgoPatentabilityExtractorRating',
        'pgoPatentabilityExtractorInventionAccordance',
        'pgoPatentabilityExtractorNoveltyAssessment',
        'pgoPatentabilityExtractorInventiveStep',
        'pgoPatentabilityExtractorIndustrialApplicability'
      ],
      
      // PGO Effort Sheet Details fields (pgoEffortSheetDetails prefix)
      effortSheetDetails: [
        'pgoEffortSheetDetailsEffortHours',
        'pgoEffortSheetDetailsCostIncurred',
        'pgoEffortSheetDetailsResourcesUsed',
        'pgoEffortSheetDetailsTeamMembers',
        'pgoEffortSheetDetailsStartDate',
        'pgoEffortSheetDetailsEndDate',
        'pgoEffortSheetDetailsAttachments'
      ],
      
      // PGO Activity Status fields (pgoActivityStatus prefix)
      activityStatus: [
        'pgoActivityStatusStatus',
        'pgoActivityStatusDescription',
        'pgoActivityStatusLastUpdated'
      ],
      
      // All PGO fields combined
      all: [
        // Invention Details
        'pgoInventionDetailsTitle', 'pgoInventionDetailsCommonName', 'pgoInventionDetailsInventorDetails',
        'pgoInventionDetailsEntity', 'pgoInventionDetailsDate', 'pgoInventionDetailsCountry',
        'pgoInventionDetailsCreationCountry', 'pgoInventionDetailsCollaboration',
        'pgoInventionDetailsCollaboratorName', 'pgoInventionDetailsCollaboratorCountry',
        'pgoInventionDetailsStakeholders',
        
        // Extractor Details
        'pgoExtractorDetailsOne', 'pgoExtractorDetailsTwo', 'pgoExtractorDetailsExtractionDate',
        'pgoExtractorDetailsAvailableWithPriorLiterature', 'pgoExtractorDetailsNovelFeature',
        'pgoExtractorDetailsInventiveFeature', 'pgoExtractorDetailsSpecificCountry',
        'pgoExtractorDetailsOpinion', 'pgoExtractorDetailsAttachments',
        
        // Patent Prosecution Details
        'pgoPatentProsecutionDetailsPublished', 'pgoPatentProsecutionDetailsPublicationNumber',
        'pgoPatentProsecutionDetailsAnyPersonOpposed', 'pgoPatentProsecutionDetailsOpponentName',
        'pgoPatentProsecutionDetailsAttachments', 'pgoPatentProsecutionDetailsCaseFiledByOpposer',
        'pgoPatentProsecutionDetailsBasisOfActionOfFiling', 'pgoPatentProsecutionDetailsReasonForFilingOpposition',
        'pgoPatentProsecutionDetailsOpinionRenderedByYou', 'pgoPatentProsecutionDetailsExternalAgency',
        'pgoPatentProsecutionDetailsReviewedBy',
        
        // PAN
        'pgoPANPatentApplicationNumber', 'pgoPANPatentNumber',
        
        // Decision Sheet
        'pgoDecisionSheetNameOfDecisionMaker', 'pgoDecisionSheetDecisionInBrief', 'pgoDecisionSheetAttachments',
        
        // Innovation Analysis
        'pgoInnovationAnalysisMoreThanInvention', 'pgoInnovationAnalysisPriorArtDocuments', 'pgoInnovationAnalysisNPLDocuments',
        
        // Patentability Extractor
        'pgoPatentabilityExtractorRating', 'pgoPatentabilityExtractorInventionAccordance',
        'pgoPatentabilityExtractorNoveltyAssessment', 'pgoPatentabilityExtractorInventiveStep',
        'pgoPatentabilityExtractorIndustrialApplicability',
        
        // Effort Sheet Details
        'pgoEffortSheetDetailsEffortHours', 'pgoEffortSheetDetailsCostIncurred', 'pgoEffortSheetDetailsResourcesUsed',
        'pgoEffortSheetDetailsTeamMembers', 'pgoEffortSheetDetailsStartDate', 'pgoEffortSheetDetailsEndDate',
        'pgoEffortSheetDetailsAttachments',
        
        // Activity Status
        'pgoActivityStatusStatus', 'pgoActivityStatusDescription', 'pgoActivityStatusLastUpdated'
      ]
    };
  },

  // Inventor management functions
  addInventor: (page) => {
    set((state) => {
      const currentData = state[page] || {};
      const currentInventors = currentData.inventors || [];
      
      const newInventor = {
        name: '',
        deptId: '',
        empId: '',
        isSaved: false
      };
      
      const updatedInventors = [...currentInventors, newInventor];
      
      return {
        [page]: {
          ...currentData,
          inventors: updatedInventors
        }
      };
    });
    console.log('➕ Added new inventor to', page);
  },

  updateInventor: (page, index, field, value) => {
    set((state) => {
      const currentData = state[page] || {};
      const currentInventors = currentData.inventors || [];
      
      if (index >= 0 && index < currentInventors.length) {
        const updatedInventors = [...currentInventors];
        updatedInventors[index] = {
          ...updatedInventors[index],
          [field]: value
        };
        
        return {
          [page]: {
            ...currentData,
            inventors: updatedInventors
          }
        };
      }
      
      return state;
    });
  },

  removeInventor: (page, index) => {
    set((state) => {
      const currentData = state[page] || {};
      const currentInventors = currentData.inventors || [];
      
      if (index >= 0 && index < currentInventors.length) {
        const updatedInventors = currentInventors.filter((_, i) => i !== index);
        
        return {
          [page]: {
            ...currentData,
            inventors: updatedInventors
          }
        };
      }
      
      return state;
    });
    console.log('🗑️ Removed inventor at index', index, 'from', page);
  },

  markInventorAsSaved: (page, index) => {
    set((state) => {
      const currentData = state[page] || {};
      const currentInventors = currentData.inventors || [];
      
      if (index >= 0 && index < currentInventors.length) {
        const updatedInventors = [...currentInventors];
        updatedInventors[index] = {
          ...updatedInventors[index],
          isSaved: true
        };
        
        return {
          [page]: {
            ...currentData,
            inventors: updatedInventors
          }
        };
      }
      
      return state;
    });
    console.log('✅ Marked inventor at index', index, 'as saved in', page);
  }
}));

export default useV2Store;