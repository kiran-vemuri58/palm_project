'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import React from 'react';

const EntityDetails = () => {
  const { formData, updateFormData } = useFormStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Entity Details</h2>
      
      {/* First Row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="mb-1">Entity</Label>
          <Input className="p-2" placeholder="Enter entity name..." id="entity" name="entity" value={formData.entity} onChange={handleChange} />
        </div>
        <div>
          <Label className="mb-1">Date</Label>
          <Input className="p-2" placeholder="Select a date..." id="date" name="date" type="date" value={formData.date} onChange={handleChange} />
        </div>
        <div>
          <Label className="mb-1">Invention Arriving Country</Label>
          <Input className="p-2" placeholder="Enter country of arrival..." id="inventionCountry" name="inventionCountry" value={formData.inventionCountry} onChange={handleChange} />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <Label className="mb-1">Country of Invention Creation</Label>
          <Input className="p-2" placeholder="Enter country of invention..." id="creationCountry" name="creationCountry" value={formData.creationCountry} onChange={handleChange} />
        </div>
        <div>
          <Label className="mb-1">Collaboration Innovation</Label>
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
              <Label className="mb-1">Collaborator Name</Label>
              <Input className="p-2" placeholder="Enter collaborator name..." id="collaboratorName" name="collaboratorName" value={formData.collaboratorName} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-1">Collaborator Country</Label>
              <Input className="p-2" placeholder="Enter collaborator country..." id="collaboratorCountry" name="collaboratorCountry" value={formData.collaboratorCountry} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-1">Stakeholders</Label>
              <Input className="p-2" placeholder="Enter stakeholders..." id="stakeholders" name="stakeholders" value={formData.stakeholders} onChange={handleChange} />
            </div>
          </div>
          
          {/* Fourth Row */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <Label className="mb-1">Journal Numbers</Label>
              <Input className="p-2" placeholder="Enter journal numbers..." id="journalNumbers" name="journalNumbers" value={formData.journalNumbers} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-1">Product Identity Number</Label>
              <Input className="p-2" placeholder="Enter product identity number..." id="productIdentity" name="productIdentity" value={formData.productIdentity} onChange={handleChange} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EntityDetails;
