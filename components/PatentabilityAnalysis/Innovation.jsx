'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

const Innovation = ({formKey, updateFunction}) => {
  const formData = useFormStore((state) => state[formKey]);
  const updateFormDataByKey = useFormStore((state) => state[updateFunction]);
  
  const safeFormData = formData || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      updateFormDataByKey({ [name]: value });
    } else {
      console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
    }
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      updateFormDataByKey({ [name]: files[0] || null }); // Store only the first file or null
    } else {
      console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* First Row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="mb-1">Is there more than an invention?</Label>
          <Select
            className="w-full"
            value={safeFormData.trainRun ?? ''} // ✅ Fix uncontrolled issue
            onValueChange={(value) => {
              if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
                updateFormDataByKey({ trainRun: value });
              } else {
                console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
              }
            }}
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
      {safeFormData.trainRun === 'yes' && (
        <>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <Label className="mb-1">Prior Art Documents</Label>
              <Input
                type="file"
                id="minuteOfMeeting"
                name="minuteOfMeeting"
                className="grid w-full max-w-sm items-center gap-1.5"
                onChange={handleFileUpload}
              />
            </div>
            <div>
              <Label className="mb-1">NPL Documnets</Label>
              <Input
                type="file"
                id="attachments"
                name="attachments"
                className="grid w-full max-w-sm items-center gap-1.5"
                onChange={handleFileUpload}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Innovation;
