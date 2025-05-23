'use client';

import { useRouter } from "next/navigation";
import React from "react";

const CardWrapper = ({ label, title, backButtonHref, nextButtonHref, onSave, children }) => {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-10 border border-gray-200">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-5 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">{label}</h2>
        <button
          onClick={onSave}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg text-base hover:bg-blue-600 transition min-w-[120px]"
        >
          Save
        </button>
      </div>

      {/* Form Content */}
      <div className="mb-8">{children}</div>

      {/* Navigation Buttons */}
      <div className={`flex ${backButtonHref && nextButtonHref ? "justify-between" : "justify-center"}`}>
        {backButtonHref && (
          <button
            onClick={() => router.push(backButtonHref)}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg text-base hover:bg-gray-400 transition min-w-[120px]"
          >
            Back
          </button>
        )}
        {nextButtonHref && (
          <button
            onClick={() => router.push(nextButtonHref)}
            className="bg-green-500 text-white px-6 py-2 rounded-lg text-base hover:bg-green-600 transition min-w-[120px]"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CardWrapper;
