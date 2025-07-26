import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    console.log('🔄 POST /api/psp called',req.json);
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

    // Map payload to Prisma-compatible field names
    const data = {
      ...payload,
    };

    const result = await prisma.PatentSpecificInformation.create({
      data,
    });

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (err) {
    console.error('❌ Error inserting invention:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
