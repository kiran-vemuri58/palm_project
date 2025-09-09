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
      const data = await prisma.PatentCommercialisation.findFirst({
        where: { asset_id: assetId },
      });

      if (!data) {
        return NextResponse.json({ 
          success: false, 
          message: 'Patent Commercialisation not found' 
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
    
    // Check if record exists, then create or update
    const existingRecord = await prisma.PatentCommercialisation.findFirst({
      where: { asset_id: payload.asset_id }
    });

    let result;
    if (existingRecord) {
      // Update existing record
      result = await prisma.PatentCommercialisation.update({
        where: { id: existingRecord.id },
        data: {
          inventionTitle: data.inventionTitle,
          inventorName: data.inventorName,
          inventorDepartment: data.inventorDepartment,
          inventionSummary: data.inventionSummary,
          patentApplicationNumber: data.patentApplicationNumber,
          patentNumber: data.patentNumber,
          commercializationType: data.commercializationType,
          commercializationStatus: data.commercializationStatus,
          commercializationDate: data.commercializationDate,
          commercializationRevenue: data.commercializationRevenue,
          effortsSpent: data.effortsSpent,
          employeeId: data.employeeId,
          hoursSpent: data.hoursSpent,
          agencyManager: data.agencyManager,
          agencyCost: data.agencyCost,
          reviewEfforts: data.reviewEfforts,
          managerResponsible: data.managerResponsible,
          activityStatus: data.activityStatus,
          salesFile: data.salesFile,
          invoiceFile: data.invoiceFile,
          implementationFile: data.implementationFile,
        },
      });
    } else {
      // Create new record
      result = await prisma.PatentCommercialisation.create({
        data,
      });
    }

    console.log('✅ PatentCommercialisation upserted successfully:', result);
    return NextResponse.json({ 
      success: true, 
      data: result,
      message: result.createdAt === result.updatedAt ? 'Patent Commercialisation created successfully' : 'Patent Commercialisation updated successfully'
    }, { status: 200 });
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
