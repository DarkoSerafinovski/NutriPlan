import { useState, useEffect } from "react";
import { ingredients } from "../data/ingredients.js";

const initialFormState = {
  name: "",
  category: "vegetables",
  protein: 0,
  fat: 0,
  carbs: 0,
  calories: 0,
  unit: "g",
};

export const useIngredientForm = (ingredientId) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (ingredientId) {
      const existing = ingredients.find(
        (ing) => ing.id.toString() === ingredientId
      );
      if (existing) {
        setFormData(existing);
      }
    } else {
      setFormData(initialFormState);
    }
  }, [ingredientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = ["proteins", "fats", "carbs", "calories"].includes(name)
      ? parseFloat(value) || 0
      : value;

    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  return { formData, handleChange, isEditMode: Boolean(ingredientId) };
};
