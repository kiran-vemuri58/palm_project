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
      const data = await prisma.PatentMaintenance.findFirst({
        where: { asset_id: assetId },
      });

      if (!data) {
        return NextResponse.json({ 
          success: false, 
          message: 'Patent Maintenance not found' 
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
    console.log('🔄 POST /api/pm called',req.json);
    const payload = await req.json(); // read body from POST request

    console.log('📦 PM payload received:', JSON.stringify(payload, null, 2));

    // Map payload to Prisma-compatible field names and ensure array fields are arrays
    const data = {
      asset_id: payload.asset_id,
      
      // PM Extractor Details fields (same as PGO but separate storage)
      extractorOne: payload.extractorOne || '',
      extractortwo: payload.extractortwo || '',
      iEDate: payload.iEDate || '',
      iawpl: payload.iawpl || '',
      nfeature: payload.nfeature || '',
      ifeature: payload.ifeature || '',
      idattachments: Array.isArray(payload.idattachments) ? payload.idattachments.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      scountry: payload.scountry || '',
      oextractor: payload.oextractor || '',
      
      // PM Patent Prosecution Details fields (same as PGO but separate storage)
      patentPublished: payload.patentPublished || '',
      publicationNumber: payload.publicationNumber || '',
      apopposed: payload.apopposed || '',
      oname: payload.oname || '',
      opposerAttachment: Array.isArray(payload.opposerAttachment) ? payload.opposerAttachment.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      cfbopposer: payload.cfbopposer || '',
      boaof: payload.boaof || '',
      rffo: payload.rffo || '',
      responseAttachment: Array.isArray(payload.responseAttachment) ? payload.responseAttachment.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      orpby: payload.orpby || '',
      eagency: payload.eagency || '',
      revby: payload.revby || '',
      reviewAttachment: Array.isArray(payload.reviewAttachment) ? payload.reviewAttachment.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      
      // PM Patent Maintenance History fields
      priorityDate: payload.priorityDate || '',
      grantDate: payload.grantDate || '',
      yearsPaid: payload.yearsPaid || '',
      nextDueDate: payload.nextDueDate || '',
      maintenanceStopped: payload.maintenanceStopped || '',
      attachments: Array.isArray(payload.attachments) ? payload.attachments.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      collaboration: payload.collaboration || '',
      filingDate: payload.filingDate || '',
      filingAttachments: Array.isArray(payload.filingAttachments) ? payload.filingAttachments.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      maintenanceFee: payload.maintenanceFee || '',
      externalAgency: payload.externalAgency || '',
      
      // PM fields matching old formData8 structure
      patentApplicationNumber: payload.patentApplicationNumber || '',
      ipRecognizer: payload.ipRecognizer || '',
      hoursSpent: payload.hoursSpent || '',
      agencyRecognizer: payload.agencyRecognizer || '',
      agencyCost: payload.agencyCost || '',
      reviewEffort: payload.reviewEffort || '',
      managerEmpId: payload.managerEmpId || '',
      reviewEffortHours: payload.reviewEffortHours || '',
      activityStatus: payload.activityStatus || '',
      
      // PM Decision Sheet fields
      nodc: payload.nodc || '',
      dibrief: payload.dibrief || '',
      decisionAttachments: Array.isArray(payload.decisionAttachments) ? payload.decisionAttachments.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      
      // PM Innovation Analysis fields
      trainRun: payload.trainRun || '',
      minuteOfMeeting: Array.isArray(payload.minuteOfMeeting) ? payload.minuteOfMeeting.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      innovationAttachments: Array.isArray(payload.innovationAttachments) ? payload.innovationAttachments.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      
      // PM Patentability Extractor fields
      psone: payload.psone || '',
      pstwo: payload.pstwo || '',
      rating: payload.rating || 0,
      paNovelFeature: payload.paNovelFeature || '',
      paInventiveFeature: payload.paInventiveFeature || '',
      paSpecificCountry: payload.paSpecificCountry || '',
      paOpinionOfExtractor: payload.paOpinionOfExtractor || '',
      patentabilityAttachments: Array.isArray(payload.patentabilityAttachments) ? payload.patentabilityAttachments.filter(item => typeof item === 'string' && item.trim() !== '') : []
    };

    console.log('📊 Data being sent to Prisma:', JSON.stringify(data, null, 2));
    
    // Check if record exists, then create or update
    const existingRecord = await prisma.PatentMaintenance.findFirst({
      where: { asset_id: payload.asset_id }
    });

    let result;
    if (existingRecord) {
      // Update existing record
      result = await prisma.PatentMaintenance.update({
        where: { id: existingRecord.id },
        data: {
          // PM Extractor Details fields (same as PGO but separate storage)
          extractorOne: data.extractorOne,
          extractortwo: data.extractortwo,
          iEDate: data.iEDate,
          iawpl: data.iawpl,
          nfeature: data.nfeature,
          ifeature: data.ifeature,
          idattachments: data.idattachments,
          scountry: data.scountry,
          oextractor: data.oextractor,
          
          // PM Patent Prosecution Details fields (same as PGO but separate storage)
          patentPublished: data.patentPublished,
          publicationNumber: data.publicationNumber,
          apopposed: data.apopposed,
          oname: data.oname,
          opposerAttachment: data.opposerAttachment,
          cfbopposer: data.cfbopposer,
          boaof: data.boaof,
          rffo: data.rffo,
          responseAttachment: data.responseAttachment,
          orpby: data.orpby,
          eagency: data.eagency,
          revby: data.revby,
          reviewAttachment: data.reviewAttachment,
          
          // PM fields matching old formData8 structure
          patentApplicationNumber: data.patentApplicationNumber,
          ipRecognizer: data.ipRecognizer,
          hoursSpent: data.hoursSpent,
          agencyRecognizer: data.agencyRecognizer,
          agencyCost: data.agencyCost,
          reviewEffort: data.reviewEffort,
          managerEmpId: data.managerEmpId,
          activityStatus: data.activityStatus
        },
      });
    } else {
      // Create new record
      result = await prisma.PatentMaintenance.create({
        data,
      });
    }

    console.log('✅ PatentMaintenance upserted successfully:', result);
    return NextResponse.json({ 
      success: true, 
      data: result,
      message: result.createdAt === result.updatedAt ? 'Patent Maintenance created successfully' : 'Patent Maintenance updated successfully'
    }, { status: 200 });
  } catch (err) {
    console.error('❌ Error inserting PatentMaintenance:', err);
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