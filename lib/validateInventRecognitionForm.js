// lib/validateInventionForm.js
export const validateInventionForm = (formData) => {
    const errors = {};
  
    // Check if formData exists
    if (!formData) {
      return {
        isValid: false,
        errors: {
          general: "Form data is missing"
        }
      };
    }
  
    if (!formData.inventiontitle || formData.inventiontitle.trim() === "") {
      errors.inventiontitle = "Invention Title is required";
    }
  
    if (!formData.commonName || formData.commonName.trim() === "") {
      errors.commonName = "Common Name is required";
    }
  
    if (!formData.inventordetails || formData.inventordetails.trim() === "") {
      errors.inventordetails = "Inventor Details are required";
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors: errors
    };
  };
  