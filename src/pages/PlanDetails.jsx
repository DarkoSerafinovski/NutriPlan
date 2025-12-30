import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mealPlans } from "../data/mealPlans.js";
import { recipes } from "../data/recipes.js";
import Navigation from "../components/layout/Navigation.jsx";
import BackButton from "../components/ui/BackButton.jsx";
import RecipeCard from "../components/recipe/RecipeCard.jsx";
import { calculateNutrition } from "../utils/nutrition.js";
import { ingredients } from "../data/ingredients.js";
import EmptyState from "../components/ui/EmptyState.jsx";

export default function PlanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const plan = useMemo(() => {
    const foundPlan = mealPlans.find((p) => p.id.toString() === id);
    if (!foundPlan) return null;

    const planRecipes = foundPlan.recipeIds
      .map((rId) => {
        const r = recipes.find((rec) => rec.id.toString() === rId.toString());

        if (!r) {
          console.warn(`Recipe with ID ${rId} not found in database`);
          return null;
        }

        return {
          ...r,
          nutrition: calculateNutrition(r, ingredients),
        };
      })
      .filter(Boolean);

    return { ...foundPlan, fullRecipes: planRecipes };
  }, [id]);

  if (!plan) {
    return (
      <EmptyState
        title="Plan Not Found"
        message="We couldn't find the meal plan you're looking for. It might have been deleted."
        actionLabel="Back to Plans"
        onAction={() => navigate("/plans")}
        icon="📅"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <BackButton />
          <button
            onClick={() => navigate(`/shopping-list/${plan.id}`)}
            className="bg-green-600 hover:bg-green-700 text-white font-black py-3 px-6 rounded-2xl transition-all shadow-lg shadow-green-100 flex items-center gap-2"
          >
            <span>🛒</span> View Shopping List
          </button>
        </div>

        {/* Plan Header Card */}

        <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 mb-12 flex flex-col md:flex-row justify-between gap-6">
          <div className="max-w-2xl">
            <span className="px-4 py-1 bg-green-50 text-green-700 text-xs font-black uppercase rounded-full">
              {plan.period}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-4">
              {plan.planName || plan.naziv_plana}
            </h1>
            <p className="text-gray-500 font-medium">
              This plan includes {plan.fullRecipes.length} curated recipes for
              your fitness goals. Below you can find all the meals and their
              preparation details.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <StatCard label="Total Recipes" value={plan.fullRecipes.length} />
            <StatCard label="Time Est." value="Weekly" />
          </div>
        </section>

        {/* Recipes Grid */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
              Recipes in this plan
            </h2>
            <div className="h-px flex-grow bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plan.fullRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

const StatCard = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-2xl text-center border border-gray-100 h-fit self-start min-w-[120px]">
    <span className="block text-[10px] font-black uppercase text-gray-400 leading-none mb-1">
      {label}
    </span>
    <span className="text-2xl font-black text-gray-900 leading-tight">
      {value}
    </span>
  </div>
);
