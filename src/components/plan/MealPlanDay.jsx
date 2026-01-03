import { MealSelector } from "./MealSelector";

export const MealPlanDay = ({ day, dayIdx, recipes, onMealChange }) => (
  <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-50">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-black text-gray-900 tracking-tight">
        Day {day.day_number}
      </h3>
      <div className="h-px flex-grow mx-6 bg-gray-100"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {["breakfast", "snack1", "lunch", "snack2", "dinner"].map((meal) => (
        <MealSelector
          key={meal}
          label={meal}
          value={day[`${meal}_id`]}
          options={recipes}
          onChange={(val) => onMealChange(dayIdx, `${meal}_id`, val)}
        />
      ))}
    </div>
  </div>
);
