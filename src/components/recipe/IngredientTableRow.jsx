import React from "react";

const IngredientTableRow = ({ ingredient, isAdmin, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      <td className="p-6 font-bold text-gray-900">{ingredient.name}</td>
      <td className="p-6">
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase">
          {ingredient.category}
        </span>
      </td>
      <td className="p-6 text-center font-medium text-gray-600">
        {ingredient.fat}g
      </td>
      <td className="p-6 text-center font-medium text-gray-600">
        {ingredient.protein}g
      </td>
      <td className="p-6 text-center font-medium text-gray-600">
        {ingredient.carbs}g
      </td>
      <td className="p-6 text-center">
        <span className="font-black text-gray-900">{ingredient.calories}</span>
      </td>
      <td className="p-6 text-gray-400 font-bold text-sm">{ingredient.unit}</td>

      {isAdmin && (
        <td className="p-6 text-right">
          <div className="flex justify-end gap-2">
            <button
              onClick={() => onEdit(ingredient)}
              className="px-3 py-1 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(ingredient.id)}
              className="px-3 py-1 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default IngredientTableRow;
