import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const payload = await req.json(); // read body from POST request
    console.log('📦 Patentability payload received:', JSON.stringify(payload, null, 2));
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

    // Map payload to Prisma-compatible field names and ensure array fields are arrays
    const data = {
      asset_id: payload.asset_id,
      psone: payload.psone || '',
      pstwo: payload.pstwo || '',
      rating: payload.rating || 0,
      nfeature: payload.nfeature || '',
      ifeature: payload.ifeature || '',
      scountry: payload.scountry || '',
      ooextractor: payload.ooextractor || '',
      trainRun: payload.trainRun || '',
      nodc: payload.nodc || '',
      dibrief: payload.dibrief || '',
      attachment: Array.isArray(payload.attachment) ? payload.attachment.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      esfsearcher: payload.esfsearcher || '',
      ipRecognizer: payload.ipRecognizer || '',
      hoursSpent: payload.hoursSpent || '',
      agencyRecognizer: payload.agencyRecognizer || '',
      agencyCost: payload.agencyCost || '',
      reviewEffort: payload.reviewEffort || '',
      managerEmpId: payload.managerEmpId || '',
      activityStatus: payload.activityStatus || '',
    };

    console.log('📊 Data being sent to Prisma:', JSON.stringify(data, null, 2));
    
    const result = await prisma.Patentability.create({
      data,
    });

    console.log('✅ Patentability created successfully:', result);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (err) {
    console.error('❌ Error inserting patentability:', err);
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
