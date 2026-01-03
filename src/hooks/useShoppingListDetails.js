import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export function useShoppingListDetails(planId) {
  const [listData, setListData] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchListAndIngredients() {
      if (!planId) return;
      setLoading(true);

      try {
        const [listRes, ingRes] = await Promise.all([
          supabase
            .from("shopping_lists")
            .select(`*, meal_plans(title)`)
            .eq("plan_id", planId)
            .single(),
          supabase.from("ingredients").select("*"),
        ]);

        if (listRes.error) throw listRes.error;

        setListData(listRes.data);
        setIngredients(ingRes.data || []);
        setCheckedItems(listRes.data.checked_items || []);
      } catch (err) {
        console.error("Error fetching shopping list:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchListAndIngredients();
  }, [planId]);

  const toggleItem = async (ingredientId) => {
    const newChecked = checkedItems.includes(ingredientId)
      ? checkedItems.filter((id) => id !== ingredientId)
      : [...checkedItems, ingredientId];

    setCheckedItems(newChecked);

    try {
      const { error } = await supabase
        .from("shopping_lists")
        .update({ checked_items: newChecked })
        .eq("id", listData.id);

      if (error) throw error;
    } catch (err) {
      console.error("Failed to update list:", err);
      setCheckedItems(checkedItems);
    }
  };

  return {
    listData,
    ingredients,
    checkedItems,
    loading,
    error,
    toggleItem,
  };
}
