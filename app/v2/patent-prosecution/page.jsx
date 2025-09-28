'use client';

import React from 'react';
import SimpleProtectedRoute from '@/components/SimpleProtectedRoute';
import V2Navigation from '@/components/V2Navigation';

function PatentProsecutionV2Content() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <V2Navigation />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl border border-gray-200/50 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Patent Prosecution V2</h1>
            <p className="text-xl text-gray-600">Page 7</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PatentProsecutionV2() {
  return (
    <SimpleProtectedRoute>
      <PatentProsecutionV2Content />
    </SimpleProtectedRoute>
  );
}