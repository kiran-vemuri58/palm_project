import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.asset_id || !data.inventiontitle || !data.commonname || !data.inventordetails) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: asset_id, inventiontitle, commonname, inventordetails' 
        },
        { status: 400 }
      );
    }

    // Check if asset already exists
    const existingInvention = await prisma.Invention.findUnique({
      where: {
        asset_id: data.asset_id
      }
    });


    let result;

    if (existingInvention) {
      // Update existing invention
      result = await prisma.Invention.update({
        where: {
          asset_id: data.asset_id
        },
        data: {
          inventiontitle: data.inventiontitle,
          commonname: data.commonname,
          inventordetails: data.inventordetails,
          rating: data.rating,
          entity: data.entity,
          date: data.date,
          inventioncountry: data.inventioncountry,
          creationcountry: data.creationcountry,
          collaboration: data.collaboration,
          collaboratorName: data.collaboratorName,
          collaboratorCountry: data.collaboratorCountry,
          stakeholders: data.stakeholders,
          entityJournalNumbers: data.entityJournalNumbers,
          entityProductIdentity: data.entityProductIdentity,
          agreementDocuments: data.agreementDocuments || [],
          incrementalrenovation: data.incrementalrenovation,
          patentnumbers: data.patentnumbers,
          journalnumbers: data.journalnumbers,
          productidentity: data.productidentity,
          problemaddressed: data.problemaddressed,
          trainrun: data.trainrun,
          experimentresults: data.experimentresults,
          evidence: data.evidence,
          minuteOfMeeting: data.minuteOfMeeting,
          attachments: data.attachments,
          iprecognizer: data.iprecognizer,
          hoursspent: data.hoursspent,
          agencyrecognizer: data.agencyrecognizer,
          agencycost: data.agencycost,
          revieweffort: data.revieweffort,
          managerempid: data.managerempid,
          extractionEffort: data.extractionEffort,
          activityStatus: data.activityStatus,
          inventors: data.inventors
        }
      });
    } else {
      // Create new invention
      result = await prisma.Invention.create({
        data: {
          asset_id: data.asset_id,
          inventiontitle: data.inventiontitle,
          commonname: data.commonname,
          inventordetails: data.inventordetails,
          rating: data.rating,
          entity: data.entity,
          date: data.date,
          inventioncountry: data.inventioncountry,
          creationcountry: data.creationcountry,
          collaboration: data.collaboration,
          collaboratorName: data.collaboratorName,
          collaboratorCountry: data.collaboratorCountry,
          stakeholders: data.stakeholders,
          entityJournalNumbers: data.entityJournalNumbers,
          entityProductIdentity: data.entityProductIdentity,
          agreementDocuments: data.agreementDocuments || [],
          incrementalrenovation: data.incrementalrenovation,
          patentnumbers: data.patentnumbers,
          journalnumbers: data.journalnumbers,
          productidentity: data.productidentity,
          problemaddressed: data.problemaddressed,
          trainrun: data.trainrun,
          experimentresults: data.experimentresults,
          evidence: data.evidence,
          minuteOfMeeting: data.minuteOfMeeting,
          attachments: data.attachments,
          iprecognizer: data.iprecognizer,
          hoursspent: data.hoursspent,
          agencyrecognizer: data.agencyrecognizer,
          agencycost: data.agencycost,
          revieweffort: data.revieweffort,
          managerempid: data.managerempid,
          extractionEffort: data.extractionEffort,
          activityStatus: data.activityStatus,
          inventors: data.inventors
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: existingInvention ? 'Invention updated successfully' : 'Invention created successfully',
      data: result 
    });

  } catch (error) {
    console.error('Error saving invention:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to save invention to database',
        details: error.message 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
