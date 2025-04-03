import CardWrapper from "@/components/CardWrapper";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InventionRecognitionForm = () => {
  return (
    <CardWrapper
      label="Invention Recognition"
      title="Register"
      backButtonHref="/previous-page"
      nextButtonHref="/next-page"
      className="w-full max-w-[90%] mx-auto p-8" // 💡 Increased width
    >
      {/* Form Grid */}
      <div className="grid grid-cols-3 gap-6 p-6">
        {/* First Name */}
        <div className="flex flex-col items-center gap-2 w-full">
          <Label className="text-gray-700 font-medium text-center text-lg" htmlFor="first-name">
            First Name
          </Label>
          <Input
            id="first-name"
            type="text"
            placeholder="Enter first name"
            className="w-full max-w-[700px] border-gray-300 focus:border-blue-500 text-center text-lg px-4"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col items-center gap-2 w-full">
          <Label className="text-gray-700 font-medium text-center text-lg" htmlFor="last-name">
            Last Name
          </Label>
          <Input
            id="last-name"
            type="text"
            placeholder="Enter last name"
            className="w-full max-w-[700px] border-gray-300 focus:border-blue-500 text-center text-lg px-4"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col items-center gap-2 w-full">
          <Label className="text-gray-700 font-medium text-center text-lg" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email"
            className="w-full max-w-[700px] border-gray-300 focus:border-blue-500 text-center text-lg px-4"
          />
        </div>
      </div>
    </CardWrapper>
  );
};

export default InventionRecognitionForm;
