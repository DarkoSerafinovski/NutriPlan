import { useState } from "react";

export function useMealPlanForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [days, setDays] = useState([
    {
      day_number: 1,
      breakfast_id: null,
      snack1_id: null,
      lunch_id: null,
      snack2_id: null,
      dinner_id: null,
    },
  ]);

  const addDay = () => {
    setDays((prev) => [
      ...prev,
      {
        day_number: prev.length + 1,
        breakfast_id: null,
        snack1_id: null,
        lunch_id: null,
        snack2_id: null,
        dinner_id: null,
      },
    ]);
  };

  const updateMeal = (dayIdx, mealKey, value) => {
    const newDays = [...days];
    newDays[dayIdx][mealKey] = value === "" ? null : value;
    setDays(newDays);
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    isPublic,
    setIsPublic,
    days,
    addDay,
    updateMeal,
  };
}
