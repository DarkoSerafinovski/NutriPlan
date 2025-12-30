import { useState } from "react";

export const useMealPlanForm = () => {
  const [formData, setFormData] = useState({
    planName: "",
    startDate: "",
    recipeIds: [""],
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addRecipeSlot = () => {
    setFormData((prev) => ({ ...prev, recipeIds: [...prev.recipeIds, ""] }));
  };

  const updateRecipeSlot = (index, id) => {
    const newIds = [...formData.recipeIds];
    newIds[index] = id;
    updateField("recipeIds", newIds);
  };

  const removeRecipeSlot = (index) => {
    updateField(
      "recipeIds",
      formData.recipeIds.filter((_, i) => i !== index)
    );
  };

  return {
    formData,
    updateField,
    addRecipeSlot,
    updateRecipeSlot,
    removeRecipeSlot,
  };
};
