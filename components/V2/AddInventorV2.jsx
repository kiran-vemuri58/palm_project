'use client';

import React from 'react';
import { Plus, Trash, Save, User } from 'lucide-react';
import useV2Store from '@/store/v2Store';

const AddInventorV2 = ({
  page = 'inventionRecognition',
  isEditable = true,
  isNewAsset = false
}) => {
  // Get inventors and actions from store
  const formData = useV2Store((state) => state.getFormData(page));
  
  // Handle inventors as an object with nested inventors array
  let inventors = [];
  if (formData.inventors) {
    if (Array.isArray(formData.inventors)) {
      inventors = formData.inventors;
      console.log('🔍 AddInventorV2: inventors is direct array:', inventors);
    } else if (formData.inventors.inventors && Array.isArray(formData.inventors.inventors)) {
      inventors = formData.inventors.inventors;
      console.log('🔍 AddInventorV2: inventors is nested object, extracted array:', inventors);
    } else {
      console.log('🔍 AddInventorV2: inventors structure unknown:', formData.inventors);
    }
  } else {
    console.log('🔍 AddInventorV2: no inventors data found');
  }
  const addInventor = useV2Store((state) => state.addInventor);
  const updateInventor = useV2Store((state) => state.updateInventor);
  const removeInventor = useV2Store((state) => state.removeInventor);
  const markInventorAsSaved = useV2Store((state) => state.markInventorAsSaved);

  const handleAddInventor = () => {
    addInventor(page);
  };

  const handleUpdateInventor = (index, field, value) => {
    updateInventor(page, index, field, value);
  };

  const handleRemoveInventor = (index) => {
    removeInventor(page, index);
  };

  const handleSaveInventor = (index) => {
    markInventorAsSaved(page, index);
  };

  const canAddAnother = inventors.length > 0 && inventors.some(inventor => inventor.isSaved);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Inventors</h3>
              <p className="text-sm text-gray-600">Add and manage inventor information</p>
            </div>
          </div>
          
          {isEditable && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {inventors.length} inventor{inventors.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Add First Inventor Button */}
        {inventors.length === 0 && isEditable && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No Inventors Added</h4>
            <p className="text-gray-500 mb-6">Start by adding the first inventor to your invention</p>
            <button
              onClick={handleAddInventor}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Add First Inventor</span>
            </button>
          </div>
        )}

        {/* Inventor List */}
        {inventors.length > 0 && (
          <div className="space-y-4">
            {inventors.map((inventor, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">
                      Inventor {index + 1}
                    </h4>
                    {inventor.isSaved && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Saved
                      </span>
                    )}
                  </div>
                  
                  {isEditable && (
                    <button
                      onClick={() => handleRemoveInventor(index)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove inventor"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={inventor.name || ''}
                      onChange={(e) => handleUpdateInventor(index, 'name', e.target.value)}
                      disabled={!isEditable}
                      placeholder="Enter inventor name"
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                        'border-gray-200 focus:border-blue-500'
                      } ${
                        !isEditable
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-white'
                      }`}
                    />
                  </div>

                  {/* Department ID */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Department ID
                    </label>
                    <input
                      type="text"
                      value={inventor.deptId || ''}
                      onChange={(e) => handleUpdateInventor(index, 'deptId', e.target.value)}
                      disabled={!isEditable}
                      placeholder="Enter department ID"
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                        'border-gray-200 focus:border-blue-500'
                      } ${
                        !isEditable
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-white'
                      }`}
                    />
                  </div>

                  {/* Employee ID */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      value={inventor.empId || ''}
                      onChange={(e) => handleUpdateInventor(index, 'empId', e.target.value)}
                      disabled={!isEditable}
                      placeholder="Enter employee ID"
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                        'border-gray-200 focus:border-blue-500'
                      } ${
                        !isEditable
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-white'
                      }`}
                    />
                  </div>
                </div>

                {/* Save Button */}
                {isEditable && !inventor.isSaved && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleSaveInventor(index)}
                      disabled={!inventor.name?.trim()}
                      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        inventor.name?.trim()
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Inventor</span>
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Add Another Inventor Button */}
            {isEditable && canAddAnother && (
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={handleAddInventor}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Another Inventor</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddInventorV2;
