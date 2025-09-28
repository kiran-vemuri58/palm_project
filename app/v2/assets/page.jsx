'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SimpleProtectedRoute from '@/components/SimpleProtectedRoute';
import V2Navigation from '@/components/V2Navigation';
import useV2Store from '@/store/v2Store';
import axios from 'axios';
import InventionTooltip from '@/components/V2/InventionTooltip';
import ExtractionTooltip from '@/components/V2/ExtractionTooltip';
import PatentabilityTooltip from '@/components/V2/PatentabilityTooltip';
import SmartTooltip from '@/components/V2/SmartTooltip';

function AssetsV2Content() {
  const router = useRouter();
  const clearAllDataAndAssetId = useV2Store((state) => state.clearAllDataAndAssetId);
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(18);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [assetToView, setAssetToView] = useState(null);
  const [isLoadingAssetData, setIsLoadingAssetData] = useState(false);
  const [availablePages, setAvailablePages] = useState([]);

  // Fetch assets on component mount
  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/assets');
      if (response.data.success) {
        setAssets(response.data.data);
        setFilteredAssets(response.data.data);
        console.log('📋 Assets loaded:', response.data.data);
      }
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter assets based on Asset ID search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
    if (term.trim() === '') {
      setFilteredAssets(assets);
    } else {
      const filtered = assets.filter(asset => 
        asset.asset_id.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredAssets(filtered);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAssets = filteredAssets.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const handleViewClick = async (asset) => {
    setAssetToView(asset);
    setShowViewModal(true);
    setIsLoadingAssetData(true);
    
    // Fetch data from all pages and update store
    await fetchAllAssetData(asset.asset_id);
    setIsLoadingAssetData(false);
  };

  const handleViewAsset = (assetId) => {
    console.log('👁️ Viewing asset:', assetId);
    router.push(`/v2/invention-recognition?assetId=${assetId}&edit=true`);
  };

  const handleNavigateToPage = (page, assetId) => {
    console.log(`🧭 Navigating to ${page} for asset:`, assetId);
    setShowViewModal(false);
    setAssetToView(null);
    
    // Navigate to the specific page
    const pageRoutes = {
      'invention-recognition': '/v2/invention-recognition',
      'invention-extraction': '/v2/invention-extraction',
      'patentability-analysis': '/v2/patentability-analysis',
      'patent-specification': '/v2/patent-specification',
      'patent-filing': '/v2/patent-filing',
      'patent-prosecution': '/v2/patent-prosecution',
      'patent-maintenance': '/v2/patent-maintenance',
      'patent-commercialization': '/v2/patent-commercialization',
      'post-grant-opposition': '/v2/post-grant-opposition'
    };
    
    const route = pageRoutes[page];
    if (route) {
      router.push(`${route}?assetId=${assetId}&edit=true`);
    }
  };

  const handleViewModalClose = () => {
    setShowViewModal(false);
    setAssetToView(null);
  };

  const fetchAllAssetData = async (assetId) => {
    try {
      console.log('🔄 Fetching all asset data for:', assetId);
      
      // Get store functions
      const { setStoreData, mapAPIDataToStore } = useV2Store.getState();
      
      // Define all API endpoints for different pages
      const apiEndpoints = [
        { page: 'inventionRecognition', endpoint: `/api/invention/get/${assetId}`, displayName: 'Invention Recognition' },
        { page: 'inventionExtraction', endpoint: `/api/extraction/get/${assetId}`, displayName: 'Invention Extraction' },
        { page: 'patentabilityAnalysis', endpoint: `/api/patentability/get/${assetId}`, displayName: 'Patentability Analysis' },
        { page: 'patentSpecification', endpoint: `/api/patentSpecification/get/${assetId}`, displayName: 'Patent Specification' },
        { page: 'patentFiling', endpoint: `/api/patentFiling/get/${assetId}`, displayName: 'Patent Filing' },
        { page: 'patentProsecution', endpoint: `/api/patentProsecution/get/${assetId}`, displayName: 'Patent Prosecution' },
        { page: 'patentMaintenance', endpoint: `/api/patentMaintenance/get/${assetId}`, displayName: 'Patent Maintenance' },
        { page: 'patentCommercialization', endpoint: `/api/patentCommercialization/get/${assetId}`, displayName: 'Patent Commercialization' },
        { page: 'postGrantOpposition', endpoint: `/api/postGrantOpposition/get/${assetId}`, displayName: 'Post Grant Opposition' }
      ];

      // Fetch data from all endpoints in parallel
      const promises = apiEndpoints.map(async ({ page, endpoint, displayName }) => {
        try {
          console.log(`📡 Fetching ${page} data from ${endpoint}`);
          const response = await axios.get(endpoint);
          
          if (response.data.success && response.data.data) {
            console.log(`✅ ${page} data loaded:`, response.data.data);
            
            // Map API data to store format
            const mappedData = mapAPIDataToStore(response.data.data, page);
            console.log(`🔄 Mapped ${page} data for store:`, mappedData);
            
            // Update store with the data
            setStoreData(page, mappedData);
            
            return { page, displayName, success: true, data: mappedData, hasData: true };
          } else {
            console.log(`⚠️ No data found for ${page}`);
            return { page, displayName, success: false, data: null, hasData: false };
          }
        } catch (error) {
          // Check if it's a 404 error
          const is404 = error.response?.status === 404;
          console.log(`❌ Error fetching ${page}:`, error.message, is404 ? '(404 - No data found)' : '');
          return { 
            page, 
            displayName, 
            success: false, 
            error: error.message, 
            hasData: false,
            is404: is404
          };
        }
      });

      // Wait for all API calls to complete
      const results = await Promise.all(promises);
      
      // Separate successful and failed results
      const successful = results.filter(r => r.success);
      const failed = results.filter(r => !r.success);
      const availablePages = results.filter(r => r.hasData);
      
      console.log(`📊 Data fetch complete: ${successful.length} successful, ${failed.length} failed`);
      console.log(`📋 Available pages:`, availablePages.map(r => r.page));
      
      // Update available pages state
      setAvailablePages(availablePages.map(r => r.page));
      
      // Set current asset ID in store
      useV2Store.getState().setCurrentAssetId(assetId);
      
    } catch (error) {
      console.error('❌ Error fetching asset data:', error);
    }
  };

  const handleDeleteClick = (asset) => {
    setAssetToDelete(asset);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!assetToDelete) return;

    try {
      setDeleting(assetToDelete.asset_id);
      const response = await axios.delete(`/api/assets/${assetToDelete.asset_id}`);
      if (response.data.success) {
        console.log('✅ Asset deleted:', assetToDelete.asset_id);
        // Refresh the assets list
        await fetchAssets();
        setShowDeleteModal(false);
        setAssetToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting asset:', error);
      // You could add a toast notification here instead of alert
      alert('Failed to delete asset. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setAssetToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <V2Navigation />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl border border-gray-200/50 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Assets V2</h1>
                <p className="text-xl text-gray-600 mt-2">Manage your invention assets</p>
              </div>
              <button 
                onClick={() => {
                  localStorage.removeItem('v2-asset-storage');
                  window.location.href = '/v2/invention-recognition?new=true';
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                + New Asset
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by Asset ID (e.g., A0001, A0002)..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => handleSearch('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {searchTerm ? (
                  <>Showing {currentAssets.length} of {filteredAssets.length} filtered assets (Page {currentPage} of {totalPages})</>
                ) : (
                  <>Showing {currentAssets.length} of {assets.length} assets (Page {currentPage} of {totalPages})</>
                )}
              </p>
            </div>

            {/* Assets List */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-4 text-gray-600">Loading assets...</span>
              </div>
            ) : currentAssets.length === 0 ? (
              <div className="text-center py-12">
                {searchTerm ? (
                  <>
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Assets Found</h3>
                    <p className="text-gray-600 mb-6">No assets match your search criteria</p>
                    <button 
                      onClick={() => handleSearch('')}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 mr-4"
                    >
                      Clear Search
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">📋</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Assets Found</h3>
                    <p className="text-gray-600 mb-6">Create your first asset to get started</p>
                    <button 
                      onClick={() => {
                        localStorage.removeItem('v2-asset-storage');
                        window.location.href = '/v2/invention-recognition?new=true';
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Create New Asset
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentAssets.map((asset) => (
                    <div key={asset.asset_id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 font-mono">
                            {asset.asset_id}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {asset.inventiontitle || 'Untitled Invention'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Created: {new Date(asset.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewClick(asset)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                          👁️ View
                        </button>
                        <button
                          onClick={() => handleDeleteClick(asset)}
                          disabled={deleting === asset.asset_id}
                          className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                          {deleting === asset.asset_id ? '⏳' : '🗑️'} Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-8 px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                          // Show first page, last page, current page, and pages around current
                          const shouldShow = 
                            page === 1 || 
                            page === totalPages || 
                            (page >= currentPage - 1 && page <= currentPage + 1);
                          
                          if (!shouldShow) {
                            // Show ellipsis for gaps
                            if (page === 2 && currentPage > 4) {
                              return <span key={`ellipsis-${page}`} className="px-2 text-gray-500">...</span>;
                            }
                            if (page === totalPages - 1 && currentPage < totalPages - 3) {
                              return <span key={`ellipsis-${page}`} className="px-2 text-gray-500">...</span>;
                            }
                            return null;
                          }
                          
                          return (
                            <button
                              key={page}
                              onClick={() => goToPage(page)}
                              className={`px-3 py-2 text-sm font-medium rounded-md ${
                                page === currentPage
                                  ? 'bg-blue-600 text-white'
                                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Asset Modal */}
      {showViewModal && assetToView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-mono font-bold text-lg">
                      {assetToView.asset_id}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Asset Details</h3>
                    <p className="text-gray-600">{assetToView.inventiontitle || 'Untitled Invention'}</p>
                  </div>
                </div>
                <button
                  onClick={handleViewModalClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {isLoadingAssetData ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Loading Asset Data</h4>
                  <p className="text-gray-600 text-center">Fetching data from all form pages and updating store...</p>
                  <div className="mt-4 flex space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Navigate to Form Pages</h4>
                    <p className="text-gray-600 mb-6">Click on any tile below to navigate directly to that form page for this asset. All data has been loaded into the store.</p>
                    
                    {/* Success indicator */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-green-800 font-medium">
                          Asset data loaded successfully! {availablePages.length} of 9 pages have data. Ready for navigation.
                        </span>
                      </div>
                    </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Page 1 - Invention Recognition */}
                  <InventionTooltip assetId={assetToView.asset_id}>
                    <button
                      onClick={() => handleNavigateToPage('invention-recognition', assetToView.asset_id)}
                      disabled={!availablePages.includes('inventionRecognition')}
                      className={`group p-4 border rounded-lg transition-all duration-200 shadow-sm ${
                        availablePages.includes('inventionRecognition')
                          ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200 hover:shadow-md'
                          : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                          availablePages.includes('inventionRecognition')
                            ? 'bg-blue-600 group-hover:scale-110'
                            : 'bg-gray-400'
                        }`}>
                          <span className="text-white font-bold text-sm">1</span>
                        </div>
                        <div className="text-left">
                          <div className={`font-semibold ${
                            availablePages.includes('inventionRecognition')
                              ? 'text-gray-900 group-hover:text-blue-700'
                              : 'text-gray-500'
                          }`}>
                            Invention Recognition
                            {!availablePages.includes('inventionRecognition') && ' (No Data)'}
                          </div>
                          <div className={`text-sm ${
                            availablePages.includes('inventionRecognition')
                              ? 'text-gray-600'
                              : 'text-gray-400'
                          }`}>
                            Define invention details
                          </div>
                        </div>
                      </div>
                    </button>
                  </InventionTooltip>

                  {/* Page 2 - Invention Extraction */}
                  <SmartTooltip 
                    assetId={assetToView.asset_id}
                    tileIndex={1}
                    totalTiles={9}
                    isEnabled={availablePages.includes('inventionExtraction')}
                  >
                    <button
                      onClick={() => handleNavigateToPage('invention-extraction', assetToView.asset_id)}
                      disabled={!availablePages.includes('inventionExtraction')}
                      className={`group p-4 border rounded-lg transition-all duration-200 shadow-sm ${
                        availablePages.includes('inventionExtraction')
                          ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200 hover:shadow-md'
                          : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                          availablePages.includes('inventionExtraction')
                            ? 'bg-green-600 group-hover:scale-110'
                            : 'bg-gray-400'
                        }`}>
                          <span className="text-white font-bold text-sm">2</span>
                        </div>
                        <div className="text-left">
                          <div className={`font-semibold ${
                            availablePages.includes('inventionExtraction')
                              ? 'text-gray-900 group-hover:text-green-700'
                              : 'text-gray-500'
                          }`}>
                            Invention Extraction
                            {!availablePages.includes('inventionExtraction') && ' (No Data)'}
                          </div>
                          <div className={`text-sm ${
                            availablePages.includes('inventionExtraction')
                              ? 'text-gray-600'
                              : 'text-gray-400'
                          }`}>
                            Extract and analyze details
                          </div>
                        </div>
                      </div>
                    </button>
                  </SmartTooltip>

                  {/* Page 3 - Patentability Analysis */}
                  <PatentabilityTooltip 
                    assetId={assetToView.asset_id}
                    isEnabled={availablePages.includes('patentabilityAnalysis')}
                  >
                    <button
                      onClick={() => handleNavigateToPage('patentability-analysis', assetToView.asset_id)}
                      disabled={!availablePages.includes('patentabilityAnalysis')}
                      className={`group p-4 border rounded-lg transition-all duration-200 shadow-sm ${
                        availablePages.includes('patentabilityAnalysis')
                          ? 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200 hover:shadow-md'
                          : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                          availablePages.includes('patentabilityAnalysis')
                            ? 'bg-purple-600 group-hover:scale-110'
                            : 'bg-gray-400'
                        }`}>
                          <span className="text-white font-bold text-sm">3</span>
                        </div>
                        <div className="text-left">
                          <div className={`font-semibold ${
                            availablePages.includes('patentabilityAnalysis')
                              ? 'text-gray-900 group-hover:text-purple-700'
                              : 'text-gray-500'
                          }`}>
                            Patentability Analysis
                            {!availablePages.includes('patentabilityAnalysis') && ' (No Data)'}
                          </div>
                          <div className={`text-sm ${
                            availablePages.includes('patentabilityAnalysis')
                              ? 'text-gray-600'
                              : 'text-gray-400'
                          }`}>
                            Analyze patent potential
                          </div>
                        </div>
                      </div>
                    </button>
                  </PatentabilityTooltip>

                  {/* Page 4 - Patent Specification */}
                  <button
                    onClick={() => handleNavigateToPage('patent-specification', assetToView.asset_id)}
                    disabled={!availablePages.includes('patentSpecification')}
                    className={`group p-4 border rounded-lg transition-all duration-200 shadow-sm ${
                      availablePages.includes('patentSpecification')
                        ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:from-orange-100 hover:to-orange-200 hover:shadow-md'
                        : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                        availablePages.includes('patentSpecification')
                          ? 'bg-orange-600 group-hover:scale-110'
                          : 'bg-gray-400'
                      }`}>
                        <span className="text-white font-bold text-sm">4</span>
                      </div>
                      <div className="text-left">
                        <div className={`font-semibold ${
                          availablePages.includes('patentSpecification')
                            ? 'text-gray-900 group-hover:text-orange-700'
                            : 'text-gray-500'
                        }`}>
                          Patent Specification
                          {!availablePages.includes('patentSpecification') && ' (No Data)'}
                        </div>
                        <div className={`text-sm ${
                          availablePages.includes('patentSpecification')
                            ? 'text-gray-600'
                            : 'text-gray-400'
                        }`}>
                          Prepare specifications
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Page 5 - Patent Filing */}
                  <button
                    onClick={() => handleNavigateToPage('patent-filing', assetToView.asset_id)}
                    disabled={!availablePages.includes('patentFiling')}
                    className={`group p-4 border rounded-lg transition-all duration-200 shadow-sm ${
                      availablePages.includes('patentFiling')
                        ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:from-red-100 hover:to-red-200 hover:shadow-md'
                        : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                        availablePages.includes('patentFiling')
                          ? 'bg-red-600 group-hover:scale-110'
                          : 'bg-gray-400'
                      }`}>
                        <span className="text-white font-bold text-sm">5</span>
                      </div>
                      <div className="text-left">
                        <div className={`font-semibold ${
                          availablePages.includes('patentFiling')
                            ? 'text-gray-900 group-hover:text-red-700'
                            : 'text-gray-500'
                        }`}>
                          Patent Filing
                          {!availablePages.includes('patentFiling') && ' (No Data)'}
                        </div>
                        <div className={`text-sm ${
                          availablePages.includes('patentFiling')
                            ? 'text-gray-600'
                            : 'text-gray-400'
                        }`}>
                          File patent applications
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Page 6 - Patent Prosecution */}
                  <button
                    onClick={() => handleNavigateToPage('patent-prosecution', assetToView.asset_id)}
                    disabled={!availablePages.includes('patentProsecution')}
                    className={`group p-4 border rounded-lg transition-all duration-200 shadow-sm ${
                      availablePages.includes('patentProsecution')
                        ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:from-indigo-100 hover:to-indigo-200 hover:shadow-md'
                        : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                        availablePages.includes('patentProsecution')
                          ? 'bg-indigo-600 group-hover:scale-110'
                          : 'bg-gray-400'
                      }`}>
                        <span className="text-white font-bold text-sm">6</span>
                      </div>
                      <div className="text-left">
                        <div className={`font-semibold ${
                          availablePages.includes('patentProsecution')
                            ? 'text-gray-900 group-hover:text-indigo-700'
                            : 'text-gray-500'
                        }`}>
                          Patent Prosecution
                          {!availablePages.includes('patentProsecution') && ' (No Data)'}
                        </div>
                        <div className={`text-sm ${
                          availablePages.includes('patentProsecution')
                            ? 'text-gray-600'
                            : 'text-gray-400'
                        }`}>
                          Handle prosecution process
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Page 7 - Patent Maintenance */}
                  <button
                    onClick={() => handleNavigateToPage('patent-maintenance', assetToView.asset_id)}
                    disabled={!availablePages.includes('patentMaintenance')}
                    className={`group p-4 border rounded-lg transition-all duration-200 shadow-sm ${
                      availablePages.includes('patentMaintenance')
                        ? 'bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 hover:from-teal-100 hover:to-teal-200 hover:shadow-md'
                        : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                        availablePages.includes('patentMaintenance')
                          ? 'bg-teal-600 group-hover:scale-110'
                          : 'bg-gray-400'
                      }`}>
                        <span className="text-white font-bold text-sm">7</span>
                      </div>
                      <div className="text-left">
                        <div className={`font-semibold ${
                          availablePages.includes('patentMaintenance')
                            ? 'text-gray-900 group-hover:text-teal-700'
                            : 'text-gray-500'
                        }`}>
                          Patent Maintenance
                          {!availablePages.includes('patentMaintenance') && ' (No Data)'}
                        </div>
                        <div className={`text-sm ${
                          availablePages.includes('patentMaintenance')
                            ? 'text-gray-600'
                            : 'text-gray-400'
                        }`}>
                          Maintain patent status
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Page 8 - Patent Commercialization */}
                  <button
                    onClick={() => handleNavigateToPage('patent-commercialization', assetToView.asset_id)}
                    disabled={!availablePages.includes('patentCommercialization')}
                    className={`group p-4 border rounded-lg transition-all duration-200 shadow-sm ${
                      availablePages.includes('patentCommercialization')
                        ? 'bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:from-pink-100 hover:to-pink-200 hover:shadow-md'
                        : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                        availablePages.includes('patentCommercialization')
                          ? 'bg-pink-600 group-hover:scale-110'
                          : 'bg-gray-400'
                      }`}>
                        <span className="text-white font-bold text-sm">8</span>
                      </div>
                      <div className="text-left">
                        <div className={`font-semibold ${
                          availablePages.includes('patentCommercialization')
                            ? 'text-gray-900 group-hover:text-pink-700'
                            : 'text-gray-500'
                        }`}>
                          Patent Commercialization
                          {!availablePages.includes('patentCommercialization') && ' (No Data)'}
                        </div>
                        <div className={`text-sm ${
                          availablePages.includes('patentCommercialization')
                            ? 'text-gray-600'
                            : 'text-gray-400'
                        }`}>
                          Commercialize patents
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Page 9 - Post Grant Opposition */}
                  <button
                    onClick={() => handleNavigateToPage('post-grant-opposition', assetToView.asset_id)}
                    disabled={!availablePages.includes('postGrantOpposition')}
                    className={`group p-4 border rounded-lg transition-all duration-200 shadow-sm ${
                      availablePages.includes('postGrantOpposition')
                        ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:from-gray-100 hover:to-gray-200 hover:shadow-md'
                        : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                        availablePages.includes('postGrantOpposition')
                          ? 'bg-gray-600 group-hover:scale-110'
                          : 'bg-gray-400'
                      }`}>
                        <span className="text-white font-bold text-sm">9</span>
                      </div>
                      <div className="text-left">
                        <div className={`font-semibold ${
                          availablePages.includes('postGrantOpposition')
                            ? 'text-gray-900 group-hover:text-gray-700'
                            : 'text-gray-500'
                        }`}>
                          Post Grant Opposition
                          {!availablePages.includes('postGrantOpposition') && ' (No Data)'}
                        </div>
                        <div className={`text-sm ${
                          availablePages.includes('postGrantOpposition')
                            ? 'text-gray-600'
                            : 'text-gray-400'
                        }`}>
                          Handle oppositions
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Asset Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-3">Asset Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Asset ID:</span>
                    <span className="ml-2 font-mono text-gray-900">{assetToView.asset_id}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Created:</span>
                    <span className="ml-2 text-gray-900">{new Date(assetToView.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-medium text-gray-600">Invention Title:</span>
                    <span className="ml-2 text-gray-900">{assetToView.inventiontitle || 'Untitled'}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-medium text-gray-600">Common Name:</span>
                    <span className="ml-2 text-gray-900">{assetToView.commonname || 'Not specified'}</span>
                  </div>
                </div>
              </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Delete Asset</h3>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-4">
                  Are you sure you want to delete this asset? This action cannot be undone.
                </p>
                
                {assetToDelete && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <span className="text-red-600 font-mono font-bold text-sm">
                            {assetToDelete.asset_id}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {assetToDelete.inventiontitle || 'Untitled Invention'}
                        </p>
                        <p className="text-sm text-gray-500">
                          Created: {new Date(assetToDelete.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        <strong>Warning:</strong> This will permanently delete all data associated with this asset, including all form data from all pages.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleDeleteCancel}
                  disabled={deleting === assetToDelete?.asset_id}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleting === assetToDelete?.asset_id}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting === assetToDelete?.asset_id ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </div>
                  ) : (
                    'Delete Asset'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AssetsV2() {
  return (
    <SimpleProtectedRoute>
      <AssetsV2Content />
    </SimpleProtectedRoute>
  );
}