'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { createPredefinedHandler } from '@/utils/conditionalFieldUtils';
import React from 'react';

const TechnologyDetails = () => {
  const { formData, updateFormData } = useFormStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  // Use utility function for conditional field handling
  const handleIncrementalRenovationChange = createPredefinedHandler(formData, updateFormData, 'incrementalRenovation');

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* First Row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="mb-1">Is Technology Incremental Renovation?</Label>
          <Select
            className="w-full"
            value={formData.incrementalRenovation || ''}
            onValueChange={handleIncrementalRenovationChange}
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

      {/* Show other inputs only if "Yes" is selected */}
      {formData.incrementalRenovation === 'yes' && (
        <>
          {/* Second Row */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <Label className="mb-1">Patent Numbers</Label>
              <Input className="p-2" placeholder="Enter patent numbers..." id="patentNumbers" name="patentNumbers" value={formData.patentNumbers} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-1">Journal Numbers</Label>
              <Input className="p-2" placeholder="Enter journal numbers..." id="journalNumbers" name="journalNumbers" value={formData.journalNumbers} onChange={handleChange} />
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <Label className="mb-1">Product Identity Number</Label>
              <Input className="p-2" placeholder="Enter product identity number..." id="productIdentity" name="productIdentity" value={formData.productIdentity} onChange={handleChange} />
            </div>
            <div className="col-span-2">
              <Label className="mb-1">Problem the Invention Addresses</Label>
              <Input className="p-2 w-full" placeholder="Describe the problem addressed by the invention..." id="problemAddressed" name="problemAddressed" value={formData.problemAddressed} onChange={handleChange} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TechnologyDetails;
