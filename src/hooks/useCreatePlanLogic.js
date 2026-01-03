import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useMealPlanForm } from "./useMealPlanForm";
import { useShoppingListGenerator } from "./useShoppingListGenerator";

export function useCreatePlanLogic(user, navigate) {
  const [recipes, setRecipes] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const form = useMealPlanForm();
  const { generateList } = useShoppingListGenerator(recipes);

  useEffect(() => {
    async function fetchRecipes() {
      const { data, error: fetchError } = await supabase
        .from("recipes")
        .select("id, title, meal_type, recipe_ingredients(*)");

      if (fetchError) {
        setError("Failed to load recipes");
      } else {
        setRecipes(data || []);
      }
    }
    fetchRecipes();
  }, []);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!user) return;

    setSaving(true);
    setError(null);

    try {
      const { data: plan, error: pError } = await supabase
        .from("meal_plans")
        .insert([
          {
            title: form.title,
            description: form.description,
            is_public: form.isPublic,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (pError) throw pError;

      const { error: daysError } = await supabase
        .from("meal_plan_days")
        .insert(form.days.map((d) => ({ ...d, plan_id: plan.id })));

      if (daysError) throw daysError;

      const items = generateList(form.days);
      const { error: listError } = await supabase
        .from("shopping_lists")
        .insert([
          {
            plan_id: plan.id,
            user_id: user.id,
            items,
          },
        ]);

      if (listError) throw listError;

      navigate("/plans");
    } catch (err) {
      console.error("Critical error saving plan:", err);
      setError(err.message);
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return {
    recipes,
    saving,
    error,
    form,
    handleSave,
  };
}
