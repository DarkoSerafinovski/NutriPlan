import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
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
  const [availableIngredients, setAvailableIngredients] = useState([]);

  const {
    formData,
    handleChange,
    addIngredient,
    updateIngredient,
    removeIngredient,
    saveRecipe,
    isEditMode,
    loading,
  } = useRecipeForm(id);

  useEffect(() => {
    async function getIngredients() {
      const { data } = await supabase
        .from("ingredients")
        .select("*")
        .order("name");
      setAvailableIngredients(data || []);
    }
    getIngredients();
  }, []);

  const currentNutrition = useMemo(() => {
    const fullIngredients = formData.recipeIngredients
      .map((ri) => {
        const fullInfo = availableIngredients.find(
          (ai) => ai.id === parseInt(ri.ingredient_id)
        );
        return { amount: ri.amount, ingredients: fullInfo };
      })
      .filter((item) => item.ingredients);

    return calculateNutrition(fullIngredients);
  }, [formData.recipeIngredients, availableIngredients]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await saveRecipe();
    if (result.success) navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton className="mb-6" />

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <header className="p-8 md:p-12 border-b border-gray-50">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              {isEditMode ? "Edit Recipe" : "New Recipe"}
            </h1>
          </header>

          {/* LIVE NUTRITION PREVIEW */}
          <div className="bg-green-50/50 border-y border-green-100">
            <NutritionStats nutrition={currentNutrition} variant="large" />
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                label="Recipe Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <FormSelect
                label="Meal Type"
                name="mealType"
                value={formData.mealType}
                onChange={handleChange}
                options={[
                  { value: "breakfast", label: "Breakfast" },
                  { value: "lunch", label: "Lunch" },
                  { value: "dinner", label: "Dinner" },
                  { value: "snack", label: "Snack" },
                  { value: "dessert", label: "Dessert" },
                ]}
              />
            </div>

            {/* INGREDIENTS LIST */}
            <div className="space-y-4">
              <label className="text-sm font-black text-gray-700 uppercase">
                Ingredients
              </label>
              {formData.recipeIngredients.map((s, i) => (
                <IngredientRow
                  key={i}
                  index={i}
                  data={s}
                  ingredientsList={availableIngredients} // Šaljemo listu svih sastojaka
                  onUpdate={updateIngredient}
                  onRemove={removeIngredient}
                  canRemove={formData.recipeIngredients.length > 1}
                />
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all"
              >
                + Add Another Ingredient
              </button>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <FormInput
                label="Prep Time (min)"
                name="prepTime"
                type="number"
                value={formData.prepTime}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 uppercase">
                Instructions
              </label>
              <textarea
                name="instructions"
                rows="5"
                value={formData.instructions}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all resize-none"
                placeholder="Describe the preparation steps..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 text-white font-black text-xl rounded-2xl transition-all 
                ${loading ? "bg-gray-400" : "bg-gray-900 hover:bg-black"}`}
            >
              {loading
                ? "Saving..."
                : isEditMode
                ? "Save Changes"
                : "Publish Recipe"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
