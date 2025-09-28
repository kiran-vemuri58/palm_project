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
import { getSafeFormValue } from '@/utils/formUtils';



const ActivityStatus = ({formKey,updateFunction}) => {
  
  const formData = useFormStore((state) => state[formKey]);
  const updateFormDataByKey = useFormStore((state) => state[updateFunction]);

  return (
    <div className="activity-status w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Activity Status
      </label>
      <Select
        value={getSafeFormValue(formData, 'activityStatus')}
        onValueChange={(value) => {
              if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
                if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      updateFormDataByKey({ ...formData, activityStatus: value });
    } else {
      console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
    };
              } else {
                console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
              }
            }}
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
