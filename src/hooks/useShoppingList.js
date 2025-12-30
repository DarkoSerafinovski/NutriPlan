import { useState } from "react";

export const useShoppingList = (initialItems = []) => {
  const [items, setItems] = useState(initialItems || []);

  const updateAmount = (id, newAmount) => {
    if (newAmount < 0) return;
    setItems((prev) =>
      prev.map((item) =>
        item.ingredientId === id ? { ...item, amount: newAmount } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.ingredientId !== id));
  };

  const addItem = (ingredient) => {
    const exists = items.find((i) => i.ingredientId === ingredient.id);
    if (exists) {
      updateAmount(ingredient.id, exists.amount + 1);
    } else {
      setItems([...items, { ingredientId: ingredient.id, amount: 1 }]);
    }
  };

  return { items, addItem, removeItem, updateAmount };
};
