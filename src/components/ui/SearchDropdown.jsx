import React from "react";

const SearchDropdown = ({ results, onSelect, visible }) => {
  if (!visible || results.length === 0) return null;

  return (
    <div className="absolute z-20 w-full mt-2 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      {results.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          className="p-5 hover:bg-green-50 cursor-pointer flex justify-between items-center border-b border-gray-50 last:border-none transition-colors group"
        >
          <div>
            <span className="font-bold text-gray-800 block">{item.name}</span>
            {item.unit && (
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                Default unit: {item.unit}
              </span>
            )}
          </div>
          <span className="text-sm font-black text-green-600 bg-green-100/50 px-3 py-1 rounded-full group-hover:bg-green-600 group-hover:text-white transition-all">
            + Add
          </span>
        </div>
      ))}
    </div>
  );
};

export default SearchDropdown;
