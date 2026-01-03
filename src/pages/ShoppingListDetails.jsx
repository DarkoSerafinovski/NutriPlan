import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../components/layout/Navigation.jsx";
import BackButton from "../components/ui/BackButton.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import { generateShoppingPDF } from "../utils/generatePDF.js";
import { useShoppingListDetails } from "../hooks/useShoppingListDetails.js";
import Loader from "../components/ui/Loader.jsx";

export default function ShoppingListDetails() {
  const { planId } = useParams();
  const navigate = useNavigate();

  const { listData, ingredients, checkedItems, loading, toggleItem } =
    useShoppingListDetails(planId);

  const handleDownload = () => {
    if (!listData || ingredients.length === 0) return;
    generateShoppingPDF(listData, ingredients, listData.meal_plans?.title);
  };

  if (loading) return <Loader text="Loading your list..." />;

  if (!listData) {
    return (
      <EmptyState
        title="List not found"
        onAction={() => navigate("/shopping-lists")}
        icon="❌"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <BackButton />
          <div className="flex gap-2">
            <button
              className="text-sm font-black text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-xl"
              onClick={handleDownload}
            >
              📥 Export PDF
            </button>
          </div>
        </div>

        <header className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Grocery List
          </h1>
          <p className="text-green-600 font-bold mt-2">
            {listData.meal_plans?.title}
          </p>
        </header>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-10 space-y-3">
            {listData.items.map((item) => {
              const ing = ingredients.find((i) => i.id === item.ingredient_id);
              const isChecked = checkedItems.includes(item.ingredient_id);

              return (
                <div
                  key={item.ingredient_id}
                  onClick={() => toggleItem(item.ingredient_id)}
                  className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer ${
                    isChecked
                      ? "bg-gray-50 border-transparent opacity-60"
                      : "bg-white border-gray-100 hover:border-green-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isChecked
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {isChecked && (
                        <span className="text-white text-[10px]">✓</span>
                      )}
                    </div>
                    <span
                      className={`text-lg font-bold ${
                        isChecked
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {ing?.name || "Loading..."}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black block leading-none">
                      {item.amount}
                    </span>
                    <span className="text-[10px] font-black text-gray-400 uppercase">
                      {ing?.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-10 py-8 bg-gray-50 border-t border-gray-100">
            <ProgressBar
              current={checkedItems.length}
              total={listData.items.length}
            />
            <p className="text-center mt-4 text-xs font-black text-gray-400 uppercase tracking-widest">
              {checkedItems.length === listData.items.length
                ? "All items collected! 🎉"
                : "Keep going!"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
