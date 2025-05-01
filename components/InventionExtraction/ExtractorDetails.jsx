'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import React from 'react';

const ExtractorDetails = () => {
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
      
      {/* First Row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="mb-1">Name of the Extractor 1</Label>
          <Input className="p-2" placeholder="Enter the name of Extractor 1" id="entity" name="entity" value={formData.entity} onChange={handleChange} />
        </div>
        
        <div>
          <Label className="mb-1">Name of the Extractor 2</Label>
          <Input className="p-2" placeholder="Enter the name of Extractor 2" id="inventionCountry" name="inventionCountry" value={formData.inventionCountry} onChange={handleChange} />
        </div>
        
        <div>
          <Label className="mb-1">Invention Extraction Date</Label>
          <Input className="p-2" placeholder="Select a date..." id="date" name="date" type="date" value={formData.date} onChange={handleChange} />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <Label className="mb-1">is Invention Accordance with Patent Laws?</Label>
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
              <Label className="mb-1">Novel Feature(Assumed)</Label>
              <Input className="p-2" placeholder="Enter Novel Feature" id="collaboratorName" name="collaboratorName" value={formData.collaboratorName} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-1">Inventive Feature (Assumed)</Label>
              <Input className="p-2" placeholder="Enter collaborator country..." id="collaboratorCountry" name="collaboratorCountry" value={formData.collaboratorCountry} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-1">Invention Detail Attachment</Label>
              <Input
                type="file"
                id="attachments"
                name="attachments"
                className="grid w-full max-w-sm items-center gap-1.5"
                onChange={handleFileUpload}
              />
            </div>
          </div>
          
          {/* Fourth Row */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <Label className="mb-1">Specific Country</Label>
              <Input className="p-2" placeholder="Enter journal numbers..." id="journalNumbers" name="journalNumbers" value={formData.journalNumbers} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-1">Opinion Of Extractor</Label>
              <Input className="p-2" placeholder="Enter Opinion Of Extractor" id="productIdentity" name="productIdentity" value={formData.productIdentity} onChange={handleChange} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExtractorDetails;
