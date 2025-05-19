'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import ActivityStatus from '../InventionRecognition/ActivityStatus';

const Provisional = () => {
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
          <Label className="mb-1">Name of Drafter</Label>
          <Input
            className="p-2"
            placeholder="Enter Name of Drafter"
            id="ipRecognizer"
            name="nodrafter"
            value={formData.nodrafter}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">Name Of Reviewer</Label>
          <Input
            className="p-2"
            placeholder="Enter Employee ID"
            id="ipRecognizer"
            name="noreviewer"
            value={formData.noreviewer}
            onChange={handleChange}
          />
        </div>
        <div>
              <Label className="mb-1">Attachment For All Versions</Label>
              <Input
                type="file"
                id="attachments"
                name="attachments"
                className="grid w-full max-w-sm items-center gap-1.5"
                onChange={handleFileUpload}
              />
            </div>
      </div>
      <div>
      {/* Second Row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <Label className="mb-1">Broadest Novel Element Described</Label>
          <Input
            className="p-2"
            placeholder="Broadest Novel Element Described"
            id="ipRecognizer"
            name="bned"
            value={formData.bned}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">Inventive Feature Described</Label>
          <Input
            className="p-2"
            placeholder="Inventive Feature Described"
            id="ipRecognizer"
            name="ifdescribed"
            value={formData.ifdescribed}
            onChange={handleChange}
          />
        </div>
        <div>
        <Label className="mb-1">Title of invention</Label>
          <Input
            className="p-2"
            placeholder="Enter Title of invention"
            id="ipRecognizer"
            name="toinvention"
            value={formData.toinvention}
            onChange={handleChange}
          />
            </div>
      </div>
      </div>
      
      {/* third Row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <Label className="mb-1">Efforts spent for drafting</Label>
          <Input
            className="p-2"
            placeholder="Enter Efforts spent for drafting"
            id="ipRecognizer"
            name="esfd"
            value={formData.esfd}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">Patent Drafter (Employee ID)</Label>
          <Input
            className="p-2"
            placeholder="Enter Patent Drafter"
            id="ipRecognizer"
            name="pdrafter"
            value={formData.pdrafter}
            onChange={handleChange}
          />
        </div>
        <div>
        <Label className="mb-1">Number of hours spent</Label>
          <Input
            className="p-2"
            placeholder="Enter Number of hours spent"
            id="ipRecognizer"
            name="nohspent"
            value={formData.nohspent}
            onChange={handleChange}
          />
            </div>
      </div>
      
      {/* fourth Row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <Label className="mb-1">External Agency for drafting</Label>
          <Input
            className="p-2"
            placeholder="External Agency for drafting"
            id="ipRecognizer"
            name="eafd"
            value={formData.eafd}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="mb-1">Cost spent on Agency</Label>
          <Input
            className="p-2"
            placeholder="Enter Agency cost"
            id="ipRecognizer"
            name="csoagency"
            value={formData.csoagency}
            onChange={handleChange}
          />
        </div>
        <div>
        <Label className="mb-1">Efforts in Hours for review</Label>
          <Input
            className="p-2"
            placeholder="Enter Efforts in Hours for review"
            id="ipRecognizer"
            name="eihfr"
            value={formData.eihfr}
            onChange={handleChange}
          />
            </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <Label className="mb-1">Manager Responsible (Employee ID)</Label>
          <Input
            className="p-2"
            placeholder="EnterManager Responsible (Employee ID)"
            id="ipRecognizer"
            name="mres"
            value={formData.mres}
            onChange={handleChange}
          />
            </div>
            </div>
            <div>
          
           </div>
            


      
    </div>
  );
};

export default Provisional;
