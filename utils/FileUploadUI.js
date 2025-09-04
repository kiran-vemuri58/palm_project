export async function uploadDocuments({ files, assetId, componentName, updateFormData }) {
  const uploadedPaths = {};

  for (const [field, fileList] of Object.entries(files)) {
    // Skip if no files or empty array
    if (!fileList || fileList.length === 0) {
      console.log(`No files to upload for ${field}`);
      continue;
    }

    const paths = [];

    for (const file of fileList) {
      // Validate file object
      if (!file || !file.name) {
        console.warn(`Invalid file object for ${field}:`, file);
        continue;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('assetId', assetId);
      formData.append('componentName', componentName);
      formData.append('field', field);

      try {
        console.log(`Uploading ${file.name} for ${field}...`);
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await res.json();

        if (result.success) {
          paths.push(result.path);
          console.log(`✅ Successfully uploaded ${file.name} to ${result.path}`);
        } else {
          console.error(`❌ Upload failed for ${file.name} in ${field}:`, result.error);
        }
      } catch (err) {
        console.error(`❌ Error uploading ${file.name} in ${field}:`, err);
      }
    }

    if (paths.length > 0) {
      // ✅ Save to a different path field like evidencePaths
      const pathField = `${field}Paths`;
      uploadedPaths[pathField] = paths;

      if (updateFormData) {
        updateFormData({ [pathField]: paths });
      }
    }
  }

  console.log('📁 Final uploaded paths:', uploadedPaths);
  return uploadedPaths;
}
