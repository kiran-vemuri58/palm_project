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
      const data = await prisma.PostGrantOpposition.findFirst({
        where: { asset_id: assetId },
      });

      if (!data) {
        return NextResponse.json({ 
          success: false, 
          message: 'Post Grant Opposition not found' 
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

    console.log('📦 PGO payload received:', JSON.stringify(payload, null, 2));

    // Map payload to Prisma-compatible field names and ensure array fields are arrays
    const data = {
      asset_id: payload.asset_id,
      patentApplicationNumber: payload.patentApplicationNumber || '',
      patentPublished: payload.patentPublished || '',
      publicationNumber: payload.publicationNumber || '',
      apopposed: payload.apopposed || '',
      oname: payload.oname || '',
      opposerAttachment: Array.isArray(payload.opposerAttachment) ? payload.opposerAttachment.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      boaof: payload.boaof || '',
      rffo: payload.rffo || '',
      responseAttachment: Array.isArray(payload.responseAttachment) ? payload.responseAttachment.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      orpby: payload.orpby || '',
      eagency: payload.eagency || '',
      revby: payload.revby || '',
      reviewAttachment: Array.isArray(payload.reviewAttachment) ? payload.reviewAttachment.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      ipRecognizer: payload.ipRecognizer || '',
      hoursSpent: payload.hoursSpent || '',
      agencyRecognizer: payload.agencyRecognizer || '',
      agencyCost: payload.agencyCost || '',
      reviewEffort: payload.reviewEffort || '',
      managerEmpId: payload.managerEmpId || '',
      activityStatus: payload.activityStatus || '',
    };

    console.log('📊 Data being sent to Prisma:', JSON.stringify(data, null, 2));
    
    // Check if record exists, then create or update
    const existingRecord = await prisma.PostGrantOpposition.findFirst({
      where: { asset_id: payload.asset_id }
    });

    let result;
    if (existingRecord) {
      // Update existing record
      result = await prisma.PostGrantOpposition.update({
        where: { id: existingRecord.id },
        data: {
          patentApplicationNumber: data.patentApplicationNumber,
          patentPublished: data.patentPublished,
          publicationNumber: data.publicationNumber,
          apopposed: data.apopposed,
          oname: data.oname,
          opposerAttachment: data.opposerAttachment,
          boaof: data.boaof,
          rffo: data.rffo,
          responseAttachment: data.responseAttachment,
          orpby: data.orpby,
          eagency: data.eagency,
          revby: data.revby,
          reviewAttachment: data.reviewAttachment,
          ipRecognizer: data.ipRecognizer,
          hoursSpent: data.hoursSpent,
          agencyRecognizer: data.agencyRecognizer,
          agencyCost: data.agencyCost,
          reviewEffort: data.reviewEffort,
          managerEmpId: data.managerEmpId,
          activityStatus: data.activityStatus,
        },
      });
    } else {
      // Create new record
      result = await prisma.PostGrantOpposition.create({
        data,
      });
    }

    console.log('✅ PostGrantOpposition upserted successfully:', result);
    return NextResponse.json({ 
      success: true, 
      data: result,
      message: result.createdAt === result.updatedAt ? 'Post Grant Opposition created successfully' : 'Post Grant Opposition updated successfully'
    }, { status: 200 });
  } catch (err) {
    console.error('❌ Error inserting PostGrantOpposition:', err);
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
