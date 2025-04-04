// lib/validateInventionForm.js
export const validateInventionForm = (formData) => {
    const errors = {};
  
    if (!formData.inventiontitle || formData.inventiontitle.trim() === "") {
      errors.inventiontitle = "Invention Title is required";
    }
  
    if (!formData.commonName || formData.commonName.trim() === "") {
      errors.commonName = "Common Name is required";
    }
  
    if (!formData.InventorDetails || formData.InventorDetails.trim() === "") {
      errors.InventorDetails = "Inventor Details are required";
    }
  
    return errors;
  };
  