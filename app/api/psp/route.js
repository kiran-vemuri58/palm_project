import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    console.log('🔄 POST /api/psp called');
    const payload = await req.json(); // read body from POST request
    console.log('📦 PSP payload received:', JSON.stringify(payload, null, 2));

    // Map payload to Prisma-compatible field names and ensure array fields are arrays
    const data = {
      asset_id: payload.asset_id,
      activityStatus: payload.activityStatus || '',
      rating: payload.rating || 0,
      draftType: payload.draftType || '',
      
      // National Phase fields
      npPCTDate: payload.npPCTDate || '',
      npApplicationNumber: payload.npApplicationNumber || '',
      npPCTPublication: payload.npPCTPublication || '',
      npSearchReport: Array.isArray(payload.npSearchReport) ? payload.npSearchReport.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      npPCTOrProvisionalDate: payload.npPCTOrProvisionalDate || '',
      npApplicationCountry: payload.npApplicationCountry || '',
      npDrafterName: payload.npDrafterName || '',
      npClaimSheet: Array.isArray(payload.npClaimSheet) ? payload.npClaimSheet.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      npFormsPrepared: payload.npFormsPrepared || '',
      npCountryFiling: payload.npCountryFiling || '',
      npReviewBy: payload.npReviewBy || '',
      npCitedPatent: payload.npCitedPatent || '',
      npIndependentClaim: payload.npIndependentClaim || '',
      npDependentClaim: payload.npDependentClaim || '',
      npBroadenedFeature: payload.npBroadenedFeature || '',
      npIsProfit: payload.npIsProfit || '',
      npIsDefensive: payload.npIsDefensive || '',
      npAllDrafts: Array.isArray(payload.npAllDrafts) ? payload.npAllDrafts.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      npDraftingEffort: payload.npDraftingEffort || '',
      npDrafterEmpId: payload.npDrafterEmpId || '',
      npHoursSpent: payload.npHoursSpent || '',
      npAgencyRecognizer: payload.npAgencyRecognizer || '',
      npAgencyCost: payload.npAgencyCost || '',
      npReviewEffort: payload.npReviewEffort || '',
      npManagerEmpId: payload.npManagerEmpId || '',
      npActivityStatus: payload.npActivityStatus || '',

      // PCT fields
      isDirectPCT: payload.isDirectPCT || '',
      pctParentPermission: Array.isArray(payload.pctParentPermission) ? payload.pctParentPermission.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      pctProvisionalDate: payload.pctProvisionalDate || '',
      pctApplicationNumber: payload.pctApplicationNumber || '',
      pctDrafterName: payload.pctDrafterName || '',
      pctClaimSheet: Array.isArray(payload.pctClaimSheet) ? payload.pctClaimSheet.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      pctFormsPrepared: payload.pctFormsPrepared || '',
      pctCountryFiling: payload.pctCountryFiling || '',
      pctReviewBy: payload.pctReviewBy || '',
      pctCitedPatent: payload.pctCitedPatent || '',
      pctIndependentClaim: payload.pctIndependentClaim || '',
      pctDependentClaim: payload.pctDependentClaim || '',
      pctBroadenedFeature: payload.pctBroadenedFeature || '',
      pctIsProfit: payload.pctIsProfit || '',
      pctIsDefensive: payload.pctIsDefensive || '',
      pctAllDrafts: Array.isArray(payload.pctAllDrafts) ? payload.pctAllDrafts.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      pctDraftingEffort: payload.pctDraftingEffort || '',
      pctDrafterEmpId: payload.pctDrafterEmpId || '',
      pctHoursSpent: payload.pctHoursSpent || '',
      pctAgencyRecognizer: payload.pctAgencyRecognizer || '',
      pctAgencyCost: payload.pctAgencyCost || '',
      pctReviewEffort: payload.pctReviewEffort || '',
      pctManagerEmpId: payload.pctManagerEmpId || '',
      pctActivityStatus: payload.pctActivityStatus || '',

      // Complete fields
      isProvisionalFiled: payload.isProvisionalFiled || '',
      provisionalSpecDate: payload.provisionalSpecDate || '',
      applicationNumber: payload.applicationNumber || '',
      isPCTFiled: payload.isPCTFiled || '',
      pctFilingDate: payload.pctFilingDate || '',
      isPCTPublished: payload.isPCTPublished || '',
      citedPatent: payload.citedPatent || '',
      independentClaim: payload.independentClaim || '',
      dependentClaim: payload.dependentClaim || '',
      broadenedFeature: payload.broadenedFeature || '',
      isProfitPatent: payload.isProfitPatent || '',
      isDefensivePatent: payload.isDefensivePatent || '',
      draftVersions: Array.isArray(payload.draftVersions) ? payload.draftVersions.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      draftingEffort: payload.draftingEffort || '',
      drafterEmpId: payload.drafterEmpId || '',
      hoursSpent: payload.hoursSpent || '',
      agencyRecognizer: payload.agencyRecognizer || '',
      agencyCost: payload.agencyCost || '',
      reviewEffort: payload.reviewEffort || '',
      managerEmpId: payload.managerEmpId || '',

      // Provisional fields
      nodrafter: payload.nodrafter || '',
      noreviewer: payload.noreviewer || '',
      attachments: Array.isArray(payload.attachments) ? payload.attachments.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      bned: payload.bned || '',
      ifdescribed: payload.ifdescribed || '',
      toinvention: payload.toinvention || '',
      esfd: payload.esfd || '',
      pdrafter: payload.pdrafter || '',
      nohspent: payload.nohspent || '',
      eafd: payload.eafd || '',
      csoagency: payload.csoagency || '',
      eihfr: payload.eihfr || '',
      mres: payload.mres || '',
    };

    console.log('📊 Data being sent to Prisma:', JSON.stringify(data, null, 2));
    
    const result = await prisma.PatentSpecificInformation.create({
      data,
    });

    console.log('✅ PatentSpecificInformation created successfully:', result);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (err) {
    console.error('❌ Error inserting PatentSpecificInformation:', err);
    console.error('❌ Error stack:', err.stack);
    console.error('❌ Error details:', {
      message: err.message,
      code: err.code,
      meta: err.meta
    });
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
