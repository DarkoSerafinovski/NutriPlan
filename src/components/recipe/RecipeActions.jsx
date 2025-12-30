import React from "react";

const RecipeActions = ({
  role,
  isFavorite,
  onFavoriteToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="p-8 bg-gray-900 flex flex-wrap gap-4 items-center justify-between rounded-b-[2rem]">
      {/* Status indikator */}
      <div className="text-white">
        <p className="text-xs uppercase font-black text-gray-400 tracking-wider">
          Status
        </p>
        <p className="text-sm font-bold">{role.toUpperCase()} View</p>
      </div>

      {/* Dugmići za akcije */}
      <div className="flex gap-3">
        {role === "admin" && (
          <>
            <button
              onClick={onEdit}
              className="px-6 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all border border-gray-700"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-6 py-3 bg-red-500/10 text-red-500 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all"
            >
              Delete
            </button>
          </>
        )}

        {role === "user" && (
          <button
            onClick={onFavoriteToggle}
            className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg ${
              isFavorite
                ? "bg-red-500 text-white shadow-red-500/20"
                : "bg-white text-gray-900 hover:bg-gray-100"
            }`}
          >
            {isFavorite ? "❤️ Favorite" : "🤍 Add to Favorites"}
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeActions;
