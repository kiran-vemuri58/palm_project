// /app/api/invention/latest-id/route.ts (or .js if using JS)
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
const latest = await prisma.invention.findFirst({
      orderBy: { created_at: 'desc' },
      select: { asset_id: true },
    });

    if (!latest?.asset_id) {
      return NextResponse.json(
        { success: false, message: 'No asset ID found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, assetId: latest.asset_id });
  } catch (err) {
    console.error('Error fetching latest asset ID:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
