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
