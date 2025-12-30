import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ingredients } from "../data/ingredients.js";
import { shoppingLists } from "../data/shoppingLists.js";
import Navigation from "../components/layout/Navigation.jsx";
import BackButton from "../components/ui/BackButton.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import FormInput from "../components/ui/FormInput.jsx";
import SearchDropdown from "../components/ui/SearchDropdown.jsx";
import { useShoppingList } from "../hooks/useShoppingList.js";
import EditItemRow from "../components/shoppingList/EditItemRow.jsx";

export default function EditList() {
  const { planId } = useParams();
  const navigate = useNavigate();

  const originalList = shoppingLists.find(
    (l) => l.planId.toString() === planId?.toString()
  );

  const { items, addItem, removeItem, updateAmount } = useShoppingList(
    originalList.items
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleSave = () => {
    const updatedData = {
      planId: originalList.planId,
      items: items,
    };
    console.log("Saving updated list:", updatedData);
    // Ovde će ići Firebase update doc logičnije
    navigate(-1);
  };

  const searchResults = searchTerm
    ? ingredients
        .filter((ing) =>
          ing.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5)
    : [];

  if (!originalList) {
    return (
      <>
        <Navigation />
        <div className="max-w-3xl mx-auto px-4 py-20">
          <EmptyState
            title="List not found"
            icon="❌"
            actionLabel="Go Back"
            onAction={() => navigate(-1)}
          />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />

      <main className="max-w-2xl mx-auto px-4 py-10">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <BackButton />
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mt-4">
              Edit List
            </h1>
            <p className="text-gray-500 font-medium">
              Plan ID: #{planId} • Customize your grocery needs.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-green-200 hover:bg-green-700 transition-all active:scale-95"
          >
            Save Changes
          </button>
        </header>

        {/* --- Search & Add Section --- */}
        <div className="mb-8 relative">
          <FormInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Add more ingredients... (e.g. Pasta, Oil)"
            className="relative group"
            icon="🔍"
          />

          {/* Search Dropdown */}
          <SearchDropdown
            visible={searchTerm.length > 0}
            onSelect={addItem}
            results={searchResults}
          />
        </div>

        {/* --- Current Items List --- */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="p-2 bg-gray-50/50 border-b border-gray-100 text-center">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Shopping List Content
            </span>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-10 space-y-4">
              {items.length === 0 ? (
                <p className="text-center py-10 text-gray-400 italic">
                  Your list is empty.
                </p>
              ) : (
                items.map((item) => (
                  <EditItemRow
                    key={item.ingredientId}
                    item={item}
                    ingInfo={ingredients.find(
                      (i) => i.id === item.ingredientId
                    )}
                    onUpdate={updateAmount}
                    onRemove={removeItem}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
