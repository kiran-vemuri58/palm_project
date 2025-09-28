// File upload utilities for V2 components
// Note: File storage implementation pending - currently files are stored in component state only

export const saveFilesToDocuments = async (files, assetNumber, pageName, folderType) => {
  try {
    if (!files || files.length === 0) {
      return [];
    }

    // TODO: Implement proper file storage (AWS S3, database, etc.)
    // For now, just return file metadata for form storage
    const fileMetadata = files.map(file => ({
      originalName: file.name,
      fileSize: file.size,
      fileType: file.type,
      lastModified: file.lastModified,
      // Note: Actual file content not stored yet
      status: 'pending_upload'
    }));

    console.log('Files prepared for upload:', fileMetadata);
    
    return fileMetadata;
  } catch (error) {
    console.error('Error preparing files:', error);
    throw new Error(`Failed to prepare files: ${error.message}`);
  }
};

export const validateFileTypes = (files, allowedTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx']) => {
  const invalidFiles = [];
  
  for (const file of files) {
    const extension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedTypes.includes(extension)) {
      invalidFiles.push({
        name: file.name,
        type: extension
      });
    }
  }
  
  return invalidFiles;
};

export const validateFileSize = (files, maxSizeMB = 20) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const oversizedFiles = [];
  
  for (const file of files) {
    if (file.size > maxSizeBytes) {
      oversizedFiles.push({
        name: file.name,
        size: file.size,
        maxSize: maxSizeBytes
      });
    }
  }
  
  return oversizedFiles;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Note: File deletion will be handled by the chosen storage solution (AWS S3, database, etc.)
