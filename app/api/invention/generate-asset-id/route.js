import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  console.log('🆔 Generate Asset ID API called');
  try {
    // Get the latest invention record
    const latestInvention = await prisma.invention.findFirst({
      orderBy: {
        asset_id: 'desc'
      },
      select: {
        asset_id: true
      }
    });

    let nextAssetId;

    if (!latestInvention) {
      // Database is empty, start with A0001
      nextAssetId = 'A0001';
    } else {
      // Extract the number from the latest asset_id
      const latestNumber = parseInt(latestInvention.asset_id.substring(1));
      const nextNumber = latestNumber + 1;
      
      // Format as A000X (4 digits with leading zeros)
      nextAssetId = `A${nextNumber.toString().padStart(4, '0')}`;
    }

    return NextResponse.json({ 
      success: true, 
      assetId: nextAssetId 
    });

  } catch (error) {
    console.error('Error generating asset ID:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate asset ID' 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
