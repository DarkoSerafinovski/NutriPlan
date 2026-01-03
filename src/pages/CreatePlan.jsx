import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navigation from "../components/layout/Navigation.jsx";
import FormInput from "../components/ui/FormInput.jsx";
import BackButton from "../components/ui/BackButton.jsx";
import { MealPlanDay } from "../components/plan/MealPlanDay.jsx";
import { useCreatePlanLogic } from "../hooks/useCreatePlanLogic.js";

export default function CreatePlan() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { recipes, saving, form, handleSave } = useCreatePlanLogic(
    user,
    navigate
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <BackButton className="mb-6" />

        <form onSubmit={handleSave} className="space-y-8">
          {/* Header Card */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100">
            <h1 className="text-4xl font-black text-gray-900 mb-8">
              Create New Plan
            </h1>

            <div className="space-y-6">
              <FormInput
                label="Plan Title"
                value={form.title}
                onChange={(e) => form.setTitle(e.target.value)}
                placeholder="e.g. 7-Day Clean Eating"
              />
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 uppercase ml-1">
                  Description
                </label>
                <textarea
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none h-24 resize-none"
                  value={form.description}
                  onChange={(e) => form.setDescription(e.target.value)}
                  placeholder="What is the goal of this plan?"
                />
              </div>
              <FormInput
                label=" Make this plan public for the community"
                type="checkbox"
                checked={form.isPublic}
                onChange={(e) => form.setIsPublic(e.target.checked)}
                className="flex items-center gap-3 cursor-pointer p-4 bg-gray-50 rounded-2xl"
              />
            </div>
          </div>

          {/* Days Section */}
          <div className="space-y-6">
            {form.days.map((day, idx) => (
              <MealPlanDay
                key={idx}
                day={day}
                dayIdx={idx}
                recipes={recipes}
                onMealChange={form.updateMeal}
              />
            ))}

            <button
              type="button"
              onClick={form.addDay}
              className="w-full py-6 border-4 border-dashed border-gray-200 rounded-[2.5rem] text-gray-400 text-xl font-black hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all"
            >
              + Add Day {form.days.length + 1}
            </button>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-6 bg-gray-900 text-white font-black text-2xl rounded-[2.5rem] hover:bg-black transition-all shadow-2xl disabled:bg-gray-400"
          >
            {saving ? "Creating Plan..." : "Save Plan & Shopping List"}
          </button>
        </form>
      </div>
    </div>
  );
}
