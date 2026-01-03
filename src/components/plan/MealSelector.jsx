export const MealSelector = ({ label, value, onChange, options }) => {
  // 1. Mapiramo label forme na meal_type iz baze
  // Ovo radimo jer u bazi verovatno imaš 'snack', a u formi 'snack1' i 'snack2'
  const getMealType = (label) => {
    const l = label.toLowerCase();
    if (l.includes("breakfast")) return "breakfast";
    if (l.includes("snack")) return "snack";
    if (l.includes("lunch")) return "lunch";
    if (l.includes("dinner")) return "dinner";
    return l;
  };

  const targetType = getMealType(label);

  // 2. Filtriramo opcije tako da ostanu samo recepti tog tipa
  const filteredOptions = options.filter(
    (recipe) => recipe.meal_type === targetType
  );

  return (
    <div className="flex-1 space-y-2">
      <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
        {label}
      </label>
      <select
        className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all cursor-pointer"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Empty</option>
        {filteredOptions.map((r) => (
          <option key={r.id} value={r.id}>
            {r.title}
          </option>
        ))}
      </select>

      {/* Opciono: Mali info ako nema recepata za taj tip */}
      {filteredOptions.length === 0 && (
        <span className="text-[9px] text-amber-500 block ml-1 font-bold">
          No {targetType}s found
        </span>
      )}
    </div>
  );
};
