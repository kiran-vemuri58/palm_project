'use client';

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useFormStore from "@/store/store";
import { Trash } from "lucide-react"; // Trash icon for deleting

const FER = () => {
  const { formData, updateFER, addFER, removeFER, markFERAsSaved } = useFormStore();

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-3">FER Details</h3>

      {/* Show "Add First FER" button only when no FERs exist */}
      {formData.FER.length === 0 && (
        <Button onClick={addFER} className="bg-green-500 text-white">
          + Add FER
        </Button>
      )}

      {/* FER List */}
      {formData.FER.map((FER, index) => (
        <div key={index} className="grid grid-cols-3 gap-4">
          {/* Name */}
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">FER received from Patent Office</Label>
            <Input
              type="text"
              value={FER.name}
              onChange={(e) => updateFER(index, "name", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          

          {/* Dept ID */}
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">Date of FER</Label>
            <Input
              type="text"
              value={FER.deptId}
              onChange={(e) => updateFER(index, "deptId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>

          {/* Employee ID */}
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">Main argument of FER</Label>
            <Input
              type="text"
              value={FER.empId}
              onChange={(e) => updateFER(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">References cited by examiner</Label>
            <Input
              type="text"
              value={FER.empId}
              onChange={(e) => updateFER(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
           {/* Employee ID */}
           <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">Relevancy details</Label>
            <Input
              type="text"
              value={FER.empId}
              onChange={(e) => updateFER(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">Decision page</Label>
            <Input
              type="text"
              value={FER.empId}
              onChange={(e) => updateFER(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          {/* Employee ID */}
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">FER response prepared</Label>
            <Input
              type="text"
              value={FER.empId}
              onChange={(e) => updateFER(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">FER response preparer</Label>
            <Input
              type="text"
              value={FER.empId}
              onChange={(e) => updateFER(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          {/* Employee ID */}
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">FER response filing date</Label>
            <Input
              type="text"
              value={FER.empId}
              onChange={(e) => updateFER(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">Main amendments done</Label>
            <Input
              type="text"
              value={FER.empId}
              onChange={(e) => updateFER(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          {/* Employee ID */}
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">FER response filing date</Label>
            <Input
              type="text"
              value={FER.empId}
              onChange={(e) => updateFER(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">External Agency</Label>
            <Input
              type="text"
              value={FER.empId}
              onChange={(e) => updateFER(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          {/* Employee ID */}
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">Cost spent on Agency</Label>
            <Input
              type="text"
              value={FER.empId}
              onChange={(e) => updateFER(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">Relevancy details</Label>
            <Input
              type="text"
              value={FER.empId}
              onChange={(e) => updateFER(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
        
          
          
       
          {/* Save Button */}
          <Button
            onClick={() => markFERAsSaved(index)}
            className="bg-blue-500 text-white hover:bg-blue-600 h-10 flex items-center justify-center mt-4"
            disabled={FER.isSaved} // Disable after saving
          >
            {FER.isSaved ? "Saved" : "Save FER"}
          </Button>

          {/* Delete Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeFER(index)}
            className="text-red-500 hover:text-red-600 h-10 flex items-center justify-center mt-4"
            aria-label="Remove FER"
          >
            <Trash size={20} />
          </Button>
          </div>
        
      ))}

      {/* Show "Add Another FER" only if at least one FER is saved */}
      {formData.FER.length > 0 && formData.FER.some(i => i.isSaved) && (
        <Button
          onClick={addFER}
          className="bg-green-500 text-white mt-4"
        >
          + Add Another FER
        </Button>
      )}
    </div>
  );
};

export default FER;
