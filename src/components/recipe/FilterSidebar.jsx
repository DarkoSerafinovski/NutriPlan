import React from "react";
import { useAuth } from "../../context/AuthContext";
import FormInput from "../ui/FormInput";
import { type } from "@testing-library/user-event/dist/type";

const mealTypes = ["Breakfast", "Lunch", "Snack", "Dinner", "Dessert"];

const timeFilters = [
  { label: "Under 10 min", max: 10 },
  { label: "11 - 30 min", min: 11, max: 30 },
  { label: "Over 30 min", min: 31 },
];

const calorieFilters = [
  { label: "Under 200 kcal", max: 200 },
  { label: "201 - 400 kcal", min: 201, max: 400 },
  { label: "Over 400 kcal", min: 401 },
];

const FilterSidebar = ({ state, dispatch }) => {
  const { user } = useAuth();

  return (
    <aside className="w-full lg:w-64 flex flex-col gap-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
      {user && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
            Visibility
          </h3>
          <div className="flex flex-col gap-3">
            <FormInput
              type="toggle"
              label="My Recipes Only"
              checked={state.onlyMyRecipes}
              onChange={() => dispatch({ type: "TOGGLE_MY_RECIPES" })}
            />
          </div>
        </div>
      )}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
          Meal Type
        </h3>
        <div className="flex flex-col gap-1">
          {mealTypes.map((type) => (
            <FormInput
              key={type}
              label={type}
              type="checkbox"
              checked={state.selectedTypes.includes(type.toLowerCase())}
              onChange={() =>
                dispatch({ type: "TOGGLE_TYPE", payload: type.toLowerCase() })
              }
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
          Prep Time
        </h3>
        <div className="flex flex-col gap-2">
          {timeFilters.map((filter) => (
            <FormInput
              key={filter.label}
              label={filter.label}
              name="time"
              type="radio"
              checked={state.timeRange?.label === filter.label}
              onChange={() => dispatch({ type: "SET_TIME", payload: filter })}
            />
          ))}

          <FormInput
            label="All Times"
            name="time"
            type="radio"
            checked={state.timeRange === null}
            onChange={() => dispatch({ type: "SET_TIME", payload: null })}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
          Calories
        </h3>

        <div className="flex flex-col gap-2">
          {calorieFilters.map((filter) => (
            <FormInput
              key={filter.label}
              label={filter.label}
              name="calories"
              type="radio"
              checked={state.calorieRange?.label === filter.label}
              onChange={() =>
                dispatch({ type: "SET_CALORIES", payload: filter })
              }
            />
          ))}

          <FormInput
            label="All Calories"
            name="calories"
            type="radio"
            checked={state.calorieRange === null}
            onChange={() => dispatch({ type: "SET_CALORIES", payload: null })}
          />
        </div>
      </div>

      <button
        onClick={() => dispatch({ type: "CLEAR_FILTERS" })}
        className="w-full mt-4 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-600 hover:text-white transition-all duration-200"
      >
        Reset All Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
