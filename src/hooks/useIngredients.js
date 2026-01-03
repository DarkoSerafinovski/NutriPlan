import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export function useIngredients(searchTerm = "") {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = supabase
          .from("ingredients")
          .select(`*, categories(name)`)
          .order("name");

        if (searchTerm.trim() !== "") {
          query = query.ilike("name", `%${searchTerm}%`);
        }

        const { data, error: dbError } = await query;

        if (dbError) throw dbError;
        setIngredients(data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching ingredients:", err.message);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchIngredients();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return { ingredients, loading, error };
}
