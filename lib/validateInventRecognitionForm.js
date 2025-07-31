// lib/validateInventionForm.js
export const validateInventionForm = (formData) => {
    const errors = {};
  
    if (!formData.inventiontitle || formData.inventiontitle.trim() === "") {
      errors.inventiontitle = "Invention Title is required";
    }
  
    if (!formData.commonName || formData.commonName.trim() === "") {
      errors.commonName = "Common Name is required";
    }
  
    if (!formData.inventordetails || formData.inventordetails.trim() === "") {
      errors.inventordetails = "Inventor Details are required";
    }
  
    return errors;
  };
  