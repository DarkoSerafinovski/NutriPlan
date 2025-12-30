import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyState = ({
  title = "Not Found",
  message = "The item you are looking for doesn't exist.",
  icon = "🔍",
  actionLabel,
  onAction,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-12 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100 shadow-sm">
      <div className="text-6xl mb-6 animate-bounce-slow">{icon}</div>
      <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
        {title}
      </h2>
      <p className="text-gray-500 font-medium max-w-sm mx-auto mb-8">
        {message}
      </p>

      {actionLabel && (
        <button
          onClick={onAction || (() => navigate(-1))}
          className="px-8 py-3 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-lg shadow-gray-200"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
