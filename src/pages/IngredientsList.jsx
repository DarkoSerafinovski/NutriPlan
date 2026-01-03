import { useNavigate } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import IngredientTable from "../components/recipe/IngredientTable";
import FormInput from "../components/ui/FormInput";
import Pagination from "../components/ui/Pagination";
import Loader from "../components/ui/Loader";
import { usePagination } from "../hooks/usePagination";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useIngredients } from "../hooks/useIngredients";

const ITEMS_PER_PAGE = 10;

export default function IngredientsList() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const { ingredients, loading } = useIngredients(searchTerm);

  const { currentItems, currentPage, setCurrentPage, totalPages } =
    usePagination(ingredients, ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <header>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Ingredients Library
            </h1>
            <p className="text-gray-500 font-medium">
              Browse and manage nutritional data from your database.
            </p>
          </header>

          <div className="flex items-center gap-4">
            <FormInput
              placeholder="Search ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            {user?.email === "darkoserafinovski@gmail.com" && (
              <button
                onClick={() => navigate("/add-ingredient")}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-lg shadow-green-200"
              >
                + Add New
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : (
          <>
            <IngredientTable items={currentItems} />

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
