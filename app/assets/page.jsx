'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PatentManagementModal from "@/components/PatentManagementModal";
import SimpleProtectedRoute from "@/components/SimpleProtectedRoute";

function AssetsContent() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const rowsPerPage = 10;
  // Authentication is handled by the main header component
  const router = useRouter();
  
  // Delete functionality states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Patent management modal states
  const [patentModalOpen, setPatentModalOpen] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [selectedAssetData, setSelectedAssetData] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Search and sorting states
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('asset_id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filteredData, setFilteredData] = useState([]);

  // Error state
  const [error, setError] = useState(null);

  // Data loading useEffect - moved to top level
  useEffect(() => {
    setIsDataLoading(true);
    setError(null);
    fetch(`/api/invention?page=${currentPage}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((response) => {
        if (response.success) {
        setData(response.data || []);
        setTotalPages(response.totalPages || 1);
        } else {
          throw new Error(response.error || 'Failed to fetch data');
        }
      })
      .catch((err) => {
        console.error('Error fetching inventions:', err);
        setError(err.message || 'Failed to load patent data. Please try again.');
        setData([]);
        setTotalPages(1);
      })
      .finally(() => {
        setIsDataLoading(false);
      });
  }, [currentPage]);

  // No complex authentication logic needed - SimpleProtectedRoute handles it

  // Filter and sort data - moved to top level with other hooks
  useEffect(() => {
    let filtered = data.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      return item.asset_id.toLowerCase().includes(searchLower);
    });

    // Sort the filtered data
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle null/undefined values
      if (aValue == null) aValue = '';
      if (bValue == null) bValue = '';

      // Convert to string for comparison
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredData(filtered);
  }, [data, searchTerm, sortField, sortDirection]);

  // No authentication checks needed - SimpleProtectedRoute handles them

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };


  const handleDeleteClick = (assetId) => {
    setAssetToDelete(assetId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!assetToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/deleteAsset?assetId=${assetToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Refresh the data after successful deletion
        setIsDataLoading(true);
        setError(null);
        fetch(`/api/invention?page=${currentPage}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then((response) => {
            if (response.success) {
              setData(response.data);
              setTotalPages(response.totalPages);
            } else {
              throw new Error(response.error || 'Failed to refresh data');
            }
          })
          .catch((err) => {
            console.error('Error fetching inventions after delete:', err);
            setError('Asset deleted but failed to refresh data. Please reload the page.');
          })
          .finally(() => {
            setIsDataLoading(false);
          });

        // Close dialog and reset state
        setDeleteDialogOpen(false);
        setAssetToDelete(null);
        
        // Show success message (you can add toast notification here)
        console.log('✅ Asset deleted successfully:', result.message);
      } else {
        throw new Error(result.error || 'Failed to delete asset');
      }
    } catch (error) {
      console.error('❌ Delete error:', error);
      setError(error.message || 'Failed to delete asset. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setAssetToDelete(null);
  };

  const handleViewPatentWorkflow = async (assetId) => {
    setSelectedAssetId(assetId);
    setIsNavigating(true);
    
    try {
      // Fetch data from all 9 forms/tables
      const formEndpoints = [
        { key: 'inventionRecognition', endpoint: '/api/invention' },
        { key: 'inventionExtraction', endpoint: '/api/extraction' },
        { key: 'patentSearch', endpoint: '/api/patentability' },
        { key: 'pctApplication', endpoint: '/api/psp' },
        { key: 'completeSpec', endpoint: '/api/patentFiling' },
        { key: 'provisionalSpec', endpoint: '/api/ps' },
        { key: 'patentPublication', endpoint: '/api/patentFiling' },
        { key: 'ferReceived', endpoint: '/api/pm' },
        { key: 'ferResponse', endpoint: '/api/pc' }
      ];

      const stageData = {};
      
      // Fetch data from each endpoint in parallel for better performance
      const promises = formEndpoints.map(async (form) => {
        try {
          console.log(`🔍 Fetching data for ${form.key} from ${form.endpoint}?assetId=${assetId}`);
          const response = await fetch(`${form.endpoint}?assetId=${assetId}`);
          const result = await response.json();
          
          console.log(`📊 ${form.key} response:`, result);
          
          // Check if data exists for this form
          const hasData = result.success && result.data && Object.keys(result.data).length > 0;
          console.log(`✅ ${form.key} has data:`, hasData);
          
          return {
            key: form.key,
            hasData: hasData
          };
        } catch (error) {
          console.error(`❌ Error fetching ${form.key}:`, error);
          return { key: form.key, hasData: false };
        }
      });
      
      const results = await Promise.all(promises);
      
      // Convert results to stageData object
      results.forEach(result => {
        stageData[result.key] = result.hasData;
      });
      
      setSelectedAssetData(stageData);
      setPatentModalOpen(true);
      setIsNavigating(false);
    } catch (error) {
      console.error('Error fetching asset data:', error);
      // Still open modal with no data
      setSelectedAssetData({});
      setPatentModalOpen(true);
      setIsNavigating(false);
    }
  };

  // Search and sort functions
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };


  // Show data loading state
  if (isDataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Loading Content */}
        <div className="pt-20 px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-gray-200/50 max-w-md mx-auto">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Loading Assets</h3>
                <p className="text-gray-600 mb-6">Please wait while we fetch your patent data...</p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-700 font-semibold text-lg">Loading patent workflow...</p>
            <p className="text-gray-500 text-sm mt-2">Please wait while we fetch your data</p>
          </div>
        </div>
      )}
      

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Error Display */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Data</h3>
                <p className="text-red-700 mb-4">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    setIsDataLoading(true);
                    // Retry loading data
                    fetch(`/api/invention?page=${currentPage}`)
                      .then((res) => {
                        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                        return res.json();
                      })
                      .then((response) => {
                        if (response.success) {
                          setData(response.data || []);
                          setTotalPages(response.totalPages || 1);
                        } else {
                          throw new Error(response.error || 'Failed to fetch data');
                        }
                      })
                      .catch((err) => {
                        setError(err.message || 'Failed to load patent data. Please try again.');
                      })
                      .finally(() => {
                        setIsDataLoading(false);
                      });
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Workflow Viewing Disabled Notice */}
        <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-yellow-800">Workflow Viewing Disabled</h3>
              <p className="text-yellow-700 mt-1">
                The workflow viewing functionality is currently disabled. Use the individual form pages to manage your assets.
              </p>
            </div>
          </div>
        </div>

        {/* Search and Stats Bar */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Search Bar */}
            <div className="flex-1 max-w-lg">
              <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-3">
              Search Assets
            </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                  className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl leading-5 bg-white/80 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-base shadow-lg hover:shadow-xl"
                  placeholder="Search by Asset ID, title, or inventor..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="flex space-x-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/50 min-w-[120px]">
                <div className="text-2xl font-bold text-blue-600">{filteredData.length}</div>
                <div className="text-sm text-gray-600 font-medium">Total Assets</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/50 min-w-[120px]">
                <div className="text-2xl font-bold text-green-600">{filteredData.length}</div>
                <div className="text-sm text-gray-600 font-medium">Active</div>
              </div>
            </div>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto h-32 w-32 text-gray-300 mb-6">
              {searchTerm ? (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ) : (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {searchTerm ? 'No matching assets found' : 'No inventions found'}
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm 
                ? `No assets match your search for "${searchTerm}". Try a different search term.`
                : 'Get started by creating your first patent asset to begin the patent management process.'
              }
            </p>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl border border-gray-200/50 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-blue-50/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Invention Assets</h3>
                  <p className="mt-2 text-gray-600 font-medium">A comprehensive list of all your patent applications and inventions</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Live Data</span>
            </div>
          </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-blue-50/30">
                  <tr>
                    <th 
                      className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-blue-100/50 select-none transition-colors duration-200 group"
                      onClick={() => handleSort('asset_id')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Asset ID</span>
                        {sortField === 'asset_id' && (
                          <svg className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {sortDirection === 'asc' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            )}
                          </svg>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-blue-100/50 select-none transition-colors duration-200 group"
                      onClick={() => handleSort('inventiontitle')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Invention Title</span>
                        {sortField === 'inventiontitle' && (
                          <svg className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {sortDirection === 'asc' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            )}
                          </svg>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-blue-100/50 select-none transition-colors duration-200 group"
                      onClick={() => handleSort('commonname')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Common Name</span>
                        {sortField === 'commonname' && (
                          <svg className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {sortDirection === 'asc' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            )}
                          </svg>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-blue-100/50 select-none transition-colors duration-200 group"
                      onClick={() => handleSort('inventordetails')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Inventor Details</span>
                        {sortField === 'inventordetails' && (
                          <svg className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {sortDirection === 'asc' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            )}
                          </svg>
                        )}
                      </div>
                    </th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredData.map((item, index) => (
                    <tr key={item.asset_id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 group">
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">{item.asset_id.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="text-base font-bold text-gray-900">{item.asset_id}</div>
                            <div className="text-sm text-gray-500">Asset ID</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="max-w-sm">
                          <div className="text-base font-semibold text-gray-900 truncate" title={item.inventiontitle}>
                          {item.inventiontitle}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">Invention Title</div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="max-w-sm">
                          <div className="text-base font-medium text-gray-800 truncate" title={item.commonname}>
                          {item.commonname}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">Common Name</div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="max-w-sm">
                          <div className="text-base font-medium text-gray-800 truncate" title={item.inventordetails || 'No details'}>
                          {item.inventordetails || '-'}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">Inventor Details</div>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                        <button
                          disabled={true}
                          className="group inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-gray-500 bg-gradient-to-r from-gray-300 to-gray-400 cursor-not-allowed opacity-60"
                          title="Workflow viewing is currently disabled"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View Workflow (Disabled)
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.asset_id)}
                            className="group inline-flex items-center px-4 py-3 border border-transparent text-sm font-semibold rounded-xl text-red-600 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 focus:outline-none focus:ring-4 focus:ring-red-500/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                        </div>
                      </td>
            </tr>
          ))}
        </tbody>
      </table>
            </div>

            {/* Pagination */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 px-8 py-6 flex items-center justify-between border-t border-gray-200/50">
              <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1 || isDataLoading}
                  className="group relative inline-flex items-center px-6 py-3 border-2 border-gray-300 text-sm font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-gray-500/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:transform-none"
        >
          <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || isDataLoading}
                  className="group ml-3 relative inline-flex items-center px-6 py-3 border-2 border-gray-300 text-sm font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-gray-500/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:transform-none"
        >
          Next
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-700 font-medium">
                    Showing page <span className="font-bold text-blue-600">{currentPage}</span> of{' '}
                    <span className="font-bold text-blue-600">{totalPages}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {filteredData.length} assets total
                  </div>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-xl shadow-lg -space-x-px" aria-label="Pagination">
                    <button
                      onClick={handlePrev}
                      disabled={currentPage === 1 || isDataLoading}
                      className="group relative inline-flex items-center px-6 py-3 rounded-l-xl border-2 border-gray-300 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-gray-500/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:transform-none"
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages || isDataLoading}
                      className="group relative inline-flex items-center px-6 py-3 rounded-r-xl border-2 border-gray-300 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-gray-500/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:transform-none"
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl">
          <DialogHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">Confirm Deletion</DialogTitle>
            <p className="text-gray-600 mt-2">This action cannot be undone</p>
          </DialogHeader>
          <div className="py-6 px-2">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-base text-gray-800 font-medium">
                Are you sure you want to delete asset <span className="font-bold text-red-600">{assetToDelete}</span>?
              </p>
              <p className="text-sm text-red-700 mt-3 leading-relaxed">
                ⚠️ <strong>Warning:</strong> This will permanently delete all data associated with this asset from all 9 patent management tables. This action cannot be undone.
            </p>
          </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>This includes all forms, documents, and workflow data</span>
            </div>
          </div>
          <DialogFooter className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              disabled={isDeleting}
              className="flex-1 py-3 text-base font-semibold border-2 border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-gray-500/50 transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="flex-1 py-3 text-base font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white focus:ring-4 focus:ring-red-500/50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:transform-none"
            >
              {isDeleting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Deleting...
                </div>
              ) : (
                'Delete Asset'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Patent Management Modal */}
      <PatentManagementModal
        isOpen={patentModalOpen}
        onClose={() => setPatentModalOpen(false)}
        assetId={selectedAssetId}
        assetData={selectedAssetData}
      />
    </div>
  );
}

// Wrap with SimpleProtectedRoute
export default function InventionTable() {
  return (
    <SimpleProtectedRoute>
      <AssetsContent />
    </SimpleProtectedRoute>
  );
}
