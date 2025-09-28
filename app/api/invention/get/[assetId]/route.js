import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { assetId } = params;
    
    console.log('🔍 Fetching invention data for Asset ID:', assetId);
    
    // Find the invention by asset_id
    const invention = await prisma.invention.findUnique({
      where: {
        asset_id: assetId
      }
    });

    if (!invention) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invention not found' 
        },
        { status: 404 }
      );
    }

    console.log('✅ Found invention data:', invention);

    return NextResponse.json({ 
      success: true, 
      data: invention 
    });

  } catch (error) {
    console.error('Error fetching invention:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch invention data',
        details: error.message 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
