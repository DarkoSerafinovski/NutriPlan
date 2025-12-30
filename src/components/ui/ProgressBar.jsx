import React from "react";

const ProgressBar = ({
  current = 0,
  total = 1,
  label = "Progress",
  showStats = true,
  colorClass = "bg-green-500",
}) => {
  const percentage = Math.min(Math.round((current / (total || 1)) * 100), 100);

  return (
    <div className="w-full">
      {(label || showStats) && (
        <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">
          <span>{label}</span>
          {showStats && (
            <span>
              {current} / {total} ({percentage}%)
            </span>
          )}
        </div>
      )}

      <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-50 shadow-inner">
        <div
          className={`h-full ${colorClass} transition-all duration-700 ease-out rounded-full shadow-sm`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
