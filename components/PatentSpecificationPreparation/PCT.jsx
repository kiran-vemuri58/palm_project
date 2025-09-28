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

const PCT = ({ formKey, updateFunction }) => {
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

  const isDirectPCTYes = formData.isDirectPCT === 'Yes';

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-6">
      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Is Direct PCT?</Label>
          <Select
            value={formData.isDirectPCT || 'No'}
            onValueChange={(value) => handleSelectChange('isDirectPCT', value)}
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

        {isDirectPCTYes ? (
          <div>
            <Label>Permission from Parent Patent Office</Label>
            <FileInput
              name="pctParentPermission"
              multiple={true}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              value={formData.pctParentPermission || []}
              onChange={handleFileArrayChange}
              maxFiles={10}
              maxFileSize={20 * 1024 * 1024}
            />
          </div>
        ) : (
          <>
            <div>
              <Label>Date of Provisional Application</Label>
              <Input
                type="date"
                name="pctProvisionalDate"
                value={formData.pctProvisionalDate || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Application number</Label>
              <Input
                name="pctApplicationNumber"
                placeholder="Enter Application number"
                value={formData.pctApplicationNumber || ''}
                onChange={handleChange}
              />
            </div>
          </>
        )}
      </div>

      {/* Conditional Row (only if isDirectPCT is No) */}
      {!isDirectPCTYes && (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Name Of Drafter</Label>
            <Input
              name="pctDrafterName"
              placeholder="Name Of Drafter"
              value={formData.pctDrafterName || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Claim Drafting Strategy Sheet</Label>
            <FileInput
              name="pctClaimSheet"
              multiple={true}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              value={formData.pctClaimSheet || []}
              onChange={handleFileArrayChange}
              maxFiles={10}
              maxFileSize={20 * 1024 * 1024}
            />
          </div>
          <div>
            <Label>Forms Prepared</Label>
            <Select
              value={formData.pctFormsPrepared || 'No'}
              onValueChange={(value) => handleSelectChange('pctFormsPrepared', value)}
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
      )}

      {/* Common Fields (always shown) */}
      <div className="grid grid-cols-3 gap-4">
        {!isDirectPCTYes && (
          <>
            <div>
              <Label>Country Prior Filing</Label>
              <Input
                name="pctCountryFiling"
                placeholder="Country Prior Filing"
                value={formData.pctCountryFiling || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Review By</Label>
              <Input
                name="pctReviewBy"
                placeholder="Review By"
                value={formData.pctReviewBy || ''}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <div>
          <Label>Which Cited in Patent Document</Label>
          <Input
            name="pctCitedPatent"
            placeholder="Which Cited in Patent Document"
            value={formData.pctCitedPatent || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Independent Claim</Label>
          <Input
            name="pctIndependentClaim"
            placeholder="Independent Claim"
            value={formData.pctIndependentClaim || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Dependent Claim</Label>
          <Input
            name="pctDependentClaim"
            placeholder="Dependent Claim"
            value={formData.pctDependentClaim || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Broadened claimed invention feature</Label>
          <Input
            name="pctBroadenedFeature"
            placeholder="Broadened claimed invention feature"
            value={formData.pctBroadenedFeature || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Is it a Profitable Patent?</Label>
          <Select
            value={formData.pctIsProfit || 'No'}
            onValueChange={(value) => handleSelectChange('pctIsProfit', value)}
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
            value={formData.pctIsDefensive || 'No'}
            onValueChange={(value) => handleSelectChange('pctIsDefensive', value)}
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
            name="pctAllDrafts"
            multiple={true}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
            value={formData.pctAllDrafts || []}
            onChange={handleFileArrayChange}
            maxFiles={20}
            maxFileSize={20 * 1024 * 1024}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Efforts spent for drafting</Label>
          <Input
            name="pctDraftingEffort"
            placeholder="Enter efforts spent"
            type="number"
            value={formData.pctDraftingEffort || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Patent Drafter (Employee ID)</Label>
          <Input
            name="pctDrafterEmpId"
            placeholder="Enter Patent Drafter"
            value={formData.pctDrafterEmpId || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Number of hours spent</Label>
          <Input
            name="pctHoursSpent"
            placeholder="Enter hours spent"
            type="number"
            value={formData.pctHoursSpent || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>External Agency Recognizer</Label>
          <Input
            name="pctAgencyRecognizer"
            placeholder="Enter external agency recognizer"
            value={formData.pctAgencyRecognizer || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Cost spent on Agency</Label>
          <Input
            name="pctAgencyCost"
            placeholder="Enter agency cost"
            type="number"
            value={formData.pctAgencyCost || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Efforts in Hours for review</Label>
          <Input
            name="pctReviewEffort"
            placeholder="Efforts in Hours for review"
            type="number"
            value={formData.pctReviewEffort || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Manager Responsible (Employee ID)</Label>
          <Input
            name="pctManagerEmpId"
            placeholder="Enter manager responsible"
            value={formData.pctManagerEmpId || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Activity Status</Label>
          <Select
            value={formData.pctActivityStatus || 'Initiated'}
            onValueChange={(value) => handleSelectChange('pctActivityStatus', value)}
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

export default PCT;
