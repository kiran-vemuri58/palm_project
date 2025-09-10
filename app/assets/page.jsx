'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function InventionTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 10;
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      setShouldRedirect(true);
    }
  }, [isLoaded, isSignedIn]);

  // Handle redirect
  useEffect(() => {
    if (shouldRedirect) {
      router.push('/');
    }
  }, [shouldRedirect, router]);

  // Show loading while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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

  useEffect(() => {
    fetch(`/api/invention?page=${currentPage}`)
      .then((res) => res.json())
      .then((response) => {
        setData(response.data || []);
        setTotalPages(response.totalPages || 1);
      })
      .catch((err) => console.error('Error fetching inventions:', err));
  }, [currentPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Invention List</h1>

      <table className="min-w-full divide-y divide-gray-200 border rounded-md shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Asset ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Invention Title</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Common Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Inventor Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {data.map((item) => (
            <tr key={item.asset_id}>
              <td className="px-6 py-4 whitespace-nowrap text-blue-600 underline">
                <Link href={`/asset/${item.asset_id}`}>{item.asset_id}</Link>
              </td>
              <td className="px-6 py-4">{item.inventiontitle}</td>
              <td className="px-6 py-4">{item.commonname}</td>
              <td className="px-6 py-4">{item.inventordetails || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
