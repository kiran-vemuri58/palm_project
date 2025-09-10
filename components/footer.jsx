import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, FileText, Shield, Users, Zap } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30"></div>
                <div className="relative bg-white p-2 rounded-lg">
                  <Image 
                    src={"/logo.svg"} 
                    alt="Patent Manager Logo"
                    width={32}
                    height={32}
                    className='h-6 w-6 object-contain'
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Patent Manager
                </h3>
                <p className="text-sm text-gray-400">Innovation Management</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Streamline your patent management process with our comprehensive platform. 
              Track, manage, and optimize your intellectual property portfolio.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="group p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
                <Github size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              </a>
              <a href="#" className="group p-2 bg-gray-800 rounded-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-110">
                <Twitter size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              </a>
              <a href="#" className="group p-2 bg-gray-800 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110">
                <Linkedin size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/assets" className="group flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                  <FileText size={16} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/assetForm1" className="group flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                  <Zap size={16} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                  New Asset
                </Link>
              </li>
              <li>
                <Link href="/assets" className="group flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                  <Shield size={16} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                  All Assets
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="group flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                  <Users size={16} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Features</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
                Patent Tracking
              </li>
              <li className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
                Document Management
              </li>
              <li className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
                Analytics Dashboard
              </li>
              <li className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
                Team Collaboration
              </li>
              <li className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
                Deadline Alerts
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white text-sm">bhaskarmahadheer@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Address</p>
                  <p className="text-white text-sm">Chennai, Tamil Nadu<br />India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-6">Get the latest updates on patent management features and industry insights.</p>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Patent Manager. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
