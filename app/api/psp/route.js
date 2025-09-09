import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const assetId = searchParams.get('assetId');
    
    await prisma.$connect();
    console.log('✅ Database connection successful');

    if (assetId) {
      const data = await prisma.PatentSpecificInformation.findFirst({
        where: { asset_id: assetId },
      });

      if (!data) {
        return NextResponse.json({ 
          success: false, 
          message: 'Patent Specific Information not found' 
        }, { status: 404 });
      }

      return NextResponse.json({ 
        success: true, 
        data 
      });
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Asset ID is required' 
    }, { status: 400 });
  } catch (error) {
    console.error('❌ GET request error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

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
    
    // Check if record exists, then create or update
    const existingRecord = await prisma.PatentSpecificInformation.findFirst({
      where: { asset_id: payload.asset_id }
    });

    let result;
    if (existingRecord) {
      // Update existing record
      result = await prisma.PatentSpecificInformation.update({
        where: { id: existingRecord.id },
        data: {
          activityStatus: data.activityStatus,
          rating: data.rating,
          draftType: data.draftType,
          npPCTDate: data.npPCTDate,
          npApplicationNumber: data.npApplicationNumber,
          npPCTPublication: data.npPCTPublication,
          npSearchReport: data.npSearchReport,
          npPCTOrProvisionalDate: data.npPCTOrProvisionalDate,
          npApplicationCountry: data.npApplicationCountry,
          npDrafterName: data.npDrafterName,
          npClaimSheet: data.npClaimSheet,
          npFormsPrepared: data.npFormsPrepared,
          npCountryFiling: data.npCountryFiling,
          npReviewBy: data.npReviewBy,
          npCitedPatent: data.npCitedPatent,
          npIndependentClaim: data.npIndependentClaim,
          npDependentClaim: data.npDependentClaim,
          npBroadenedFeature: data.npBroadenedFeature,
          npIsProfit: data.npIsProfit,
          npIsDefensive: data.npIsDefensive,
          npAllDrafts: data.npAllDrafts,
          npDraftingEffort: data.npDraftingEffort,
          npDrafterEmpId: data.npDrafterEmpId,
          npHoursSpent: data.npHoursSpent,
          npAgencyRecognizer: data.npAgencyRecognizer,
          npAgencyCost: data.npAgencyCost,
          npReviewEffort: data.npReviewEffort,
          npManagerEmpId: data.npManagerEmpId,
          npActivityStatus: data.npActivityStatus,
          isDirectPCT: data.isDirectPCT,
          pctParentPermission: data.pctParentPermission,
          pctProvisionalDate: data.pctProvisionalDate,
          pctApplicationNumber: data.pctApplicationNumber,
          pctDrafterName: data.pctDrafterName,
          pctClaimSheet: data.pctClaimSheet,
          pctFormsPrepared: data.pctFormsPrepared,
          pctCountryFiling: data.pctCountryFiling,
          pctReviewBy: data.pctReviewBy,
          pctCitedPatent: data.pctCitedPatent,
          pctIndependentClaim: data.pctIndependentClaim,
          pctDependentClaim: data.pctDependentClaim,
          pctBroadenedFeature: data.pctBroadenedFeature,
          pctIsProfit: data.pctIsProfit,
          pctIsDefensive: data.pctIsDefensive,
          pctAllDrafts: data.pctAllDrafts,
          pctDraftingEffort: data.pctDraftingEffort,
          pctDrafterEmpId: data.pctDrafterEmpId,
          pctHoursSpent: data.pctHoursSpent,
          pctAgencyRecognizer: data.pctAgencyRecognizer,
          pctAgencyCost: data.pctAgencyCost,
          pctReviewEffort: data.pctReviewEffort,
          pctManagerEmpId: data.pctManagerEmpId,
          pctActivityStatus: data.pctActivityStatus,
          isProvisionalFiled: data.isProvisionalFiled,
          provisionalSpecDate: data.provisionalSpecDate,
          applicationNumber: data.applicationNumber,
          isPCTFiled: data.isPCTFiled,
          pctFilingDate: data.pctFilingDate,
          isPCTPublished: data.isPCTPublished,
          citedPatent: data.citedPatent,
          independentClaim: data.independentClaim,
          dependentClaim: data.dependentClaim,
          broadenedFeature: data.broadenedFeature,
          isProfitPatent: data.isProfitPatent,
          isDefensivePatent: data.isDefensivePatent,
          draftVersions: data.draftVersions,
          draftingEffort: data.draftingEffort,
          drafterEmpId: data.drafterEmpId,
          hoursSpent: data.hoursSpent,
          agencyRecognizer: data.agencyRecognizer,
          agencyCost: data.agencyCost,
          reviewEffort: data.reviewEffort,
          managerEmpId: data.managerEmpId,
          nodrafter: data.nodrafter,
          noreviewer: data.noreviewer,
          attachments: data.attachments,
          bned: data.bned,
          ifdescribed: data.ifdescribed,
          toinvention: data.toinvention,
          esfd: data.esfd,
          pdrafter: data.pdrafter,
          nohspent: data.nohspent,
          eafd: data.eafd,
          csoagency: data.csoagency,
          eihfr: data.eihfr,
          mres: data.mres,
        },
      });
    } else {
      // Create new record
      result = await prisma.PatentSpecificInformation.create({
        data,
      });
    }

    console.log('✅ PatentSpecificInformation upserted successfully:', result);
    return NextResponse.json({ 
      success: true, 
      data: result,
      message: result.createdAt === result.updatedAt ? 'Patent Specific Information created successfully' : 'Patent Specific Information updated successfully'
    }, { status: 200 });
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
