export const draftFieldsMap = {
  provisional: [
    'nodrafter', 'noreviewer', 'attachments', 'bned', 'ifdescribed', 'toinvention',
    'esfd', 'pdrafter', 'nohspent', 'eafd', 'csoagency', 'eihfr', 'mres',
  ],
  complete: [
    'isProvisionalFiled', 'provisionalSpecDate', 'applicationNumber', 'isPCTFiled',
    'pctFilingDate', 'isPCTPublished', 'citedPatent', 'independentClaim', 'dependentClaim',
    'broadenedFeature', 'isProfitPatent', 'isDefensivePatent', 'draftVersions',
    'draftingEffort', 'drafterEmpId', 'hoursSpent', 'agencyRecognizer', 'agencyCost',
    'reviewEffort', 'managerEmpId', 'activityStatus',
  ],
  pct: [
    'isDirectPCT', 'pctParentPermission', 'pctProvisionalDate', 'pctApplicationNumber',
    'pctDrafterName', 'pctClaimSheet', 'pctFormsPrepared', 'pctCountryFiling',
    'pctReviewBy', 'pctCitedPatent', 'pctIndependentClaim', 'pctDependentClaim',
    'pctBroadenedFeature', 'pctIsProfit', 'pctIsDefensive', 'pctAllDrafts',
    'pctDraftingEffort', 'pctDrafterEmpId', 'pctHoursSpent', 'pctAgencyRecognizer',
    'pctAgencyCost', 'pctReviewEffort', 'pctManagerEmpId', 'pctActivityStatus',
  ],
  national_phase: [
    'npPCTDate', 'npApplicationNumber', 'npPCTPublication', 'npSearchReport',
    'npPCTOrProvisionalDate', 'npApplicationCountry', 'npDrafterName', 'npClaimSheet',
    'npFormsPrepared', 'npCountryFiling', 'npReviewBy', 'npCitedPatent',
    'npIndependentClaim', 'npDependentClaim', 'npBroadenedFeature', 'npIsProfit',
    'npIsDefensive', 'npAllDrafts', 'npDraftingEffort', 'npDrafterEmpId',
    'npHoursSpent', 'npAgencyRecognizer', 'npAgencyCost', 'npReviewEffort',
    'npManagerEmpId', 'npActivityStatus',
  ],
};


export const draftFieldsMap5 = {
  "Provisional": [
    "patentFilingName",
    "provisionalPatent",
    "attachment",
    "dateProvision",
    "applicantName",
    "isProfilePatent",
    "isDefensivePatent",
    "claimingStartup",
    "poaOffice",
    "effortsSpent",
    "patentFiler",
    "hoursSpent",
    "agencyRecognizer",
    "agencyCost",
    "managerResponsible"
  ],
  "PCT": {
    "Post Dated": "postDated",
    "Date Provision": "dateProvision",
    "Application Provisional Number": "applicationProvisionalNumber",
    "Date of Patent Application": "datePatentApplication",
    "Is permission for PCT filing is obtained?": "pctFilingPermission",
    "Efforts Spent": "effortsSpent",
    "Patent Filer": "patentFiler",
    "Hours Spent": "hoursSpent",
    "External Agency Recognizer": "agencyRecognizer",
    "Agency Cost": "agencyCost",
    "Manager Responsible": "managerResponsible"
  },
  "National Phase": {
    "Post Dated": "postDated",
    "Date of Provisional Patent Application": "dateProvisionalPatent",
    "Application Provisional Number": "applicationProvisionalNumber",
    "Date Complete Patent Application": "dateCompletePatentApplication",
    "Date of PCT Patent Application": "datePCTPatentApplication",
    "Final Submitted": "finalSubmitted",
    "Filed Forms": "filedForms",
    "Date Provision": "dateProvision",
    "Efforts Spent": "effortsSpent",
    "Patent Filer": "patentFiler",
    "Hours Spent": "hoursSpent",
    "External Agency Recognizer": "agencyRecognizer",
    "Agency Cost": "agencyCost",
    "Manager Responsible": "managerResponsible"
  },
  "Complete": {
    "Date of Patent": "dateOfPatent",
    "Provisional Number": "provisionalNumber",
    "Specification Filing": "specificationFiling",
    "Agent Filing": "agentFiling",
    "Filed Draft": "filedDraft",
    "Filed Forms Complete": "filedFormsComplete",
    "Date of Complete": "dateOfComplete",
    "Post Dated": "postDated",
    "Is provisional application is post dated?": "isPostDated",
    "Efforts Spent": "effortsSpent",
    "Patent Filer": "patentFiler",
    "Hours Spent": "hoursSpent",
    "External Agency Recognizer": "agencyRecognizer",
    "Agency Cost": "agencyCost",
    "Manager Responsible": "managerResponsible"
  }
}

