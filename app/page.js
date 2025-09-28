'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { clientAuth } from "@/lib/simpleAuth";

export default function Home() {
  const router = useRouter();

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await clientAuth.isAuthenticated();
      if (isAuthenticated) {
        router.push('/v2/assets');
      }
    };
    
    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.svg"
              alt="Patent Manager Logo"
              width={120}
              height={120}
              className="h-12 w-auto object-contain pb-2"
              priority
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Patent Manager
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your patent management process with our comprehensive platform. 
            Track inventions, manage applications, and monitor patent lifecycle from start to finish.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-blue-500 text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-3">Invention Recognition</h3>
            <p className="text-gray-600">
              Capture and document new inventions with detailed forms and evidence management.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-green-500 text-4xl mb-4">⚖️</div>
            <h3 className="text-xl font-semibold mb-3">Patent Analysis</h3>
            <p className="text-gray-600">
              Comprehensive patentability analysis and decision tracking for informed decisions.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-purple-500 text-4xl mb-4">📄</div>
            <h3 className="text-xl font-semibold mb-3">Filing & Management</h3>
            <p className="text-gray-600">
              Complete patent filing workflow and ongoing management throughout the patent lifecycle.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sign in to access your patent management dashboard
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => router.push('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-500">
            <p>© 2025 KB Solutions. All rights reserved.</p>
            <p className="mt-2">Innovation Protection Made Simple</p>
          </div>
        </div>
      </div>
    </div>
  );
}
