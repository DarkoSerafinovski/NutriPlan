import { useNavigate } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import IngredientTable from "../components/recipe/IngredientTable";
import FormInput from "../components/ui/FormInput";
import Pagination from "../components/ui/Pagination";
import { usePagination } from "../hooks/usePagination";
import { useMemo, useState } from "react";
import { ingredients } from "../data/ingredients";

const ITEMS_PER_PAGE = 10;

export default function IngredientsList() {
  const navigate = useNavigate();
  const isAdmin = (sessionStorage.getItem("userRole") || "guest") === "admin";

  const [searchTerm, setSearchTerm] = useState("");
  const [ingredientList, setIngredientList] = useState(ingredients);

  // Filter Logic
  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return ingredientList.filter(
      (i) =>
        i.name.toLowerCase().includes(term) ||
        i.category.toLowerCase().includes(term)
    );
  }, [searchTerm, ingredientList]);

  // Pagination Logic
  const { currentItems, currentPage, setCurrentPage, totalPages } =
    usePagination(filtered, ITEMS_PER_PAGE);

  const handleDelete = (id) => {
    if (window.confirm("Delete ingredient?"))
      setIngredientList((prev) => prev.filter((ing) => ing.id !== id));
  };

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
              Manage and view nutritional data.
            </p>
          </header>

          <div className="flex items-center gap-4">
            <FormInput
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            {isAdmin && (
              <button
                onClick={() => navigate("/add-ingredient")}
                className="bg-green-600 text-white font-bold py-4 px-6 rounded-2xl"
              >
                Add New
              </button>
            )}
          </div>
        </div>

        {/* Table Component */}
        <IngredientTable
          items={currentItems}
          isAdmin={isAdmin}
          onEdit={(ing) =>
            navigate(`/edit-ingredient/${ing.id}`, {
              state: { ingredient: ing },
            })
          }
          onDelete={handleDelete}
        />

        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
