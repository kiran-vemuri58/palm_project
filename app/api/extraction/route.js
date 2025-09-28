import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authenticateRequest, createUnauthorizedResponse } from '@/lib/authMiddleware';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(req);
    if (!authResult.success) {
      return createUnauthorizedResponse(authResult.message);
    }

    const { searchParams } = new URL(req.url);
    const assetId = searchParams.get('assetId');
    
    await prisma.$connect();
    console.log('✅ Database connection successful');

    if (assetId) {
      const data = await prisma.Extraction.findFirst({
        where: { asset_id: assetId },
      });

      if (!data) {
        return NextResponse.json({ 
          success: false, 
          message: 'Extraction not found' 
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
    // Authenticate request
    const authResult = await authenticateRequest(req);
    if (!authResult.success) {
      return createUnauthorizedResponse(authResult.message);
    }

    const payload = await req.json(); // read body from POST request
        // 🧠 Fetch latest asset_id and generate a new one
    // const lastEntry = await prisma.inventions.findFirst({ 
    //     orderBy: { created_at: 'desc' },
    //     select: { asset_id: true },
    // });

    // let newAssetId = 'A0001';
    // if (lastEntry?.asset_id) {
    //     const lastNumber = parseInt(lastEntry.asset_id.slice(1)) || 0;
    //     const nextNumber = (lastNumber + 1).toString().padStart(4, '0');
    //     newAssetId = `A${nextNumber}`;
    // }

    // Map payload to Prisma-compatible field names
    const data = {
      asset_id:payload.asset_id,
      extractorOne: payload.extractorOne,
      extractortwo: payload.extractortwo,
      iEDate: payload.iEDate ? new Date(payload.iEDate) : new Date(), // Convert string to Date object
      iawpl: payload.iawpl,
      nfeature: payload.nfeature,
      ifeature: payload.ifeature,
      idattachments: Array.isArray(payload.idattachments) ? payload.idattachments : (payload.idattachments || []),
      scountry: payload.scountry,
      oextractor: payload.oextractor,
      ipRecognizer: payload.ipRecognizer,
      hoursSpent: payload.hoursSpent,
      agencyRecognizer: payload.agencyRecognizer,
      agencyCost: payload.agencyCost,
      reviewEffort: payload.reviewEffort,
      managerEmpId: payload.managerEmpId,
      activityStatus: payload.activityStatus,
      updatenba: payload.updatenba,

    };
    // Check if record exists, then create or update
    const existingRecord = await prisma.Extraction.findFirst({
      where: { asset_id: payload.asset_id }
    });

    let result;
    if (existingRecord) {
      // Update existing record
      result = await prisma.Extraction.update({
        where: { id: existingRecord.id },
        data: {
          extractorOne: data.extractorOne,
          extractortwo: data.extractortwo,
          iEDate: data.iEDate,
          iawpl: data.iawpl,
          nfeature: data.nfeature,
          ifeature: data.ifeature,
          idattachments: data.idattachments,
          scountry: data.scountry,
          oextractor: data.oextractor,
          ipRecognizer: data.ipRecognizer,
          hoursSpent: data.hoursSpent,
          agencyRecognizer: data.agencyRecognizer,
          agencyCost: data.agencyCost,
          reviewEffort: data.reviewEffort,
          managerEmpId: data.managerEmpId,
          activityStatus: data.activityStatus,
          updatenba: data.updatenba,
        },
      });
    } else {
      // Create new record
      result = await prisma.Extraction.create({
        data,
      });
    }

    return NextResponse.json({ 
      success: true, 
      data: result,
      message: result.createdAt === result.updatedAt ? 'Extraction created successfully' : 'Extraction updated successfully'
    }, { status: 200 });
  } catch (err) {
    console.error('❌ Error inserting extraction:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
