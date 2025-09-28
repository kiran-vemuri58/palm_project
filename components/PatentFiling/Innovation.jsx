'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import FileInput from '@/components/ui/file-input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

const Innovation = () => {
  const { formData, updateFormData } = useFormStore();
  
  // Safety check to ensure formData is defined
  const safeFormData = formData || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleFileUpload = (e) => {
    const { name, value } = e.target; // array of File
    updateFormData({ [name]: value });
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
            onValueChange={(value) => updateFormData({ trainRun: value })}
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
      

      {/* Show other inputs only if "Yes" is selected */}
      {safeFormData.trainRun === 'yes' && (
        <>
          
        
            <div>
              <Label className="mb-1">Prior Art Documents</Label>
              <FileInput
                id="minuteOfMeeting"
                name="minuteOfMeeting"
                multiple={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                value={safeFormData.minuteOfMeeting || []}
                onChange={handleFileUpload}
                maxFiles={10}
                maxFileSize={20 * 1024 * 1024}
              />
            </div>
            <div>
              <Label className="mb-1">NPL Documents</Label>
              <FileInput
                id="attachments"
                name="attachments"
                multiple={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xls,.xlsx"
                value={safeFormData.attachments || []}
                onChange={handleFileUpload}
                maxFiles={20}
                maxFileSize={20 * 1024 * 1024}
              />
            </div>
          
        </>
      )}
    </div>
    </div>
  );
};

export default Innovation;
