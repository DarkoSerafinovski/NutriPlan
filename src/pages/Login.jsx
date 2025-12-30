import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "admin123") {
      saveSession("admin", username);
    } else if (username === "user" && password === "user123") {
      saveSession("user", username);
    } else {
      setError("Invalid username or password!");
    }
  };

  const saveSession = (role, name) => {
    sessionStorage.setItem("userRole", role);
    sessionStorage.setItem("username", name);
    navigate("/recipes");
  };

  const handleGuestLogin = () => {
    saveSession("guest", "Guest");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">
            Please enter your details to sign in
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
          >
            Sign In
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <div className="border-t w-full border-gray-200"></div>
          <span className="bg-white px-3 text-sm text-gray-400 absolute">
            or
          </span>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/register")}
            className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Create an Account
          </button>

          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full text-green-600 font-medium py-2 hover:underline transition text-sm"
          >
            Continue as a Guest
          </button>
        </div>
      </div>
    </div>
  );
}
