import React from "react";

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
  return (
    <aside className="w-full lg:w-64 flex flex-col gap-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
          Meal Type
        </h3>
        <div className="flex flex-col gap-3">
          {mealTypes.map((type) => (
            <label
              key={type}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                checked={state.selectedTypes.includes(type)}
                onChange={() =>
                  dispatch({ type: "TOGGLE_TYPE", payload: type })
                }
              />
              <span className="text-gray-600 group-hover:text-green-700 transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
          Prep Time
        </h3>
        <div className="flex flex-col gap-3">
          {timeFilters.map((filter) => (
            <label
              key={filter.label}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="time"
                className="w-5 h-5 border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                checked={state.timeRange?.label === filter.label}
                onChange={() => dispatch({ type: "SET_TIME", payload: filter })}
              />
              <span className="text-gray-600 group-hover:text-green-700 transition-colors">
                {filter.label}
              </span>
            </label>
          ))}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="time"
              className="w-5 h-5 border-gray-300 text-green-600 focus:ring-green-500"
              checked={state.timeRange === null}
              onChange={() => dispatch({ type: "SET_TIME", payload: null })}
            />
            <span className="text-gray-400">All Times</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
          Calories
        </h3>
        <div className="flex flex-col gap-3">
          {calorieFilters.map((filter) => (
            <label
              key={filter.label}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="calories"
                className="w-5 h-5 border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                checked={state.calorieRange?.label === filter.label}
                onChange={() =>
                  dispatch({ type: "SET_CALORIES", payload: filter })
                }
              />
              <span className="text-gray-600 group-hover:text-green-700 transition-colors">
                {filter.label}
              </span>
            </label>
          ))}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="calories"
              className="w-5 h-5 border-gray-300 text-green-600 focus:ring-green-500"
              checked={state.calorieRange === null}
              onChange={() => dispatch({ type: "SET_CALORIES", payload: null })}
            />
            <span className="text-gray-400">All Calories</span>
          </label>
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
