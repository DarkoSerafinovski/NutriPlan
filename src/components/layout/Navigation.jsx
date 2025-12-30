import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const menus = {
  admin: [
    { name: "Recipes", path: "/recipes" },
    { name: "Ingredients", path: "/ingredients" },
    { name: "Add Recipe", path: "/add-recipe" },
  ],
  user: [
    { name: "Browse Recipes", path: "/recipes" },
    { name: "Meal Plans", path: "/plans" },
    { name: "Create Plan", path: "/create-plan" },
    { name: "Shopping Lists", path: "/shopping-lists" },
    { name: "Favorites", path: "/favorites" },
  ],
  guest: [
    { name: "All Recipes", path: "/recipes" },
    { name: "Login", path: "/" },
    { name: "Register", path: "/register" },
  ],
};

export default function Navigation() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const role = sessionStorage.getItem("userRole") || "guest";

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const activeStyle =
    "text-green-600 font-bold border-b-2 border-green-600 pb-1";
  const inactiveStyle =
    "text-gray-600 hover:text-green-600 transition-colors font-medium";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink
              to="/recipes"
              className="text-2xl font-black text-green-600 tracking-tight"
            >
              NUTRI<span className="text-gray-800">PLAN</span>
            </NavLink>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            {menus[role].map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                {name}
              </NavLink>
            ))}

            {role !== "guest" && (
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all text-sm"
              >
                Logout
              </button>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none text-2xl"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menus[role].map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md"
              >
                {name}
              </NavLink>
            ))}
            {role !== "guest" && (
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
