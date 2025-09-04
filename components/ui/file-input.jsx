'use client';

import React, { useState, useRef } from 'react';
import { Button } from './button';
import { Label } from './label';
import { X, Upload, File, Plus } from 'lucide-react';

const FileInput = ({ 
  label, 
  name, 
  multiple = true, 
  accept, 
  value = [], 
  onChange, 
  className = '',
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 10 // Maximum number of files
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const validateFile = (file) => {
    // Check file size
    if (file.size > maxFileSize) {
      return `File ${file.name} is too large. Maximum size is ${(maxFileSize / 1024 / 1024).toFixed(1)}MB`;
    }

    // Check file type if accept is specified
    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      const fileType = file.type;
      
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension === type.toLowerCase();
        } else if (type.includes('/*')) {
          return fileType.startsWith(type.replace('/*', ''));
        } else {
          return fileType === type;
        }
      });
      
      if (!isAccepted) {
        return `File ${file.name} is not an accepted file type. Accepted: ${accept}`;
      }
    }

    return null;
  };

  const addFiles = (newFiles) => {
    setError(''); // Clear previous errors
    
    // Check if adding these files would exceed maxFiles
    if (multiple && value.length + newFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed. You can add ${maxFiles - value.length} more files.`);
      return;
    }

    const validFiles = [];
    const errors = [];

    for (const file of newFiles) {
      const validationError = validateFile(file);
      if (validationError) {
        errors.push(validationError);
      } else {
        validFiles.push(file);
      }
    }

    if (errors.length > 0) {
      setError(errors.join('\n'));
    }

    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...value, ...validFiles] : validFiles;
      onChange({ target: { name, value: updatedFiles } });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      addFiles(newFiles);
    }
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    addFiles(files);
  };

  const removeFile = (indexToRemove) => {
    const updatedFiles = value.filter((_, index) => index !== indexToRemove);
    onChange({ target: { name, value: updatedFiles } });
    setError(''); // Clear errors when removing files
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && <Label className="text-sm font-medium text-gray-700">{label}</Label>}
      
      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        name={name}
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {/* Simple Upload Button */}
      <div className="flex items-center space-x-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={openFileDialog}
          className="flex items-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Files</span>
        </Button>
        
        <span className="text-xs text-gray-500">
          {multiple ? `Max ${maxFiles} files` : 'Single file'} • {(maxFileSize / 1024 / 1024).toFixed(1)}MB each
        </span>
      </div>

      {/* Drag & Drop Hint */}
      <div className="text-xs text-gray-400 text-center">
        Or drag and drop files here
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
          {error}
        </div>
      )}

      {/* File List - Compact */}
      {value && value.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Selected Files ({value.length}/{maxFiles})
            </span>
            {value.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onChange({ target: { name, value: [] } })}
                className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                Clear All
              </Button>
            )}
          </div>
          
          <div className="space-y-1">
            {value.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-2 bg-gray-50 rounded border text-sm"
              >
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <File className="h-3 w-3 text-gray-400 flex-shrink-0" />
                  <span className="truncate text-gray-700">{file.name}</span>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-6 w-6 p-0 text-red-400 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drag & Drop Overlay */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-200 ${
          dragActive ? 'opacity-100' : 'opacity-0'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 bg-blue-500 bg-opacity-10 border-4 border-dashed border-blue-400 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Upload className="mx-auto h-12 w-12 text-blue-500 mb-2" />
            <p className="text-lg font-medium text-gray-900">Drop files here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileInput;
