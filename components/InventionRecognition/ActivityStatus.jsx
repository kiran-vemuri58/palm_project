'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFormStore from '@/store/store';



const ActivityStatus = ({formKey,updateFunction}) => {
  
  const formData = useFormStore((state) => state[formKey]);
  const updateFormDataByKey = useFormStore((state) => state[updateFunction]);

  return (
    <div className="activity-status w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Activity Status
      </label>
      <Select
        value={formData.activityStatus || ""}
        onValueChange={(value) => updateFormDataByKey({ ...formData,activityStatus: value })}
      >
        <SelectTrigger className="w-full border-gray-300">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="initiated">Initiated</SelectItem>
          <SelectItem value="inprogress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ActivityStatus;
