'use client';

import React from 'react';
import useFormStore from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const PCEfforts = ({formKey,updateFuction}) => {
  const formData = useFormStore((state) => state[formKey]);
  const updateFormData = useFormStore((state) => state[updateFuction]);
 // const { formData, updateFormData } = useFormStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    updateFormData({ ...formData, [name]: files[0] || null });
  };

  const handleSelectChange = (name, value) => {
    updateFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Sales (In case of MVP/Real scale)</Label>
          <Input
            type="file"
            name="salesFile"
            onChange={handleFileUpload}
          />
        </div>
        <div>
          <Label>Periodic Sales of Product</Label>
          <Input
            type="text"
            name="periodicSales"
            placeholder="Enter amount in numbers"
            value={formData.periodicSales || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Invoices, Sales Sheets, etc.</Label>
          <Input
            type="file"
            name="invoiceFile"
            onChange={handleFileUpload}
          />
        </div>

        <div>
          <Label>Date of Commercialization</Label>
          <Input
            type="date"
            name="commercializationDate"
            value={formData.commercializationDate || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Product ID (If generated)</Label>
          <Input
            type="text"
            name="productId"
            placeholder="Enter Product ID"
            value={formData.productId || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Whether Patent is Licensed</Label>
          <Select
            value={formData.isLicensed || ''}
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
            value={formData.isCrossLicensed || ''}
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
            value={formData.isCompulsoryLicenseFiled || ''}
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
