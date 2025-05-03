'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import React, { useState } from 'react';
import { Star, Plus } from 'lucide-react';

//import React from 'react';

const PAExtractor = () => {
  const { formData, updateFormData } = useFormStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };
  const [rating, setRating] = useState(0);
  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    updateFormData({ [name]: files[0] || null }); // Store only the first file or null
  };

  

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* First Row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="mb-1">Name of Patent Searcher 1 </Label>
          <Input className="p-2" placeholder="Enter the Name of Patent Searcher 1" id="entity" name="psone" value={formData.psone} onChange={handleChange} />
        </div>
        
        <div>
          <Label className="mb-1">Name of Patent Searcher 2</Label>
          <Input className="p-2" placeholder="Enter the Name of Patent Searcher 2" id="inventionCountry" name="pstwo" value={formData.pstwo} onChange={handleChange} />
        </div>
        <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer ${
                      rating >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => {
                      setRating(star);
                      updateFormData({ rating: star });
                    }}
                    fill={rating >= star ? "#facc15" : "none"}
                  />
                ))}
                <Plus
                  className="text-blue-500 cursor-pointer hover:text-blue-700"
                  onClick={() => alert("You clicked the add icon!")}
                />
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
              <Input className="p-2" placeholder="Enter Novel Feature" id="collaboratorName" name="nfeature" value={formData.nfeature} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-1">Inventive Feature (Assumed)</Label>
              <Input className="p-2" placeholder="Enter collaborator country..." id="collaboratorCountry" name="ifeature" value={formData.ifeature} onChange={handleChange} />
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
              <Input className="p-2" placeholder="Enter journal numbers..." id="journalNumbers" name="scountry" value={formData.scountry} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-1">Opinion Of Extractor</Label>
              <Input className="p-2" placeholder="Enter Opinion Of Extractor" id="productIdentity" name="ooextractor" value={formData.ooextractor} onChange={handleChange} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PAExtractor;
