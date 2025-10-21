import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const assetId = searchParams.get('assetId');
    
    await prisma.$connect();
    console.log('✅ Database connection successful');

    if (assetId) {
      const data = await prisma.PatentCommercialisation.findFirst({
        where: { asset_id: assetId },
      });

      if (!data) {
        return NextResponse.json({ 
          success: false, 
          message: 'Patent Commercialisation not found' 
        }, { status: 404 });
      }

      return NextResponse.json({ 
        success: true, 
        data 
      });
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Asset ID is required' 
    }, { status: 400 });
  } catch (error) {
    console.error('❌ GET request error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req) {
  try {
    console.log('🔄 POST /api/pc called',req.json);
    const payload = await req.json(); // read body from POST request
    //     // 🧠 Fetch latest asset_id and generate a new one
    // const lastEntry = await prisma.Invention.findFirst({
    //     orderBy: { created_at: 'desc' },
    //     select: { asset_id: true },
    // });

    // let newAssetId = 'A0001';
    // if (lastEntry?.asset_id) {
    //     const lastNumber = parseInt(lastEntry.asset_id.slice(1)) || 0;
    //     const nextNumber = (lastNumber + 1).toString().padStart(4, '0');
    //     newAssetId = `A${nextNumber}`;
    // }

    console.log('📦 PC payload received:', JSON.stringify(payload, null, 2));

    // Map payload to Prisma-compatible field names and ensure array fields are arrays
    const data = {
      asset_id: payload.asset_id,
      
      // PC Invention Details fields (pcInventionDetails prefix)
      pcInventionDetailsTitle: payload.pcInventionDetailsTitle || '',
      pcInventionDetailsCommonName: payload.pcInventionDetailsCommonName || '',
      pcInventionDetailsInventorDetails: payload.pcInventionDetailsInventorDetails || '',
      pcInventionDetailsEntity: payload.pcInventionDetailsEntity || '',
      pcInventionDetailsDate: payload.pcInventionDetailsDate || '',
      pcInventionDetailsCountry: payload.pcInventionDetailsCountry || '',
      pcInventionDetailsCreationCountry: payload.pcInventionDetailsCreationCountry || '',
      pcInventionDetailsCollaboration: payload.pcInventionDetailsCollaboration || '',
      pcInventionDetailsCollaboratorName: payload.pcInventionDetailsCollaboratorName || '',
      pcInventionDetailsCollaboratorCountry: payload.pcInventionDetailsCollaboratorCountry || '',
      pcInventionDetailsStakeholders: payload.pcInventionDetailsStakeholders || '',
      
      // PC Patent Commercialization Child fields (pcPatentCommercializationChild prefix)
      pcPatentCommercializationChildStage: payload.pcPatentCommercializationChildStage || '',
      pcPatentCommercializationChildWorkingFiled: payload.pcPatentCommercializationChildWorkingFiled || '',
      pcPatentCommercializationChildImplementationFile: Array.isArray(payload.pcPatentCommercializationChildImplementationFile) ? payload.pcPatentCommercializationChildImplementationFile.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      pcPatentCommercializationChildFirstWorkingDate: payload.pcPatentCommercializationChildFirstWorkingDate || '',
      pcPatentCommercializationChildCommercializationStatus: payload.pcPatentCommercializationChildCommercializationStatus || '',
      pcPatentCommercializationChildRevenueGenerated: payload.pcPatentCommercializationChildRevenueGenerated || '',
      pcPatentCommercializationChildMarketValue: payload.pcPatentCommercializationChildMarketValue || '',
      pcPatentCommercializationChildLicensingFee: payload.pcPatentCommercializationChildLicensingFee || '',
      pcPatentCommercializationChildRoyaltyRate: payload.pcPatentCommercializationChildRoyaltyRate || '',
      pcPatentCommercializationChildPartnerName: payload.pcPatentCommercializationChildPartnerName || '',
      pcPatentCommercializationChildPartnershipType: payload.pcPatentCommercializationChildPartnershipType || '',
      pcPatentCommercializationChildPartnershipDetails: payload.pcPatentCommercializationChildPartnershipDetails || '',
      pcPatentCommercializationChildStartDate: payload.pcPatentCommercializationChildStartDate || '',
      pcPatentCommercializationChildExpectedCompletionDate: payload.pcPatentCommercializationChildExpectedCompletionDate || '',
      pcPatentCommercializationChildActualCompletionDate: payload.pcPatentCommercializationChildActualCompletionDate || '',
      
      // PC PAN fields (pcPAN prefix)
      pcPANPatentApplicationNumber: payload.pcPANPatentApplicationNumber || '',
      pcPANPatentNumber: payload.pcPANPatentNumber || '',
      
      // PC Patent Commercialization Efforts fields (pcPatentCommercializationEfforts prefix)
      pcPatentCommercializationEffortsSalesFile: Array.isArray(payload.pcPatentCommercializationEffortsSalesFile) ? payload.pcPatentCommercializationEffortsSalesFile.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      pcPatentCommercializationEffortsPeriodicSales: payload.pcPatentCommercializationEffortsPeriodicSales || '',
      pcPatentCommercializationEffortsInvoiceFile: Array.isArray(payload.pcPatentCommercializationEffortsInvoiceFile) ? payload.pcPatentCommercializationEffortsInvoiceFile.filter(item => typeof item === 'string' && item.trim() !== '') : [],
      pcPatentCommercializationEffortsCommercializationDate: payload.pcPatentCommercializationEffortsCommercializationDate || '',
      pcPatentCommercializationEffortsProductId: payload.pcPatentCommercializationEffortsProductId || '',
      pcPatentCommercializationEffortsIsLicensed: payload.pcPatentCommercializationEffortsIsLicensed || '',
      pcPatentCommercializationEffortsIsCrossLicensed: payload.pcPatentCommercializationEffortsIsCrossLicensed || '',
      pcPatentCommercializationEffortsIsCompulsoryLicenseFiled: payload.pcPatentCommercializationEffortsIsCompulsoryLicenseFiled || '',
      
      // PC Activity Status fields (pcActivityStatus prefix)
      pcActivityStatusStatus: payload.pcActivityStatusStatus || '',
      pcActivityStatusDescription: payload.pcActivityStatusDescription || '',
      pcActivityStatusLastUpdated: payload.pcActivityStatusLastUpdated || ''
    };

    console.log('📊 Data being sent to Prisma:', JSON.stringify(data, null, 2));
    
    // Check if record exists, then create or update
    const existingRecord = await prisma.PatentCommercialisation.findFirst({
      where: { asset_id: payload.asset_id }
    });

    let result;
    if (existingRecord) {
      // Update existing record
      result = await prisma.PatentCommercialisation.update({
        where: { id: existingRecord.id },
        data: {
          // PC Invention Details fields (pcInventionDetails prefix)
          pcInventionDetailsTitle: data.pcInventionDetailsTitle,
          pcInventionDetailsCommonName: data.pcInventionDetailsCommonName,
          pcInventionDetailsInventorDetails: data.pcInventionDetailsInventorDetails,
          pcInventionDetailsEntity: data.pcInventionDetailsEntity,
          pcInventionDetailsDate: data.pcInventionDetailsDate,
          pcInventionDetailsCountry: data.pcInventionDetailsCountry,
          pcInventionDetailsCreationCountry: data.pcInventionDetailsCreationCountry,
          pcInventionDetailsCollaboration: data.pcInventionDetailsCollaboration,
          pcInventionDetailsCollaboratorName: data.pcInventionDetailsCollaboratorName,
          pcInventionDetailsCollaboratorCountry: data.pcInventionDetailsCollaboratorCountry,
          pcInventionDetailsStakeholders: data.pcInventionDetailsStakeholders,
          
          // PC Patent Commercialization Child fields (pcPatentCommercializationChild prefix)
          pcPatentCommercializationChildStage: data.pcPatentCommercializationChildStage,
          pcPatentCommercializationChildWorkingFiled: data.pcPatentCommercializationChildWorkingFiled,
          pcPatentCommercializationChildImplementationFile: data.pcPatentCommercializationChildImplementationFile,
          pcPatentCommercializationChildFirstWorkingDate: data.pcPatentCommercializationChildFirstWorkingDate,
          pcPatentCommercializationChildCommercializationStatus: data.pcPatentCommercializationChildCommercializationStatus,
          pcPatentCommercializationChildRevenueGenerated: data.pcPatentCommercializationChildRevenueGenerated,
          pcPatentCommercializationChildMarketValue: data.pcPatentCommercializationChildMarketValue,
          pcPatentCommercializationChildLicensingFee: data.pcPatentCommercializationChildLicensingFee,
          pcPatentCommercializationChildRoyaltyRate: data.pcPatentCommercializationChildRoyaltyRate,
          pcPatentCommercializationChildPartnerName: data.pcPatentCommercializationChildPartnerName,
          pcPatentCommercializationChildPartnershipType: data.pcPatentCommercializationChildPartnershipType,
          pcPatentCommercializationChildPartnershipDetails: data.pcPatentCommercializationChildPartnershipDetails,
          pcPatentCommercializationChildStartDate: data.pcPatentCommercializationChildStartDate,
          pcPatentCommercializationChildExpectedCompletionDate: data.pcPatentCommercializationChildExpectedCompletionDate,
          pcPatentCommercializationChildActualCompletionDate: data.pcPatentCommercializationChildActualCompletionDate,
          
          // PC PAN fields (pcPAN prefix)
          pcPANPatentApplicationNumber: data.pcPANPatentApplicationNumber,
          pcPANPatentNumber: data.pcPANPatentNumber,
          
          // PC Patent Commercialization Efforts fields (pcPatentCommercializationEfforts prefix)
          pcPatentCommercializationEffortsSalesFile: data.pcPatentCommercializationEffortsSalesFile,
          pcPatentCommercializationEffortsPeriodicSales: data.pcPatentCommercializationEffortsPeriodicSales,
          pcPatentCommercializationEffortsInvoiceFile: data.pcPatentCommercializationEffortsInvoiceFile,
          pcPatentCommercializationEffortsCommercializationDate: data.pcPatentCommercializationEffortsCommercializationDate,
          pcPatentCommercializationEffortsProductId: data.pcPatentCommercializationEffortsProductId,
          pcPatentCommercializationEffortsIsLicensed: data.pcPatentCommercializationEffortsIsLicensed,
          pcPatentCommercializationEffortsIsCrossLicensed: data.pcPatentCommercializationEffortsIsCrossLicensed,
          pcPatentCommercializationEffortsIsCompulsoryLicenseFiled: data.pcPatentCommercializationEffortsIsCompulsoryLicenseFiled,
          
          // PC Activity Status fields (pcActivityStatus prefix)
          pcActivityStatusStatus: data.pcActivityStatusStatus,
          pcActivityStatusDescription: data.pcActivityStatusDescription,
          pcActivityStatusLastUpdated: data.pcActivityStatusLastUpdated
        },
      });
    } else {
      // Create new record
      result = await prisma.PatentCommercialisation.create({
        data,
      });
    }

    console.log('✅ PatentCommercialisation upserted successfully:', result);
    return NextResponse.json({ 
      success: true, 
      data: result,
      message: result.createdAt === result.updatedAt ? 'Patent Commercialisation created successfully' : 'Patent Commercialisation updated successfully'
    }, { status: 200 });
  } catch (err) {
    console.error('❌ Error inserting PatentCommercialisation:', err);
    console.error('❌ Error stack:', err.stack);
    console.error('❌ Error details:', {
      message: err.message,
      code: err.code,
      meta: err.meta
    });
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
