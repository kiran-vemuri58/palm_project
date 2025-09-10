
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import { CassetteTape } from 'lucide-react'

const Header = async ({isAdminPage=false}) => {
const isAdmin = false
  return (
    <header className='fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-gray-200/50 shadow-sm'>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link href={isAdminPage ? "/admin":'/'} className="group flex items-center space-x-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                            <div className="relative bg-white p-2 rounded-lg shadow-sm">
                                <Image 
                                    src={"/logo.svg"} 
                                    alt="Patent Manager Logo"
                                    width={40}
                                    height={40}
                                    className='h-8 w-8 object-contain'
                                    priority
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Patent Manager
                            </span>
                            {isAdminPage && <span className="text-xs font-medium text-blue-600 -mt-1">Admin Panel</span>}
                        </div>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-1">
                    <SignedIn>
                        <Link href="/assets" className="group relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-200">
                            <span className="relative z-10">Dashboard</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </Link>
                        <Link href="/assetForm1" className="group relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-200">
                            <span className="relative z-10">New Asset</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </Link>
                        <Link href="/assets" className="group relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-200">
                            <span className="relative z-10">All Assets</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </Link>
                    </SignedIn>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                    <SignedIn>
                        <Link href="/assetForm1">
                            <Button className="group relative inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                <CassetteTape size={18} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                <span className='hidden sm:inline'>New Asset</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Button>
                        </Link>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton forceRedirectUrl="/sign-in">
                            <Button variant="outline" className="group relative inline-flex items-center px-6 py-2.5 border border-gray-300 text-sm font-semibold rounded-xl text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md">
                                <span className="mr-2">👤</span>
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <div className="relative">
                            <UserButton appearance={{
                                elements:{
                                    avatarBox:"w-10 h-10 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200",
                                    userButtonPopoverCard: "rounded-xl shadow-xl border-0",
                                    userButtonPopoverActionButton: "rounded-lg hover:bg-gray-50"
                                }
                            }}/>
                        </div>
                    </SignedIn>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header
