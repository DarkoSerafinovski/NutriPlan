import { useReducer, useMemo, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
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
  const { user } = useAuth();
  const [state, dispatch] = useReducer(filterReducer, initialState);

  // Lokalni state za recepte iz baze
  const [rawRecipes, setRawRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch recepata sa sastojcima i favoritima
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        // Povlačimo recepte + njihove sastojke + podatke o tim sastojcima (JOIN)
        let query = supabase.from("recipes").select(`
            *,
            recipe_ingredients (
              amount,
              ingredients (*)
            ),
            favorites (user_id)
          `);

        const { data, error } = await query;
        if (error) throw error;

        // Mapiramo podatke da odgovaraju tvom formatu i računamo nutriciju
        const formatted = data.map((recipe) => {
          // Provera da li je trenutni korisnik označio ovaj recept kao favorit
          const isFavorite = recipe.favorites?.some(
            (f) => f.user_id === user?.id
          );

          // Pripremamo sastojke za tvoj calculateNutrition utility
          // On verovatno očekuje niz sastojaka sa poljima iz tabele ingredients
          const nutrition = calculateNutrition(recipe.recipe_ingredients);

          return {
            ...recipe,
            isFavorite,
            nutrition,
          };
        });

        setRawRecipes(formatted);
      } catch (err) {
        console.error("Error fetching recipes:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [user, onlyFavorites]);

  // 2. Filtriranje (ostaje useMemo, ali nad rawRecipes)
  const filteredRecipes = useMemo(() => {
    let results = [...rawRecipes];

    if (onlyFavorites) {
      results = results.filter((r) => r.isFavorite === true);
    }

    if (state.searchName) {
      const lower = state.searchName.toLowerCase();
      results = results.filter((r) => r.title.toLowerCase().includes(lower));
    }

    if (state.selectedTypes.length > 0) {
      results = results.filter((r) =>
        state.selectedTypes.includes(r.meal_type)
      );
    }

    if (state.timeRange) {
      const { min, max } = state.timeRange;
      results = results.filter(
        (r) => (!min || r.prep_time >= min) && (!max || r.prep_time <= max)
      );
    }

    if (state.calorieRange) {
      const { min, max } = state.calorieRange;
      results = results.filter((r) => {
        const kcal = r.nutrition.calories;
        return (!min || kcal >= min) && (!max || kcal <= max);
      });
    }

    return results;
  }, [state, rawRecipes, onlyFavorites]);

  return {
    state,
    dispatch,
    filteredRecipes,
    loading,
  };
}
