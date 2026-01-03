import { useState, useEffect, useMemo } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { calculateNutrition } from "../utils/nutrition";
import { useNavigate } from "react-router-dom";

export function useRecipeDetails(id) {
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getRecipeDetails() {
      if (!id) return;
      setLoading(true);
      setError(null);

      try {
        const { data, error: dbError } = await supabase
          .from("recipes")
          .select(
            `
            *,
            recipe_ingredients (
              amount,
              ingredients (*)
            ),
            favorites (user_id)
          `
          )
          .eq("id", id)
          .single();

        if (dbError) throw dbError;

        const isFav = data.favorites?.some((f) => f.user_id === user?.id);
        setRecipe({ ...data, isFavorite: isFav });
      } catch (err) {
        console.error("Error fetching recipe:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getRecipeDetails();
  }, [id, user]);

  const nutrition = useMemo(() => {
    return recipe ? calculateNutrition(recipe.recipe_ingredients) : null;
  }, [recipe]);

  const toggleFavorite = async () => {
    const isCurrentlyFavorite = recipe.isFavorite;
    try {
      if (isCurrentlyFavorite) {
        await supabase
          .from("favorites")
          .delete()
          .eq("recipe_id", id)
          .eq("user_id", user.id);
      } else {
        await supabase
          .from("favorites")
          .insert([{ recipe_id: id, user_id: user.id }]);
      }

      setRecipe((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    } catch (err) {
      console.error("Error toggling favorite:", err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      const { error } = await supabase
        .from("recipes")
        .delete()
        .eq("id", recipe.id);

      if (!error) {
        navigate("/");
      } else {
        alert("Error deleting recipe: " + error.message);
      }
    }
  };

  return {
    recipe,
    loading,
    error,
    nutrition,
    toggleFavorite,
    handleDelete,
    user,
  };
}
