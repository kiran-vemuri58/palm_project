import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import useFormStore from '@/store/store';

const UpdatesNBA = () => {
    const { formData2, updateFormData2 } = useFormStore();
    return (
        <div className="activity-status w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Is there need of NBA for applying patent
            </label>
            <Select
                value={formData2.updatenba || ""}
                onValueChange={(value) => updateFormData2({ ...formData2,updatenba: value })}
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
