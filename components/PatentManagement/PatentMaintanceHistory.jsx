'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
//import React from 'react';

const PatentMaintanceHistory = ({formKey , updateFunction}) => {
 // const { formData, updateFormData } = useFormStore();

  const formData = useFormStore((state) => state[formKey]);
  const updateFormData = useFormStore((state) => state[updateFunction]);


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
          <Label className="mb-1">Priority Date</Label>
          <Input className="p-2" placeholder="Select a date..." id="priorityDate" name="priorityDate" type="date" value={formData?.priorityDate || ''} onChange={handleChange} />
        </div>
        
        <div>
          <Label className="mb-1">Grant Date</Label>
          <Input className="p-2" placeholder="Select a date..." id="grantDate" name="grantDate" type="date" value={formData?.grantDate || ''} onChange={handleChange} />
        </div>
        <div>
          <Label className="mb-1">Number of Years Paid</Label>
          <Input className="p-2" placeholder="Enter number of years..." id="yearsPaid" name="yearsPaid" type="text" value={formData?.yearsPaid || ''} onChange={handleChange} />
        </div>
        <div>
          <Label className="mb-1">Next Due Date</Label>
          <Input className="p-2" placeholder="Select a date..." id="nextDueDate" name="nextDueDate" type="date" value={formData?.nextDueDate || ''} onChange={handleChange} />
        </div>
        <div>
          <Label className="mb-1">whether maintainance is stopped?
          </Label>
          <Input className="p-2" placeholder="Select a date..." id="maintenanceStopped" name="maintenanceStopped" type="date" value={formData?.maintenanceStopped || ''} onChange={handleChange} />
        </div>
        <div>
              <Label className="mb-1">decision page</Label>
              <Input
                type="file"
                id="attachments"
                name="attachments"
                className="grid w-full max-w-sm items-center gap-1.5"
                onChange={handleFileUpload}
              />
            </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <Label className="mb-1">working of invention statement submit?</Label>
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

      {formData?.collaboration === 'yes' && (
        <>
          {/* Third Row */}
          <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
          <Label className="mb-1">filing Date</Label>
          <Input className="p-2" placeholder="Select a date..." id="filingDate" name="filingDate" type="date" value={formData?.filingDate || ''} onChange={handleChange} />
        </div>
            <div>
              <Label className="mb-1">filing Attachment</Label>
              <Input
                type="file"
                id="attachments"
                name="attachments"
                className="grid w-full max-w-sm items-center gap-1.5"
                onChange={handleFileUpload}
              />
            </div>
            <div>
              <Label className="mb-1">maintance Fee</Label>
              <Input className="p-2" placeholder="Enter maintenance fee..." id="maintenanceFee" name="maintenanceFee" value={formData?.maintenanceFee} onChange={handleChange} />
            </div>
          </div>
          
          {/* Fourth Row */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            
            <div>
              <Label className="mb-1">external Agency</Label>
              <Input className="p-2" placeholder="Enter external agency..." id="externalAgency" name="externalAgency" value={formData?.externalAgency} onChange={handleChange} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PatentMaintanceHistory;
