import { recipes } from "../data/recipes.js";
import { ingredients } from "../data/ingredients.js";

export const generateShoppingList = (selectedRecipeIds) => {
  const ingredientsMap = new Map();

  selectedRecipeIds.forEach((id) => {
    const recipe = recipes.find((r) => r.id.toString() === id.toString());

    // Koristimo tvoj ključ "ingredients" iz recepta
    if (recipe && recipe.ingredients) {
      recipe.ingredients.forEach((item) => {
        const ingId = item.ingredientId;
        const amount = item.amount || 0;

        if (ingId !== undefined) {
          const currentAmount = ingredientsMap.get(ingId) || 0;
          ingredientsMap.set(ingId, currentAmount + amount);
        }
      });
    }
  });

  // Pretvaramo Map u niz i odmah spajamo sa podacima iz ingredients.js
  return Array.from(ingredientsMap.entries()).map(([id, totalAmount]) => {
    const ingredientInfo = ingredients.find(
      (ing) => ing.id.toString() === id.toString()
    );
    return {
      id,
      amount: totalAmount,
      name: ingredientInfo?.name || "Unknown Ingredient",
      unit: ingredientInfo?.unit || "unit",
    };
  });
};

export const calculateEndDate = (startDate) => {
  if (!startDate) return "";
  const date = new Date(startDate);
  date.setDate(date.getDate() + 6);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
