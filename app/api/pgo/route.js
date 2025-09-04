import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    
    const result = await prisma.PostGrantOpposition.create({
      data,
    });

    console.log('✅ PostGrantOpposition created successfully:', result);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
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
