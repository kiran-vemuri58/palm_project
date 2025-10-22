'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash, Upload, X } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const emptyHearing = {
  noticeReceived: '',
  hearingDate: '',
  hearingType: '',
  mainArgument: '',
  references: '',
  relevancy: '',
  decisionPage: [],
  responsePrepared: '',
  appearance: '',
  responsePreparer: '',
  responseFilingDate: '',
  amendments: '',
  people: '',
  hearingMinutes: [],
  controllerName: '',
  rejectionAfterFinal: '',
  patentProsecutor: '',
  externalAgency: '',
  agencyCost: '',
  relevancyPreparer: '',
  hours: '',
};

const PPHearingV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};
  const [hearingList, setHearingList] = useState([]);

  useEffect(() => {
    if (safeFormData.pph_list && Array.isArray(safeFormData.pph_list)) {
      setHearingList(safeFormData.pph_list);
    }
  }, [safeFormData.pph_list]);

  const handleChange = (field, value) => {
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, field, value);
    } else {
      updateFormData(field, value);
    }
  };

  const handleHearingChange = (index, field, value) => {
    const updatedList = [...hearingList];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setHearingList(updatedList);
    handleChange('pph_list', updatedList);
  };

  const handleFileChange = (index, field, fileList) => {
    const files = Array.from(fileList);
    const updatedList = [...hearingList];
    updatedList[index] = { ...updatedList[index], [field]: files };
    setHearingList(updatedList);
    handleChange('pph_list', updatedList);
  };

  const removeFile = (index, field, fileIndex) => {
    const updatedList = [...hearingList];
    const currentFiles = updatedList[index][field] || [];
    const newFiles = currentFiles.filter((_, i) => i !== fileIndex);
    updatedList[index] = { ...updatedList[index], [field]: newFiles };
    setHearingList(updatedList);
    handleChange('pph_list', updatedList);
  };

  const handleAddHearing = () => {
    const updatedList = [...hearingList, { ...emptyHearing }];
    setHearingList(updatedList);
    handleChange('pph_list', updatedList);
  };

  const handleDeleteHearing = (index) => {
    const updatedList = hearingList.filter((_, i) => i !== index);
    setHearingList(updatedList);
    handleChange('pph_list', updatedList);
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
              <h3 className="text-xl font-semibold text-white">Hearing Details</h3>
              <p className="text-purple-100 text-sm mt-1">Details about patent hearing proceedings</p>
            </div>
          </div>
          <button
            onClick={handleAddHearing}
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
          >
            <Plus className="h-4 w-4 text-white" />
            <span className="text-white font-medium">Add Hearing</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {hearingList.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No Hearing Entries Added</h4>
            <p className="text-gray-500 mb-6">Start by adding the first hearing entry</p>
            <button
              onClick={handleAddHearing}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Add First Hearing</span>
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {hearingList.map((hearing, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">Hearing Entry #{index + 1}</h4>
                  </div>
                  {hearingList.length > 1 && (
                    <button
                      onClick={() => handleDeleteHearing(index)}
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
                        Hearing Notice Received
                      </label>
                      <select
                        value={hearing.noticeReceived || ''}
                        onChange={(e) => handleHearingChange(index, 'noticeReceived', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Hearing Date
                      </label>
                      <input
                        type="date"
                        value={hearing.hearingDate || ''}
                        onChange={(e) => handleHearingChange(index, 'hearingDate', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Hearing Type
                      </label>
                      <select
                        value={hearing.hearingType || ''}
                        onChange={(e) => handleHearingChange(index, 'hearingType', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                      >
                        <option value="">Select</option>
                        <option value="physical">Physical</option>
                        <option value="online">Online</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Main Argument of Hearing
                      </label>
                      <input
                        type="text"
                        value={hearing.mainArgument || ''}
                        onChange={(e) => handleHearingChange(index, 'mainArgument', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter main argument"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        References Cited in Hearing
                      </label>
                      <input
                        type="text"
                        value={hearing.references || ''}
                        onChange={(e) => handleHearingChange(index, 'references', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter references"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Relevancy Details
                      </label>
                      <input
                        type="text"
                        value={hearing.relevancy || ''}
                        onChange={(e) => handleHearingChange(index, 'relevancy', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter relevancy details"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Decision Page
                      </label>
                      <div className="flex flex-col items-center justify-center w-full">
                        <label
                          htmlFor={`hearing-decision-page-${index}`}
                          className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex flex-col items-center justify-center pt-3 pb-3">
                            <Upload className="w-6 h-6 mb-2 text-gray-500" />
                            <p className="text-xs text-gray-600">Upload files</p>
                          </div>
                          <input
                            id={`hearing-decision-page-${index}`}
                            type="file"
                            className="hidden"
                            multiple
                            onChange={(e) => handleFileChange(index, 'decisionPage', e.target.files)}
                          />
                        </label>
                      </div>
                      {hearing.decisionPage && hearing.decisionPage.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {hearing.decisionPage.map((file, fileIndex) => (
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
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Hearing Response Prepared
                      </label>
                      <select
                        value={hearing.responsePrepared || ''}
                        onChange={(e) => handleHearingChange(index, 'responsePrepared', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Appearance Confirmation
                      </label>
                      <input
                        type="text"
                        value={hearing.appearance || ''}
                        onChange={(e) => handleHearingChange(index, 'appearance', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter appearance confirmation"
                      />
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Hearing Response Preparer
                      </label>
                      <input
                        type="text"
                        value={hearing.responsePreparer || ''}
                        onChange={(e) => handleHearingChange(index, 'responsePreparer', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter preparer ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Hearing Response Filing Date
                      </label>
                      <input
                        type="date"
                        value={hearing.responseFilingDate || ''}
                        onChange={(e) => handleHearingChange(index, 'responseFilingDate', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Hearing Amendments Done
                      </label>
                      <input
                        type="text"
                        value={hearing.amendments || ''}
                        onChange={(e) => handleHearingChange(index, 'amendments', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter amendments details"
                      />
                    </div>
                  </div>

                  {/* Row 5 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        People Appeared for Hearing
                      </label>
                      <input
                        type="text"
                        value={hearing.people || ''}
                        onChange={(e) => handleHearingChange(index, 'people', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter people details"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Hearing Minutes of Meeting
                      </label>
                      <div className="flex flex-col items-center justify-center w-full">
                        <label
                          htmlFor={`hearing-minutes-${index}`}
                          className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex flex-col items-center justify-center pt-3 pb-3">
                            <Upload className="w-6 h-6 mb-2 text-gray-500" />
                            <p className="text-xs text-gray-600">Upload files</p>
                          </div>
                          <input
                            id={`hearing-minutes-${index}`}
                            type="file"
                            className="hidden"
                            multiple
                            onChange={(e) => handleFileChange(index, 'hearingMinutes', e.target.files)}
                          />
                        </label>
                      </div>
                      {hearing.hearingMinutes && hearing.hearingMinutes.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {hearing.hearingMinutes.map((file, fileIndex) => (
                            <div key={fileIndex} className="flex items-center justify-between p-2 bg-white rounded border">
                              <span className="text-xs text-gray-800">{file.name || file}</span>
                              <button
                                type="button"
                                onClick={() => removeFile(index, 'hearingMinutes', fileIndex)}
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
                        Name of Controller (From IPO) attended
                      </label>
                      <input
                        type="text"
                        value={hearing.controllerName || ''}
                        onChange={(e) => handleHearingChange(index, 'controllerName', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter controller name"
                      />
                    </div>
                  </div>

                  {/* Row 6 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        After Final Rejection from Controller
                      </label>
                      <select
                        value={hearing.rejectionAfterFinal || ''}
                        onChange={(e) => handleHearingChange(index, 'rejectionAfterFinal', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Patent Prosecutor
                      </label>
                      <input
                        type="text"
                        value={hearing.patentProsecutor || ''}
                        onChange={(e) => handleHearingChange(index, 'patentProsecutor', e.target.value)}
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
                        value={hearing.externalAgency || ''}
                        onChange={(e) => handleHearingChange(index, 'externalAgency', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter External Agency"
                      />
                    </div>
                  </div>

                  {/* Row 7 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Cost Spent on Agency
                      </label>
                      <input
                        type="text"
                        value={hearing.agencyCost || ''}
                        onChange={(e) => handleHearingChange(index, 'agencyCost', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter cost spent on agency"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Relevancy Details (Preparer)
                      </label>
                      <input
                        type="text"
                        value={hearing.relevancyPreparer || ''}
                        onChange={(e) => handleHearingChange(index, 'relevancyPreparer', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter Employee ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Number of Hours of Hearing
                      </label>
                      <input
                        type="text"
                        value={hearing.hours || ''}
                        onChange={(e) => handleHearingChange(index, 'hours', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:border-purple-500 focus:ring-purple-500/20"
                        placeholder="Enter number of hours"
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

export default PPHearingV2;
