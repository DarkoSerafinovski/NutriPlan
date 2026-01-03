import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient.js";

const initialFormState = {
  name: "",
  category_id: "",
  proteins: 0,
  fats: 0,
  carbs: 0,
  calories: 0,
  unit: "100g",
};

export const useIngredientForm = () => {
  const [formData, setFormData] = useState(initialFormState);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCategories() {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      setCategories(data || []);
    }
    getCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveIngredient = async () => {
    setLoading(true);
    try {
      const { data: existing } = await supabase
        .from("ingredients")
        .select("name")
        .ilike("name", formData.name.trim())
        .maybeSingle();

      if (existing) {
        alert(`Ingredient ${existing.name} already exists in the library!`);
        return { success: false };
      }

      const { error } = await supabase
        .from("ingredients")
        .insert([{ ...formData, name: formData.name.trim() }]);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      alert("Error: " + err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, categories, saveIngredient, loading };
};
