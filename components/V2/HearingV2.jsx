'use client';

import React from 'react';
import useV2Store from '@/store/v2Store';
import { Gavel, Plus, Trash2, Calendar, Users, FileText, Upload, X } from 'lucide-react';

const HearingV2 = ({ formData, updateFormData, page }) => {
  const safeFormData = formData || {};

  const emptyHearing = {
    noticeReceived: '',
    hearingDate: '',
    hearingType: '',
    mainArgument: '',
    references: '',
    relevancy: '',
    hearingMinutes: [],
    responsePrepared: '',
    appearance: '',
    responsePreparer: '',
    responseFilingDate: '',
    amendments: '',
    people: '',
    controllerName: '',
    rejectionAfterFinal: '',
    patentProsecutor: '',
    externalAgency: '',
    agencyCost: '',
    relevancyPreparer: '',
    hours: ''
  };

  const hearingList = safeFormData.pph_list || [];

  const handleChange = (index, fieldName, value) => {
    const updatedList = [...hearingList];
    updatedList[index][fieldName] = value;
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, 'pph_list', updatedList);
    } else {
      updateFormData('hearingList', updatedList);
    }
  };

  const handleFileUpload = (index, fieldName, files) => {
    const fileArray = Array.from(files);
    const updatedList = [...hearingList];
    updatedList[index][fieldName] = fileArray;
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, 'pph_list', updatedList);
    } else {
      updateFormData('hearingList', updatedList);
    }
  };

  const removeFile = (index, fieldName, fileIndex) => {
    const updatedList = [...hearingList];
    updatedList[index][fieldName] = updatedList[index][fieldName].filter((_, i) => i !== fileIndex);
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, 'pph_list', updatedList);
    } else {
      updateFormData('hearingList', updatedList);
    }
  };

  const addHearing = () => {
    const updatedList = [...hearingList, { ...emptyHearing }];
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, 'pph_list', updatedList);
    } else {
      updateFormData('hearingList', updatedList);
    }
  };

  const removeHearing = (index) => {
    const updatedList = hearingList.filter((_, i) => i !== index);
    if (page) {
      const storeUpdateFormData = useV2Store.getState().updateFormData;
      storeUpdateFormData(page, 'pph_list', updatedList);
    } else {
      updateFormData('hearingList', updatedList);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-lg p-2">
              <Gavel className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Hearing Details</h3>
              <p className="text-green-100 text-sm">Hearing proceedings and responses</p>
            </div>
          </div>
          <button
            onClick={addHearing}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-4 py-2 rounded-lg transition-colors duration-200 text-sm flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Hearing
          </button>
        </div>
      </div>

      <div className="p-6">
        {hearingList.length === 0 ? (
          <div className="text-center py-12">
            <Gavel className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-500 mb-2">No Hearing Entries</h4>
            <p className="text-gray-400 mb-6">Click "Add Hearing" to create your first hearing entry</p>
            <button onClick={addHearing} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add First Hearing
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {hearingList.map((hearing, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </span>
                    Hearing Entry #{index + 1}
                  </h4>
                  <div className="flex space-x-2">
                    {hearingList.length > 1 && (
                      <button 
                        onClick={() => removeHearing(index)}
                        className="flex items-center space-x-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    )}
                    {index === hearingList.length - 1 && (
                      <button 
                        onClick={addHearing}
                        className="flex items-center space-x-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Hearing</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Basic Information */}
                <div className="space-y-4 mb-6">
                  <h5 className="text-md font-semibold text-gray-700 border-b border-gray-300 pb-2">
                    Basic Information
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Hearing Notice Received
                      </label>
                      <select
                        value={hearing.noticeReceived || ""}
                        onChange={(e) => handleChange(index, 'noticeReceived', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Hearing Date
                      </label>
                      <input
                        name="hearingDate"
                        type="date"
                        value={hearing.hearingDate || ''}
                        onChange={(e) => handleChange(index, 'hearingDate', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Hearing Type
                      </label>
                      <select
                        value={hearing.hearingType || ""}
                        onChange={(e) => handleChange(index, 'hearingType', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      >
                        <option value="">Select type</option>
                        <option value="physical">Physical</option>
                        <option value="online">Online</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Arguments and References */}
                <div className="space-y-4 mb-6">
                  <h5 className="text-md font-semibold text-gray-700 border-b border-gray-300 pb-2">
                    Arguments and References
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Main Argument of Hearing
                      </label>
                      <input
                        name="hearingMainArgument"
                        type="text"
                        placeholder="Enter main argument"
                        value={hearing.mainArgument || ''}
                        onChange={(e) => handleChange(index, 'mainArgument', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        References Cited in Hearing
                      </label>
                      <input
                        name="hearingReferences"
                        type="text"
                        placeholder="Enter references"
                        value={hearing.references || ''}
                        onChange={(e) => handleChange(index, 'references', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Relevancy
                      </label>
                      <input
                        name="hearingRelevancy"
                        type="text"
                        placeholder="Enter relevancy details"
                        value={hearing.relevancy || ''}
                        onChange={(e) => handleChange(index, 'relevancy', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Hearing Minutes */}
                <div className="space-y-4 mb-6">
                  <h5 className="text-md font-semibold text-gray-700 border-b border-gray-300 pb-2">
                    Hearing Minutes
                  </h5>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Hearing Minutes of Meeting
                      <span className="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX, JPG, PNG - Max 20MB)</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-green-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(index, 'hearingMinutes', e.target.files)}
                        className="hidden"
                        id={`hearingMinutes-${index}`}
                      />
                      <label
                        htmlFor={`hearingMinutes-${index}`}
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <Upload className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-600">Click to upload files</span>
                      </label>
                      
                      {/* File List */}
                      {hearing.hearingMinutes && hearing.hearingMinutes.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {hearing.hearingMinutes.map((file, fileIndex) => (
                            <div key={fileIndex} className="flex items-center justify-between bg-white p-2 rounded border">
                              <span className="text-sm text-gray-700 truncate">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => removeFile(index, 'hearingMinutes', fileIndex)}
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

                {/* Response Information */}
                <div className="space-y-4 mb-6">
                  <h5 className="text-md font-semibold text-gray-700 border-b border-gray-300 pb-2">
                    Response Information
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Response Prepared
                      </label>
                      <select
                        value={hearing.responsePrepared || ""}
                        onChange={(e) => handleChange(index, 'responsePrepared', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Appearance
                      </label>
                      <input
                        name="hearingAppearance"
                        type="text"
                        placeholder="Enter appearance details"
                        value={hearing.appearance || ''}
                        onChange={(e) => handleChange(index, 'appearance', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Response Preparer
                      </label>
                      <input
                        name="hearingResponsePreparer"
                        type="text"
                        placeholder="Enter response preparer"
                        value={hearing.responsePreparer || ''}
                        onChange={(e) => handleChange(index, 'responsePreparer', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Filing and Amendments */}
                <div className="space-y-4 mb-6">
                  <h5 className="text-md font-semibold text-gray-700 border-b border-gray-300 pb-2">
                    Filing and Amendments
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Response Filing Date
                      </label>
                      <input
                        name="hearingResponseFilingDate"
                        type="date"
                        value={hearing.responseFilingDate || ''}
                        onChange={(e) => handleChange(index, 'responseFilingDate', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Amendments
                      </label>
                      <input
                        name="hearingAmendments"
                        type="text"
                        placeholder="Enter amendments"
                        value={hearing.amendments || ''}
                        onChange={(e) => handleChange(index, 'amendments', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Personnel and Agency */}
                <div className="space-y-4 mb-6">
                  <h5 className="text-md font-semibold text-gray-700 border-b border-gray-300 pb-2">
                    Personnel and Agency Details
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        People Involved
                      </label>
                      <input
                        name="hearingPeople"
                        type="text"
                        placeholder="Enter people involved"
                        value={hearing.people || ''}
                        onChange={(e) => handleChange(index, 'people', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Controller Name
                      </label>
                      <input
                        name="hearingControllerName"
                        type="text"
                        placeholder="Enter controller name"
                        value={hearing.controllerName || ''}
                        onChange={(e) => handleChange(index, 'controllerName', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Rejection After Final
                      </label>
                      <select
                        value={hearing.rejectionAfterFinal || ""}
                        onChange={(e) => handleChange(index, 'rejectionAfterFinal', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Final Details */}
                <div className="space-y-4">
                  <h5 className="text-md font-semibold text-gray-700 border-b border-gray-300 pb-2">
                    Final Details
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Patent Prosecutor
                      </label>
                      <input
                        name="hearingPatentProsecutor"
                        type="text"
                        placeholder="Enter patent prosecutor"
                        value={hearing.patentProsecutor || ''}
                        onChange={(e) => handleChange(index, 'patentProsecutor', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        External Agency
                      </label>
                      <input
                        name="hearingExternalAgency"
                        type="text"
                        placeholder="Enter external agency"
                        value={hearing.externalAgency || ''}
                        onChange={(e) => handleChange(index, 'externalAgency', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Agency Cost
                      </label>
                      <input
                        name="hearingAgencyCost"
                        type="text"
                        placeholder="Enter agency cost"
                        value={hearing.agencyCost || ''}
                        onChange={(e) => handleChange(index, 'agencyCost', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Hours
                      </label>
                      <input
                        name="hearingHours"
                        type="text"
                        placeholder="Enter hours"
                        value={hearing.hours || ''}
                        onChange={(e) => handleChange(index, 'hours', e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Relevancy Preparer
                    </label>
                    <input
                      name="hearingRelevancyPreparer"
                      type="text"
                      placeholder="Enter relevancy preparer"
                      value={hearing.relevancyPreparer || ''}
                      onChange={(e) => handleChange(index, 'relevancyPreparer', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
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

export default HearingV2;