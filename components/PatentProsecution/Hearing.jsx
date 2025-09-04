'use client';

import React from 'react';
import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import FileInput from '@/components/ui/file-input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const Hearing = ({ formKey, updateFunction }) => {
  const formData = useFormStore((state) => state[formKey]);
  const updateFormData = useFormStore((state) => state[updateFunction]);

  const hearingList = formData.hearingList || [];

  const handleChange = (index, name, value) => {
    const updatedList = [...hearingList];
    updatedList[index][name] = value;
    updateFormData({
      ...formData,
      hearingList: updatedList,
    });
  };

  const handleFileChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...hearingList];
    updatedList[index][name] = value; // value is an array of File objects
    updateFormData({
      ...formData,
      hearingList: updatedList,
    });
  };

  const addHearing = () => {
    updateFormData({
      ...formData,
      hearingList: [...hearingList, createEmptyHearing()],
    });
  };

  const removeHearing = (index) => {
    const updatedList = hearingList.filter((_, i) => i !== index);
    updateFormData({
      ...formData,
      hearingList: updatedList,
    });
  };

  // Init with one entry if empty
  React.useEffect(() => {
    if (hearingList.length === 0) {
      updateFormData({
        ...formData,
        hearingList: [createEmptyHearing()],
      });
    }
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {hearingList.map((item, index) => (
        <div key={index} className="mb-10 border-b pb-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <SelectField label="Hearing Notice Received" name="noticeReceived" value={item.noticeReceived} onChange={(name, value) => handleChange(index, name, value)} />
            <InputField label="Hearing Date" name="hearingDate" value={item.hearingDate} onChange={(e) => handleChange(index, e.target.name, e.target.value)} type="date" />
            <SelectField label="Hearing Type" name="hearingType" value={item.hearingType} onChange={(name, value) => handleChange(index, name, value)} options={['physical', 'online']} />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <InputField label="Main Argument of Hearing" name="mainArgument" value={item.mainArgument} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
            <InputField label="References Cited in Hearing" name="references" value={item.references} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
            <InputField label="Relevancy Details" name="relevancy" value={item.relevancy} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <Label className="mb-1">Decision Page</Label>
              <FileInput
                name="decisionPage"
                multiple={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                value={hearingList[index]?.decisionPage || []}
                onChange={(e) => handleFileChange(index, e)}
                maxFiles={10}
                maxFileSize={20 * 1024 * 1024}
              />
            </div>
            <SelectField label="Hearing Response Prepared" name="responsePrepared" value={item.responsePrepared} onChange={(name, value) => handleChange(index, name, value)} />
            <InputField label="Appearance Confirmation" name="appearance" value={item.appearance} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <InputField label="Hearing Response Preparer" name="responsePreparer" value={item.responsePreparer} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
            <InputField label="Hearing Response Filing Date" name="responseFilingDate" value={item.responseFilingDate} onChange={(e) => handleChange(index, e.target.name, e.target.value)} type="date" />
            <InputField label="Hearing Amendments Done" name="amendments" value={item.amendments} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <InputField label="People Appeared for Hearing" name="people" value={item.people} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
            <div>
              <Label className="mb-1">Hearing Minutes of Meeting</Label>
              <FileInput
                name="hearingMinutes"
                multiple={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                value={hearingList[index]?.hearingMinutes || []}
                onChange={(e) => handleFileChange(index, e)}
                maxFiles={10}
                maxFileSize={20 * 1024 * 1024}
              />
            </div>
            <InputField label="Name of Controller (From IPO) attended" name="controllerName" value={item.controllerName} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <SelectField label="After Final Rejection from Controller" name="rejectionAfterFinal" value={item.rejectionAfterFinal} onChange={(name, value) => handleChange(index, name, value)} />
            <InputField label="Patent Prosecutor" name="patentProsecutor" value={item.patentProsecutor} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
            <InputField label="External Agency" name="externalAgency" value={item.externalAgency} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <InputField label="Cost Spent on Agency" name="agencyCost" value={item.agencyCost} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
            <InputField label="Relevancy Details (Preparer)" name="relevancyPreparer" value={item.relevancyPreparer} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
            <InputField label="Number of Hours of Hearing" name="hours" value={item.hours} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
          </div>

          <div className="flex justify-end gap-4">
            {hearingList.length > 1 && (
              <Button variant="destructive" onClick={() => removeHearing(index)}>Delete</Button>
            )}
            {index === hearingList.length - 1 && (
              <Button onClick={addHearing}>Add Hearing</Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hearing;

// Helper components
const InputField = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <Label className="mb-1">{label}</Label>
    <Input type={type} name={name} value={value} onChange={onChange} placeholder={`Enter ${label}`} />
  </div>
);

const FileInputField = ({ label, name, onChange }) => (
  <div>
    <Label className="mb-1">{label}</Label>
    <FileInput name={name} multiple={true} onChange={onChange} />
  </div>
);

const SelectField = ({ label, name, value, onChange, options = ['yes', 'no'] }) => (
  <div>
    <Label className="mb-1">{label}</Label>
    <Select value={value} onValueChange={(val) => onChange(name, val)}>
      <SelectTrigger className="w-full h-10">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const createEmptyHearing = () => ({
  noticeReceived: '',
  hearingDate: '',
  hearingType: '',
  mainArgument: '',
  references: '',
  relevancy: '',
  decisionPage: [],
  responsePrepared: '',
  appearance: '',
  responsePreparer: '',
  responseFilingDate: '',
  amendments: '',
  people: '',
  hearingMinutes: [],
  controllerName: '',
  rejectionAfterFinal: '',
  patentProsecutor: '',
  externalAgency: '',
  agencyCost: '',
  relevancyPreparer: '',
  hours: '',
});
