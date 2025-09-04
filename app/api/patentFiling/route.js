import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    console.log('🔄 POST /api/patentFiling called');
    const payload = await req.json(); // read body from POST request
    console.log('📦 PatentFiling payload received:', JSON.stringify(payload, null, 2));

    // Map payload to Prisma-compatible field names and ensure array fields are arrays
    const data = {
      asset_id: payload.asset_id,
      activityStatus: payload.activityStatus || '',
      rating: payload.rating || 0,
      draftType: payload.draftType || '',
      
      // Provisional fields
      patentFilingName: payload.patentFilingName || '',
      provisionalPatent: Array.isArray(payload.provisionalPatent) ? payload.provisionalPatent.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      attachment: Array.isArray(payload.attachment) ? payload.attachment.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      dateProvision: payload.dateProvision || '',
      applicantName: payload.applicantName || '',
      isProfilePatent: payload.isProfilePatent || '',
      isDefensivePatent: payload.isDefensivePatent || '',
      claimingStartup: Array.isArray(payload.claimingStartup) ? payload.claimingStartup.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      poaOffice: payload.poaOffice || '',
      effortsSpent: payload.effortsSpent || '',
      patentFiler: payload.patentFiler || '',
      hoursSpent: payload.hoursSpent || '',
      agencyRecognizer: payload.agencyRecognizer || '',
      agencyCost: payload.agencyCost || '',
      managerResponsible: payload.managerResponsible || '',

      // PCT fields
      postDated: payload.postDated || '',
      applicationProvisionalNumber: payload.applicationProvisionalNumber || '',
      datePatentApplication: payload.datePatentApplication || '',
      pctFilingPermission: payload.pctFilingPermission || '',

      // National Phase fields
      dateProvisionalPatent: payload.dateProvisionalPatent || '',
      dateCompletePatentApplication: payload.dateCompletePatentApplication || '',
      datePCTPatentApplication: payload.datePCTPatentApplication || '',
      finalSubmitted: payload.finalSubmitted || '',
      filedForms: Array.isArray(payload.filedForms) ? payload.filedForms.filter(item => typeof item === 'string' && item.trim() !== '') : [],

      // Complete fields
      dateOfPatent: payload.dateOfPatent || '',
      provisionalNumber: payload.provisionalNumber || '',
      specificationFiling: payload.specificationFiling || '',
      agentFiling: payload.agentFiling || '',
      filedDraft: Array.isArray(payload.filedDraft) ? payload.filedDraft.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      filedFormsComplete: Array.isArray(payload.filedFormsComplete) ? payload.filedFormsComplete.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      dateOfComplete: payload.dateOfComplete || '',
      isPostDated: payload.isPostDated || '',
    };

    console.log('📊 Data being sent to Prisma:', JSON.stringify(data, null, 2));
    
    const result = await prisma.PatentFiling.create({
      data,
    });

    console.log('✅ PatentFiling created successfully:', result);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
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
