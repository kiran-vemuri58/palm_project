'use client';

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useFormStore from "@/store/store";
import { Trash } from "lucide-react"; // Trash icon for deleting

const Hearing = () => {
  const { formData, updateInventor, addInventor, removeInventor, markInventorAsSaved } = useFormStore();

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-3">Hearing Details</h3>

      {/* Show "Add First Inventor" button only when no inventors exist */}
      {formData.inventors.length === 0 && (
        <Button onClick={addInventor} className="bg-green-500 text-white">
          + Add Hearing
        </Button>
      )}

      {/* Inventor List */}
      {formData.inventors.map((inventor, index) => (
        <div key={index} className="grid grid-cols-3 gap-4">
          {/* Name */}
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">FER received from Patent Office</Label>
            <Input
              type="text"
              value={inventor.name}
              onChange={(e) => updateInventor(index, "name", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          

          {/* Dept ID */}
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">Date of FER</Label>
            <Input
              type="text"
              value={inventor.deptId}
              onChange={(e) => updateInventor(index, "deptId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>

          {/* Employee ID */}
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">Main argument of FER</Label>
            <Input
              type="text"
              value={inventor.empId}
              onChange={(e) => updateInventor(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">References cited by examiner</Label>
            <Input
              type="text"
              value={inventor.empId}
              onChange={(e) => updateInventor(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
           {/* Employee ID */}
           <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">Relevancy details</Label>
            <Input
              type="text"
              value={inventor.empId}
              onChange={(e) => updateInventor(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">Decision page</Label>
            <Input
              type="text"
              value={inventor.empId}
              onChange={(e) => updateInventor(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          {/* Employee ID */}
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">FER response prepared</Label>
            <Input
              type="text"
              value={inventor.empId}
              onChange={(e) => updateInventor(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">FER response preparer</Label>
            <Input
              type="text"
              value={inventor.empId}
              onChange={(e) => updateInventor(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          {/* Employee ID */}
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">FER response filing date</Label>
            <Input
              type="text"
              value={inventor.empId}
              onChange={(e) => updateInventor(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">Main amendments done</Label>
            <Input
              type="text"
              value={inventor.empId}
              onChange={(e) => updateInventor(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          {/* Employee ID */}
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">FER response filing date</Label>
            <Input
              type="text"
              value={inventor.empId}
              onChange={(e) => updateInventor(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">External Agency</Label>
            <Input
              type="text"
              value={inventor.empId}
              onChange={(e) => updateInventor(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          {/* Employee ID */}
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">Cost spent on Agency</Label>
            <Input
              type="text"
              value={inventor.empId}
              onChange={(e) => updateInventor(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <Label className="text-gray-700 font-medium pb-1">Relevancy details</Label>
            <Input
              type="text"
              value={inventor.empId}
              onChange={(e) => updateInventor(index, "empId", e.target.value)}
              className="w-full h-10 px-3 py-2"
            />
          </div>
        
          
          
       
          {/* Save Button */}
          <Button
            onClick={() => markInventorAsSaved(index)}
            className="bg-blue-500 text-white hover:bg-blue-600 h-10 flex items-center justify-center mt-4"
            disabled={inventor.isSaved} // Disable after saving
          >
            {inventor.isSaved ? "Saved" : "Save Hearing"}
          </Button>

          {/* Delete Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeInventor(index)}
            className="text-red-500 hover:text-red-600 h-10 flex items-center justify-center mt-4"
            aria-label="Remove inventor"
          >
            <Trash size={20} />
          </Button>
          </div>
        
      ))}

      {/* Show "Add Another Inventor" only if at least one inventor is saved */}
      {formData.inventors.length > 0 && formData.inventors.some(i => i.isSaved) && (
        <Button
          onClick={addInventor}
          className="bg-green-500 text-white mt-4"
        >
          + Add Another Hearing
        </Button>
      )}
    </div>
  );
};

export default Hearing;
