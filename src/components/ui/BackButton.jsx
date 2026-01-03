import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back", to = -1, className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`group flex items-center text-gray-500 hover:text-green-600 font-medium transition-colors ${className}`}
    >
      <span className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-200">
        ←
      </span>
      {label}
    </button>
  );
};

export default BackButton;
