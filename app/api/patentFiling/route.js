import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const assetId = searchParams.get('assetId');
    
    await prisma.$connect();

    if (assetId) {
      const data = await prisma.PatentFiling.findFirst({
        where: { asset_id: assetId },
      });

      if (!data) {
        return NextResponse.json({ 
          success: false, 
          message: 'Patent Filing not found' 
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
    
    // Check if request has body
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json({ 
        success: false, 
        message: 'Content-Type must be application/json' 
      }, { status: 400 });
    }

    let payload;
    try {
      payload = await req.json(); // read body from POST request
    } catch (jsonError) {
      console.error('❌ JSON parsing error:', jsonError);
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid JSON in request body' 
      }, { status: 400 });
    }
    

    // Map payload to Prisma-compatible field names and ensure array fields are arrays
    const data = {
      asset_id: payload.asset_id,
      activityStatus: payload.activityStatus || '',
      rating: payload.rating || 0,
      draftType: payload.draftType || '',
      
      // ExtractorDetailsV2 fields (Patent Filing Extractor Details)
      extractorOne: payload.extractorOne || '',
      extractortwo: payload.extractortwo || '',
      iEDate: payload.iEDate || '',
      iawpl: payload.iawpl || '',
      idattachments: Array.isArray(payload.idattachments) ? payload.idattachments : [],
      
      // Innovation Analysis fields
      trainRun: payload.trainRun || '',
      minuteOfMeeting: Array.isArray(payload.minuteOfMeeting) ? payload.minuteOfMeeting : [],
      attachments: Array.isArray(payload.attachments) ? payload.attachments : [],
      
      // Patentability Extractor fields
      psone: payload.psone || '',
      pstwo: payload.pstwo || '',
      collaboration: payload.collaboration || '',
      paNfeature: payload.paNfeature || '',
      paIfeature: payload.paIfeature || '',
      paScountry: payload.paScountry || '',
      paOoextractor: payload.paOoextractor || '',
      
      // Decision Sheet fields
      nodc: payload.nodc || '',
      dibrief: payload.dibrief || '',
      
      // Average Rating fields
      patentApplicationNumber: payload.patentApplicationNumber || '',
      averageRating: payload.averageRating || 0,
      
      // Patentability Extractor Rating field
      patentabilityRating: payload.patentabilityRating || 0,
      
      // Effort Sheet fields
      ipRecognizer: payload.ipRecognizer || '',
      hoursSpent: payload.hoursSpent || '',
      agencyRecognizer: payload.agencyRecognizer || '',
      agencyCost: payload.agencyCost || '',
      reviewEffort: payload.reviewEffort || '',
      managerEmpId: payload.managerEmpId || '',
      extractionEffort: payload.extractionEffort || '',
      
      // Provisional fields
      patentFilingName: payload.patentFilingName || '',
      provisionalPatent: Array.isArray(payload.provisionalPatent) ? payload.provisionalPatent.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      attachment: Array.isArray(payload.attachment) ? payload.attachment.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      dateProvision: payload.dateProvision || '',
      provisionalApplicationNumber: payload.provisionalApplicationNumber || '',
      cbrReceiptNumber: payload.cbrReceiptNumber || '',
      filingAgency: payload.filingAgency || '',
      applicantName: payload.applicantName || '',
      isProfilePatent: payload.isProfilePatent || '',
      isDefensivePatent: payload.isDefensivePatent || '',
      claimingStartup: Array.isArray(payload.claimingStartup) ? payload.claimingStartup.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      poaOffice: payload.poaOffice || '',
      effortsSpent: payload.effortsSpent || '',
      patentFiler: payload.patentFiler || '',
      managerResponsible: payload.managerResponsible || '',

      // PCT fields
      postDated: payload.postDated || '',
      applicationProvisionalNumber: payload.applicationProvisionalNumber || '',
      datePatentApplication: payload.datePatentApplication || '',
      pctFilingPermission: payload.pctFilingPermission || '',
      pctFiledForms: Array.isArray(payload.pctFiledForms) ? payload.pctFiledForms.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      pctCbrReceiptNumber: payload.pctCbrReceiptNumber || '',
      
      // Additional PCT fields
      pctAgencyCost: payload.pctAgencyCost || '',
      pctAgencyRecognizer: payload.pctAgencyRecognizer || '',
      pctApplicationNumber: payload.pctApplicationNumber || '',
      pctBroadenedFeature: payload.pctBroadenedFeature || '',
      pctCitedPatent: payload.pctCitedPatent || '',
      pctCountryFiling: payload.pctCountryFiling || '',
      pctDependentClaim: payload.pctDependentClaim || '',
      pctDrafterEmpId: payload.pctDrafterEmpId || '',
      pctDrafterName: payload.pctDrafterName || '',
      pctDraftingEffort: payload.pctDraftingEffort || '',
      pctHoursSpent: payload.pctHoursSpent || '',
      pctIndependentClaim: payload.pctIndependentClaim || '',
      pctIsProfit: payload.pctIsProfit || '',
      pctManagerEmpId: payload.pctManagerEmpId || '',
      pctReviewBy: payload.pctReviewBy || '',
      pctReviewEffort: payload.pctReviewEffort || '',
      
      // Additional Patentability Analysis fields
      nfeature: payload.nfeature || '',
      ifeature: payload.ifeature || '',
      oextractor: payload.oextractor || '',
      scountry: payload.scountry || '',

      // National Phase fields
      dateProvisionalPatent: payload.dateProvisionalPatent || '',
      dateCompletePatentApplication: payload.dateCompletePatentApplication || '',
      datePCTPatentApplication: payload.datePCTPatentApplication || '',
      finalSubmitted: payload.finalSubmitted || '',
      filedForms: Array.isArray(payload.filedForms) ? payload.filedForms.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      npFilingDate: payload.npFilingDate || '',
      npCbrReceiptNumber: payload.npCbrReceiptNumber || '',
      
      // Additional National Phase fields
      npAgencyCost: payload.npAgencyCost || '',
      npAgencyRecognizer: payload.npAgencyRecognizer || '',
      npApplicationCountry: payload.npApplicationCountry || '',
      npApplicationNumber: payload.npApplicationNumber || '',
      npBroadenedFeature: payload.npBroadenedFeature || '',
      npCitedPatent: payload.npCitedPatent || '',
      npDependentClaim: payload.npDependentClaim || '',
      npDrafterEmpId: payload.npDrafterEmpId || '',
      npDrafterName: payload.npDrafterName || '',
      npDraftingEffort: payload.npDraftingEffort || '',
      npFormsPrepared: payload.npFormsPrepared || '',
      npHoursSpent: payload.npHoursSpent || '',
      npIndependentClaim: payload.npIndependentClaim || '',
      npIsDefensive: payload.npIsDefensive || '',
      npIsProfit: payload.npIsProfit || '',
      npManagerEmpId: payload.npManagerEmpId || '',
      npPCTDate: payload.npPCTDate || '',
      npPCTOrProvisionalDate: payload.npPCTOrProvisionalDate || '',
      npPCTPublication: payload.npPCTPublication || '',
      npReviewBy: payload.npReviewBy || '',
      npReviewEffort: payload.npReviewEffort || '',

      // Complete fields
      dateOfPatent: payload.dateOfPatent || '',
      provisionalNumber: payload.provisionalNumber || '',
      specificationFiling: payload.specificationFiling || '',
      agentFiling: payload.agentFiling || '',
      filedDraft: Array.isArray(payload.filedDraft) ? payload.filedDraft.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      filedFormsComplete: Array.isArray(payload.filedFormsComplete) ? payload.filedFormsComplete.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      dateOfComplete: payload.dateOfComplete || '',
      cbrReceiptNumberComplete: payload.cbrReceiptNumberComplete || '',
      isPostDated: payload.isPostDated || '',
      
      // Additional Complete Specification fields
      isProvisionalFiled: payload.isProvisionalFiled || '',
      provisionalSpecDate: payload.provisionalSpecDate || '',
      applicationNumber: payload.applicationNumber || '',
      isPCTFiled: payload.isPCTFiled || '',
      pctFilingDate: payload.pctFilingDate || '',
      citedPatent: payload.citedPatent || '',
      independentClaim: payload.independentClaim || '',
      dependentClaim: payload.dependentClaim || '',
      broadenedFeature: payload.broadenedFeature || '',
      draftingEffort: payload.draftingEffort || '',
      drafterEmpId: payload.drafterEmpId || '',
      hoursSpent: payload.hoursSpent || '',
      agencyRecognizer: payload.agencyRecognizer || '',
      agencyCost: payload.agencyCost || '',
      reviewEffort: payload.reviewEffort || '',
      managerEmpId: payload.managerEmpId || '',
      
      // Additional Provisional Application fields
      nodrafter: payload.nodrafter || '',
      noreviewer: payload.noreviewer || '',
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
      
      // Additional PCT Application fields
      isDirectPCT: payload.isDirectPCT || '',
      pctProvisionalDate: payload.pctProvisionalDate || '',
      pctApplicationNumber: payload.pctApplicationNumber || '',
      pctDrafterName: payload.pctDrafterName || '',
      pctCountryFiling: payload.pctCountryFiling || '',
      pctReviewBy: payload.pctReviewBy || '',
      pctCitedPatent: payload.pctCitedPatent || '',
      pctIndependentClaim: payload.pctIndependentClaim || '',
      pctDependentClaim: payload.pctDependentClaim || '',
      pctBroadenedFeature: payload.pctBroadenedFeature || '',
      pctDraftingEffort: payload.pctDraftingEffort || '',
      pctDrafterEmpId: payload.pctDrafterEmpId || '',
      pctHoursSpent: payload.pctHoursSpent || '',
      pctAgencyRecognizer: payload.pctAgencyRecognizer || '',
      pctAgencyCost: payload.pctAgencyCost || '',
      pctReviewEffort: payload.pctReviewEffort || '',
      pctManagerEmpId: payload.pctManagerEmpId || '',
    };

    
    // Check if record exists, then create or update
    const existingRecord = await prisma.PatentFiling.findFirst({
      where: { asset_id: payload.asset_id }
    });

    let result;
    if (existingRecord) {
      // Update existing record
      result = await prisma.PatentFiling.update({
        where: { id: existingRecord.id },
        data: {
          activityStatus: data.activityStatus,
          rating: data.rating,
          draftType: data.draftType,
          
          // ExtractorDetailsV2 fields
          extractorOne: data.extractorOne,
          extractortwo: data.extractortwo,
          iEDate: data.iEDate,
          iawpl: data.iawpl,
          idattachments: data.idattachments,
          
          // Innovation Analysis fields
          trainRun: data.trainRun,
          minuteOfMeeting: data.minuteOfMeeting,
          attachments: data.attachments,
          
          // Patentability Extractor fields
          psone: data.psone,
          pstwo: data.pstwo,
          collaboration: data.collaboration,
          paNfeature: data.paNfeature,
          paIfeature: data.paIfeature,
          paScountry: data.paScountry,
          paOoextractor: data.paOoextractor,
          
          // Decision Sheet fields
          nodc: data.nodc,
          dibrief: data.dibrief,
          
          // Average Rating fields
          patentApplicationNumber: data.patentApplicationNumber,
          averageRating: data.averageRating,
          
          // Patentability Extractor Rating field
          patentabilityRating: data.patentabilityRating,
          
          // Effort Sheet fields
          ipRecognizer: data.ipRecognizer,
          hoursSpent: data.hoursSpent,
          agencyRecognizer: data.agencyRecognizer,
          agencyCost: data.agencyCost,
          reviewEffort: data.reviewEffort,
          managerEmpId: data.managerEmpId,
          extractionEffort: data.extractionEffort,
          
          // Provisional fields
          patentFilingName: data.patentFilingName,
          provisionalPatent: data.provisionalPatent,
          attachment: data.attachment,
          dateProvision: data.dateProvision,
          provisionalApplicationNumber: data.provisionalApplicationNumber,
          cbrReceiptNumber: data.cbrReceiptNumber,
          filingAgency: data.filingAgency,
          applicantName: data.applicantName,
          isProfilePatent: data.isProfilePatent,
          isDefensivePatent: data.isDefensivePatent,
          claimingStartup: data.claimingStartup,
          poaOffice: data.poaOffice,
          effortsSpent: data.effortsSpent,
          patentFiler: data.patentFiler,
          managerResponsible: data.managerResponsible,
          
          // PCT fields
          postDated: data.postDated,
          applicationProvisionalNumber: data.applicationProvisionalNumber,
          datePatentApplication: data.datePatentApplication,
          pctFilingPermission: data.pctFilingPermission,
          pctFiledForms: data.pctFiledForms,
          pctCbrReceiptNumber: data.pctCbrReceiptNumber,
          
          // Additional PCT fields
          pctAgencyCost: data.pctAgencyCost,
          pctAgencyRecognizer: data.pctAgencyRecognizer,
          pctApplicationNumber: data.pctApplicationNumber,
          pctBroadenedFeature: data.pctBroadenedFeature,
          pctCitedPatent: data.pctCitedPatent,
          pctCountryFiling: data.pctCountryFiling,
          pctDependentClaim: data.pctDependentClaim,
          pctDrafterEmpId: data.pctDrafterEmpId,
          pctDrafterName: data.pctDrafterName,
          pctDraftingEffort: data.pctDraftingEffort,
          pctHoursSpent: data.pctHoursSpent,
          pctIndependentClaim: data.pctIndependentClaim,
          pctIsProfit: data.pctIsProfit,
          pctManagerEmpId: data.pctManagerEmpId,
          pctReviewBy: data.pctReviewBy,
          pctReviewEffort: data.pctReviewEffort,
          
          // Additional Patentability Analysis fields
          nfeature: data.nfeature,
          ifeature: data.ifeature,
          oextractor: data.oextractor,
          scountry: data.scountry,
          
          // National Phase fields
          dateProvisionalPatent: data.dateProvisionalPatent,
          dateCompletePatentApplication: data.dateCompletePatentApplication,
          datePCTPatentApplication: data.datePCTPatentApplication,
          finalSubmitted: data.finalSubmitted,
          filedForms: data.filedForms,
          npFilingDate: data.npFilingDate,
          npCbrReceiptNumber: data.npCbrReceiptNumber,
          
          // Additional National Phase fields
          npAgencyCost: data.npAgencyCost,
          npAgencyRecognizer: data.npAgencyRecognizer,
          npApplicationCountry: data.npApplicationCountry,
          npApplicationNumber: data.npApplicationNumber,
          npBroadenedFeature: data.npBroadenedFeature,
          npCitedPatent: data.npCitedPatent,
          npDependentClaim: data.npDependentClaim,
          npDrafterEmpId: data.npDrafterEmpId,
          npDrafterName: data.npDrafterName,
          npDraftingEffort: data.npDraftingEffort,
          npFormsPrepared: data.npFormsPrepared,
          npHoursSpent: data.npHoursSpent,
          npIndependentClaim: data.npIndependentClaim,
          npIsDefensive: data.npIsDefensive,
          npIsProfit: data.npIsProfit,
          npManagerEmpId: data.npManagerEmpId,
          npPCTDate: data.npPCTDate,
          npPCTOrProvisionalDate: data.npPCTOrProvisionalDate,
          npPCTPublication: data.npPCTPublication,
          npReviewBy: data.npReviewBy,
          npReviewEffort: data.npReviewEffort,
          
          // Complete fields
          dateOfPatent: data.dateOfPatent,
          provisionalNumber: data.provisionalNumber,
          specificationFiling: data.specificationFiling,
          agentFiling: data.agentFiling,
          filedDraft: data.filedDraft,
          filedFormsComplete: data.filedFormsComplete,
          dateOfComplete: data.dateOfComplete,
          cbrReceiptNumberComplete: data.cbrReceiptNumberComplete,
          isPostDated: data.isPostDated,
          
          // Additional Complete Specification fields
          isProvisionalFiled: data.isProvisionalFiled,
          provisionalSpecDate: data.provisionalSpecDate,
          applicationNumber: data.applicationNumber,
          isPCTFiled: data.isPCTFiled,
          pctFilingDate: data.pctFilingDate,
          citedPatent: data.citedPatent,
          independentClaim: data.independentClaim,
          dependentClaim: data.dependentClaim,
          broadenedFeature: data.broadenedFeature,
          draftingEffort: data.draftingEffort,
          drafterEmpId: data.drafterEmpId,
          hoursSpent: data.hoursSpent,
          agencyRecognizer: data.agencyRecognizer,
          agencyCost: data.agencyCost,
          reviewEffort: data.reviewEffort,
          managerEmpId: data.managerEmpId,
          
          // Additional Provisional Application fields
          nodrafter: data.nodrafter,
          noreviewer: data.noreviewer,
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
          
          // Additional PCT Application fields
          isDirectPCT: data.isDirectPCT,
          pctProvisionalDate: data.pctProvisionalDate,
          pctApplicationNumber: data.pctApplicationNumber,
          pctDrafterName: data.pctDrafterName,
          pctCountryFiling: data.pctCountryFiling,
          pctReviewBy: data.pctReviewBy,
          pctCitedPatent: data.pctCitedPatent,
          pctIndependentClaim: data.pctIndependentClaim,
          pctDependentClaim: data.pctDependentClaim,
          pctBroadenedFeature: data.pctBroadenedFeature,
          pctDraftingEffort: data.pctDraftingEffort,
          pctDrafterEmpId: data.pctDrafterEmpId,
          pctHoursSpent: data.pctHoursSpent,
          pctAgencyRecognizer: data.pctAgencyRecognizer,
          pctAgencyCost: data.pctAgencyCost,
          pctReviewEffort: data.pctReviewEffort,
          pctManagerEmpId: data.pctManagerEmpId,
        },
      });
    } else {
      // Create new record
      result = await prisma.PatentFiling.create({
        data,
      });
    }

    return NextResponse.json({ 
      success: true, 
      data: result,
      message: result.createdAt === result.updatedAt ? 'Patent Filing created successfully' : 'Patent Filing updated successfully'
    }, { status: 200 });
  } catch (err) {
    console.error('❌ Error inserting PatentFiling:', err);
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
