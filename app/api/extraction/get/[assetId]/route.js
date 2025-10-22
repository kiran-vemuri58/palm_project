import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { assetId } = params;
    
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
