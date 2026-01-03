import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";
import { useAuth } from "../context/AuthContext.js";
import Navigation from "../components/layout/Navigation.jsx";
import MealPlanCard from "../components/plan/MealPlanCard.jsx";
import { usePagination } from "../hooks/usePagination.js";
import Pagination from "../components/ui/Pagination.jsx";
import { useMealPlans } from "../hooks/useMealPlans.js";

const PLANS_PER_PAGE = 6;

export default function Plans() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("my");

  const { plans, loading } = useMealPlans(user, activeTab);

  const { currentItems, currentPage, setCurrentPage, totalPages } =
    usePagination(plans, PLANS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight">
              {activeTab === "my" ? "My Plans" : "Public Plans"}
            </h1>

            {/* TABS SWITCHER */}
            <div className="flex gap-4 mt-6 bg-gray-200/50 p-1.5 rounded-2xl w-fit">
              <button
                onClick={() => setActiveTab("my")}
                className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
                  activeTab === "my"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                My Plans
              </button>
              <button
                onClick={() => setActiveTab("public")}
                className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
                  activeTab === "public"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Community
              </button>
            </div>
          </div>

          <button
            onClick={() => navigate("/create-plan")}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-green-100 whitespace-nowrap"
          >
            + New Plan
          </button>
        </header>

        {loading ? (
          <div className="text-center py-20 font-bold text-gray-400">
            Loading plans...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((plan) => (
              <MealPlanCard
                key={plan.id}
                plan={plan}
                onClick={() => navigate(`/plan/${plan.id}`)}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
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
