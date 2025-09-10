'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import useFormStore from '@/store/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function InventionTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const rowsPerPage = 10;
  const [authChecked, setAuthChecked] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const clearAllData = useFormStore((state) => state.clearAllData);
  
  // Delete functionality states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Search and sorting states
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('asset_id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filteredData, setFilteredData] = useState([]);

  // Data loading useEffect - moved to top level
  useEffect(() => {
    setIsDataLoading(true);
    fetch(`/api/invention?page=${currentPage}`)
      .then((res) => res.json())
      .then((response) => {
        setData(response.data || []);
        setTotalPages(response.totalPages || 1);
      })
      .catch((err) => console.error('Error fetching inventions:', err))
      .finally(() => {
        setIsDataLoading(false);
      });
  }, [currentPage]);

  // Authentication check with proper timing
  useEffect(() => {
    if (isLoaded) {
      // Add a small delay to ensure all auth state is properly loaded
      const timeoutId = setTimeout(() => {
        if (!isSignedIn) {
          router.push('/');
        } else {
          setAuthChecked(true);
        }
      }, 200); // 200ms delay to ensure auth state is stable

      return () => clearTimeout(timeoutId);
    }
  }, [isLoaded, isSignedIn, router]);

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

  // Show loading while checking authentication
  if (!isLoaded || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {!isLoaded ? 'Loading...' : 'Verifying authentication...'}
          </p>
        </div>
      </div>
    );
  }

  // Show loading if not signed in (while redirecting)
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleNewAsset = () => {
    // Clear all form data before navigating to new asset
    clearAllData();
    router.push('/assetForm1');
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

      const result = await response.json();

      if (result.success) {
        // Refresh the data after successful deletion
        setIsDataLoading(true);
        fetch(`/api/invention?page=${currentPage}`)
          .then((res) => res.json())
          .then((response) => {
            if (response.success) {
              setData(response.data);
              setTotalPages(response.totalPages);
            }
          })
          .catch((err) => console.error('Error fetching inventions:', err))
          .finally(() => {
            setIsDataLoading(false);
          });

        // Close dialog and reset state
        setDeleteDialogOpen(false);
        setAssetToDelete(null);
        
        // Show success message (you can add toast notification here)
        console.log('✅ Asset deleted successfully:', result.message);
      } else {
        console.error('❌ Delete failed:', result.error);
        // You can add error toast notification here
      }
    } catch (error) {
      console.error('❌ Delete error:', error);
      // You can add error toast notification here
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setAssetToDelete(null);
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
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Invention List</h1>
          <Link 
            href="/assetForm1" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            New Asset
          </Link>
        </div>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading inventions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 mt-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Patent Management</h1>
              <p className="mt-1 text-xs text-gray-500">Manage your patent applications and inventions</p>
            </div>
            <button
              onClick={handleNewAsset}
              className="group relative inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="relative z-10">New Asset</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-4">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="max-w-md">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Assets
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search by Asset ID..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400">
              {searchTerm ? (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ) : (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {searchTerm ? 'No matching assets found' : 'No inventions found'}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {searchTerm 
                ? `No assets match your search for "${searchTerm}". Try a different search term.`
                : 'Get started by creating your first patent asset.'
              }
            </p>
            <div className="mt-6">
              <button
                onClick={handleNewAsset}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Asset
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Invention Assets</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">A list of all your patent applications and inventions</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('asset_id')}
                    >
                      <div className="flex items-center">
                        Asset ID
                        {sortField === 'asset_id' && (
                          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {sortDirection === 'asc' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            )}
                          </svg>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('inventiontitle')}
                    >
                      <div className="flex items-center">
                        Invention Title
                        {sortField === 'inventiontitle' && (
                          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {sortDirection === 'asc' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            )}
                          </svg>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('commonname')}
                    >
                      <div className="flex items-center">
                        Common Name
                        {sortField === 'commonname' && (
                          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {sortDirection === 'asc' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            )}
                          </svg>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('inventordetails')}
                    >
                      <div className="flex items-center">
                        Inventor Details
                        {sortField === 'inventordetails' && (
                          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {sortDirection === 'asc' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            )}
                          </svg>
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
          </tr>
        </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item) => (
                    <tr key={item.asset_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.asset_id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={item.inventiontitle}>
                          {item.inventiontitle}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={item.commonname}>
                          {item.commonname}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={item.inventordetails || 'No details'}>
                          {item.inventordetails || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link 
                          href={`/assetForm1?assetId=${item.asset_id}`}
                          className="group inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteClick(item.asset_id)}
                          className="group inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-red-600 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </td>
            </tr>
          ))}
        </tbody>
      </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1 || isDataLoading}
          className="group relative inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md disabled:transform-none"
        >
          <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || isDataLoading}
          className="group ml-3 relative inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md disabled:transform-none"
        >
          Next
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{currentPage}</span> of{' '}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={handlePrev}
                      disabled={currentPage === 1 || isDataLoading}
                      className="group relative inline-flex items-center px-4 py-2 rounded-l-lg border border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 text-sm font-semibold text-gray-700 hover:from-gray-100 hover:to-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md disabled:transform-none"
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages || isDataLoading}
                      className="group relative inline-flex items-center px-4 py-2 rounded-r-lg border border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 text-sm font-semibold text-gray-700 hover:from-gray-100 hover:to-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md disabled:transform-none"
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete asset <strong>{assetToDelete}</strong>?
            </p>
            <p className="text-sm text-red-600 mt-2">
              ⚠️ This action will permanently delete all data associated with this asset from all 9 tables and cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete Asset'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
