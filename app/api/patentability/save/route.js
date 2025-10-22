import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { validateSession } from '@/lib/secureAuth';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Validate session
    const sessionId = request.cookies.get('session-id')?.value;
    if (!sessionId) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 });
    }

    const authData = await validateSession(sessionId);
    if (!authData) {
      return NextResponse.json({
        success: false,
        error: 'Invalid or expired session'
      }, { status: 401 });
    }

    const data = await request.json();
    const { asset_id, ...patentabilityData } = data;

    if (!asset_id) {
      return NextResponse.json({
        success: false,
        error: 'Asset ID is required'
      }, { status: 400 });
    }

    // Process data - no date conversion needed since we're using strings
    const processedData = { ...patentabilityData };
    
    // Map field names to match Prisma schema
    if (processedData.decisionNodc !== undefined) {
      processedData.nodc = processedData.decisionNodc;
      delete processedData.decisionNodc;
    }
    if (processedData.decisionDibrief !== undefined) {
      processedData.dibrief = processedData.decisionDibrief;
      delete processedData.decisionDibrief;
    }

    // Process integer fields - convert empty strings to null for Int fields
    const integerFields = ['rating', 'hoursspent', 'agencycost', 'revieweffort', 'extractionEffort'];
    integerFields.forEach(field => {
      if (processedData[field] === '' || processedData[field] === null || processedData[field] === undefined) {
        processedData[field] = null;
      } else {
        const num = parseInt(processedData[field]);
        processedData[field] = isNaN(num) ? null : num;
      }
    });

    // Process array fields - ensure they are arrays, not null
    const arrayFields = ['idattachments', 'minuteOfMeeting', 'attachments'];
    arrayFields.forEach(field => {
      if (processedData[field] === null || processedData[field] === undefined) {
        processedData[field] = [];
      } else if (!Array.isArray(processedData[field])) {
        // If it's not an array, convert to array or empty array
        processedData[field] = [];
      }
    });

    // Check if patentability analysis already exists for this asset
    const existingAnalysis = await prisma.patentabilityAnalysis.findFirst({
      where: { asset_id }
    });

    let result;
    if (existingAnalysis) {
      // Update existing record
      result = await prisma.patentabilityAnalysis.update({
        where: { id: existingAnalysis.id },
        data: {
          ...processedData,
          updated_at: new Date()
        }
      });
    } else {
      // Create new record
      result = await prisma.patentabilityAnalysis.create({
        data: {
          ...processedData,
          created_at: new Date(),
          updated_at: new Date(),
          invention: {
            connect: {
              asset_id: asset_id
            }
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: existingAnalysis ? 'Patentability analysis updated successfully' : 'Patentability analysis created successfully',
      data: result
    });

  } catch (error) {
    console.error('Patentability analysis save error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to save patentability analysis data'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
