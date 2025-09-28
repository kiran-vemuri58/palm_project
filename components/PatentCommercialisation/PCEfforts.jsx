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

const PCEfforts = ({formKey,updateFunction}) => {
  const formData = useFormStore((state) => state[formKey]);
  const updateFormData = useFormStore((state) => state[updateFunction]);
 // const { formData, updateFormData } = useFormStore();
  
  // Safety check to ensure formData is defined
  const safeFormData = formData || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...safeFormData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const { name, value } = e.target; // array of File
    updateFormData({ ...safeFormData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    updateFormData({ ...safeFormData, [name]: value });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Sales (In case of MVP/Real scale)</Label>
          <FileInput
            name="salesFile"
            multiple={true}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
            value={safeFormData.salesFile || []}
            onChange={handleFileUpload}
            maxFiles={20}
            maxFileSize={20 * 1024 * 1024}
          />
        </div>
        <div>
          <Label>Periodic Sales of Product</Label>
          <Input
            type="text"
            name="periodicSales"
            placeholder="Enter amount in numbers"
            value={safeFormData.periodicSales || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Invoices, Sales Sheets, etc.</Label>
          <FileInput
            name="invoiceFile"
            multiple={true}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
            value={safeFormData.invoiceFile || []}
            onChange={handleFileUpload}
            maxFiles={20}
            maxFileSize={20 * 1024 * 1024}
          />
        </div>

        <div>
          <Label>Date of Commercialization</Label>
          <Input
            type="date"
            name="commercializationDate"
            value={safeFormData.commercializationDate || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Product ID (If generated)</Label>
          <Input
            type="text"
            name="productId"
            placeholder="Enter Product ID"
            value={safeFormData.productId || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Whether Patent is Licensed</Label>
          <Select
            value={safeFormData.isLicensed || ''}
            onValueChange={(value) => handleSelectChange('isLicensed', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Whether Patent is Cross Licensed</Label>
          <Select
            value={safeFormData.isCrossLicensed || ''}
            onValueChange={(value) => handleSelectChange('isCrossLicensed', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Whether Patent Filed for Compulsory License</Label>
          <Select
            value={safeFormData.isCompulsoryLicenseFiled || ''}
            onValueChange={(value) => handleSelectChange('isCompulsoryLicenseFiled', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PCEfforts;
