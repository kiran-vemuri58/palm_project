"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import FileInput from "@/components/ui/file-input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useFormStore from "@/store/store";

const emptyFER = {
  ferReceived: "",
  ferDate: "",
  ferArgument: "",
  examinerCitations: [],
  relevancyDetails: "",
  decisionPage: [],
  ferPrepared: "",
  ferPreparer: "",
  ferFilingDate: "",
  amendments: "",
  patentProsecutor: "",
  externalAgency: "",
  agencyCost: "",
  relevancyPreparer: "",
};

const FER = ({ formKey, updateFunction }) => {
  const formData = useFormStore((state) => state[formKey]);
  const updateFormData = useFormStore((state) => state[updateFunction]);

  const ferList = formData.ferList || [];

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...ferList];
    updatedList[index][name] = value;
    updateFormData({ ...formData, ferList: updatedList });
  };

  const handleFileUpload = (index, e) => {
    const { name, value } = e.target; // value is array of File
    const updatedList = [...ferList];
    updatedList[index][name] = value;
    updateFormData({ ...formData, ferList: updatedList });
  };

  const handleAddFer = () => {
    updateFormData({
      ...formData,
      ferList: [...ferList, structuredClone(emptyFER)],
    });
  };

  const handleDeleteFer = (index) => {
    const updatedList = [...ferList];
    updatedList.splice(index, 1);
    updateFormData({ ...formData, ferList: updatedList });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {ferList.map((fer, index) => (
        <div key={index} className="mb-10 border-b pb-6">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <Label>FER received from Patent Office</Label>
              <Select
                value={fer.ferReceived}
                onValueChange={(value) => {
                  const updated = [...ferList];
                  updated[index].ferReceived = value;
                  updateFormData({ ...formData, ferList: updated });
                }}
              >
                <SelectTrigger className="w-full h-10 px-3">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date of FER</Label>
              <Input
                type="date"
                name="ferDate"
                value={fer.ferDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <Label>Main argument of FER</Label>
              <Select
                value={fer.ferArgument}
                onValueChange={(value) => {
                  const updated = [...ferList];
                  updated[index].ferArgument = value;
                  updateFormData({ ...formData, ferList: updated });
                }}
              >
                <SelectTrigger className="w-full h-10 px-3">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="non-technical">Non-Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <Label>References cited by examiner</Label>
              <FileInput
                name="examinerCitations"
                multiple={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                value={fer.examinerCitations || []}
                onChange={(e) => handleFileUpload(index, e)}
                maxFiles={10}
                maxFileSize={20 * 1024 * 1024}
              />
            </div>
            <div>
              <Label>Relevancy details</Label>
              <Input
                name="relevancyDetails"
                placeholder="Enter relevancy details"
                value={fer.relevancyDetails}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <Label>Decision page</Label>
              <FileInput
                name="decisionPage"
                multiple={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                value={fer.decisionPage || []}
                onChange={(e) => handleFileUpload(index, e)}
                maxFiles={10}
                maxFileSize={20 * 1024 * 1024}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <Label>FER response prepared</Label>
              <Select
                value={fer.ferPrepared}
                onValueChange={(value) => {
                  const updated = [...ferList];
                  updated[index].ferPrepared = value;
                  updateFormData({ ...formData, ferList: updated });
                }}
              >
                <SelectTrigger className="w-full h-10 px-3">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>FER response preparer</Label>
              <Input
                name="ferPreparer"
                placeholder="Enter preparer ID"
                value={fer.ferPreparer}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <Label>FER response filing date</Label>
              <Input
                type="date"
                name="ferFilingDate"
                value={fer.ferFilingDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <Label>Main amendments done</Label>
              <Input
                name="amendments"
                placeholder="Enter amendments details"
                value={fer.amendments}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <Label>Patent Prosecutor</Label>
              <Input
                name="patentProsecutor"
                placeholder="Enter Employee ID"
                value={fer.patentProsecutor}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <Label>External Agency</Label>
              <Input
                name="externalAgency"
                placeholder="Enter External Agency"
                value={fer.externalAgency}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <Label>Cost spent on Agency</Label>
              <Input
                name="agencyCost"
                placeholder="Enter cost spent on agency"
                value={fer.agencyCost}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <Label>Relevancy details (Preparer)</Label>
              <Input
                name="relevancyPreparer"
                placeholder="Enter Employee ID"
                value={fer.relevancyPreparer}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="flex flex-col justify-end gap-2">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleAddFer}
              >
                Add FER
              </Button>
              {ferList.length > 1 && (
                <Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleDeleteFer(index)}
                >
                  Delete FER
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FER;
