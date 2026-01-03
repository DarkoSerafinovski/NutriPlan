import React from "react";

export const IngredientList = ({ recipeIngredients }) => {
  return (
    <div className="md:col-span-2">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="mr-3 p-2 bg-gray-100 rounded-lg text-lg shadow-sm">
          🛒
        </span>
        Ingredients
      </h3>
      <ul className="space-y-3">
        {recipeIngredients.map((ing, idx) => {
          const rawUnit = ing?.ingredients?.unit || "";
          const cleanUnit = rawUnit.replace(/[0-9]/g, "");
          return (
            <li
              key={idx}
              className="flex justify-between items-center p-3 rounded-xl hover:bg-green-50/50 transition-colors border-b border-gray-50 last:border-0 group"
            >
              <span className="text-gray-700 font-medium group-hover:text-green-700 transition-colors">
                {ing?.ingredients.name}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm font-bold text-gray-600 group-hover:bg-green-100 group-hover:text-green-800 transition-colors">
                {ing?.amount} {cleanUnit}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const PreparationSteps = ({ instructions }) => {
  return (
    <div className="md:col-span-3 bg-gray-50/50 p-8 rounded-3xl border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="mr-3 p-2 bg-gray-100 rounded-lg text-lg shadow-sm">
          👨‍🍳
        </span>
        Preparation
      </h3>
      <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
        {instructions}
      </p>
    </div>
  );
};
