import React from "react";
import { useNavigate } from "react-router-dom";
import { shoppingLists } from "../data/shoppingLists.js";
import { mealPlans } from "../data/mealPlans.js";
import Navigation from "../components/layout/Navigation.jsx";
import ActionCard from "../components/ui/ActionCard.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";

export default function ShoppingLists() {
  const navigate = useNavigate();

  const getPlanName = (planId) => {
    const plan = mealPlans.find((p) => p.id.toString() === planId.toString());
    return plan ? plan.planName : `Plan #${planId}`;
  };

  const getPlanPeriod = (planId) => {
    const plan = mealPlans.find((p) => p.id.toString() === planId.toString());
    return plan ? plan.period : "No date set";
  };

  if (shoppingLists.length === 0) {
    return (
      <>
        <Navigation />
        <div className="max-w-3xl mx-auto px-4 py-20">
          <EmptyState
            title="No shopping lists yet"
            message="Create a meal plan first and we will generate a shopping list for you."
            icon="🛍️"
            actionLabel="Create Plan"
            onAction={() => navigate("/create-plan")}
          />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />

      <main className="max-w-3xl mx-auto px-4 py-10">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
            My Grocery Lists
          </h1>
          <p className="text-gray-500 font-medium">
            Manage your ingredients and grocery items for upcoming plans.
          </p>
        </header>

        <div className="space-y-4">
          {shoppingLists.map((list) => (
            <ActionCard
              key={list.planId}
              title={getPlanName(list.planId)}
              subtitle={getPlanPeriod(list.planId)}
              icon="🛒"
              onClick={() => navigate(`/shopping-list/${list.planId}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
