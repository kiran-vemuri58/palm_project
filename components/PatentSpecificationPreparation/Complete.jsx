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
  SelectItem
} from '@/components/ui/select';

const Complete = ({ formKey, updateFunction }) => {
  const formData = useFormStore((state) => state[formKey]);
  const updateFormDataByKey = useFormStore((state) => state[updateFunction]);
  const safeFormData = formData || {};

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    const newValue = type === 'file' ? files[0] : value;
    if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      updateFormDataByKey({ ...safeFormData, [name]: newValue });
    } else {
      console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
    }
  };

  const handleFileArrayChange = (e) => {
    const { name, value } = e.target; // array of File
    if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      updateFormDataByKey({ ...safeFormData, [name]: value });
    } else {
      console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
    }
  };

  const handleSelectChange = (name, value) => {
    if (updateFormDataByKey && typeof updateFormDataByKey === 'function') {
      updateFormDataByKey({ ...safeFormData, [name]: value });
    } else {
      console.error('updateFormDataByKey is not a function:', updateFormDataByKey, 'updateFunction:', updateFunction);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">

      {/* Row 1 - Provisional Filed */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Is Provisional Filed?</Label>
          <Select
            value={safeFormData.isProvisionalFiled || ''}
            onValueChange={(value) => handleSelectChange('isProvisionalFiled', value)}
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

        {safeFormData.isProvisionalFiled === 'Yes' && (
          <>
            <div>
              <Label>Date of Provisional Spec filing</Label>
              <Input
                type="date"
                name="provisionalSpecDate"
                value={safeFormData.provisionalSpecDate || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Application number</Label>
              <Input
                name="applicationNumber"
                placeholder="Enter Application number"
                value={safeFormData.applicationNumber || ''}
                onChange={handleChange}
              />
            </div>
          </>
        )}
      </div>

      {/* Row 2 - PCT Filed */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Is PCT Filed?</Label>
          <Select
            value={safeFormData.isPCTFiled || ''}
            onValueChange={(value) => handleSelectChange('isPCTFiled', value)}
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

        {safeFormData.isPCTFiled === 'Yes' && (
          <div>
            <Label>Date of PCT filing</Label>
            <Input
              type="date"
              name="pctFilingDate"
              value={safeFormData.pctFilingDate || ''}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <Label>Is PCT Published?</Label>
          <Select
            value={safeFormData.isPCTPublished || ''}
            onValueChange={(value) => handleSelectChange('isPCTPublished', value)}
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

      {/* Row 3 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Which Cited in Patent Document</Label>
          <Input
            name="citedPatent"
            placeholder="Which Cited in Patent Document"
            value={safeFormData.citedPatent || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Independent Claim</Label>
          <Input
            name="independentClaim"
            placeholder="Independent Claim"
            value={safeFormData.independentClaim || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Dependent Claim</Label>
          <Input
            name="dependentClaim"
            placeholder="Dependent Claim"
            value={safeFormData.dependentClaim || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Broadened claimed invention feature</Label>
          <Input
            name="broadenedFeature"
            placeholder="Broadened claimed invention feature"
            value={safeFormData.broadenedFeature || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Is it a Profitable Patent?</Label>
          <Select
            value={safeFormData.isProfitPatent || ''}
            onValueChange={(value) => handleSelectChange('isProfitPatent', value)}
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
            value={safeFormData.isDefensivePatent || ''}
            onValueChange={(value) => handleSelectChange('isDefensivePatent', value)}
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

      {/* Row 5 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Versions of All Drafts</Label>
          <FileInput
            name="draftVersions"
            multiple={true}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
            value={safeFormData.draftVersions || []}
            onChange={handleFileArrayChange}
            maxFiles={20}
            maxFileSize={20 * 1024 * 1024}
          />
        </div>
        <div>
          <Label>Efforts spent for drafting</Label>
          <Input
            name="draftingEffort"
            placeholder="Enter efforts spent"
            type="number"
            value={safeFormData.draftingEffort || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Patent Drafter (Employee ID)</Label>
          <Input
            name="drafterEmpId"
            placeholder="Enter Patent Drafter"
            value={safeFormData.drafterEmpId || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 6 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Number of hours spent</Label>
          <Input
            name="hoursSpent"
            placeholder="Enter hours spent"
            type="number"
            value={safeFormData.hoursSpent || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>External Agency Recognizer</Label>
          <Input
            name="agencyRecognizer"
            placeholder="Enter external agency recognizer"
            value={safeFormData.agencyRecognizer || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Cost spent on Agency</Label>
          <Input
            name="agencyCost"
            placeholder="Enter agency cost"
            type="number"
            value={safeFormData.agencyCost || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 7 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Efforts in Hours for review</Label>
          <Input
            name="reviewEffort"
            placeholder="Efforts in Hours for review"
            type="number"
            value={safeFormData.reviewEffort || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Manager Responsible (Employee ID)</Label>
          <Input
            name="managerEmpId"
            placeholder="Enter manager responsible"
            value={safeFormData.managerEmpId || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Activity Status</Label>
          <Select
            value={safeFormData.activityStatus || ''}
            onValueChange={(value) => handleSelectChange('activityStatus', value)}
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

export default Complete;
