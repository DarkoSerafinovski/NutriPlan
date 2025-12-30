import { useState, useEffect } from "react";
import { recipes } from "../data/recipes.js";
import { ingredients as allIngredients } from "../data/ingredients.js";

const initialFormState = {
  title: "",
  mealType: "breakfast",
  instructions: "",
  prepTime: "",
  recipeIngredients: [{ ingredientId: allIngredients[0]?.id || 1, amount: 0 }],
};

export const useRecipeForm = (recipeId) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (recipeId) {
      const recipeToEdit = recipes.find((r) => r.id.toString() === recipeId);
      if (recipeToEdit) {
        setFormData({
          title: recipeToEdit.title,
          mealType: recipeToEdit.mealType,
          instructions: recipeToEdit.instructions,
          prepTime: recipeToEdit.prepTime,
          recipeIngredients: recipeToEdit.ingredients,
        });
      }
    } else {
      setFormData(initialFormState);
    }
  }, [recipeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      recipeIngredients: [
        ...prev.recipeIngredients,
        { ingredientId: allIngredients[0].id, amount: 0 },
      ],
    }));
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...formData.recipeIngredients];
    newIngredients[index][field] =
      field === "ingredientId" ? parseInt(value) : parseFloat(value) || 0;
    setFormData((prev) => ({ ...prev, recipeIngredients: newIngredients }));
  };

  const removeIngredient = (index) => {
    if (formData.recipeIngredients.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      recipeIngredients: prev.recipeIngredients.filter((_, i) => i !== index),
    }));
  };

  return {
    formData,
    handleChange,
    addIngredient,
    updateIngredient,
    removeIngredient,
    isEditMode: Boolean(recipeId),
  };
};
