import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

const getEmptyForm = () => ({
  title: "",
  mealType: "lunch",
  prepTime: 30,
  instructions: "",
  recipeIngredients: [{ ingredient_id: "", amount: 0 }],
});

export function useRecipeForm(id) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(getEmptyForm());

  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        const { data, error } = await supabase
          .from("recipes")
          .select("*, recipe_ingredients(*)")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data) {
          setFormData({
            title: data.title,
            mealType: data.meal_type,
            prepTime: data.prep_time,
            instructions: data.instructions,
            recipeIngredients: data.recipe_ingredients.map((ri) => ({
              ingredient_id: ri.ingredient_id,
              amount: ri.amount,
            })),
          });
        }
      };
      fetchRecipe();
    } else if (!id) {
      setFormData(getEmptyForm());
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      recipeIngredients: [
        ...prev.recipeIngredients,
        { ingredient_id: "", amount: 0 },
      ],
    }));
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...formData.recipeIngredients];
    newIngredients[index][field] = value;
    setFormData((prev) => ({ ...prev, recipeIngredients: newIngredients }));
  };

  const removeIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      recipeIngredients: prev.recipeIngredients.filter((_, i) => i !== index),
    }));
  };

  const saveRecipe = async () => {
    setLoading(true);
    try {
      const recipePayload = {
        title: formData.title,
        meal_type: formData.mealType,
        prep_time: formData.prepTime,
        instructions: formData.instructions,
        user_id: user.id,
      };

      let recipeId = id;

      if (isEditMode) {
        await supabase.from("recipes").update(recipePayload).eq("id", id);
        await supabase.from("recipe_ingredients").delete().eq("recipe_id", id);
      } else {
        const { data, error } = await supabase
          .from("recipes")
          .insert([recipePayload])
          .select()
          .single();
        if (error) throw error;
        recipeId = data.id;
      }

      const ingredientsPayload = formData.recipeIngredients.map((ing) => ({
        recipe_id: recipeId,
        ingredient_id: ing.ingredient_id,
        amount: ing.amount,
      }));

      const { error: ingError } = await supabase
        .from("recipe_ingredients")
        .insert(ingredientsPayload);
      if (ingError) throw ingError;

      return { success: true };
    } catch (err) {
      alert(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    addIngredient,
    updateIngredient,
    removeIngredient,
    saveRecipe,
    isEditMode,
    loading,
  };
}
