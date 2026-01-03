import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Navigation from "../components/layout/Navigation.jsx";
import BackButton from "../components/ui/BackButton.jsx";
import RecipeCard from "../components/recipe/RecipeCard.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";

export default function PlanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFullPlanDetails() {
      setLoading(true);

      const { data, error } = await supabase
        .from("meal_plans")
        .select(
          `
          *,
          meal_plan_days (
            day_number,
            breakfast:recipes!breakfast_id (*),
            snack1:recipes!snack1_id (*),
            lunch:recipes!lunch_id (*),
            snack2:recipes!snack2_id (*),
            dinner:recipes!dinner_id (*)
          )
        `
        )
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("Error fetching plan:", error);
        setPlan(null);
      } else {
        const sortedDays = data.meal_plan_days.sort(
          (a, b) => a.day_number - b.day_number
        );
        setPlan({ ...data, meal_plan_days: sortedDays });
      }
      setLoading(false);
    }

    getFullPlanDetails();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-20 font-bold">Loading plan details...</div>
    );

  if (!plan) {
    return (
      <EmptyState
        title="Plan Not Found"
        message="We couldn't find the meal plan you're looking for."
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

        {/* Plan Header */}
        <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 mb-12 flex flex-col md:flex-row justify-between gap-6">
          <div className="max-w-2xl">
            <span className="px-4 py-1 bg-green-50 text-green-700 text-xs font-black uppercase rounded-full">
              {plan.meal_plan_days.length} Days Plan
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-4">
              {plan.title}
            </h1>
            <p className="text-gray-500 font-medium leading-relaxed">
              {plan.description || "No description provided for this plan."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <StatCard label="Days" value={plan.meal_plan_days.length} />
            <StatCard label="Public" value={plan.is_public ? "Yes" : "No"} />
          </div>
        </section>

        <div className="space-y-16">
          {plan.meal_plan_days.map((day) => (
            <section key={day.day_number}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                  Day {day.day_number}
                </h2>
                <div className="h-px flex-grow bg-gray-200"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {day.breakfast && (
                  <RecipeCard recipe={day.breakfast} label="Breakfast" />
                )}
                {day.snack1 && (
                  <RecipeCard recipe={day.snack1} label="Snack 1" />
                )}
                {day.lunch && <RecipeCard recipe={day.lunch} label="Lunch" />}

                {day.snack2 && (
                  <RecipeCard recipe={day.snack2} label="Snack 2" />
                )}
                {day.dinner && (
                  <RecipeCard recipe={day.dinner} label="Dinner" />
                )}
              </div>
            </section>
          ))}
        </div>
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
