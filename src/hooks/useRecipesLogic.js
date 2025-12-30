import { useReducer, useMemo } from "react";
import { ingredients } from "../data/ingredients";
import { recipes } from "../data/recipes";
import { calculateNutrition } from "../utils/nutrition";

const initialState = {
  searchName: "",
  selectedTypes: [],
  timeRange: null,
  calorieRange: null,
};

function filterReducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, searchName: action.payload };
    case "TOGGLE_TYPE":
      const newTypes = state.selectedTypes.includes(action.payload)
        ? state.selectedTypes.filter((t) => t !== action.payload)
        : [...state.selectedTypes, action.payload];
      return { ...state, selectedTypes: newTypes };
    case "SET_TIME":
      return { ...state, timeRange: action.payload };
    case "SET_CALORIES":
      return { ...state, calorieRange: action.payload };
    case "CLEAR_FILTERS":
      return { ...initialState };
    default:
      return state;
  }
}

export default function useRecipesLogic({ onlyFavorites }) {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const filteredRecipes = useMemo(() => {
    let results = recipes.map((r) => ({
      ...r,
      nutrition: calculateNutrition(r, ingredients),
    }));

    if (onlyFavorites) {
      results = results.filter((r) => r.isFavorite === true);
    }
    if (state.searchName) {
      const lower = state.searchName.toLowerCase();
      results = results.filter((r) => r.title.toLowerCase().includes(lower));
    }

    if (state.selectedTypes.length > 0) {
      results = results.filter((r) => state.selectedTypes.includes(r.mealType));
    }

    if (state.timeRange) {
      results = results.filter((r) => {
        const { min, max } = state.timeRange;
        return (!min || r.prepTime >= min) && (!max || r.prepTime <= max);
      });
    }

    if (state.calorieRange) {
      results = results.filter((r) => {
        const kcal = r.nutrition.calories;
        const { min, max } = state.calorieRange;
        return (!min || kcal >= min) && (!max || kcal <= max);
      });
    }

    return results;
  }, [
    state.searchName,
    state.selectedTypes,
    state.timeRange,
    state.calorieRange,
    onlyFavorites,
  ]);

  return {
    state,
    dispatch,
    filteredRecipes,
  };
}
