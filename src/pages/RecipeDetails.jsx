import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recipes } from "../data/recipes.js";
import { ingredients } from "../data/ingredients.js";
import { calculateNutrition } from "../utils/nutrition.js";
import Navigation from "../components/layout/Navigation.jsx";
import NutritionStats from "../components/recipe/NutritionStats.jsx";
import BackButton from "../components/ui/BackButton.jsx";
import {
  IngredientList,
  PreparationSteps,
} from "../components/recipe/RecipeContext.jsx";
import RecipeActions from "../components/recipe/RecipeActions.jsx";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = sessionStorage.getItem("userRole") || "guest";

  const initialRecipe = recipes.find((r) => r.id.toString() === id);
  const [recipe, setRecipe] = useState(initialRecipe);

  const nutrition = useMemo(() => {
    return recipe ? calculateNutrition(recipe, ingredients) : null;
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800">Recipe not found!</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-green-600 font-semibold hover:underline"
        >
          ← Back to browse
        </button>
      </div>
    );
  }

  const handleFavorite = () => {
    setRecipe((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  const handleEdit = () => navigate(`/edit-recipe/${id}`);
  const handleDelete = () => {
    console.log("Delete Recipe");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BackButton label="Go Back" className="mb-6" />
        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          {/* 1. HERO SECTION */}
          <div className="p-8 md:p-12 border-b border-gray-50">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-black uppercase tracking-widest">
                {recipe.mealType}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 font-medium">
                ⏱️ {recipe.prepTime} mins
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              {recipe.title}
            </h1>
          </div>

          {/* 2. NUTRITION DASHBOARD */}
          <NutritionStats nutrition={nutrition} variant="large" />

          {/* 3. CONTENT GRID */}
          <div className="p-8 md:p-12 grid md:grid-cols-5 gap-12">
            <IngredientList recipeIngredients={recipe.ingredients} />
            <PreparationSteps instructions={recipe.instructions} />
          </div>

          {/* <RecipeActions
            isFavorite={recipe.isFavorite}
            onFavoriteToggle={handleFavorite}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />*/}
        </div>
      </div>
    </div>
  );
}
