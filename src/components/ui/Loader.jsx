import React from "react";

const Loader = ({ text = "Loading NutriPlan..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-green-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
      </div>

      <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">
        {text}
      </p>
    </div>
  );
};

export default Loader;
