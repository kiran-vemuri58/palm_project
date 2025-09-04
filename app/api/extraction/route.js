import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
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
    const result = await prisma.Extraction.create({data});

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (err) {
    console.error('❌ Error inserting extraction:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
