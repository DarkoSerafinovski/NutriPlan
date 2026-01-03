export function useShoppingListGenerator(recipes) {
  const generateList = (days) => {
    const totals = {};

    days.forEach((day) => {
      const mealIds = [
        day.breakfast_id,
        day.snack1_id,
        day.lunch_id,
        day.snack2_id,
        day.dinner_id,
      ];

      mealIds.forEach((id) => {
        if (!id) return;
        const recipe = recipes.find((r) => r.id === id);
        recipe?.recipe_ingredients?.forEach((ri) => {
          totals[ri.ingredient_id] =
            (totals[ri.ingredient_id] || 0) + ri.amount;
        });
      });
    });

    return Object.entries(totals).map(([ing_id, amt]) => ({
      ingredient_id: ing_id,
      amount: amt,
    }));
  };

  return { generateList };
}
