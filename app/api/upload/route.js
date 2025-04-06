import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const registerId = formData.get('registerId');

    if (!file || !registerId) {
      return NextResponse.json({ success: false, error: 'File or registerId missing' }, { status: 400 });
    }

    // Construct directory path
    const uploadFolder = path.join(process.cwd(), 'public', 'uploads', registerId);
    await mkdir(uploadFolder, { recursive: true }); // Create folder if it doesn't exist

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadFolder, fileName);

    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      path: `/uploads/${registerId}/${fileName}`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
