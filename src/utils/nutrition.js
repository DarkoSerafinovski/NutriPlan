export const calculateNutrition = (recipe, allIngredients) => {
  let totals = { fat: 0, protein: 0, carbs: 0, calories: 0 };
  recipe.ingredients.forEach(({ ingredientId, amount }) => {
    const item = allIngredients.find((i) => i.id === ingredientId);
    if (!item) return;
    const factor =
      item.unit === "g" || item.unit === "ml" ? amount / 100 : amount;
    totals.fat += item.fat * factor;
    totals.protein += item.protein * factor;
    totals.carbs += item.carbs * factor;
    totals.calories += item.calories * factor;
  });
  return Object.fromEntries(
    Object.entries(totals).map(([key, val]) => [key, Math.round(val * 10) / 10])
  );
};
