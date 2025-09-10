import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const assetId = searchParams.get('assetId');

    if (!assetId) {
      return NextResponse.json(
        { success: false, error: 'Asset ID is required' },
        { status: 400 }
      );
    }

    console.log(`🗑️ Starting deletion process for assetId: ${assetId}`);

    try {
      // Since all tables have onDelete: Cascade, we only need to delete from the main Invention table
      // The database will automatically cascade delete from all related tables
      const invResult = await prisma.invention.deleteMany({
        where: { asset_id: assetId }
      });

      console.log(`✅ Successfully deleted assetId: ${assetId} from all tables via cascade delete`);
      console.log('Deletion result:', { table: 'Invention', deleted: invResult.count });

      return NextResponse.json({
        success: true,
        message: `Asset ${assetId} deleted successfully from all tables (cascade delete)`,
        deletedCount: invResult.count
      });

    } catch (dbError) {
      console.error('❌ Database deletion error:', dbError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to delete asset from database',
          details: dbError.message 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Delete asset error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
