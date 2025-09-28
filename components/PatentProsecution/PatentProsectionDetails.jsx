'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import FileInput from '@/components/ui/file-input';
import { Label } from '@/components/ui/label';
import { createPredefinedHandler } from '@/utils/conditionalFieldUtils';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

const PatentProsectionDetails = ({ formKey, updateFunction }) => {

  const formData = useFormStore((state) => state[formKey]);
  const updateFormData = useFormStore((state) => state[updateFunction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  // Use utility functions for conditional field handling
  const handlePatentPublishedChange = createPredefinedHandler(formData, updateFormData, 'patentPublished');
  const handleApopposedChange = createPredefinedHandler(formData, updateFormData, 'apopposed');

  const handleFileUpload = (e) => {
    const { name, value } = e.target; // array of File
    updateFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Patent Published? */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <Label className="mb-1">Patent Published?</Label>
          <Select
            value={formData?.patentPublished}
            onValueChange={handlePatentPublishedChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Conditional Publication Number */}
      {formData?.patentPublished === 'yes' && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <Label className="mb-1">Publication Number</Label>
            <Input
              className="p-2"
              placeholder="Enter Publication Number"
              name="publicationNumber"
              value={formData?.publicationNumber || ''}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      {/* Post Grant Opposed? */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <Label className="mb-1">Post Grant Opposed?</Label>
          <Select
            className="w-full"
            value={formData?.apopposed}
            onValueChange={handleApopposedChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Conditional Opposition Fields */}
      {formData?.apopposed === 'yes' && (
        <>
          {/* Opposer Name, Attachment, Citations */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <Label className="mb-1">Opposer Name</Label>
              <Input
                className="p-2"
                placeholder="Enter Opposer Name"
                name="oname"
                value={formData?.oname || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1">Opposer Attachment</Label>
              <FileInput
                name="attachments"
                multiple={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                value={formData?.attachments || []}
                onChange={handleFileUpload}
                maxFiles={10}
                maxFileSize={20 * 1024 * 1024}
              />
            </div>
            <div>
              <Label className="mb-1">Citations Filed by Opposer</Label>
              <Input
                className="p-2"
                placeholder="Enter Citations Filed by Opposer"
                name="cfbopposer"
                value={formData?.cfbopposer || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Opinion, Response, Attachment */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <Label className="mb-1">
                Brief Opinion About Opposition Findings
              </Label>
              <Input
                className="p-2"
                placeholder="Enter Opinion"
                name="boaof"
                value={formData?.boaof || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1">Response Filed for Opposition</Label>
              <Input
                className="p-2"
                placeholder="Enter Response"
                name="rffo"
                value={formData?.rffo || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1">Attachment</Label>
              <FileInput
                name="attachments"
                multiple={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                value={formData?.attachments || []}
                onChange={handleFileUpload}
                maxFiles={10}
                maxFileSize={20 * 1024 * 1024}
              />
            </div>
            <div>
              <Label className="mb-1">Opposition Response Prepared By</Label>
              <Input
                className="p-2"
                placeholder="Enter Employee ID"
                name="orpby"
                value={formData?.orpby || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1">
                External Agency (if prepared by them)
              </Label>
              <Input
                className="p-2"
                placeholder="Enter Agency Number"
                name="eagency"
                value={formData?.eagency || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1">Reviewed By</Label>
              <Input
                className="p-2"
                placeholder="Enter Employee ID"
                name="revby"
                value={formData?.revby || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1">
                Review Attachment (Versions of Response with Reviews)
              </Label>
              <FileInput
                name="attachments"
                multiple={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                value={formData?.attachments || []}
                onChange={handleFileUpload}
                maxFiles={10}
                maxFileSize={20 * 1024 * 1024}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PatentProsectionDetails;
