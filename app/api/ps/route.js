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
    console.log('🔄 POST /api/ps called');
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

    console.log('📦 PS payload received:', JSON.stringify(payload, null, 2));

    // Map payload to Prisma-compatible field names and ensure array fields are arrays
    const data = {
      asset_id: payload.asset_id,
      rating: payload.rating || 0,
      patentApplicationNumber: payload.patentApplicationNumber || '',
      patentStatus: payload.patentStatus || '',
      patentNumber: payload.patentNumber || '',
      patentAttachment: Array.isArray(payload.patentAttachment) ? payload.patentAttachment.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      patentGrantDate: payload.patentGrantDate || '',
      rejectionReasonAttachment: Array.isArray(payload.rejectionReasonAttachment) ? payload.rejectionReasonAttachment.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      patentPublished: payload.patentPublished || '',
      publicationNumber: payload.publicationNumber || '',
      apopposed: payload.apopposed || '',
      oname: payload.oname || '',
      attachments: Array.isArray(payload.attachments) ? payload.attachments.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      cfbopposer: payload.cfbopposer || '',
      boaof: payload.boaof || '',
      rffo: payload.rffo || '',
      orpby: payload.orpby || '',
      eagency: payload.eagency || '',
      revby: payload.revby || '',
      // Ensure JSON fields are properly handled
      ferList: payload.ferList || [],
      hearingList: payload.hearingList || [],
      ipRecognizer: payload.ipRecognizer || '',
      hoursSpent: payload.hoursSpent || '',
      agencyRecognizer: payload.agencyRecognizer || '',
      agencyCost: payload.agencyCost || '',
      activityStatus: payload.activityStatus || '',
    };

    console.log('📊 Data being sent to Prisma:', JSON.stringify(data, null, 2));
    
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
          rating: data.rating,
          patentApplicationNumber: data.patentApplicationNumber,
          patentStatus: data.patentStatus,
          patentNumber: data.patentNumber,
          patentAttachment: data.patentAttachment,
          patentGrantDate: data.patentGrantDate,
          rejectionReasonAttachment: data.rejectionReasonAttachment,
          patentPublished: data.patentPublished,
          publicationNumber: data.publicationNumber,
          apopposed: data.apopposed,
          oname: data.oname,
          attachments: data.attachments,
          cfbopposer: data.cfbopposer,
          boaof: data.boaof,
          rffo: data.rffo,
          orpby: data.orpby,
          eagency: data.eagency,
          revby: data.revby,
          ferList: data.ferList,
          hearingList: data.hearingList,
          ipRecognizer: data.ipRecognizer,
          hoursSpent: data.hoursSpent,
          agencyRecognizer: data.agencyRecognizer,
          agencyCost: data.agencyCost,
          activityStatus: data.activityStatus,
        },
      });
    } else {
      // Create new record
      result = await prisma.PatentProsecution.create({
        data,
      });
    }

    console.log('✅ PatentProsecution upserted successfully:', result);
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
