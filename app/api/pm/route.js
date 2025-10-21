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
      const data = await prisma.PatentManagement.findFirst({
        where: { asset_id: assetId },
      });

      if (!data) {
        return NextResponse.json({ 
          success: false, 
          message: 'Patent Management not found' 
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
    console.log('🔄 POST /api/pgo called',req.json);
    const payload = await req.json(); // read body from POST request
    //     // 🧠 Fetch latest asset_id and generate a new one
    // const lastEntry = await prisma.Invention.findFirst({
    //     orderBy: { created_at: 'desc' },
    //     select: { asset_id: true },
    // });

    // let newAssetId = 'A0001';
    // if (lastEntry?.asset_id) {
    //     const lastNumber = parseInt(lastEntry.asset_id.slice(1)) || 0;
    //     const nextNumber = (lastNumber + 1).toString().padStart(4, '0');
    //     newAssetId = `A${nextNumber}`;
    // }

    console.log('📦 PM payload received:', JSON.stringify(payload, null, 2));

    // Map payload to Prisma-compatible field names and ensure array fields are arrays
    const data = {
      asset_id: payload.asset_id,
      
      // PM Invention Details fields (pmInventionDetails prefix)
      pmInventionDetailsTitle: payload.pmInventionDetailsTitle || '',
      pmInventionDetailsCommonName: payload.pmInventionDetailsCommonName || '',
      pmInventionDetailsInventorDetails: payload.pmInventionDetailsInventorDetails || '',
      pmInventionDetailsEntity: payload.pmInventionDetailsEntity || '',
      pmInventionDetailsDate: payload.pmInventionDetailsDate || '',
      pmInventionDetailsCountry: payload.pmInventionDetailsCountry || '',
      pmInventionDetailsCreationCountry: payload.pmInventionDetailsCreationCountry || '',
      pmInventionDetailsCollaboration: payload.pmInventionDetailsCollaboration || '',
      pmInventionDetailsCollaboratorName: payload.pmInventionDetailsCollaboratorName || '',
      pmInventionDetailsCollaboratorCountry: payload.pmInventionDetailsCollaboratorCountry || '',
      pmInventionDetailsStakeholders: payload.pmInventionDetailsStakeholders || '',
      
      // PM Extractor Details fields (pmExtractorDetails prefix)
      pmExtractorDetailsOne: payload.pmExtractorDetailsOne || '',
      pmExtractorDetailsTwo: payload.pmExtractorDetailsTwo || '',
      pmExtractorDetailsExtractionDate: payload.pmExtractorDetailsExtractionDate || '',
      pmExtractorDetailsAvailableWithPriorLiterature: payload.pmExtractorDetailsAvailableWithPriorLiterature || '',
      pmExtractorDetailsNovelFeature: payload.pmExtractorDetailsNovelFeature || '',
      pmExtractorDetailsInventiveFeature: payload.pmExtractorDetailsInventiveFeature || '',
      pmExtractorDetailsSpecificCountry: payload.pmExtractorDetailsSpecificCountry || '',
      pmExtractorDetailsOpinion: payload.pmExtractorDetailsOpinion || '',
      pmExtractorDetailsAttachments: Array.isArray(payload.pmExtractorDetailsAttachments) ? payload.pmExtractorDetailsAttachments.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      
      // PM Patent Prosecution Details fields (pmPatentProsecutionDetails prefix)
      pmPatentProsecutionDetailsPublished: payload.pmPatentProsecutionDetailsPublished || '',
      pmPatentProsecutionDetailsPublicationNumber: payload.pmPatentProsecutionDetailsPublicationNumber || '',
      pmPatentProsecutionDetailsAnyPersonOpposed: payload.pmPatentProsecutionDetailsAnyPersonOpposed || '',
      pmPatentProsecutionDetailsOpponentName: payload.pmPatentProsecutionDetailsOpponentName || '',
      pmPatentProsecutionDetailsAttachments: Array.isArray(payload.pmPatentProsecutionDetailsAttachments) ? payload.pmPatentProsecutionDetailsAttachments.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      pmPatentProsecutionDetailsCaseFiledByOpposer: payload.pmPatentProsecutionDetailsCaseFiledByOpposer || '',
      pmPatentProsecutionDetailsBasisOfActionOfFiling: payload.pmPatentProsecutionDetailsBasisOfActionOfFiling || '',
      pmPatentProsecutionDetailsReasonForFilingOpposition: payload.pmPatentProsecutionDetailsReasonForFilingOpposition || '',
      pmPatentProsecutionDetailsOpinionRenderedByYou: payload.pmPatentProsecutionDetailsOpinionRenderedByYou || '',
      pmPatentProsecutionDetailsExternalAgency: payload.pmPatentProsecutionDetailsExternalAgency || '',
      pmPatentProsecutionDetailsReviewedBy: payload.pmPatentProsecutionDetailsReviewedBy || '',
      
      // PM Patent Maintenance History fields (pmPatentMaintenanceHistory prefix)
      pmPatentMaintenanceHistoryPriorityDate: payload.pmPatentMaintenanceHistoryPriorityDate || '',
      pmPatentMaintenanceHistoryGrantDate: payload.pmPatentMaintenanceHistoryGrantDate || '',
      pmPatentMaintenanceHistoryYearsPaid: payload.pmPatentMaintenanceHistoryYearsPaid || '',
      pmPatentMaintenanceHistoryNextDueDate: payload.pmPatentMaintenanceHistoryNextDueDate || '',
      pmPatentMaintenanceHistoryMaintenanceStopped: payload.pmPatentMaintenanceHistoryMaintenanceStopped || '',
      pmPatentMaintenanceHistoryAttachments: Array.isArray(payload.pmPatentMaintenanceHistoryAttachments) ? payload.pmPatentMaintenanceHistoryAttachments.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      pmPatentMaintenanceHistoryFilingDate: payload.pmPatentMaintenanceHistoryFilingDate || '',
      pmPatentMaintenanceHistoryMaintenanceFee: payload.pmPatentMaintenanceHistoryMaintenanceFee || '',
      pmPatentMaintenanceHistoryExternalAgency: payload.pmPatentMaintenanceHistoryExternalAgency || '',
      pmPatentMaintenanceHistoryFilingAttachments: Array.isArray(payload.pmPatentMaintenanceHistoryFilingAttachments) ? payload.pmPatentMaintenanceHistoryFilingAttachments.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      
      // PM PAN fields (pmPAN prefix)
      pmPANPatentApplicationNumber: payload.pmPANPatentApplicationNumber || '',
      
      // PM Decision Sheet fields (pmDecisionSheet prefix)
      pmDecisionSheetNameOfDecisionMaker: payload.pmDecisionSheetNameOfDecisionMaker || '',
      pmDecisionSheetDecisionInBrief: payload.pmDecisionSheetDecisionInBrief || '',
      pmDecisionSheetAttachments: Array.isArray(payload.pmDecisionSheetAttachments) ? payload.pmDecisionSheetAttachments.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      
      // PM Innovation Analysis fields (pmInnovationAnalysis prefix)
      pmInnovationAnalysisMoreThanInvention: payload.pmInnovationAnalysisMoreThanInvention || '',
      pmInnovationAnalysisPriorArtDocuments: Array.isArray(payload.pmInnovationAnalysisPriorArtDocuments) ? payload.pmInnovationAnalysisPriorArtDocuments.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      pmInnovationAnalysisNPLDocuments: Array.isArray(payload.pmInnovationAnalysisNPLDocuments) ? payload.pmInnovationAnalysisNPLDocuments.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      
      // PM Patentability Extractor fields (pmPatentabilityExtractor prefix)
      pmPatentabilityExtractorSearcher1: payload.pmPatentabilityExtractorSearcher1 || '',
      pmPatentabilityExtractorSearcher2: payload.pmPatentabilityExtractorSearcher2 || '',
      pmPatentabilityExtractorRating: payload.pmPatentabilityExtractorRating || 0,
      pmPatentabilityExtractorInventionAccordance: payload.pmPatentabilityExtractorInventionAccordance || '',
      pmPatentabilityExtractorNovelFeature: payload.pmPatentabilityExtractorNovelFeature || '',
      pmPatentabilityExtractorInventiveFeature: payload.pmPatentabilityExtractorInventiveFeature || '',
      pmPatentabilityExtractorAttachment: Array.isArray(payload.pmPatentabilityExtractorAttachment) ? payload.pmPatentabilityExtractorAttachment.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      pmPatentabilityExtractorSpecificCountry: payload.pmPatentabilityExtractorSpecificCountry || '',
      pmPatentabilityExtractorOpinionOfExtractor: payload.pmPatentabilityExtractorOpinionOfExtractor || '',
      
      // PM Effort Sheet fields (pmEffortSheet prefix)
      pmEffortSheetEffortsSpent: payload.pmEffortSheetEffortsSpent || '',
      pmEffortSheetEmployeeId: payload.pmEffortSheetEmployeeId || '',
      pmEffortSheetHoursSpent: payload.pmEffortSheetHoursSpent || '',
      pmEffortSheetAgencyManager: payload.pmEffortSheetAgencyManager || '',
      pmEffortSheetAgencyCost: payload.pmEffortSheetAgencyCost || '',
      pmEffortSheetReviewEfforts: payload.pmEffortSheetReviewEfforts || '',
      pmEffortSheetManagerResponsible: payload.pmEffortSheetManagerResponsible || '',
      
      // PM Activity Status fields (pmActivityStatus prefix)
      pmActivityStatusStatus: payload.pmActivityStatusStatus || '',
      pmActivityStatusDescription: payload.pmActivityStatusDescription || '',
      pmActivityStatusLastUpdated: payload.pmActivityStatusLastUpdated || ''
    };

    console.log('📊 Data being sent to Prisma:', JSON.stringify(data, null, 2));
    
    // Check if record exists, then create or update
    const existingRecord = await prisma.PatentManagement.findFirst({
      where: { asset_id: payload.asset_id }
    });

    let result;
    if (existingRecord) {
      // Update existing record
      result = await prisma.PatentManagement.update({
        where: { id: existingRecord.id },
        data: {
          // PM Invention Details fields (pmInventionDetails prefix)
          pmInventionDetailsTitle: data.pmInventionDetailsTitle,
          pmInventionDetailsCommonName: data.pmInventionDetailsCommonName,
          pmInventionDetailsInventorDetails: data.pmInventionDetailsInventorDetails,
          pmInventionDetailsEntity: data.pmInventionDetailsEntity,
          pmInventionDetailsDate: data.pmInventionDetailsDate,
          pmInventionDetailsCountry: data.pmInventionDetailsCountry,
          pmInventionDetailsCreationCountry: data.pmInventionDetailsCreationCountry,
          pmInventionDetailsCollaboration: data.pmInventionDetailsCollaboration,
          pmInventionDetailsCollaboratorName: data.pmInventionDetailsCollaboratorName,
          pmInventionDetailsCollaboratorCountry: data.pmInventionDetailsCollaboratorCountry,
          pmInventionDetailsStakeholders: data.pmInventionDetailsStakeholders,
          
          // PM Extractor Details fields (pmExtractorDetails prefix)
          pmExtractorDetailsOne: data.pmExtractorDetailsOne,
          pmExtractorDetailsTwo: data.pmExtractorDetailsTwo,
          pmExtractorDetailsExtractionDate: data.pmExtractorDetailsExtractionDate,
          pmExtractorDetailsAvailableWithPriorLiterature: data.pmExtractorDetailsAvailableWithPriorLiterature,
          pmExtractorDetailsNovelFeature: data.pmExtractorDetailsNovelFeature,
          pmExtractorDetailsInventiveFeature: data.pmExtractorDetailsInventiveFeature,
          pmExtractorDetailsSpecificCountry: data.pmExtractorDetailsSpecificCountry,
          pmExtractorDetailsOpinion: data.pmExtractorDetailsOpinion,
          pmExtractorDetailsAttachments: data.pmExtractorDetailsAttachments,
          
          // PM Patent Prosecution Details fields (pmPatentProsecutionDetails prefix)
          pmPatentProsecutionDetailsPublished: data.pmPatentProsecutionDetailsPublished,
          pmPatentProsecutionDetailsPublicationNumber: data.pmPatentProsecutionDetailsPublicationNumber,
          pmPatentProsecutionDetailsAnyPersonOpposed: data.pmPatentProsecutionDetailsAnyPersonOpposed,
          pmPatentProsecutionDetailsOpponentName: data.pmPatentProsecutionDetailsOpponentName,
          pmPatentProsecutionDetailsAttachments: data.pmPatentProsecutionDetailsAttachments,
          pmPatentProsecutionDetailsCaseFiledByOpposer: data.pmPatentProsecutionDetailsCaseFiledByOpposer,
          pmPatentProsecutionDetailsBasisOfActionOfFiling: data.pmPatentProsecutionDetailsBasisOfActionOfFiling,
          pmPatentProsecutionDetailsReasonForFilingOpposition: data.pmPatentProsecutionDetailsReasonForFilingOpposition,
          pmPatentProsecutionDetailsOpinionRenderedByYou: data.pmPatentProsecutionDetailsOpinionRenderedByYou,
          pmPatentProsecutionDetailsExternalAgency: data.pmPatentProsecutionDetailsExternalAgency,
          pmPatentProsecutionDetailsReviewedBy: data.pmPatentProsecutionDetailsReviewedBy,
          
          // PM Patent Maintenance History fields (pmPatentMaintenanceHistory prefix)
          pmPatentMaintenanceHistoryPriorityDate: data.pmPatentMaintenanceHistoryPriorityDate,
          pmPatentMaintenanceHistoryGrantDate: data.pmPatentMaintenanceHistoryGrantDate,
          pmPatentMaintenanceHistoryYearsPaid: data.pmPatentMaintenanceHistoryYearsPaid,
          pmPatentMaintenanceHistoryNextDueDate: data.pmPatentMaintenanceHistoryNextDueDate,
          pmPatentMaintenanceHistoryMaintenanceStopped: data.pmPatentMaintenanceHistoryMaintenanceStopped,
          pmPatentMaintenanceHistoryAttachments: data.pmPatentMaintenanceHistoryAttachments,
          pmPatentMaintenanceHistoryFilingDate: data.pmPatentMaintenanceHistoryFilingDate,
          pmPatentMaintenanceHistoryMaintenanceFee: data.pmPatentMaintenanceHistoryMaintenanceFee,
          pmPatentMaintenanceHistoryExternalAgency: data.pmPatentMaintenanceHistoryExternalAgency,
          pmPatentMaintenanceHistoryFilingAttachments: data.pmPatentMaintenanceHistoryFilingAttachments,
          
          // PM PAN fields (pmPAN prefix)
          pmPANPatentApplicationNumber: data.pmPANPatentApplicationNumber,
          
          // PM Decision Sheet fields (pmDecisionSheet prefix)
          pmDecisionSheetNameOfDecisionMaker: data.pmDecisionSheetNameOfDecisionMaker,
          pmDecisionSheetDecisionInBrief: data.pmDecisionSheetDecisionInBrief,
          pmDecisionSheetAttachments: data.pmDecisionSheetAttachments,
          
          // PM Innovation Analysis fields (pmInnovationAnalysis prefix)
          pmInnovationAnalysisMoreThanInvention: data.pmInnovationAnalysisMoreThanInvention,
          pmInnovationAnalysisPriorArtDocuments: data.pmInnovationAnalysisPriorArtDocuments,
          pmInnovationAnalysisNPLDocuments: data.pmInnovationAnalysisNPLDocuments,
          
          // PM Patentability Extractor fields (pmPatentabilityExtractor prefix)
          pmPatentabilityExtractorSearcher1: data.pmPatentabilityExtractorSearcher1,
          pmPatentabilityExtractorSearcher2: data.pmPatentabilityExtractorSearcher2,
          pmPatentabilityExtractorRating: data.pmPatentabilityExtractorRating,
          pmPatentabilityExtractorInventionAccordance: data.pmPatentabilityExtractorInventionAccordance,
          pmPatentabilityExtractorNovelFeature: data.pmPatentabilityExtractorNovelFeature,
          pmPatentabilityExtractorInventiveFeature: data.pmPatentabilityExtractorInventiveFeature,
          pmPatentabilityExtractorAttachment: data.pmPatentabilityExtractorAttachment,
          pmPatentabilityExtractorSpecificCountry: data.pmPatentabilityExtractorSpecificCountry,
          pmPatentabilityExtractorOpinionOfExtractor: data.pmPatentabilityExtractorOpinionOfExtractor,
          
          // PM Effort Sheet fields (pmEffortSheet prefix)
          pmEffortSheetEffortsSpent: data.pmEffortSheetEffortsSpent,
          pmEffortSheetEmployeeId: data.pmEffortSheetEmployeeId,
          pmEffortSheetHoursSpent: data.pmEffortSheetHoursSpent,
          pmEffortSheetAgencyManager: data.pmEffortSheetAgencyManager,
          pmEffortSheetAgencyCost: data.pmEffortSheetAgencyCost,
          pmEffortSheetReviewEfforts: data.pmEffortSheetReviewEfforts,
          pmEffortSheetManagerResponsible: data.pmEffortSheetManagerResponsible,
          
          // PM Activity Status fields (pmActivityStatus prefix)
          pmActivityStatusStatus: data.pmActivityStatusStatus,
          pmActivityStatusDescription: data.pmActivityStatusDescription,
          pmActivityStatusLastUpdated: data.pmActivityStatusLastUpdated
        },
      });
    } else {
      // Create new record
      result = await prisma.PatentManagement.create({
        data,
      });
    }

    console.log('✅ PatentManagement upserted successfully:', result);
    return NextResponse.json({ 
      success: true, 
      data: result,
      message: result.createdAt === result.updatedAt ? 'Patent Management created successfully' : 'Patent Management updated successfully'
    }, { status: 200 });
  } catch (err) {
    console.error('❌ Error inserting PatentManagement:', err);
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
