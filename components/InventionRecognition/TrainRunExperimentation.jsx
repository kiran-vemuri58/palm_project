'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import FileInput from '@/components/ui/file-input';

const TrainRunExperimentation = () => {
  const { formData, updateFormData } = useFormStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  // handle multiple file uploads
  // This function will convert FileList to an array and store it in Zustand
  const handleFileUpload = (e) => {
    const { name, value } = e.target;
    updateFormData({
      [name]: value, // Store the array of files
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* First Row */}
      <div className="mb-6">
        <Label className="mb-2 block text-sm font-medium text-gray-700">Train Run / Experimentation?</Label>
        <Select
          className="w-full max-w-xs"
          value={formData.trainRun ?? ''} // ✅ Fix uncontrolled issue
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
      {formData.trainRun === 'yes' && (
        <div className="space-y-6">
          {/* Experimentation Results */}
          <div>
            <Label className="mb-2 block text-sm font-medium text-gray-700">Experimentation Results</Label>
            <Input
              className="w-full max-w-2xl"
              placeholder="Enter experimentation results..."
              id="experimentResults"
              name="experimentResults"
              value={formData.experimentResults ?? ''}
              onChange={handleChange}
            />
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <FileInput
                label="Evidence Available"
                name="evidence"
                multiple={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                value={formData.evidence || []}
                onChange={handleFileUpload}
                maxFileSize={20 * 1024 * 1024} // 20MB
                maxFiles={5}
              />
            </div>
            
            <div>
              <FileInput
                label="Minute of Meeting"
                name="minuteOfMeeting"
                multiple={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                value={formData.minuteOfMeeting || []}
                onChange={handleFileUpload}
                maxFileSize={20 * 1024 * 1024} // 20MB
                maxFiles={5}
              />
            </div>
            
            <div>
              <FileInput
                label="Attachments"
                name="attachments"
                multiple={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xls,.xlsx"
                value={formData.attachments || []}
                onChange={handleFileUpload}
                maxFileSize={20 * 1024 * 1024} // 20MB
                maxFiles={10}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainRunExperimentation;
