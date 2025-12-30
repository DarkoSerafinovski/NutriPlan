import React from "react";

const MealPlanCard = ({ plan, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-[2rem] p-6 shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-green-500 transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-green-50 rounded-2xl text-2xl group-hover:bg-green-100 transition-colors">
            🗓️
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
            {plan.period}
          </span>
        </div>

        <h2 className="text-2xl font-black text-gray-900 mb-2 leading-tight group-hover:text-green-600 transition-colors">
          {plan.planName}
        </h2>

        <p className="text-gray-500 font-medium text-sm line-clamp-2">
          {plan.description ||
            "A balanced nutritional guide for your health goals."}
        </p>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase text-gray-400">
            Recipes
          </span>
          <span className="font-bold text-gray-900">
            {plan.recipeIds.length} Meals
          </span>
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-white group-hover:bg-green-600 transition-colors shadow-lg">
          <span className="text-xl">→</span>
        </div>
      </div>
    </div>
  );
};

export default MealPlanCard;
