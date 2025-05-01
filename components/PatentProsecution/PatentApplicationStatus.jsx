'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import React from 'react';

const PatentApplicationStatus = () => {
  const { formData, updateFormData } = useFormStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    updateFormData({ [name]: files[0] || null }); // Store only the first file or null
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
       

      {/* Second Row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <Label className="mb-1">Patent Status</Label>
          <Select className="w-full" onValueChange={(value) => updateFormData({ ...formData, collaboration: value })}>
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

      {formData.collaboration === 'yes' && (
        <>
          {/* Third Row */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <Label className="mb-1">Patent Number</Label>
              <Input className="p-2" placeholder="Enter Patent Number" id="collaboratorName" name="collaboratorName" value={formData.collaboratorName} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-1">Patent Attachment</Label>
              <Input
                type="file"
                id="attachments"
                name="attachments"
                className="grid w-full max-w-sm items-center gap-1.5"
                onChange={handleFileUpload}
              />
            </div>
            <div>
          <Label className="mb-1">Patent Grant Date</Label>
          <Input className="p-2" placeholder="Select a date..." id="date" name="date" type="date" value={formData.date} onChange={handleChange} />
           </div>
            
            <div>
              <Label className="mb-1">Why Patent is Rejected</Label>
              <Input
                type="file"
                id="attachments"
                name="attachments"
                className="grid w-full max-w-sm items-center gap-1.5"
                onChange={handleFileUpload}
              />
            </div>
            
          </div>
        </>
      )}
     {formData.collaboration === 'no' && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
          <Label className="mb-1">Patent Grant Date</Label>
          <Input className="p-2" placeholder="Select a date..." id="date" name="date" type="date" value={formData.date} onChange={handleChange} />
        </div>
        <div>
        <Label className="mb-1">Why Patent is Rejected</Label>
        <Input
          type="file"
          id="attachments"
          name="attachments"
          className="grid w-full max-w-sm items-center gap-1.5"
          onChange={handleFileUpload}
        />
      </div>
      </div>
      )}

    </div>
    
  );
};

export default PatentApplicationStatus;
