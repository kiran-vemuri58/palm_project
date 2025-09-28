'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import useV2Store from '@/store/v2Store';
import InventionTooltip from '@/components/V2/InventionTooltip';
import ExtractionTooltip from '@/components/V2/ExtractionTooltip';
import SmartTooltip from '@/components/V2/SmartTooltip';

const V2Navigation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Only show navigation when there's a new asset or editing an asset
  const isNewAsset = searchParams.get('new') === 'true';
  const isEditAsset = searchParams.get('edit') === 'true';
  const hasAssetId = searchParams.get('assetId');
  
  // Get form data and current asset ID from store
  const formData = useV2Store((state) => state.getFormData('inventionRecognition'));
  const currentAssetId = useV2Store((state) => state.currentAssetId);
  
  // Don't render if not in new/edit mode
  if (!isNewAsset && !isEditAsset && !hasAssetId) {
    return null;
  }



  const navItems = [
    { href: '/v2/invention-recognition', label: 'Invention Recognition', shortcut: 'IR', icon: '💡' },
    { href: '/v2/invention-extraction', label: 'Invention Extraction', shortcut: 'IE', icon: '🔍' },
    { href: '/v2/patentability-analysis', label: 'Patentability Analysis', shortcut: 'PA', icon: '📋' },
    { href: '/v2/patent-specification', label: 'Patent Specification', shortcut: 'PS', icon: '📄' },
    { href: '/v2/patent-filing', label: 'Patent Filing', shortcut: 'PF', icon: '📝' },
    { href: '/v2/patent-prosecution', label: 'Patent Prosecution', shortcut: 'PP', icon: '⚖️' },
    { href: '/v2/patent-maintenance', label: 'Patent Maintenance', shortcut: 'PM', icon: '🔧' },
    { href: '/v2/patent-commercialization', label: 'Patent Commercialization', shortcut: 'PC', icon: '💰' },
    { href: '/v2/post-grant-opposition', label: 'Post Grant Opposition', shortcut: 'PGO', icon: '⚡' },
  ];

  return (
    <div className="bg-gray-50 border-b border-gray-200 sticky top-24 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-14">
          {/* Navigation Tiles */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              const isDisabled = isNewAsset && !currentAssetId && item.href !== '/v2/invention-recognition';
              
              // Preserve query parameters when navigating
              let href = item.href;
              const params = [];
              
              if (hasAssetId) params.push(`assetId=${hasAssetId}`);
              if (isNewAsset) params.push('new=true');
              if (isEditAsset) params.push('edit=true');
              
              if (params.length > 0) {
                href = `${item.href}?${params.join('&')}`;
              }
              
              // Show tooltip for first tile (Invention Recognition) or second tile (Invention Extraction)
              const shouldShowInventionTooltip = item.href === '/v2/invention-recognition' && currentAssetId;
              const shouldShowExtractionTooltip = item.href === '/v2/invention-extraction' && currentAssetId;
              
              const tileContent = isDisabled ? (
                <div
                  key={item.href}
                  title="Please save Invention Recognition data first"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap bg-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-mono">{item.shortcut}</span>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={href}
                  title={item.label}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-mono">{item.shortcut}</span>
                </Link>
              );

              // Only show tooltips for enabled tiles
              if (!isDisabled && shouldShowInventionTooltip) {
                return (
                  <InventionTooltip key={item.href} assetId={currentAssetId}>
                    {tileContent}
                  </InventionTooltip>
                );
              } else if (!isDisabled && shouldShowExtractionTooltip) {
                return (
                  <SmartTooltip 
                    key={item.href} 
                    assetId={currentAssetId}
                    tileIndex={index}
                    totalTiles={navItems.length}
                  >
                    {tileContent}
                  </SmartTooltip>
                );
              } else {
                return tileContent;
              }
            })}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default V2Navigation;
