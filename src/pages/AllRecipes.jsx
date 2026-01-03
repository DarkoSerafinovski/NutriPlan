import React from "react";
import useRecipesLogic from "../hooks/useRecipesLogic";
import Navigation from "../components/layout/Navigation";
import RecipeCard from "../components/recipe/RecipeCard";
import FilterSidebar from "../components/recipe/FilterSidebar";
import Pagination from "../components/ui/Pagination";
import FormInput from "../components/ui/FormInput";
import { usePagination } from "../hooks/usePagination";
import EmptyState from "../components/ui/EmptyState";

const RECIPES_PER_PAGE = 6;

export default function AllRecipes({ onlyFavorites = false }) {
  const { state, dispatch, filteredRecipes } = useRecipesLogic({
    onlyFavorites,
  });

  const { currentItems, currentPage, setCurrentPage, totalPages } =
    usePagination(filteredRecipes, RECIPES_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {onlyFavorites ? "Your Favorite Recipes" : "Expolore All Recipes"}
          </h1>
          <p className="mt-2 text-gray-600">
            {onlyFavorites
              ? `You have saved ${filteredRecipes.length} recipes to your favorites.`
              : `Found ${filteredRecipes.length} healthy meals for you.`}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar state={state} dispatch={dispatch} />

          <div className="flex-1">
            <FormInput
              icon="🔍"
              placeholder="Search by meal name..."
              value={state.searchName}
              onChange={(e) =>
                dispatch({ type: "SET_SEARCH", payload: e.target.value })
              }
              className="mb-8"
            />

            {currentItems.length === 0 ? (
              <EmptyState
                title="No recipes found"
                message="Try adjusting your filters or search term."
                actionLabel="Clear all filters"
                onAction={() => dispatch({ type: "CLEAR_FILTERS" })}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentItems.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}

            <div className="mt-12 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
