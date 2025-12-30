export const recipes = [
  {
    id: 1,
    title: "Chicken with Vegetables",
    mealType: "Lunch",
    prepTime: 30,
    instructions: "Grill the chicken and add the vegetables.",
    ingredients: [
      { ingredientId: 11, amount: 200 }, // Chicken - 200 g
      { ingredientId: 9, amount: 100 }, // Broccoli - 100 g
      { ingredientId: 7, amount: 50 }, // Carrot - 50 g
    ],
    isFavorite: true,
  },
  {
    id: 2,
    title: "Vegetable Omelet",
    mealType: "Breakfast",
    prepTime: 10,
    instructions: "Whisk the eggs, add chopped vegetables, and fry in a pan.",
    ingredients: [
      { ingredientId: 15, amount: 3 }, // Eggs - 3 pc
      { ingredientId: 10, amount: 50 }, // Bell Pepper - 50 g
      { ingredientId: 8, amount: 50 }, // Tomato - 50 g
    ],
    isFavorite: true,
  },
  {
    id: 3,
    title: "Salmon with Rice",
    mealType: "Lunch",
    prepTime: 25,
    instructions: "Bake salmon in olive oil, boil rice, and serve.",
    ingredients: [
      { ingredientId: 25, amount: 150 }, // Salmon - 150 g
      { ingredientId: 19, amount: 100 }, // Rice - 100 g
      { ingredientId: 30, amount: 1 }, // Olive Oil - 1 tbsp
    ],
    isFavorite: true,
  },
  {
    id: 4,
    title: "Fruit Oatmeal",
    mealType: "Breakfast",
    prepTime: 5,
    instructions: "Cook oats in milk and add fresh fruit.",
    ingredients: [
      { ingredientId: 21, amount: 50 }, // Oats - 50 g
      { ingredientId: 16, amount: 200 }, // Milk - 200 ml
      { ingredientId: 1, amount: 1 }, // Banana - 1 pc
      { ingredientId: 2, amount: 1 }, // Apple - 1 pc
    ],
    isFavorite: true,
  },
  {
    id: 5,
    title: "Turkey with Potatoes",
    mealType: "Lunch",
    prepTime: 40,
    instructions: "Roast turkey and potatoes in the oven.",
    ingredients: [
      { ingredientId: 12, amount: 200 }, // Turkey - 200 g
      { ingredientId: 6, amount: 150 }, // Potato - 150 g
      { ingredientId: 30, amount: 1 }, // Olive Oil - 1 tbsp
    ],
    isFavorite: true,
  },
  {
    id: 6,
    title: "Tuna Salad",
    mealType: "Dinner",
    prepTime: 10,
    instructions: "Mix tuna with vegetables and drizzle with olive oil.",
    ingredients: [
      { ingredientId: 26, amount: 100 }, // Tuna - 100 g
      { ingredientId: 8, amount: 50 }, // Tomato - 50 g
      { ingredientId: 10, amount: 50 }, // Bell Pepper - 50 g
      { ingredientId: 30, amount: 1 }, // Olive Oil - 1 tbsp
    ],
    isFavorite: false,
  },
  {
    id: 7,
    title: "Pasta with Tomato Sauce",
    mealType: "Lunch",
    prepTime: 20,
    instructions: "Boil the pasta, make the tomato sauce, and mix.",
    ingredients: [
      { ingredientId: 20, amount: 3 }, // Bread (using as pasta placeholder)
      { ingredientId: 8, amount: 150 }, // Tomato - 150 g
      { ingredientId: 30, amount: 1 }, // Olive Oil - 1 tbsp
    ],
    isFavorite: false,
  },
  {
    id: 8,
    title: "Fruit Salad",
    mealType: "Snack",
    prepTime: 5,
    instructions: "Chop all fruit and mix in a bowl.",
    ingredients: [
      { ingredientId: 1, amount: 1 }, // Banana - 1 pc
      { ingredientId: 2, amount: 1 }, // Apple - 1 pc
      { ingredientId: 4, amount: 1 }, // Orange - 1 pc
      { ingredientId: 3, amount: 50 }, // Strawberry - 50 g
    ],
    isFavorite: true,
  },
  {
    id: 9,
    title: "Chicken Sandwich",
    mealType: "Snack",
    prepTime: 10,
    instructions: "Place chicken, vegetables, and cheese between bread slices.",
    ingredients: [
      { ingredientId: 11, amount: 100 }, // Chicken - 100 g
      { ingredientId: 20, amount: 2 }, // Bread - 2 pc
      { ingredientId: 18, amount: 20 }, // Cheese - 20 g
      { ingredientId: 8, amount: 30 }, // Tomato - 30 g
    ],
    isFavorite: false,
  },
  {
    id: 10,
    title: "Chocolate Mousse",
    mealType: "Dessert",
    prepTime: 15,
    instructions: "Melt chocolate, add whipped cream/yogurt, and chill.",
    ingredients: [
      { ingredientId: 29, amount: 100 }, // Dark Chocolate - 100 g
      { ingredientId: 17, amount: 100 }, // Yogurt - 100 ml
      { ingredientId: 28, amount: 1 }, // Honey - 1 tbsp
    ],
    isFavorite: true,
  },
];
