import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllRecipes from "./pages/AllRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import RecipeForm from "./pages/RecipeForm";
import IngredientsList from "./pages/IngredientsList.jsx";
import IngredientForm from "./pages/IngredientsForm";
import MyPlans from "./pages/MyPlans";
import PlanDetails from "./pages/PlanDetails";
import CreatePlan from "./pages/CreatePlan";
import ShoppingLists from "./pages/ShoppingLists";
import ShoppingListDetails from "./pages/ShoppingListDetails";
import EditList from "./pages/EditList.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<AllRecipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/ingredients" element={<IngredientsList />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/add-recipe" element={<RecipeForm />} />
            <Route path="/edit-recipe/:id" element={<RecipeForm />} />
            <Route path="/add-ingredient" element={<IngredientForm />} />
            <Route path="/edit-ingredient/:id" element={<IngredientForm />} />
            <Route
              path="/favorites"
              element={<AllRecipes onlyFavorites={true} />}
            />
            <Route path="/plans" element={<MyPlans />} />
            <Route path="/plan/:id" element={<PlanDetails />} />
            <Route path="/create-plan" element={<CreatePlan />} />
            <Route path="/shopping-lists" element={<ShoppingLists />} />{" "}
            <Route
              path="/shopping-list/:planId"
              element={<ShoppingListDetails />}
            />
            <Route path="/edit-list/:planId" element={<EditList />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
