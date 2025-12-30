import React from "react";
import IngredientTableRow from "./IngredientTableRow";
import EmptyState from "../ui/EmptyState";

const IngredientTable = ({ items, isAdmin, onEdit, onDelete }) => {
  if (items.length === 0) {
    return (
      /*<div className="p-20 text-center bg-white rounded-[2.5rem] border border-gray-100 shadow-xl">
        <p className="text-gray-400 font-medium">
          No ingredients found matching your search.
        </p>
      </div>*/

      <EmptyState message="No ingredients found matching your search." />
    );
  }

  const headers = [
    "Ingredient",
    "Category",
    "Fats",
    "Prot.",
    "Carbs",
    "Calories",
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
              {isAdmin && (
                <th className="p-6 text-xs font-black uppercase tracking-widest text-gray-400 text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((ing) => (
              <IngredientTableRow
                key={ing.id}
                ingredient={ing}
                isAdmin={isAdmin}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngredientTable;
