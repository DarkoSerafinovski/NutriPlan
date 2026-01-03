import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../components/layout/Navigation.jsx";
import NutritionStats from "../components/recipe/NutritionStats.jsx";
import BackButton from "../components/ui/BackButton.jsx";
import Loader from "../components/ui/Loader.jsx";
import {
  IngredientList,
  PreparationSteps,
} from "../components/recipe/RecipeContext.jsx";
import { useRecipeDetails } from "../hooks/useRecipeDetails.js";
import EmptyState from "../components/ui/EmptyState.jsx";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { recipe, loading, nutrition, toggleFavorite, handleDelete, user } =
    useRecipeDetails(id);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  if (!recipe) {
    return (
      <EmptyState
        title="Recipe not found!"
        message=""
        actionLabel="← Back to browse"
        onAction={() => navigate("/")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BackButton label="Go Back" className="mb-6" />

        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          {/* HERO SECTION */}
          <div className="p-8 md:p-12 border-b border-gray-50 relative">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-black uppercase tracking-widest">
                {recipe.meal_type}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 font-medium">
                ⏱️ {recipe.prep_time} mins
              </span>
            </div>

            <div className="flex justify-between items-start gap-4">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                {recipe.title}
              </h1>

              <div className="flex gap-2">
                {user?.id === recipe.user_id && (
                  <>
                    <button
                      onClick={() => navigate(`/edit-recipe/${recipe.id}`)}
                      className="p-4 rounded-2xl bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all group"
                      title="Edit Recipe"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-8 h-8 group-hover:rotate-12 transition-transform"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={handleDelete}
                      className="p-4 rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all"
                      title="Delete Recipe"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-0.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v0.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </>
                )}

                {user && (
                  <button
                    onClick={toggleFavorite}
                    className={`p-4 rounded-2xl transition-all ${
                      recipe.isFavorite
                        ? "bg-red-50 text-red-500"
                        : "bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-300"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={recipe.isFavorite ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* NUTRITION DASHBOARD */}
          <NutritionStats nutrition={nutrition} variant="large" />

          <div className="p-8 md:p-12 grid md:grid-cols-5 gap-12">
            <IngredientList recipeIngredients={recipe.recipe_ingredients} />
            <PreparationSteps instructions={recipe.instructions} />
          </div>
        </div>
      </div>
    </div>
  );
}
