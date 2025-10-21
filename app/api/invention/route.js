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
    
    console.log('🔍 API GET request - assetId:', assetId);
    
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // If assetId is provided, fetch specific record
    if (assetId) {
      console.log('🔍 Fetching invention with assetId:', assetId);
      const data = await prisma.Invention.findUnique({
        where: { asset_id: assetId },
      });
      console.log('🔍 Found invention data:', data);

      if (!data) {
        return NextResponse.json({ 
          success: false, 
          message: 'Invention not found' 
        }, { status: 404 });
      }

      return NextResponse.json({ 
        success: true, 
        data 
      });
    }

    // Otherwise, fetch paginated list
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

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
      success: true,
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
    // Authenticate request
    const authResult = await authenticateRequest(req);
    if (!authResult.success) {
      return createUnauthorizedResponse(authResult.message);
    }

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
      inventors: payload.inventors || [],
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

    // Use upsert to handle both create and update
    const result = await prisma.Invention.upsert({
      where: { asset_id: newAssetId },
      update: {
        inventiontitle: data.inventiontitle,
        commonname: data.commonname,
        inventors: data.inventors,
        inventordetails: data.inventordetails,
        incrementalrenovation: data.incrementalrenovation,
        patentnumbers: data.patentnumbers,
        journalnumbers: data.journalnumbers,
        productidentity: data.productidentity,
        problemaddressed: data.problemaddressed,
        trainrun: data.trainrun,
        experimentresults: data.experimentresults,
        evidence: data.evidence,
        minuteofmeeting: data.minuteofmeeting,
        attachments: data.attachments,
        iprecognizer: data.iprecognizer,
        hoursspent: data.hoursspent,
        agencyrecognizer: data.agencyrecognizer,
        agencycost: data.agencycost,
        revieweffort: data.revieweffort,
        managerempid: data.managerempid,
        entity: data.entity,
        date: data.date,
        inventioncountry: data.inventioncountry,
        creationcountry: data.creationcountry,
        collaboration: data.collaboration,
        collaboratorname: data.collaboratorname,
        collaboratorcountry: data.collaboratorcountry,
        stakeholders: data.stakeholders,
      },
      create: data,
    });

    console.log('✅ Invention upserted successfully:', result);

    return NextResponse.json({ 
      success: true, 
      data: result,
      message: result.created_at === result.updated_at ? 'Invention created successfully' : 'Invention updated successfully'
    }, { status: 200 });
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
