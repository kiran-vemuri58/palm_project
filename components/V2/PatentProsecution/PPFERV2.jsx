'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash, Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

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

const PPFERV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};
  const [ferList, setFerList] = useState([]);

  useEffect(() => {
    if (safeFormData.ppfer_list && Array.isArray(safeFormData.ppfer_list)) {
      setFerList(safeFormData.ppfer_list);
    }
  }, [safeFormData.ppfer_list]);

  const handleChange = (field, value) => {
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, field, value);
    } else {
      updateFormData(field, value);
    }
  };

  const handleFerChange = (index, field, value) => {
    const updatedList = [...ferList];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setFerList(updatedList);
    handleChange('ppfer_list', updatedList);
  };

  const handleFileChange = (index, field, fileList) => {
    const files = Array.from(fileList);
    const updatedList = [...ferList];
    updatedList[index] = { ...updatedList[index], [field]: files };
    setFerList(updatedList);
    handleChange('ppfer_list', updatedList);
  };

  const removeFile = (index, field, fileIndex) => {
    const updatedList = [...ferList];
    const currentFiles = updatedList[index][field] || [];
    const newFiles = currentFiles.filter((_, i) => i !== fileIndex);
    updatedList[index] = { ...updatedList[index], [field]: newFiles };
    setFerList(updatedList);
    handleChange('ppfer_list', updatedList);
  };

  const handleAddFer = () => {
    const updatedList = [...ferList, { ...emptyFER }];
    setFerList(updatedList);
    handleChange('ppfer_list', updatedList);
  };

  const handleDeleteFer = (index) => {
    const updatedList = ferList.filter((_, i) => i !== index);
    setFerList(updatedList);
    handleChange('ppfer_list', updatedList);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">First Examination Report (FER)</h3>
              <p className="text-purple-100 text-sm mt-1">Details about FER responses and amendments</p>
            </div>
          </div>
          <button
            onClick={handleAddFer}
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
          >
            <Plus className="h-4 w-4 text-white" />
            <span className="text-white font-medium">Add FER</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {ferList.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No FER Entries Added</h4>
            <p className="text-gray-500 mb-6">Start by adding the first FER entry</p>
            <button
              onClick={handleAddFer}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Add First FER</span>
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {ferList.map((fer, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">FER Entry #{index + 1}</h4>
                  </div>
                  {ferList.length > 1 && (
                    <button
                      onClick={() => handleDeleteFer(index)}
                      className="flex items-center space-x-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-200"
                    >
                      <Trash className="w-4 h-4" />
                      <span className="text-sm font-medium">Remove</span>
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        FER received from Patent Office
                      </label>
                      <select
                        value={fer.ferReceived || ''}
                        onChange={(e) => handleFerChange(index, 'ferReceived', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Date of FER
                      </label>
                      <input
                        type="date"
                        value={fer.ferDate || ''}
                        onChange={(e) => handleFerChange(index, 'ferDate', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Main argument of FER
                      </label>
                      <select
                        value={fer.ferArgument || ''}
                        onChange={(e) => handleFerChange(index, 'ferArgument', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                      >
                        <option value="">Select</option>
                        <option value="technical">Technical</option>
                        <option value="non-technical">Non-Technical</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        References cited by examiner
                      </label>
                      <div className="flex flex-col items-center justify-center w-full">
                        <label
                          htmlFor={`fer-examiner-citations-${index}`}
                          className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex flex-col items-center justify-center pt-3 pb-3">
                            <Upload className="w-6 h-6 mb-2 text-gray-500" />
                            <p className="text-xs text-gray-600">Upload files</p>
                          </div>
                          <input
                            id={`fer-examiner-citations-${index}`}
                            type="file"
                            className="hidden"
                            multiple
                            onChange={(e) => handleFileChange(index, 'examinerCitations', e.target.files)}
                          />
                        </label>
                      </div>
                      {fer.examinerCitations && fer.examinerCitations.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {fer.examinerCitations.map((file, fileIndex) => (
                            <div key={fileIndex} className="flex items-center justify-between p-2 bg-white rounded border">
                              <span className="text-xs text-gray-800">{file.name || file}</span>
                              <button
                                type="button"
                                onClick={() => removeFile(index, 'examinerCitations', fileIndex)}
                                className="text-red-600 hover:text-red-800 focus:outline-none"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Relevancy details
                      </label>
                      <input
                        type="text"
                        value={fer.relevancyDetails || ''}
                        onChange={(e) => handleFerChange(index, 'relevancyDetails', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter relevancy details"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Decision page
                      </label>
                      <div className="flex flex-col items-center justify-center w-full">
                        <label
                          htmlFor={`fer-decision-page-${index}`}
                          className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex flex-col items-center justify-center pt-3 pb-3">
                            <Upload className="w-6 h-6 mb-2 text-gray-500" />
                            <p className="text-xs text-gray-600">Upload files</p>
                          </div>
                          <input
                            id={`fer-decision-page-${index}`}
                            type="file"
                            className="hidden"
                            multiple
                            onChange={(e) => handleFileChange(index, 'decisionPage', e.target.files)}
                          />
                        </label>
                      </div>
                      {fer.decisionPage && fer.decisionPage.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {fer.decisionPage.map((file, fileIndex) => (
                            <div key={fileIndex} className="flex items-center justify-between p-2 bg-white rounded border">
                              <span className="text-xs text-gray-800">{file.name || file}</span>
                              <button
                                type="button"
                                onClick={() => removeFile(index, 'decisionPage', fileIndex)}
                                className="text-red-600 hover:text-red-800 focus:outline-none"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        FER response prepared
                      </label>
                      <select
                        value={fer.ferPrepared || ''}
                        onChange={(e) => handleFerChange(index, 'ferPrepared', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        FER response preparer
                      </label>
                      <input
                        type="text"
                        value={fer.ferPreparer || ''}
                        onChange={(e) => handleFerChange(index, 'ferPreparer', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter preparer ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        FER response filing date
                      </label>
                      <input
                        type="date"
                        value={fer.ferFilingDate || ''}
                        onChange={(e) => handleFerChange(index, 'ferFilingDate', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Main amendments done
                      </label>
                      <input
                        type="text"
                        value={fer.amendments || ''}
                        onChange={(e) => handleFerChange(index, 'amendments', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter amendments details"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Patent Prosecutor
                      </label>
                      <input
                        type="text"
                        value={fer.patentProsecutor || ''}
                        onChange={(e) => handleFerChange(index, 'patentProsecutor', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter Employee ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        External Agency
                      </label>
                      <input
                        type="text"
                        value={fer.externalAgency || ''}
                        onChange={(e) => handleFerChange(index, 'externalAgency', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter External Agency"
                      />
                    </div>
                  </div>

                  {/* Row 5 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Cost spent on Agency
                      </label>
                      <input
                        type="text"
                        value={fer.agencyCost || ''}
                        onChange={(e) => handleFerChange(index, 'agencyCost', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter cost spent on agency"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Relevancy details (Preparer)
                      </label>
                      <input
                        type="text"
                        value={fer.relevancyPreparer || ''}
                        onChange={(e) => handleFerChange(index, 'relevancyPreparer', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter Employee ID"
                      />
                    </div>
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

export default PPFERV2;
