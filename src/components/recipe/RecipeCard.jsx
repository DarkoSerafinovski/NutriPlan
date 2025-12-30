import React from "react";
import { Link } from "react-router-dom";
import NutritionStats from "./NutritionStats";

const RecipeCard = ({ recipe }) => {
  const { id, title, mealType, prepTime, nutrition } = recipe;

  return (
    <Link
      to={`/recipes/${id}`}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wider">
            {mealType}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <span>⏱️ {prepTime} min</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors mb-4">
          {title}
        </h3>

        <NutritionStats nutrition={nutrition} variant="small" />
      </div>

      <div className="px-5 py-3 bg-gray-50 text-center text-sm font-medium text-gray-600 group-hover:bg-green-600 group-hover:text-white transition-all">
        View Recipe Details →
      </div>
    </Link>
  );
};

export default RecipeCard;
