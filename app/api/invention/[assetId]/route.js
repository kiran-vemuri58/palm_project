import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { assetId } = params;

    // Get invention with ALL related data
    const invention = await prisma.invention.findUnique({
      where: { asset_id: assetId },
      include: {
        extractions: true,
        patentabilities: true,
        PatentSpecificInformation: true,
        PatentFiling: true,
        PostGrantOpposition: true,
        PatentProsecution: true,
        PatentManagement: true,
        patentCommercialisation: true
      }
    });

    if (!invention) {
      return NextResponse.json(
        { success: false, error: 'Invention not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: invention
    });

  } catch (error) {
    console.error('Error fetching invention:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { assetId } = params;

    // Delete invention (this will cascade delete ALL related records)
    await prisma.invention.delete({
      where: { asset_id: assetId }
    });

    return NextResponse.json({
      success: true,
      message: 'Invention and all related data deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting invention:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
