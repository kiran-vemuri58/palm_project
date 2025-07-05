'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

const PatentProsectionDetails = () => {
  const { formData, updateFormData } = useFormStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    updateFormData({ ...formData, [name]: files[0] || null });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Patent Published? */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <Label className="mb-1">Patent Published?</Label>
          <Select
            value={formData.patentPublished}
            onValueChange={(value) =>
              updateFormData({ ...formData, patentPublished: value })
            }
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
      {formData.patentPublished === 'yes' && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <Label className="mb-1">Publication Number</Label>
            <Input
              className="p-2"
              placeholder="Enter Publication Number"
              name="publicationNumber"
              value={formData.publicationNumber || ''}
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
            value={formData.apopposed}
            onValueChange={(value) =>
              updateFormData({ ...formData, apopposed: value })
            }
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
      {formData.apopposed === 'yes' && (
        <>
          {/* Opposer Name, Attachment, Citations */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <Label className="mb-1">Opposer Name</Label>
              <Input
                className="p-2"
                placeholder="Enter Opposer Name"
                name="oname"
                value={formData.oname || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1">Opposer Attachment</Label>
              <Input
                type="file"
                name="attachments"
                className="grid w-full max-w-sm items-center gap-1.5"
                onChange={handleFileUpload}
              />
            </div>
            <div>
              <Label className="mb-1">Citations Filed by Opposer</Label>
              <Input
                className="p-2"
                placeholder="Enter Citations Filed by Opposer"
                name="cfbopposer"
                value={formData.cfbopposer || ''}
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
                value={formData.boaof || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1">Response Filed for Opposition</Label>
              <Input
                className="p-2"
                placeholder="Enter Response"
                name="rffo"
                value={formData.rffo || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1">Attachment</Label>
              <Input
                type="file"
                name="attachments"
                className="grid w-full max-w-sm items-center gap-1.5"
                onChange={handleFileUpload}
              />
            </div>
            <div>
              <Label className="mb-1">Opposition Response Prepared By</Label>
              <Input
                className="p-2"
                placeholder="Enter Employee ID"
                name="orpby"
                value={formData.orpby || ''}
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
                value={formData.eagency || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1">Reviewed By</Label>
              <Input
                className="p-2"
                placeholder="Enter Employee ID"
                name="revby"
                value={formData.revby || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1">
                Review Attachment (Versions of Response with Reviews)
              </Label>
              <Input
                type="file"
                name="attachments"
                className="grid w-full max-w-sm items-center gap-1.5"
                onChange={handleFileUpload}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PatentProsectionDetails;
