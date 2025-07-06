import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const payload = await req.json(); // read body from POST request
        // 🧠 Fetch latest asset_id and generate a new one
    const lastEntry = await prisma.Invention.findFirst({
        orderBy: { created_at: 'desc' },
        select: { asset_id: true },
    });

    let newAssetId = 'A0001';
    if (lastEntry?.asset_id) {
        const lastNumber = parseInt(lastEntry.asset_id.slice(1)) || 0;
        const nextNumber = (lastNumber + 1).toString().padStart(4, '0');
        newAssetId = `A${nextNumber}`;
    }

    // Map payload to Prisma-compatible field names
    const data = {
      asset_id: newAssetId,
      inventiontitle: payload.inventiontitle,
      commonname: payload.commonName,
      inventors:payload.inventors,
      inventordetails: payload.inventorDetails,
      incrementalrenovation: payload.incrementalRenovation,
      patentnumbers: payload.patentNumbers,
      journalnumbers: payload.journalNumbers,
      productidentity: payload.productIdentity,
      problemaddressed: payload.problemAddressed,
      trainrun: payload.trainRun,
      experimentresults: payload.experimentResults,
      evidence: payload.evidence,
      minuteofmeeting: payload.minuteOfMeeting,
      attachments: payload.attachments,
      iprecognizer: payload.ipRecognizer,
      hoursspent: payload.hoursSpent,
      agencyrecognizer: payload.agencyRecognizer,
      agencycost: payload.agencyCost,
      revieweffort: payload.reviewEffort,
      managerempid: payload.managerEmpId,
      entity: payload.entity,
      date: payload.date ? new Date(payload.date) : new Date(), // Convert string to Date object
      inventioncountry: payload.inventionCountry,
      creationcountry: payload.creationCountry,
      collaboration: payload.collaboration,
      collaboratorname: payload.collaboratorName,
      collaboratorcountry: payload.collaboratorCountry,
      stakeholders: payload.stakeholders,
    };

    const result = await prisma.Invention.create({
      data,
    });

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (err) {
    console.error('❌ Error inserting invention:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
