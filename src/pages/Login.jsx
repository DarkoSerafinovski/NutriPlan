import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import FormInput from "../components/ui/FormInput";
import Loader from "../components/ui/Loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
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
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="Your email adress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              classNameLabel="block text-sm font-medium text-gray-700 mb-1"
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              classNameLabel="block text-sm font-medium text-gray-700 mb-1"
            />

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
          </div>
        </div>
      )}
    </div>
  );
}
