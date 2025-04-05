'use client';

import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

const TrainRunExperimentation = () => {
  const { formData, updateFormData } = useFormStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    updateFormData({ [name]: files[0] || null }); // Store only the first file or null
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* First Row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="mb-1">Train Run / Experimentation?</Label>
          <Select
            className="w-full"
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
      </div>

      {/* Show other inputs only if "Yes" is selected */}
      {formData.trainRun === 'yes' && (
        <>
          {/* Second Row */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <Label className="mb-1">Experimentation Results</Label>
              <Input
                className="p-2"
                placeholder="Enter experimentation results..."
                id="experimentResults"
                name="experimentResults"
                value={formData.experimentResults ?? ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1">Evidence Available</Label>
              <Input
                type="file"
                id="evidence"
                name="evidence"
                className="grid w-full max-w-sm items-center gap-1.5"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <Label className="mb-1">Minute of Meeting</Label>
              <Input
                type="file"
                id="minuteOfMeeting"
                name="minuteOfMeeting"
                className="grid w-full max-w-sm items-center gap-1.5"
                onChange={handleFileUpload}
              />
            </div>
            <div>
              <Label className="mb-1">Attachments</Label>
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

export default TrainRunExperimentation;
