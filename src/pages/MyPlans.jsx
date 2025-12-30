import React from "react";
import { useNavigate } from "react-router-dom";
import { mealPlans } from "../data/mealPlans.js";
import { usePagination } from "../hooks/usePagination.js";
import Navigation from "../components/layout/Navigation.jsx";
import Pagination from "../components/ui/Pagination.jsx";
import MealPlanCard from "../components/plan/MealPlanCard.jsx";

const PLANS_PER_PAGE = 9;

export default function MyPlans() {
  const navigate = useNavigate();

  const {
    currentItems: currentPlans,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(mealPlans, PLANS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight">
              My Meal Plans
            </h1>
            <p className="text-gray-500 text-lg font-medium mt-2">
              Organized nutrition to help you stay on track.
            </p>
          </div>
          <button
            onClick={() => navigate("/create-plan")}
            className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-gray-200 whitespace-nowrap"
          >
            + Create New Plan
          </button>
        </header>

        {/* Content Section */}
        {currentPlans.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center shadow-sm border-2 border-dashed border-gray-200">
            <span className="text-6xl mb-6 block">📅</span>
            <h3 className="text-2xl font-black text-gray-900">
              No plans found
            </h3>
            <p className="text-gray-500 mt-2">
              Start by creating your first weekly nutrition guide.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPlans.map((plan) => (
              <MealPlanCard
                key={plan.id}
                plan={plan}
                onClick={() => navigate(`/plan/${plan.id}`)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </main>
    </div>
  );
}
