import React from "react";
import { ingredients } from "../../data/ingredients.js";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";

const IngredientRow = ({ index, data, onUpdate, onRemove, canRemove }) => {
  const itemInfo = ingredients.find((ing) => ing.id === data.ingredientId);

  const ingredientOptions = ingredients.map((ing) => ({
    value: ing.id,
    label: ing.name,
  }));

  return (
    <div className="flex gap-3 items-end bg-gray-50 p-3 rounded-2xl border border-gray-100 group transition-all hover:border-green-200">
      {/* Ingredient Selection - No label passed */}
      <FormSelect
        value={data.ingredientId}
        onChange={(e) => onUpdate(index, "ingredientId", e.target.value)}
        options={ingredientOptions}
        className="flex-1 space-y-0"
      />

      {/* Amount Input with Unit inside */}
      <div className="relative w-32">
        <FormInput
          type="number"
          value={data.amount}
          onChange={(e) => onUpdate(index, "amount", e.target.value)}
          placeholder="0"
          className="space-y-0"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-bold pointer-events-none">
          {itemInfo?.unit}
        </span>
      </div>

      {/* Remove Button */}
      <button
        type="button"
        onClick={() => onRemove(index)}
        disabled={!canRemove}
        className={`p-3 mb-1 transition-colors ${
          canRemove
            ? "text-red-300 hover:text-red-500"
            : "text-gray-200 cursor-not-allowed"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default IngredientRow;
