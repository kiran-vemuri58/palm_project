
'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'
import { CassetteTape } from 'lucide-react'
import { useSimpleAuth } from '@/hooks/useSimpleAuth'

const Header = ({isAdminPage=false}) => {
  const { isAuthenticated, user, signOut, isLoading } = useSimpleAuth();
  const router = useRouter();
  const isAdmin = false

  // Debug logging

  const handleSignOut = async () => {
    try {
      await signOut();
      // Small delay to ensure auth state is updated
      setTimeout(() => {
        router.push('/login');
      }, 100);
    } catch (error) {
      console.error('❌ Sign out error:', error);
      // Still navigate to login page even if there's an error
      setTimeout(() => {
        router.push('/login');
      }, 100);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <header className='fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-gray-200/50 shadow-lg'>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </nav>
      </header>
    );
  }
  return (
    <header className='fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-gray-200/50 shadow-lg'>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link href={isAdminPage ? "/admin":'/'} className="group flex items-center space-x-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                            <div className="relative bg-white p-3 rounded-xl shadow-lg border border-gray-100">
                                <Image 
                                    src={"/logo.svg"} 
                                    alt="Patent Manager Logo"
                                    width={48}
                                    height={48}
                                    className='h-10 w-10 object-contain'
                                    priority
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Patent Manager
                            </span>
                            {isAdminPage && <span className="text-xs font-medium text-blue-600 -mt-1">Admin Panel</span>}
                        </div>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-2">
                    {isAuthenticated && (
                        <>
                            <Link href="/v2/assets" className="group relative px-5 py-3 text-sm font-semibold text-gray-700 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 border border-transparent hover:border-blue-200">
                                <span className="relative z-10 flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                                    </svg>
                                    Dashboard
                                </span>
                            </Link>
                            <button 
                                onClick={() => {
                                    // Clear only V2-specific localStorage data
                                    localStorage.removeItem('v2-asset-storage');
                                    // Navigate to V2 page with new=true
                                    window.location.href = '/v2/invention-recognition?new=true';
                                }}
                                className="group relative px-5 py-3 text-sm font-semibold text-gray-700 hover:text-green-600 rounded-xl hover:bg-green-50 transition-all duration-300 border border-transparent hover:border-green-200"
                            >
                                <span className="relative z-10 flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    New Asset
                                </span>
                            </button>
                            <Link href="/v2/assets" className="group relative px-5 py-3 text-sm font-semibold text-gray-700 hover:text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-300 border border-transparent hover:border-purple-200">
                                <span className="relative z-10 flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    All Assets
                                </span>
                            </Link>
                        </>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <Button 
                                onClick={() => {
                                    // Clear only V2-specific localStorage data
                                    localStorage.removeItem('v2-asset-storage');
                                    // Navigate to V2 page with new=true
                                    window.location.href = '/v2/invention-recognition?new=true';
                                }}
                                className="group relative inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                            >
                                <CassetteTape size={20} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                <span className='hidden sm:inline font-semibold'>New Asset</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Button>
                            <Button 
                                onClick={handleSignOut}
                                variant="outline" 
                                className="px-4 py-2 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 border-gray-300 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <Link href="/login">
                            <Button className="group relative inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-500/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                <span className="font-semibold">Sign In</span>
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header
