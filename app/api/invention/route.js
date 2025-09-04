import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connection successful');

    const data = await prisma.Invention.findMany({
      skip,
      take: limit,
      select: {
        asset_id: true,
        inventiontitle: true,
        commonname: true,
        inventordetails: true,
      },
    });

    const total = await prisma.Invention.count();
    return NextResponse.json({
      data,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('❌ GET request error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req) {
  try {
    const payload = await req.json(); // read body from POST request
    
    console.log('Received payload:', payload); // Debug log
    
    // Use the asset_id from payload if provided, otherwise generate a new one
    let newAssetId = payload.asset_id;
    
    if (!newAssetId) {
      // 🧠 Fetch latest asset_id and generate a new one
      const lastEntry = await prisma.Invention.findFirst({
          orderBy: { created_at: 'desc' },
          select: { asset_id: true },
      });

      newAssetId = 'A0001';
      if (lastEntry?.asset_id) {
          const lastNumber = parseInt(lastEntry.asset_id.slice(1)) || 0;
          const nextNumber = (lastNumber + 1).toString().padStart(4, '0');
          newAssetId = `A${nextNumber}`;
      }
    }

    // Map payload to Prisma-compatible field names
    const data = {
      asset_id: newAssetId,
      inventiontitle: payload.inventiontitle || '',
      commonname: payload.commonName || '',
      inventors: payload.inventors || null,
      inventordetails: payload.inventordetails || '',
      incrementalrenovation: payload.incrementalRenovation || null,
      patentnumbers: payload.patentNumbers || null,
      journalnumbers: payload.journalNumbers || null,
      productidentity: payload.productIdentity || null,
      problemaddressed: payload.problemAddressed || null,
      trainrun: payload.trainRun || null,
      experimentresults: payload.experimentResults || null,
      // Handle uploaded file paths - check for both direct and Paths suffix
      evidence: Array.isArray(payload.uploadedFilePaths?.evidence) ? payload.uploadedFilePaths.evidence : 
               Array.isArray(payload.evidencePaths) ? payload.evidencePaths : 
               Array.isArray(payload.evidence) ? payload.evidence : [],
      minuteofmeeting: Array.isArray(payload.uploadedFilePaths?.minuteOfMeeting) ? payload.uploadedFilePaths.minuteOfMeeting : 
                      Array.isArray(payload.minuteOfMeetingPaths) ? payload.minuteOfMeetingPaths : 
                      Array.isArray(payload.minuteOfMeeting) ? payload.minuteOfMeeting : [],
      attachments: Array.isArray(payload.uploadedFilePaths?.attachments) ? payload.uploadedFilePaths.attachments : 
                  Array.isArray(payload.attachmentsPaths) ? payload.attachmentsPaths : 
                  Array.isArray(payload.attachments) ? payload.attachments : [],
      iprecognizer: payload.ipRecognizer || null,
      hoursspent: payload.hoursSpent || null,
      agencyrecognizer: payload.agencyRecognizer || null,
      agencycost: payload.agencyCost || null,
      revieweffort: payload.reviewEffort || null,
      managerempid: payload.managerEmpId || null,
      entity: payload.entity || null,
      date: payload.date ? new Date(payload.date) : new Date(), // Convert string to Date object
      inventioncountry: payload.inventionCountry || null,
      creationcountry: payload.creationCountry || null,
      collaboration: payload.collaboration || null,
      collaboratorname: payload.collaboratorName || null,
      collaboratorcountry: payload.collaboratorCountry || null,
      stakeholders: payload.stakeholders || null,
    };

    console.log('Mapped data for Prisma:', data); // Debug log

    // Test database connection before insert
    await prisma.$connect();
    console.log('✅ Database connection successful before insert');

    const result = await prisma.Invention.create({
      data,
    });

    console.log('✅ Invention created successfully:', result);

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (err) {
    console.error('❌ Error inserting invention:', err);
    console.error('❌ Error details:', {
      name: err.name,
      message: err.message,
      stack: err.stack,
      code: err.code
    });
    
    return NextResponse.json({ 
      success: false, 
      message: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
