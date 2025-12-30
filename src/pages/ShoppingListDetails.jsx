import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { shoppingLists } from "../data/shoppingLists.js";
import { ingredients } from "../data/ingredients.js";
import Navigation from "../components/layout/Navigation.jsx";
import BackButton from "../components/ui/BackButton.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import { mealPlans } from "../data/mealPlans.js";
import { generateShoppingPDF } from "../utils/generatePDF.js";

export default function ShoppingListDetails() {
  const { planId } = useParams();
  const navigate = useNavigate();

  const list = shoppingLists.find(
    (l) => l.planId.toString() === planId?.toString()
  );

  const getPlanName = (planId) => {
    const plan = mealPlans.find((p) => p.id.toString() === planId.toString());
    return plan ? plan.planName : `Plan #${planId}`;
  };

  const [checkedItems, setCheckedItems] = useState({});

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  const toggleItem = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownload = () => {
    generateShoppingPDF(list, ingredients);
  };

  if (!list) {
    return (
      <>
        <Navigation />
        <div className="max-w-3xl mx-auto px-4 py-20">
          <EmptyState
            title="List not found"
            message="We couldn't find the shopping list for this plan."
            icon="❌"
            actionLabel="Back to Lists"
            onAction={() => navigate("/shopping-lists")}
          />
        </div>
      </>
    );
  }

  const currentItems = list.items || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <BackButton />
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 text-sm font-black text-gray-600 hover:text-gray-700 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm transition-all active:scale-95"
            >
              📥 Export PDF
            </button>
            <button
              onClick={() => navigate(`/edit-list/${planId}`)}
              className="text-sm font-black text-green-600 hover:text-green-700 bg-green-50 px-4 py-2 rounded-xl transition-colors"
            >
              ✏️ Edit List
            </button>
          </div>
        </div>

        <header className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Shopping List
          </h1>
          <p className="text-gray-500 font-medium mt-4">
            {getPlanName(planId)}
          </p>
        </header>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-10 space-y-3">
            {currentItems.map((item) => {
              const ingData = ingredients.find(
                (ing) => ing.id === item.ingredientId
              );

              if (!ingData) return null;

              const isChecked = !!checkedItems[item.ingredientId];

              return (
                <div
                  key={item.ingredientId}
                  onClick={() => toggleItem(item.ingredientId)}
                  className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer group ${
                    isChecked
                      ? "bg-gray-50 border-gray-100"
                      : "bg-white border-gray-50 hover:border-green-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isChecked
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300 group-hover:border-green-400"
                      }`}
                    >
                      {isChecked && (
                        <span className="text-white text-[10px]">✓</span>
                      )}
                    </div>

                    <span
                      className={`text-lg font-bold transition-all ${
                        isChecked
                          ? "text-gray-400 line-through"
                          : "text-gray-800"
                      }`}
                    >
                      {ingData.name}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-xl font-black ${
                        isChecked ? "text-gray-400" : "text-gray-900"
                      }`}
                    >
                      {item.amount}
                    </span>
                    <span className="text-xs font-black text-gray-400 uppercase">
                      {ingData.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-10 py-6 bg-gray-50 border-t border-gray-100">
            <ProgressBar
              label="Items Checked"
              current={checkedCount}
              total={currentItems.length}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
