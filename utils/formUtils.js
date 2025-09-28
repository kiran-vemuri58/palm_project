// Utility functions for form data handling

/**
 * Safely gets a value from form data, ensuring it's never null for input components
 * @param {Object} formData - The form data object
 * @param {string} fieldName - The field name to get
 * @param {string} defaultValue - Default value if field is null/undefined
 * @returns {string} - Safe string value for input components
 */
export const getSafeFormValue = (formData, fieldName, defaultValue = '') => {
  const value = formData?.[fieldName];
  if (value === null || value === undefined) {
    return defaultValue;
  }
  return String(value);
};

/**
 * Safely gets an array value from form data
 * @param {Object} formData - The form data object
 * @param {string} fieldName - The field name to get
 * @param {Array} defaultValue - Default array if field is null/undefined
 * @returns {Array} - Safe array value
 */
export const getSafeFormArray = (formData, fieldName, defaultValue = []) => {
  const value = formData?.[fieldName];
  if (value === null || value === undefined || !Array.isArray(value)) {
    return defaultValue;
  }
  return value;
};
