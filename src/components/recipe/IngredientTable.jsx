import React from "react";
import IngredientTableRow from "./IngredientTableRow";
import EmptyState from "../ui/EmptyState";

const IngredientTable = ({ items }) => {
  if (items.length === 0) {
    return <EmptyState message="No ingredients found matching your search." />;
  }

  const headers = [
    "Ingredient",
    "Category",
    "Calories",
    "Fats",
    "Proteins",
    "Carbs",
    "Unit",
  ];

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              {headers.map((h) => (
                <th
                  key={h}
                  className={`p-6 text-xs font-black uppercase tracking-widest text-gray-400 ${
                    h !== "Ingredient" && h !== "Category" ? "text-center" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((ing) => (
              <IngredientTableRow key={ing.id} ingredient={ing} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngredientTable;
