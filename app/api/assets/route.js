import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('📋 Fetching all assets...');
    
    // Get all inventions (which have asset IDs)
    const inventions = await prisma.invention.findMany({
      select: {
        asset_id: true,
        inventiontitle: true,
        commonname: true,
        created_at: true,
        updated_at: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    console.log(`✅ Found ${inventions.length} assets`);

    return NextResponse.json({
      success: true,
      data: inventions,
      count: inventions.length
    });

  } catch (error) {
    console.error('Error fetching assets:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch assets',
        details: error.message 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
