import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  console.log('🔍 Get Extraction API called');
  try {
    const { assetId } = params;
    console.log('🔍 Fetching extraction data for Asset ID:', assetId);
    
    if (!assetId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Asset ID is required' 
        },
        { status: 400 }
      );
    }

    // Fetch extraction data
    const extractionData = await prisma.extraction.findFirst({
      where: {
        asset_id: assetId
      }
    });

    console.log('🔍 Extraction data found:', !!extractionData);

    if (!extractionData) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No extraction data found for this asset' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: extractionData 
    });

  } catch (error) {
    console.error('Error fetching extraction data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch extraction data',
        details: error.message 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
