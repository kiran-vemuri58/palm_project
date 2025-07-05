'use client';

import React from 'react';
import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const Hearing = ({ formKey, updateFunction }) => {
  const store = useFormStore();
  const fullData = store[formKey] || {};
  const hearingData = fullData.hearing || {};
  const hearingEntries = Object.entries(hearingData);

  const updateStore = (newHearingData) => {
    store[updateFunction]({
      ...fullData,
      hearing: newHearingData,
    });
  };

  const handleInputChange = (key, e) => {
    const { name, value } = e.target;
    updateStore({
      ...hearingData,
      [key]: { ...hearingData[key], [name]: value },
    });
  };

  const handleSelectChange = (key, name, value) => {
    updateStore({
      ...hearingData,
      [key]: { ...hearingData[key], [name]: value },
    });
  };

  const handleFileChange = (key, e) => {
    const { name, files } = e.target;
    updateStore({
      ...hearingData,
      [key]: { ...hearingData[key], [name]: files[0] || null },
    });
  };

  const addHearing = () => {
    const newKey = `hearing_${Date.now()}`;
    updateStore({
      ...hearingData,
      [newKey]: createEmptyHearing(),
    });
  };

  const deleteHearing = (keyToDelete) => {
    const updated = { ...hearingData };
    delete updated[keyToDelete];
    updateStore(updated);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {hearingEntries.length === 0 ? (
        <Button onClick={addHearing}>Add Hearing</Button>
      ) : (
        hearingEntries.map(([key, item], index) => (
          <div key={key} className="mb-10 border-b pb-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <SelectField label="Hearing Notice Received" name="noticeReceived" value={item.noticeReceived} onChange={(name, value) => handleSelectChange(key, name, value)} />
              <InputField label="Hearing Date" name="hearingDate" value={item.hearingDate} onChange={(e) => handleInputChange(key, e)} type="date" />
              <SelectField label="Hearing Type" name="hearingType" value={item.hearingType} onChange={(name, value) => handleSelectChange(key, name, value)} options={['physical', 'online']} />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <InputField label="Main Argument of Hearing" name="mainArgument" value={item.mainArgument} onChange={(e) => handleInputChange(key, e)} />
              <InputField label="References Cited in Hearing" name="references" value={item.references} onChange={(e) => handleInputChange(key, e)} />
              <InputField label="Relevancy Details" name="relevancy" value={item.relevancy} onChange={(e) => handleInputChange(key, e)} />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <FileInputField label="Decision Page" name="decisionPage" onChange={(e) => handleFileChange(key, e)} />
              <SelectField label="Hearing Response Prepared" name="responsePrepared" value={item.responsePrepared} onChange={(name, value) => handleSelectChange(key, name, value)} />
              <InputField label="Appearance Confirmation" name="appearance" value={item.appearance} onChange={(e) => handleInputChange(key, e)} />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <InputField label="Hearing Response Preparer" name="responsePreparer" value={item.responsePreparer} onChange={(e) => handleInputChange(key, e)} />
              <InputField label="Hearing Response Filing Date" name="responseFilingDate" value={item.responseFilingDate} onChange={(e) => handleInputChange(key, e)} type="date" />
              <InputField label="Hearing Amendments Done" name="amendments" value={item.amendments} onChange={(e) => handleInputChange(key, e)} />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <InputField label="People Appeared for Hearing" name="people" value={item.people} onChange={(e) => handleInputChange(key, e)} />
              <FileInputField label="Hearing Minutes of Meeting" name="hearingMinutes" onChange={(e) => handleFileChange(key, e)} />
              <InputField label="Name of Controller (From IPO) attended" name="controllerName" value={item.controllerName} onChange={(e) => handleInputChange(key, e)} />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <SelectField label="After Final Rejection from Controller" name="rejectionAfterFinal" value={item.rejectionAfterFinal} onChange={(name, value) => handleSelectChange(key, name, value)} />
              <InputField label="Patent Prosecutor" name="patentProsecutor" value={item.patentProsecutor} onChange={(e) => handleInputChange(key, e)} />
              <InputField label="External Agency" name="externalAgency" value={item.externalAgency} onChange={(e) => handleInputChange(key, e)} />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <InputField label="Cost Spent on Agency" name="agencyCost" value={item.agencyCost} onChange={(e) => handleInputChange(key, e)} />
              <InputField label="Relevancy Details (Preparer)" name="relevancyPreparer" value={item.relevancyPreparer} onChange={(e) => handleInputChange(key, e)} />
              <InputField label="Number of Hours of Hearing" name="hours" value={item.hours} onChange={(e) => handleInputChange(key, e)} />
            </div>

            <div className="flex justify-end gap-4">
              {hearingEntries.length > 1 && (
                <Button variant="destructive" onClick={() => deleteHearing(key)}>Delete</Button>
              )}
              {index === hearingEntries.length - 1 && (
                <Button onClick={addHearing}>Add Hearing</Button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Hearing;

// 🔁 Reusable sub-components
const InputField = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <Label className="mb-1">{label}</Label>
    <Input type={type} name={name} value={value} onChange={onChange} placeholder={`Enter ${label}`} />
  </div>
);

const FileInputField = ({ label, name, onChange }) => (
  <div>
    <Label className="mb-1">{label}</Label>
    <Input type="file" name={name} onChange={onChange} />
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
  decisionPage: null,
  responsePrepared: '',
  appearance: '',
  responsePreparer: '',
  responseFilingDate: '',
  amendments: '',
  people: '',
  hearingMinutes: null,
  controllerName: '',
  rejectionAfterFinal: '',
  patentProsecutor: '',
  externalAgency: '',
  agencyCost: '',
  relevancyPreparer: '',
  hours: '',
});
