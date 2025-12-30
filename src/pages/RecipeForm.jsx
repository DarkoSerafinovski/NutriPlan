import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ingredients } from "../data/ingredients.js";
import { calculateNutrition } from "../utils/nutrition.js";
import { useRecipeForm } from "../hooks/useRecipeForm.js";
import Navigation from "../components/layout/Navigation.jsx";
import BackButton from "../components/ui/BackButton.jsx";
import NutritionStats from "../components/recipe/NutritionStats.jsx";
import IngredientRow from "../components/recipe/IngredientRow.jsx";
import FormInput from "../components/ui/FormInput.jsx";
import FormSelect from "../components/ui/FormSelect.jsx";

export default function RecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    formData,
    handleChange,
    addIngredient,
    updateIngredient,
    removeIngredient,
    isEditMode,
  } = useRecipeForm(id);

  const currentNutrition = useMemo(() => {
    return calculateNutrition(
      { ingredients: formData.recipeIngredients },
      ingredients
    );
  }, [formData.recipeIngredients]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Recipe Data:", formData);
    navigate("/recipes");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton label="Go Back" className="mb-6" />

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          <div className="p-8 md:p-12 border-b border-gray-50">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              {isEditMode ? "Edit Recipe" : "New Recipe"}
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Fill in the details of your healthy meal.
            </p>
          </div>

          {/* LIVE NUTRITION PREVIEW */}
          <div className="bg-green-50/50 border-y border-green-100">
            <div className="p-4 text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-green-600">
                Current Nutritional Values (LIVE)
              </span>
            </div>
            <NutritionStats nutrition={currentNutrition} variant="large" />
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            {/* BASIC INFO */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                label="Recipe Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. High Protein Pancakes"
                required
              />
              <FormSelect
                label="Meal Type"
                name="mealType"
                value={formData.mealType}
                onChange={handleChange}
                options={["breakfast", "lunch", "dinner", "snack"]}
              />
            </div>

            {/* INGREDIENTS */}
            <div className="space-y-3">
              {formData.recipeIngredients.map((s, i) => (
                <IngredientRow
                  key={i}
                  index={i}
                  data={s}
                  onUpdate={updateIngredient}
                  onRemove={removeIngredient}
                  canRemove={formData.recipeIngredients.length > 1}
                />
              ))}

              <button
                type="button"
                onClick={addIngredient}
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all flex items-center justify-center gap-2 group"
              >
                <span className="text-xl group-hover:scale-125 transition-transform">
                  +
                </span>
                Add Another Ingredient
              </button>
            </div>

            {/* DESCRIPTION & TIME */}
            <div className="space-y-6">
              <FormInput
                label="Prep Time (min)"
                name="prepTime"
                type="number"
                value={formData.prepTime}
                onChange={handleChange}
                className="w-32"
              />

              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 uppercase ml-1">
                  Instructions
                </label>
                <textarea
                  name="instructions"
                  rows="5"
                  value={formData.instructions}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all font-medium resize-none"
                  placeholder="Describe the preparation steps..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-gray-900 text-white font-black text-xl rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-200"
            >
              {isEditMode ? "Save Changes" : "Publish Recipe"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
