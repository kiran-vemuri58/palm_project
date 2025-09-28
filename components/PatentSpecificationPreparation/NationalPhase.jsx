'use client';

import React from 'react';
import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import FileInput from '@/components/ui/file-input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const NationalPhase = ({ formKey, updateFunction }) => {
  const formData = useFormStore((state) => state[formKey]);
  const updateFormDataByKey = useFormStore((state) => state[updateFunction]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    const newValue = type === 'file' ? files[0] : value;
    updateFormDataByKey({ ...formData, [name]: newValue });
  };

  const handleFileArrayChange = (e) => {
    const { name, value } = e.target; // value is array of File
    if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      updateFormDataByKey({ ...formData, [name]: value });
    } else {
      console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
    }
    } else {
      console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
    }
  };

  const handleSelectChange = (name, value) => {
    if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      updateFormDataByKey({ ...formData, [name]: value });
    } else {
      console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
    }
    } else {
      console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-6">
      
      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Date of PCT Application</Label>
          <Input
            type="date"
            name="npPCTDate"
            value={formData.npPCTDate || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Application Number</Label>
          <Input
            name="npApplicationNumber"
            placeholder="Enter Application Number"
            value={formData.npApplicationNumber || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>PCT Publication Number</Label>
          <Input
            name="npPCTPublication"
            placeholder="Enter Publication Number"
            value={formData.npPCTPublication || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>PCT Search Report</Label>
          <FileInput
            name="npSearchReport"
            multiple={true}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            value={formData.npSearchReport || []}
            onChange={handleFileArrayChange}
            maxFiles={10}
            maxFileSize={20 * 1024 * 1024}
          />
        </div>
        <div>
          <Label>Date of PCT or Provisional Application Number</Label>
          <Input
            type="date"
            name="npPCTOrProvisionalDate"
            value={formData.npPCTOrProvisionalDate || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Application Country</Label>
          <Input
            name="npApplicationCountry"
            placeholder="Enter Country"
            value={formData.npApplicationCountry || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Name Of Drafter</Label>
          <Input
            name="npDrafterName"
            placeholder="Name Of Drafter"
            value={formData.npDrafterName || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Claim Drafting Strategy Sheet</Label>
          <FileInput
            name="npClaimSheet"
            multiple={true}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            value={formData.npClaimSheet || []}
            onChange={handleFileArrayChange}
            maxFiles={10}
            maxFileSize={20 * 1024 * 1024}
          />
        </div>
        <div>
          <Label>Forms Prepared</Label>
          <Select
            value={formData.npFormsPrepared || 'No'}
            onValueChange={(value) => handleSelectChange('npFormsPrepared', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Country Prior Filing</Label>
          <Input
            name="npCountryFiling"
            placeholder="Country Prior Filing"
            value={formData.npCountryFiling || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Review By</Label>
          <Input
            name="npReviewBy"
            placeholder="Review By"
            value={formData.npReviewBy || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Which Cited in Patent Document</Label>
          <Input
            name="npCitedPatent"
            placeholder="Which Cited in Patent Document"
            value={formData.npCitedPatent || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 5 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Independent Claim</Label>
          <Input
            name="npIndependentClaim"
            placeholder="Independent Claim"
            value={formData.npIndependentClaim || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Dependent Claim</Label>
          <Input
            name="npDependentClaim"
            placeholder="Dependent Claim"
            value={formData.npDependentClaim || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Broadened claimed invention feature</Label>
          <Input
            name="npBroadenedFeature"
            placeholder="Broadened claimed invention feature"
            value={formData.npBroadenedFeature || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 6 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Is it a Profitable Patent?</Label>
          <Select
            value={formData.npIsProfit || 'No'}
            onValueChange={(value) => handleSelectChange('npIsProfit', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Is it a Defensive Patent?</Label>
          <Select
            value={formData.npIsDefensive || 'No'}
            onValueChange={(value) => handleSelectChange('npIsDefensive', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Versions Of All Drafts</Label>
          <FileInput
            name="npAllDrafts"
            multiple={true}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
            value={formData.npAllDrafts || []}
            onChange={handleFileArrayChange}
            maxFiles={20}
            maxFileSize={20 * 1024 * 1024}
          />
        </div>
      </div>

      {/* Row 7 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Efforts spent for drafting</Label>
          <Input
            name="npDraftingEffort"
            placeholder="Enter efforts spent"
            type="number"
            value={formData.npDraftingEffort || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Patent Drafter (Employee ID)</Label>
          <Input
            name="npDrafterEmpId"
            placeholder="Enter Patent Drafter"
            value={formData.npDrafterEmpId || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Number of hours spent</Label>
          <Input
            name="npHoursSpent"
            placeholder="Enter hours spent"
            type="number"
            value={formData.npHoursSpent || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 8 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>External Agency Recognizer</Label>
          <Input
            name="npAgencyRecognizer"
            placeholder="Enter external agency recognizer"
            value={formData.npAgencyRecognizer || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Cost spent on Agency</Label>
          <Input
            name="npAgencyCost"
            placeholder="Enter agency cost"
            type="number"
            value={formData.npAgencyCost || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Efforts in Hours for review</Label>
          <Input
            name="npReviewEffort"
            placeholder="Efforts in Hours for review"
            type="number"
            value={formData.npReviewEffort || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Final Row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Manager Responsible (Employee ID)</Label>
          <Input
            name="npManagerEmpId"
            placeholder="Enter manager responsible"
            value={formData.npManagerEmpId || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Activity Status</Label>
          <Select
            value={formData.npActivityStatus || 'Initiated'}
            onValueChange={(value) => handleSelectChange('npActivityStatus', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Initiated">Initiated</SelectItem>
              <SelectItem value="In Review">In Review</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default NationalPhase;
