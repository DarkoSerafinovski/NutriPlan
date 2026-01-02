import React from "react";

const NutritionStats = ({ nutrition, variant = "large" }) => {
  if (!nutrition) return null;

  const stats = [
    {
      label: "Calories",
      value: nutrition.calories,
      unit: "kcal",
      color: "orange",
    },
    { label: "Proteins", value: nutrition.proteins, unit: "g", color: "blue" },
    { label: "Carbs", value: nutrition.carbs, unit: "g", color: "purple" },
    { label: "Fats", value: nutrition.fats, unit: "g", color: "red" },
  ];

  const containerClasses =
    variant === "large"
      ? "grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-green-50/30"
      : "grid grid-cols-2 gap-2";

  const cardClasses =
    variant === "large"
      ? "bg-white p-5 rounded-2xl shadow-sm border border-green-100/50 text-center"
      : "bg-gray-50 p-2 rounded-lg text-center border border-gray-100";

  const labelClasses =
    variant === "large"
      ? "text-[10px] uppercase font-black tracking-tighter mb-1"
      : "text-[8px] uppercase font-bold opacity-70";

  const valueClasses =
    variant === "large"
      ? "text-2xl font-black text-gray-800"
      : "text-sm font-bold text-gray-800";

  const colorMap = {
    orange: "text-orange-500",
    blue: "text-blue-500",
    purple: "text-purple-500",
    red: "text-red-500",
  };

  return (
    <div className={containerClasses}>
      {stats.map((stat) => (
        <div key={stat.label} className={cardClasses}>
          <p className={`${labelClasses} ${colorMap[stat.color]}`}>
            {stat.label}
          </p>
          <p className={valueClasses}>
            {stat.value}
            <span
              className={
                variant === "large"
                  ? "text-sm font-normal text-gray-400 ml-1"
                  : "text-[10px] ml-0.5"
              }
            >
              {stat.unit}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default NutritionStats;
