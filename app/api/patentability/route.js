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
      const data = await prisma.Patentability.findFirst({
        where: { asset_id: assetId },
      });

      if (!data) {
        return NextResponse.json({ 
          success: false, 
          message: 'Patentability not found' 
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
    
    // Check if record exists, then create or update
    const existingRecord = await prisma.Patentability.findFirst({
      where: { asset_id: payload.asset_id }
    });

    let result;
    if (existingRecord) {
      // Update existing record
      result = await prisma.Patentability.update({
        where: { id: existingRecord.id },
        data: {
          psone: data.psone,
          pstwo: data.pstwo,
          rating: data.rating,
          nfeature: data.nfeature,
          ifeature: data.ifeature,
          scountry: data.scountry,
          ooextractor: data.ooextractor,
          trainRun: data.trainRun,
          nodc: data.nodc,
          dibrief: data.dibrief,
          attachment: data.attachment,
          esfsearcher: data.esfsearcher,
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
      result = await prisma.Patentability.create({
        data,
      });
    }

    console.log('✅ Patentability upserted successfully:', result);
    return NextResponse.json({ 
      success: true, 
      data: result,
      message: result.createdAt === result.updatedAt ? 'Patentability created successfully' : 'Patentability updated successfully'
    }, { status: 200 });
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
