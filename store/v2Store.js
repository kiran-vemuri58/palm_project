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
      // Patent Filing fields
      filingDate: '',
      applicationNumber: '',
      filingJurisdiction: '',
      filingType: '',
      priorityClaim: '',
      priorityDate: '',
      priorityNumber: '',
      applicantName: '',
      inventorNames: [],
      attorneyName: '',
      filingFees: 0,
      status: '',
      examinationDate: '',
      publicationDate: '',
      grantDate: '',
      expiryDate: '',
      maintenanceFees: 0,
      renewalDates: []
    },
    
    patentProsecution: {
      // Patent Prosecution fields
      prosecutionDate: '',
      officeActionDate: '',
      officeActionType: '',
      responseDeadline: '',
      responseDate: '',
      responseContent: '',
      examinerName: '',
      examinerComments: '',
      claimsAmended: false,
      claimsAdded: 0,
      claimsRemoved: 0,
      finalRejection: false,
      appealFiled: false,
      appealDate: '',
      prosecutionStatus: '',
      nextAction: '',
      estimatedCompletion: ''
    },
    
    patentMaintenance: {
      // Patent Maintenance fields
      maintenanceDate: '',
      patentNumber: '',
      maintenanceFees: 0,
      paymentStatus: '',
      dueDate: '',
      gracePeriod: '',
      lateFees: 0,
      renewalPeriod: '',
      nextRenewal: '',
      maintenanceHistory: [],
      costBreakdown: {},
      paymentMethod: '',
      reminderSet: false,
      automaticRenewal: false,
      status: ''
    },
    
    patentCommercialization: {
      // Patent Commercialization fields
      commercializationDate: '',
      patentNumber: '',
      commercializationStrategy: '',
      targetMarkets: [],
      licensingOpportunities: '',
      potentialLicensees: [],
      royaltyRates: {},
      licensingTerms: '',
      marketAnalysis: '',
      competitiveAdvantage: '',
      revenueProjections: {},
      partnershipOpportunities: [],
      technologyTransfer: '',
      IPPortfolio: '',
      valuation: 0,
      commercializationStatus: ''
    },
    
    postGrantOpposition: {
      // Post Grant Opposition fields
      oppositionDate: '',
      patentNumber: '',
      opponentName: '',
      oppositionGrounds: [],
      evidenceFiled: [],
      hearingDate: '',
      decisionDate: '',
      oppositionOutcome: '',
      appealFiled: false,
      appealDate: '',
      finalDecision: '',
      costsAwarded: 0,
      status: '',
      nextSteps: '',
      legalRepresentation: '',
      oppositionStrategy: ''
    }
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
      const apiEndpoint = page === 'inventionExtraction' 
        ? `/api/extraction/get/${assetId}`
        : `/api/invention/get/${assetId}`;
        
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