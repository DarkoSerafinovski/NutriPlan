import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/ui/FormInput";
import { supabase } from "../supabaseClient";
import Loader from "../components/ui/Loader";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    setLoading(true);

    const { data, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      alert("Registration successful! You can now log in.");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500 mt-2">
              Join us and start planning your meals
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              classNameLabel="block text-sm font-medium text-gray-700 mb-1"
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              classNameLabel="block text-sm font-medium text-gray-700 mb-1"
            />

            <FormInput
              label="Confirm Password"
              name="password"
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              classNameLabel="block text-sm font-medium text-gray-700 mb-1"
            />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
            >
              Sign Up
            </button>
          </form>

          <div className="relative flex items-center justify-center py-2">
            <div className="border-t w-full border-gray-200"></div>
            <span className="bg-white px-3 text-sm text-gray-400 absolute">
              Already have an account?
            </span>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
}
