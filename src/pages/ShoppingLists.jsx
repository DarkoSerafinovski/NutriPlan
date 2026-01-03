import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import Navigation from "../components/layout/Navigation.jsx";
import ActionCard from "../components/ui/ActionCard.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import Loader from "../components/ui/Loader.jsx";

export default function ShoppingLists() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShoppingLists() {
      setLoading(true);

      const { data, error } = await supabase
        .from("shopping_lists")
        .select(
          `
          *,
          meal_plans (
            title
          )
        `
        )
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setLists(data);
      }
      setLoading(false);
    }

    if (user) fetchShoppingLists();
  }, [user]);

  if (loading) {
    return <Loader text="Loading lists..." />;
  }

  if (lists.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
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
      </div>
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
            Track your progress and ingredients for each plan.
          </p>
        </header>

        <div className="space-y-4">
          {lists.map((list) => {
            const totalItems = list.items?.length || 0;
            const boughtItems = list.checked_items?.length || 0;
            const progress =
              totalItems > 0 ? Math.round((boughtItems / totalItems) * 100) : 0;

            return (
              <ActionCard
                key={list.id}
                title={list.meal_plans?.title || "Unnamed Plan"}
                subtitle={`${boughtItems} of ${totalItems} items collected (${progress}%)`}
                icon={progress === 100 ? "✅" : "🛒"}
                onClick={() => navigate(`/shopping-list/${list.plan_id}`)}
                badge={progress === 100 ? "Completed" : null}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
