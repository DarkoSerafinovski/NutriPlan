export const calculateNutrition = (recipeIngredients) => {
  if (!recipeIngredients || recipeIngredients.length === 0) {
    return { calories: 0, proteins: 0, fats: 0, carbs: 0 };
  }

  const totals = recipeIngredients.reduce(
    (acc, item) => {
      const ing = item.ingredients;

      const ratio = ing.unit === "pc" ? item.amount : item.amount / 100;

      acc.calories += (ing.calories || 0) * ratio;
      acc.proteins += (ing.proteins || 0) * ratio;
      acc.fats += (ing.fats || 0) * ratio;
      acc.carbs += (ing.carbs || 0) * ratio;

      return acc;
    },
    { calories: 0, proteins: 0, fats: 0, carbs: 0 }
  );

  return {
    calories: Math.round(totals.calories),
    proteins: Math.round(totals.proteins),
    fats: Math.round(totals.fats),
    carbs: Math.round(totals.carbs),
  };
};
