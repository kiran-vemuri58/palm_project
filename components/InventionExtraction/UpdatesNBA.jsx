import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getSafeFormValue } from '@/utils/formUtils';
import useFormStore from '@/store/store';

const UpdatesNBA = ({formKey, updateFunction}) => {
    const formData = useFormStore((state) => state[formKey]);
    const updateFormDataByKey = useFormStore((state) => state[updateFunction]);
    return (
        <div className="activity-status w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Is there need of NBA for applying patent
            </label>
            <Select
                value={getSafeFormValue(formData, 'updatenba')}
                onValueChange={(value) => {
              if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
                if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      updateFormDataByKey({ ...formData, updatenba: value });
    } else {
      console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
    };
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
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default UpdatesNBA
