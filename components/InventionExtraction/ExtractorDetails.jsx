'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { getSafeFormValue } from '@/utils/formUtils';
import React from 'react';

const ExtractorDetails = ({formKey, updateFunction}) => {

  const formData = useFormStore((state) => state[formKey]);
  const updateFormDataByKey = useFormStore((state) => state[updateFunction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      updateFormDataByKey({ ...formData, [name]: value });
    } else {
      console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
    }
    } else {
      console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
    }
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      updateFormDataByKey({ [name]: files[0] || null });
    } else {
      console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
    }
    } else {
      console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
    } // Store only the first file or null
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      
      {/* First Row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="mb-1">Name of the Extractor 1</Label>
          <Input className="p-2" placeholder="Enter the name of Extractor 1" id="entity" name="extractorOne" value={getSafeFormValue(formData, 'extractorOne')} onChange={handleChange} />
        </div>
        
        <div>
          <Label className="mb-1">Name of the Extractor 2</Label>
          <Input className="p-2" placeholder="Enter the name of Extractor 2" id="inventionCountry" name="extractortwo" value={getSafeFormValue(formData, 'extractortwo')} onChange={handleChange} />
        </div>
        
        <div>
          <Label className="mb-1">Invention Extraction Date</Label>
          <Input className="p-2" placeholder="Select a date..." id="date" name="iEDate" type="date" value={getSafeFormValue(formData, 'iEDate')} onChange={handleChange} />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <Label className="mb-1">is Invention Accordance with Patent Laws?</Label>
          <Select className="w-full" value={getSafeFormValue(formData, 'iawpl')} onValueChange={(value) => {
              if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
                updateFormDataByKey({ ...formData, iawpl: value });
              } else {
                console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
              }
            }}>
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

      {formData?.iawpl === 'yes' && (
        <>
          {/* Third Row */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <Label className="mb-1">Novel Feature(Assumed)</Label>
              <Input className="p-2" placeholder="Enter Novel Feature" id="collaboratorName" name="nfeature" value={getSafeFormValue(formData, 'nfeature')} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-1">Inventive Feature (Assumed)</Label>
              <Input className="p-2" placeholder="Enter collaborator country..." id="collaboratorCountry" name="ifeature" value={getSafeFormValue(formData, 'ifeature')} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-1">Invention Detail Attachment</Label>
              <Input
                type="file"
                id="attachments"
                name="idattachments"
                className="grid w-full max-w-sm items-center gap-1.5"
                onChange={handleFileUpload}
              />
            </div>
          </div>
          
          {/* Fourth Row */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <Label className="mb-1">Specific Country</Label>
              <Input className="p-2" placeholder="Enter specific country..." id="scountry" name="scountry" value={getSafeFormValue(formData, 'scountry')} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-1">Opinion Of Extractor</Label>
              <Input className="p-2" placeholder="Enter Opinion Of Extractor" id="oextractor" name="oextractor" value={getSafeFormValue(formData, 'oextractor')} onChange={handleChange} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExtractorDetails;
