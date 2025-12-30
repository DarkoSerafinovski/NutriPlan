import React from "react";
import { useNavigate } from "react-router-dom";
import { recipes } from "../data/recipes.js";
import { useMealPlanForm } from "../hooks/useMealPlanForm.js";
import {
  calculateEndDate,
  generateShoppingList,
} from "../utils/shoppingList.js";
import Navigation from "../components/layout/Navigation.jsx";
import FormInput from "../components/ui/FormInput.jsx";
import FormSelect from "../components/ui/FormSelect.jsx";
import BackButton from "../components/ui/BackButton.jsx";

export default function CreatePlan() {
  const navigate = useNavigate();
  const {
    formData,
    updateField,
    addRecipeSlot,
    updateRecipeSlot,
    removeRecipeSlot,
  } = useMealPlanForm();

  const handleSave = (e) => {
    e.preventDefault();

    const validIds = formData.recipeIds.filter((id) => id !== "");

    if (!formData.planName || !formData.startDate || validIds.length === 0) {
      alert("Please fill in all fields and choose at least one recipe.");
      return;
    }

    const shoppingList = generateShoppingList(validIds);

    const newPlan = {
      ...formData,
      recipeIds: validIds,
      period: `${formData.startDate} - ${calculateEndDate(formData.startDate)}`,
      shoppingList,
    };

    console.log("Saving Plan:", newPlan);
    navigate("/plans");
  };

  const recipeOptions = recipes.map((r) => ({ value: r.id, label: r.title }));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <BackButton className="mb-6" />

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <header className="p-8 md:p-12 border-b border-gray-50 bg-gray-50/30">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Create Plan
            </h1>
            <p className="text-gray-500 font-medium">
              Schedule your meals and auto-generate a shopping list.
            </p>
          </header>

          <form onSubmit={handleSave} className="p-8 md:p-12 space-y-10">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                label="Plan Name"
                placeholder="e.g. Summer Shred"
                value={formData.planName}
                onChange={(e) => updateField("planName", e.target.value)}
              />
              <FormInput
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => updateField("startDate", e.target.value)}
              />
            </div>

            {/* Recipe Selection Section */}
            <div className="space-y-4">
              <label className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1">
                Selected Recipes
              </label>

              <div className="space-y-3">
                {formData.recipeIds.map((id, index) => (
                  <div key={index} className="flex gap-3 items-end group">
                    <div className="flex-grow">
                      <FormSelect
                        value={id}
                        onChange={(e) =>
                          updateRecipeSlot(index, e.target.value)
                        }
                        options={recipeOptions}
                        placeholder="Choose a recipe..."
                      />
                    </div>
                    {formData.recipeIds.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRecipeSlot(index)}
                        className="mb-1 p-4 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addRecipeSlot}
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all"
              >
                + Add Another Recipe
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-5 bg-gray-900 text-white font-black text-xl rounded-3xl hover:bg-black transition-all shadow-xl shadow-gray-200"
            >
              Generate Plan & List
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
