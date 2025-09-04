import { NextResponse } from 'next/server';
import { writeFile, mkdir, access } from 'fs/promises';
import path from 'path';
import { constants as fsConstants } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const assetId = formData.get('assetId');
    const componentName = formData.get('componentName');
    const field = formData.get('field');

    if (!file || !assetId || !componentName || !field) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const uploadFolder = path.join(
      process.cwd(),
      'public',
      'uploads',
      assetId,
      componentName,
      field
    );
    await mkdir(uploadFolder, { recursive: true });

    // ✅ Construct final filename
    const originalName = file.name;
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension);
    const now = new Date();
    const dateSuffix = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getFullYear()}`;
    const fileName = `${baseName}-${dateSuffix}${extension}`;

    const filePath = path.join(uploadFolder, fileName);

    // ✅ Check if file already exists
    try {
      await access(filePath, fsConstants.F_OK);
      // If no error, file exists – skip writing
      return NextResponse.json({
        success: false,
        error: 'File already exists',
        path: null,
      });
    } catch {
      // File does not exist – continue
    }

    // ✅ Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    const relativePath = `/uploads/${assetId}/${componentName}/${field}/${fileName}`;

    return NextResponse.json({
      success: true,
      path: relativePath,
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
