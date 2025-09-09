/**
 * Utility functions for handling conditional form fields
 * Ensures that when a user changes from "Yes" to "No", 
 * the hidden field values are cleared to prevent data inconsistency
 */

/**
 * Creates a handler for conditional fields that clears dependent fields when "No" is selected
 * @param {Object} formData - Current form data
 * @param {Function} updateFormData - Function to update form data
 * @param {string} mainField - The main field name (e.g., 'incrementalRenovation')
 * @param {Array} dependentFields - Array of field names that should be cleared when "No" is selected
 * @returns {Function} Handler function for the select component
 */
export const createConditionalFieldHandler = (formData, updateFormData, mainField, dependentFields) => {
  return (value) => {
    if (value === 'no') {
      // Clear dependent field values when "No" is selected
      const clearedFields = dependentFields.reduce((acc, field) => {
        acc[field] = Array.isArray(formData[field]) ? [] : '';
        return acc;
      }, {});
      
      updateFormData({
        ...formData,
        [mainField]: value,
        ...clearedFields
      });
    } else {
      // Just update the main field when "Yes" is selected
      updateFormData({ ...formData, [mainField]: value });
    }
  };
};

/**
 * Predefined field configurations for common conditional patterns
 */
export const CONDITIONAL_FIELD_CONFIGS = {
  // Technology Details - Incremental Renovation
  incrementalRenovation: {
    mainField: 'incrementalRenovation',
    dependentFields: ['patentNumbers', 'journalNumbers', 'productIdentity', 'problemAddressed']
  },
  
  // Train Run / Experimentation
  trainRun: {
    mainField: 'trainRun',
    dependentFields: ['experimentResults', 'evidence', 'minuteOfMeeting', 'attachments']
  },
  
  // Patent Published
  patentPublished: {
    mainField: 'patentPublished',
    dependentFields: ['publicationNumber']
  },
  
  // Post Grant Opposed
  apopposed: {
    mainField: 'apopposed',
    dependentFields: ['oname', 'attachments', 'cfbopposer', 'boaof', 'rffo', 'orpby', 'eagency', 'revby']
  },
  
  // Patent Status
  patentStatus: {
    mainField: 'patentStatus',
    dependentFields: ['patentNumber', 'patentAttachment', 'patentGrantDate', 'rejectionReasonAttachment']
  },
  
  // Collaboration
  collaboration: {
    mainField: 'collaboration',
    dependentFields: ['collaboratorName', 'collaboratorCountry', 'entityJournalNumbers', 'entityProductIdentity']
  }
};

/**
 * Creates a handler using predefined configurations
 * @param {Object} formData - Current form data
 * @param {Function} updateFormData - Function to update form data
 * @param {string} configKey - Key from CONDITIONAL_FIELD_CONFIGS
 * @returns {Function} Handler function for the select component
 */
export const createPredefinedHandler = (formData, updateFormData, configKey) => {
  const config = CONDITIONAL_FIELD_CONFIGS[configKey];
  if (!config) {
    throw new Error(`No predefined configuration found for key: ${configKey}`);
  }
  
  return createConditionalFieldHandler(formData, updateFormData, config.mainField, config.dependentFields);
};

/**
 * Clears all conditional fields for a given configuration
 * Useful for form reset or when loading data
 * @param {Object} formData - Current form data
 * @param {Function} updateFormData - Function to update form data
 * @param {string} configKey - Key from CONDITIONAL_FIELD_CONFIGS
 */
export const clearConditionalFields = (formData, updateFormData, configKey) => {
  const config = CONDITIONAL_FIELD_CONFIGS[configKey];
  if (!config) {
    throw new Error(`No predefined configuration found for key: ${configKey}`);
  }
  
  const clearedFields = config.dependentFields.reduce((acc, field) => {
    acc[field] = Array.isArray(formData[field]) ? [] : '';
    return acc;
  }, {});
  
  updateFormData({
    ...formData,
    ...clearedFields
  });
};
