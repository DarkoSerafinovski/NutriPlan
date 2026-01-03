export default function MealPlanCard({ plan, onClick }) {
  console.log(plan);
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="bg-green-100 text-green-700 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
          {plan.daysCount} Days
        </span>
        {plan.is_public && (
          <span className="text-gray-400 text-xs font-bold italic">Public</span>
        )}
      </div>

      <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
        {plan.title}
      </h3>

      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
        {plan.description || "No description provided for this meal plan."}
      </p>

      <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-900 font-black text-lg">
            {plan.totalMeals}
          </span>
          <span className="text-gray-400 text-sm font-bold uppercase">
            Total Meals
          </span>
        </div>
        <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white group-hover:bg-green-600 transition-colors">
          →
        </div>
      </div>
    </div>
  );
}
