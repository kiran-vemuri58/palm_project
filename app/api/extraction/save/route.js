import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  console.log('💾 Save Extraction API called');
  try {
    const data = await request.json();
    console.log('💾 Received extraction data:', data);
    
    // Validate required fields - only asset_id is required for extraction
    if (!data.asset_id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required field: asset_id' 
        },
        { status: 400 }
      );
    }

    // Check if extraction record already exists for this asset
    const existingExtraction = await prisma.extraction.findFirst({
      where: {
        asset_id: data.asset_id
      }
    });

    console.log('🔍 Existing extraction found:', !!existingExtraction);
    console.log('🔍 Asset ID:', data.asset_id);

    let result;

    if (existingExtraction) {
      // Update existing extraction
      console.log('🔄 Updating existing extraction...');
      result = await prisma.extraction.update({
        where: {
          id: existingExtraction.id
        },
        data: {
          // Extraction Details
          extractorOne: data.extractorOne,
          extractortwo: data.extractortwo,
          iEDate: data.iEDate,
          iawpl: data.iawpl,
          nfeature: data.nfeature,
          ifeature: data.ifeature,
          idattachments: data.idattachments || [],
          scountry: data.scountry,
          oextractor: data.oextractor,
          
          // NBA Updates
          updatenba: data.updatenba,
          
          // Effort Sheet Details
          iprecognizer: data.iprecognizer,
          hoursspent: data.hoursspent,
          agencyrecognizer: data.agencyrecognizer,
          agencycost: data.agencycost,
          revieweffort: data.revieweffort,
          managerempid: data.managerempid,
          extractionEffort: data.extractionEffort,
          
          // Activity Status
          activityStatus: data.activityStatus
        }
      });
    } else {
      // Create new extraction
      console.log('➕ Creating new extraction...');
      result = await prisma.extraction.create({
        data: {
          asset_id: data.asset_id,
          // Extraction Details
          extractorOne: data.extractorOne,
          extractortwo: data.extractortwo,
          iEDate: data.iEDate,
          iawpl: data.iawpl,
          nfeature: data.nfeature,
          ifeature: data.ifeature,
          idattachments: data.idattachments || [],
          scountry: data.scountry,
          oextractor: data.oextractor,
          
          // NBA Updates
          updatenba: data.updatenba,
          
          // Effort Sheet Details
          iprecognizer: data.iprecognizer,
          hoursspent: data.hoursspent,
          agencyrecognizer: data.agencyrecognizer,
          agencycost: data.agencycost,
          revieweffort: data.revieweffort,
          managerempid: data.managerempid,
          extractionEffort: data.extractionEffort,
          
          // Activity Status
          activityStatus: data.activityStatus
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: existingExtraction ? 'Extraction updated successfully' : 'Extraction created successfully',
      data: result 
    });

  } catch (error) {
    console.error('Error saving extraction:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to save extraction to database',
        details: error.message 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
