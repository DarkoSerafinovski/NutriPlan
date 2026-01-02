import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useIngredientForm } from "../hooks/useIngredientForm";
import Navigation from "../components/layout/Navigation";
import FormInput from "../components/ui/FormInput";
import FormSelect from "../components/ui/FormSelect";
import BackButton from "../components/ui/BackButton";

export default function IngredientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formData, handleChange, categories, saveIngredient, loading } =
    useIngredientForm(id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category_id) {
      alert("Please select a category");
      return;
    }

    const result = await saveIngredient();
    if (result.success) navigate("/ingredients");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <BackButton className="mb-6" />

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <header className="p-8 md:p-12 border-b border-gray-50">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              New Ingredient
            </h1>
            <p className="text-gray-500 font-medium">
              Add a new ingredient to your community library
            </p>
          </header>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                label="Ingredient Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Greek Yogurt"
                required
              />
              <FormSelect
                label="Category"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                options={categories.map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                }))}
                required
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FormInput
                label="Proteins (g)"
                name="proteins"
                type="number"
                value={formData.proteins}
                onChange={handleChange}
              />
              <FormInput
                label="Fats (g)"
                name="fats"
                type="number"
                value={formData.fats}
                onChange={handleChange}
              />
              <FormInput
                label="Carbs (g)"
                name="carbs"
                type="number"
                value={formData.carbs}
                onChange={handleChange}
              />
              <FormInput
                label="Calories"
                name="calories"
                type="number"
                value={formData.calories}
                onChange={handleChange}
              />
            </div>

            <FormSelect
              label="Standard Unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              options={[
                { value: "100g", label: "100g" },
                { value: "100ml", label: "100ml" },
                { value: "pc", label: "Piece (pc)" },
              ]}
              className="w-1/2"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 text-white font-black text-xl rounded-2xl transition-all shadow-lg 
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 shadow-green-100"
                }`}
            >
              {loading ? "Adding..." : "Add to Library"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
