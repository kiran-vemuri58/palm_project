import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
  try {
    const { assetId } = params;
    
    console.log(`🗑️ Deleting asset: ${assetId}`);
    
    // Delete the invention (this will cascade delete extraction due to foreign key)
    const deletedInvention = await prisma.invention.delete({
      where: {
        asset_id: assetId
      }
    });

    console.log(`✅ Asset ${assetId} deleted successfully`);

    return NextResponse.json({
      success: true,
      message: `Asset ${assetId} deleted successfully`,
      data: deletedInvention
    });

  } catch (error) {
    console.error('Error deleting asset:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete asset',
        details: error.message 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
