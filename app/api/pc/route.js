import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    console.log('🔄 POST /api/pc called',req.json);
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

    console.log('📦 PC payload received:', JSON.stringify(payload, null, 2));

    // Map payload to Prisma-compatible field names and ensure array fields are arrays
    const data = {
      asset_id: payload.asset_id,
      inventionTitle: payload.inventionTitle || '',
      inventorName: payload.inventorName || '',
      inventorDepartment: payload.inventorDepartment || '',
      inventionSummary: payload.inventionSummary || '',
      patentApplicationNumber: payload.patentApplicationNumber || '',
      patentNumber: payload.patentNumber || '',
      commercializationType: payload.commercializationType || '',
      commercializationStatus: payload.commercializationStatus || '',
      commercializationDate: payload.commercializationDate || '',
      commercializationRevenue: payload.commercializationRevenue || '',
      effortsSpent: payload.effortsSpent || '',
      employeeId: payload.employeeId || '',
      hoursSpent: payload.hoursSpent || '',
      agencyManager: payload.agencyManager || '',
      agencyCost: payload.agencyCost || '',
      reviewEfforts: payload.reviewEfforts || '',
      managerResponsible: payload.managerResponsible || '',
      activityStatus: payload.activityStatus || '',
      // Ensure file fields are arrays
      salesFile: Array.isArray(payload.salesFile) ? payload.salesFile.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      invoiceFile: Array.isArray(payload.invoiceFile) ? payload.invoiceFile.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      implementationFile: Array.isArray(payload.implementationFile) ? payload.implementationFile.filter(item => typeof item === 'string' && item.trim() !== '') : [],
    };

    console.log('📊 Data being sent to Prisma:', JSON.stringify(data, null, 2));
    
    const result = await prisma.PatentCommercialisation.create({
      data,
    });

    console.log('✅ PatentCommercialisation created successfully:', result);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (err) {
    console.error('❌ Error inserting PatentCommercialisation:', err);
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
