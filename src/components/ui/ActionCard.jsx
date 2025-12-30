import React from "react";

const ActionCard = ({ title, subtitle, icon = "📋", onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group flex items-center justify-between p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-green-100/50 hover:border-green-200 transition-all cursor-pointer mb-4"
    >
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 bg-gray-50 group-hover:bg-green-50 rounded-2xl flex items-center justify-center text-2xl transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-black text-gray-900 group-hover:text-green-600 transition-colors">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm font-medium text-gray-400">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-green-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
        <span className="text-xl">→</span>
      </div>
    </div>
  );
};

export default ActionCard;
