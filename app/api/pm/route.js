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
      const data = await prisma.PatentManagement.findFirst({
        where: { asset_id: assetId },
      });

      if (!data) {
        return NextResponse.json({ 
          success: false, 
          message: 'Patent Management not found' 
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

    console.log('📦 PM payload received:', JSON.stringify(payload, null, 2));

    // Map payload to Prisma-compatible field names and ensure array fields are arrays
    const data = {
      asset_id: payload.asset_id,
      patentApplicationNumber: payload.patentApplicationNumber || '',
      priorityDate: payload.priorityDate || '',
      grantDate: payload.grantDate || '',
      yearsPaid: payload.yearsPaid || '',
      nextDueDate: payload.nextDueDate || '',
      maintenanceStopped: payload.maintenanceStopped || '',
      decisionPageAttachment: Array.isArray(payload.decisionPageAttachment) ? payload.decisionPageAttachment.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      collaboration: payload.collaboration || '',
      filingDate: payload.filingDate || '',
      filingAttachment: Array.isArray(payload.filingAttachment) ? payload.filingAttachment.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      maintenanceFee: payload.maintenanceFee || '',
      externalAgency: payload.externalAgency || '',
      effortsSpent: payload.effortsSpent || '',
      employeeId: payload.employeeId || '',
      hoursSpent: payload.hoursSpent || '',
      agencyManager: payload.agencyManager || '',
      agencyCost: payload.agencyCost || '',
      reviewEfforts: payload.reviewEfforts || '',
      managerResponsible: payload.managerResponsible || '',
      activityStatus: payload.activityStatus || '',
    };

    console.log('📊 Data being sent to Prisma:', JSON.stringify(data, null, 2));
    
    // Check if record exists, then create or update
    const existingRecord = await prisma.PatentManagement.findFirst({
      where: { asset_id: payload.asset_id }
    });

    let result;
    if (existingRecord) {
      // Update existing record
      result = await prisma.PatentManagement.update({
        where: { id: existingRecord.id },
        data: {
          patentApplicationNumber: data.patentApplicationNumber,
          priorityDate: data.priorityDate,
          grantDate: data.grantDate,
          yearsPaid: data.yearsPaid,
          nextDueDate: data.nextDueDate,
          maintenanceStopped: data.maintenanceStopped,
          decisionPageAttachment: data.decisionPageAttachment,
          collaboration: data.collaboration,
          filingDate: data.filingDate,
          filingAttachment: data.filingAttachment,
          maintenanceFee: data.maintenanceFee,
          externalAgency: data.externalAgency,
          effortsSpent: data.effortsSpent,
          employeeId: data.employeeId,
          hoursSpent: data.hoursSpent,
          agencyManager: data.agencyManager,
          agencyCost: data.agencyCost,
          reviewEfforts: data.reviewEfforts,
          managerResponsible: data.managerResponsible,
          activityStatus: data.activityStatus,
        },
      });
    } else {
      // Create new record
      result = await prisma.PatentManagement.create({
        data,
      });
    }

    console.log('✅ PatentManagement upserted successfully:', result);
    return NextResponse.json({ 
      success: true, 
      data: result,
      message: result.createdAt === result.updatedAt ? 'Patent Management created successfully' : 'Patent Management updated successfully'
    }, { status: 200 });
  } catch (err) {
    console.error('❌ Error inserting PatentManagement:', err);
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
