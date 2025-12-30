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
  const { formData, handleChange, isEditMode } = useIngredientForm(id);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Ingredient:", formData);
    navigate("/ingredients");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <BackButton className="mb-6" />

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <header className="p-8 md:p-12 border-b border-gray-50">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              {isEditMode ? "Edit Ingredient" : "New Ingredient"}
            </h1>
            <p className="text-gray-500 font-medium">
              Define nutritional values per 100g/ml.
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
                name="category"
                value={formData.category.toLowerCase()}
                onChange={handleChange}
                options={[
                  "vegetable",
                  "fruit",
                  "meat",
                  "other",
                  "dairy",
                  "grains",
                  "nuts",
                  "fish",
                ]}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FormInput
                label="Proteins (g)"
                name="proteins"
                type="number"
                value={formData.protein}
                onChange={handleChange}
              />
              <FormInput
                label="Fats (g)"
                name="fats"
                type="number"
                value={formData.fat}
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
              options={["g", "ml", "pcs", "tbsp"]}
              className="w-1/2"
            />

            <button
              type="submit"
              className="w-full py-5 bg-green-600 text-white font-black text-xl rounded-2xl hover:bg-green-700 transition-all shadow-lg shadow-green-100"
            >
              {isEditMode ? "Update Ingredient" : "Add to Library"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
