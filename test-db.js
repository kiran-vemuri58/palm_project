const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Check if we can connect
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Check what records exist in the invention table
    const inventions = await prisma.invention.findMany({
      select: {
        asset_id: true,
        inventiontitle: true,
        commonname: true,
        inventordetails: true
      }
    });
    
    console.log('📊 Found inventions:', inventions.length);
    console.log('📋 Asset IDs:', inventions.map(i => i.asset_id));
    
    // Check if A0007 exists
    const specificInvention = await prisma.invention.findUnique({
      where: { asset_id: 'A0007' }
    });
    
    console.log('🔍 A0007 exists:', !!specificInvention);
    if (specificInvention) {
      console.log('📄 A0007 data:', specificInvention);
    }
    
  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
