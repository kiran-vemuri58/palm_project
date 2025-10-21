'use client';

import React from 'react';
import useV2Store from '@/store/v2Store';
import { FileText, Plus, Trash2, Calendar, Upload, X } from 'lucide-react';

const FERV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};

  const emptyFER = {
    ferReceived: '',
    ferDate: '',
    ferArgument: '',
    examinerCitations: [],
    relevancyDetails: '',
    decisionPage: [],
    ferPrepared: '',
    ferPreparer: '',
    ferFilingDate: '',
    amendments: '',
    patentProsecutor: '',
    externalAgency: '',
    agencyCost: '',
    relevancyPreparer: ''
  };

  const ferList = safeFormData.ppfer_list || [];

  const handleAddFer = () => {
    const updatedList = [...ferList, { ...emptyFER }];
    updateFormData(page, 'ppfer_list', updatedList);
  };

  const handleDeleteFer = (index) => {
    const updatedList = ferList.filter((_, i) => i !== index);
    updateFormData(page, 'ppfer_list', updatedList);
  };

  const handleChange = (index, fieldName, value) => {
    const updatedList = [...ferList];
    updatedList[index][fieldName] = value;
    updateFormData(page, 'ppfer_list', updatedList);
  };

  const handleFileUpload = (index, fieldName, files) => {
    const fileArray = Array.from(files);
    const updatedList = [...ferList];
    updatedList[index][fieldName] = fileArray;
    updateFormData(page, 'ppfer_list', updatedList);
  };

  const removeFile = (index, fieldName, fileIndex) => {
    const updatedList = [...ferList];
    updatedList[index][fieldName] = updatedList[index][fieldName].filter((_, i) => i !== fileIndex);
    updateFormData(page, 'ppfer_list', updatedList);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-lg p-2">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">First Examination Report (FER)</h3>
              <p className="text-blue-100 text-sm">Examination reports and responses</p>
            </div>
          </div>
          <button
            onClick={handleAddFer}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-4 py-2 rounded-lg transition-colors duration-200 text-sm flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add FER
          </button>
        </div>
      </div>

      <div className="p-6">
        {ferList.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-500 mb-2">No FER Reports</h4>
            <p className="text-gray-400 mb-6">Click "Add FER" to create your first examination report</p>
            <button onClick={handleAddFer} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add First FER
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {ferList.map((fer, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-800">
                    FER Report #{index + 1}
                  </h4>
                  <button
                    onClick={() => handleDeleteFer(index)}
                    className="text-red-600 border-red-200 hover:bg-red-50 px-3 py-2 border rounded-lg transition-colors duration-200 text-sm flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </button>
                </div>

                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      FER received from Patent Office
                    </label>
                    <select
                      value={fer.ferReceived || ""}
                      onChange={(e) => handleChange(index, 'ferReceived', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                    >
                      <option value="">Select status</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Date of FER
                    </label>
                    <input
                      name="ferDate"
                      type="date"
                      value={fer.ferDate || ''}
                      onChange={(e) => handleChange(index, 'ferDate', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Main argument of FER
                    </label>
                    <select
                      value={fer.ferArgument || ""}
                      onChange={(e) => handleChange(index, 'ferArgument', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                    >
                      <option value="">Select</option>
                      <option value="technical">Technical</option>
                      <option value="non-technical">Non-Technical</option>
                    </select>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      References cited by examiner
                      <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, JPG, PNG - Max 20MB)</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(index, 'examinerCitations', e.target.files)}
                        className="hidden"
                        id={`examinerCitations-${index}`}
                      />
                      <label
                        htmlFor={`examinerCitations-${index}`}
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <Upload className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-600">Click to upload files</span>
                      </label>
                      
                      {/* File List */}
                      {fer.examinerCitations && fer.examinerCitations.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {fer.examinerCitations.map((file, fileIndex) => (
                            <div key={fileIndex} className="flex items-center justify-between bg-white p-2 rounded border">
                              <span className="text-sm text-gray-700 truncate">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => removeFile(index, 'examinerCitations', fileIndex)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Relevancy details
                    </label>
                    <input
                      name="ferRelevancyDetails"
                      type="text"
                      placeholder="Enter relevancy details"
                      value={fer.relevancyDetails || ''}
                      onChange={(e) => handleChange(index, 'relevancyDetails', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Decision page
                      <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, JPG, PNG - Max 20MB)</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(index, 'decisionPage', e.target.files)}
                        className="hidden"
                        id={`decisionPage-${index}`}
                      />
                      <label
                        htmlFor={`decisionPage-${index}`}
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <Upload className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-600">Click to upload files</span>
                      </label>
                      
                      {/* File List */}
                      {fer.decisionPage && fer.decisionPage.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {fer.decisionPage.map((file, fileIndex) => (
                            <div key={fileIndex} className="flex items-center justify-between bg-white p-2 rounded border">
                              <span className="text-sm text-gray-700 truncate">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => removeFile(index, 'decisionPage', fileIndex)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      FER response prepared
                    </label>
                    <select
                      value={fer.ferPrepared || ""}
                      onChange={(e) => handleChange(index, 'ferPrepared', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      FER response preparer
                    </label>
                    <input
                      name="ferPreparer"
                      type="text"
                      placeholder="Enter FER preparer"
                      value={fer.ferPreparer || ''}
                      onChange={(e) => handleChange(index, 'ferPreparer', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      FER response filing date
                    </label>
                    <input
                      name="ferFilingDate"
                      type="date"
                      value={fer.ferFilingDate || ''}
                      onChange={(e) => handleChange(index, 'ferFilingDate', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                    />
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Main amendments done
                    </label>
                    <input
                      name="ferAmendments"
                      type="text"
                      placeholder="Enter amendments"
                      value={fer.amendments || ''}
                      onChange={(e) => handleChange(index, 'amendments', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Patent Prosecutor
                    </label>
                    <input
                      name="ferPatentProsecutor"
                      type="text"
                      placeholder="Enter patent prosecutor"
                      value={fer.patentProsecutor || ''}
                      onChange={(e) => handleChange(index, 'patentProsecutor', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      External Agency
                    </label>
                    <input
                      name="ferExternalAgency"
                      type="text"
                      placeholder="Enter external agency"
                      value={fer.externalAgency || ''}
                      onChange={(e) => handleChange(index, 'externalAgency', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                    />
                  </div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Cost spent on Agency
                    </label>
                    <input
                      name="ferAgencyCost"
                      type="text"
                      placeholder="Enter agency cost"
                      value={fer.agencyCost || ''}
                      onChange={(e) => handleChange(index, 'agencyCost', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Relevancy details (Preparer)
                    </label>
                    <input
                      name="ferRelevancyPreparer"
                      type="text"
                      placeholder="Enter relevancy preparer"
                      value={fer.relevancyPreparer || ''}
                      onChange={(e) => handleChange(index, 'relevancyPreparer', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FERV2;