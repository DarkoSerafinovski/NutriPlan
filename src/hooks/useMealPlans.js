import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient.js";

export function useMealPlans(user, activeTab) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlans() {
      setLoading(true);
      setError(null);

      try {
        let query = supabase.from("meal_plans").select(`
          *,
          meal_plan_days (
            breakfast_id,
            snack1_id,
            lunch_id,
            snack2_id,
            dinner_id
          )
        `);

        if (activeTab === "my") {
          query = query.eq("user_id", user?.id);
        } else {
          query = query.eq("is_public", true);
        }

        const { data, err } = await query;

        if (err) throw err;

        if (data) {
          const processedPlans = data.map((plan) => {
            const daysCount = plan.meal_plan_days?.length || 0;

            const totalMeals =
              plan.meal_plan_days?.reduce((acc, day) => {
                const mealKeys = [
                  "breakfast_id",
                  "snack1_id",
                  "lunch_id",
                  "snack2_id",
                  "dinner_id",
                ];
                const countForDay = mealKeys.reduce((dayAcc, key) => {
                  return dayAcc + (day[key] ? 1 : 0);
                }, 0);
                return acc + countForDay;
              }, 0) || 0;

            return {
              ...plan,
              daysCount,
              totalMeals,
            };
          });

          setPlans(processedPlans);
        }
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    // Pozivamo samo ako imamo korisnika ili ako gledamo public planove
    if (user?.id || activeTab === "public") {
      fetchPlans();
    }
  }, [activeTab, user?.id]);

  return { plans, loading, error };
}
