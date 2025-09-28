import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { validateSession } from '@/lib/secureAuth';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { assetId } = params;

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

    if (!assetId) {
      return NextResponse.json({
        success: false,
        error: 'Asset ID is required'
      }, { status: 400 });
    }

    // Get patentability analysis data
    const patentabilityData = await prisma.patentabilityAnalysis.findFirst({
      where: { asset_id: assetId }
    });

    if (!patentabilityData) {
      return NextResponse.json({
        success: false,
        error: 'Patentability analysis not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: patentabilityData
    });

  } catch (error) {
    console.error('Patentability analysis get error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch patentability analysis data'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
