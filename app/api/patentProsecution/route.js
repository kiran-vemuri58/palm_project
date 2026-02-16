import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const assetId = searchParams.get('assetId');
    
    await prisma.$connect();

    if (assetId) {
      const data = await prisma.PatentProsecution.findFirst({
        where: { asset_id: assetId },
      });

      if (!data) {
        return NextResponse.json({ 
          success: false, 
          message: 'Patent Prosecution not found' 
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
      
      // PP Invention Details fields (ppid_)
      ppid_title: payload.ppid_title || '',
      ppid_common_name: payload.ppid_common_name || '',
      ppid_inventor_details: payload.ppid_inventor_details || '',
      ppid_entity: payload.ppid_entity || '',
      ppid_date: payload.ppid_date || '',
      ppid_country: payload.ppid_country || '',
      ppid_creation_country: payload.ppid_creation_country || '',
      ppid_collaboration: payload.ppid_collaboration || '',
      ppid_collaborator_name: payload.ppid_collaborator_name || '',
      ppid_collaborator_country: payload.ppid_collaborator_country || '',
      ppid_stakeholders: payload.ppid_stakeholders || '',
      
      // PP Extractor Details fields (pped_)
      pped_one: payload.pped_one || '',
      pped_two: payload.pped_two || '',
      pped_extraction_date: payload.pped_extraction_date || '',
      pped_available_with_prior_literature: payload.pped_available_with_prior_literature || '',
      pped_novel_feature: payload.pped_novel_feature || '',
      pped_inventive_feature: payload.pped_inventive_feature || '',
      pped_specific_country: payload.pped_specific_country || '',
      pped_opinion: payload.pped_opinion || '',
      pped_attachments: payload.pped_attachments || [],
      
      // PP Patent Prosecution Details fields (pppd_)
      pppd_published: payload.pppd_published || '',
      pppd_publication_number: payload.pppd_publication_number || '',
      pppd_any_person_opposed: payload.pppd_any_person_opposed || '',
      pppd_date_pregrant_opposition: payload.pppd_date_pregrant_opposition || '',
      pppd_date_reply_pregrant_opposition: payload.pppd_date_reply_pregrant_opposition || '',
      pppd_opponent_name: payload.pppd_opponent_name || '',
      pppd_attachments: payload.pppd_attachments || [],
      pppd_response_attachments: payload.pppd_response_attachments || [],
      pppd_review_attachments: payload.pppd_review_attachments || [],
      pppd_case_filed_by_opposer: payload.pppd_case_filed_by_opposer || '',
      pppd_basis_of_action_of_filing: payload.pppd_basis_of_action_of_filing || '',
      pppd_reason_for_filing_opposition: payload.pppd_reason_for_filing_opposition || '',
      pppd_opinion_rendered_by_you: payload.pppd_opinion_rendered_by_you || '',
      pppd_external_agency: payload.pppd_external_agency || '',
      pppd_reviewed_by: payload.pppd_reviewed_by || '',
      
      // PP Patent Application Status fields (ppas_)
      ppas_status: payload.ppas_status || '',
      ppas_number: payload.ppas_number || '',
      ppas_attachment: payload.ppas_attachment || [],
      ppas_grant_date: payload.ppas_grant_date || '',
      ppas_rejection_reason_attachment: payload.ppas_rejection_reason_attachment || [],
      
      // PP FER fields (ppfer_)
      ppfer_list: payload.ppfer_list || [],
      
      // PP Hearing fields (pph_)
      pph_list: payload.pph_list || [],
      
      // PP Decision Sheet fields (ppds_)
      ppds_name_of_decision_maker: payload.ppds_name_of_decision_maker || '',
      ppds_decision_in_brief: payload.ppds_decision_in_brief || '',
      ppds_attachments: payload.ppds_attachments || [],
      
      // PP Innovation Analysis fields (ppi_)
      ppi_more_than_invention: payload.ppi_more_than_invention || '',
      ppi_prior_art_documents: payload.ppi_prior_art_documents || [],
      ppi_npl_documents: payload.ppi_npl_documents || [],
      
      // PP Patentability Extractor fields (pppe_)
      pppe_searcher1: payload.pppe_searcher1 || '',
      pppe_searcher2: payload.pppe_searcher2 || '',
      pppe_rating: payload.pppe_rating || 0,
      pppe_invention_accordance: payload.pppe_invention_accordance || '',
      pppe_novel_feature: payload.pppe_novel_feature || '',
      pppe_inventive_feature: payload.pppe_inventive_feature || '',
      pppe_attachment: payload.pppe_attachment || [],
      pppe_specific_country: payload.pppe_specific_country || '',
      pppe_opinion_of_extractor: payload.pppe_opinion_of_extractor || '',
      
      // PP Average Patentability Rating fields (ppapr_)
      ppapr_rating: payload.ppapr_rating || 0,
      ppapr_patent_application_number: payload.ppapr_patent_application_number || '',
      
      // PP Effort Sheet fields (ppes_)
      ppes_ip_recognizer: payload.ppes_ip_recognizer || '',
      ppes_hours_spent: payload.ppes_hours_spent || '',
      ppes_agency_recognizer: payload.ppes_agency_recognizer || '',
      ppes_agency_cost: payload.ppes_agency_cost || '',
      ppes_review_effort: payload.ppes_review_effort || '',
      ppes_manager_emp_id: payload.ppes_manager_emp_id || '',
      
      // PP Activity Status fields (ppact_)
      ppact_status: payload.ppact_status || '',
      ppact_description: payload.ppact_description || '',
      ppact_last_updated: payload.ppact_last_updated || ''
    };

    
    // Check if record exists, then create or update
    const existingRecord = await prisma.PatentProsecution.findFirst({
      where: { asset_id: payload.asset_id }
    });

    let result;
    if (existingRecord) {
      // Update existing record
      result = await prisma.PatentProsecution.update({
        where: { id: existingRecord.id },
        data: {
          // PP Invention Details fields (ppid_)
          ppid_title: data.ppid_title,
          ppid_common_name: data.ppid_common_name,
          ppid_inventor_details: data.ppid_inventor_details,
          ppid_entity: data.ppid_entity,
          ppid_date: data.ppid_date,
          ppid_country: data.ppid_country,
          ppid_creation_country: data.ppid_creation_country,
          ppid_collaboration: data.ppid_collaboration,
          ppid_collaborator_name: data.ppid_collaborator_name,
          ppid_collaborator_country: data.ppid_collaborator_country,
          ppid_stakeholders: data.ppid_stakeholders,
          
          // PP Extractor Details fields (pped_)
          pped_one: data.pped_one,
          pped_two: data.pped_two,
          pped_extraction_date: data.pped_extraction_date,
          pped_available_with_prior_literature: data.pped_available_with_prior_literature,
          pped_novel_feature: data.pped_novel_feature,
          pped_inventive_feature: data.pped_inventive_feature,
          pped_specific_country: data.pped_specific_country,
          pped_opinion: data.pped_opinion,
          pped_attachments: data.pped_attachments,
          
          // PP Patent Prosecution Details fields (pppd_)
          pppd_published: data.pppd_published,
          pppd_publication_number: data.pppd_publication_number,
          pppd_any_person_opposed: data.pppd_any_person_opposed,
          pppd_date_pregrant_opposition: data.pppd_date_pregrant_opposition,
          pppd_date_reply_pregrant_opposition: data.pppd_date_reply_pregrant_opposition,
          pppd_opponent_name: data.pppd_opponent_name,
          pppd_attachments: data.pppd_attachments,
          pppd_response_attachments: data.pppd_response_attachments,
          pppd_review_attachments: data.pppd_review_attachments,
          pppd_case_filed_by_opposer: data.pppd_case_filed_by_opposer,
          pppd_basis_of_action_of_filing: data.pppd_basis_of_action_of_filing,
          pppd_reason_for_filing_opposition: data.pppd_reason_for_filing_opposition,
          pppd_opinion_rendered_by_you: data.pppd_opinion_rendered_by_you,
          pppd_external_agency: data.pppd_external_agency,
          pppd_reviewed_by: data.pppd_reviewed_by,
          
          // PP Patent Application Status fields (ppas_)
          ppas_status: data.ppas_status,
          ppas_number: data.ppas_number,
          ppas_attachment: data.ppas_attachment,
          ppas_grant_date: data.ppas_grant_date,
          ppas_rejection_reason_attachment: data.ppas_rejection_reason_attachment,
          
          // PP FER fields (ppfer_) - as JSON array
          ppfer_list: data.ppfer_list,
          
          // PP Hearing fields (pph_) - as JSON array
          pph_list: data.pph_list,
          
          // PP Decision Sheet fields (ppds_)
          ppds_name_of_decision_maker: data.ppds_name_of_decision_maker,
          ppds_decision_in_brief: data.ppds_decision_in_brief,
          ppds_attachments: data.ppds_attachments,
          
          // PP Innovation Analysis fields (ppi_)
          ppi_more_than_invention: data.ppi_more_than_invention,
          ppi_prior_art_documents: data.ppi_prior_art_documents,
          ppi_npl_documents: data.ppi_npl_documents,
          
          // PP Patentability Extractor fields (pppe_)
          pppe_searcher1: data.pppe_searcher1,
          pppe_searcher2: data.pppe_searcher2,
          pppe_rating: data.pppe_rating,
          pppe_invention_accordance: data.pppe_invention_accordance,
          pppe_novel_feature: data.pppe_novel_feature,
          pppe_inventive_feature: data.pppe_inventive_feature,
          pppe_attachment: data.pppe_attachment,
          pppe_specific_country: data.pppe_specific_country,
          pppe_opinion_of_extractor: data.pppe_opinion_of_extractor,
          
          // PP Average Patentability Rating fields (ppapr_)
          ppapr_rating: data.ppapr_rating,
          ppapr_patent_application_number: data.ppapr_patent_application_number,
          
          // PP Effort Sheet fields (ppes_)
          ppes_ip_recognizer: data.ppes_ip_recognizer,
          ppes_hours_spent: data.ppes_hours_spent,
          ppes_agency_recognizer: data.ppes_agency_recognizer,
          ppes_agency_cost: data.ppes_agency_cost,
          ppes_review_effort: data.ppes_review_effort,
          ppes_manager_emp_id: data.ppes_manager_emp_id,
          
          // PP Activity Status fields (ppact_)
          ppact_status: data.ppact_status,
          ppact_description: data.ppact_description,
          ppact_last_updated: data.ppact_last_updated
        },
      });
    } else {
      // Create new record
      result = await prisma.PatentProsecution.create({
        data,
      });
    }

    return NextResponse.json({ 
      success: true, 
      data: result,
      message: result.createdAt === result.updatedAt ? 'Patent Prosecution created successfully' : 'Patent Prosecution updated successfully'
    }, { status: 200 });
  } catch (err) {
    console.error('❌ Error inserting PatentProsecution:', err);
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
