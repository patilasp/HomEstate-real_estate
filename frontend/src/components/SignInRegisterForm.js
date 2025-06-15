import React, { useState } from "react";
import { User, Lock, Mail } from "lucide-react";
import { useAuth } from "../artifact/AuthContext";
import { useNavigate } from "react-router-dom";

const SignInRegisterForm = ({ onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const apiUrl = isSignIn
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const userData = await response.json();

      if (!response.ok) {
        throw new Error(userData.message || "Authentication failed");
      }

      // ✅ On login: store token and navigate to account
      if (isSignIn) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("username", userData.user.username);
        localStorage.setItem("email", userData.user.email);
        localStorage.setItem("isAdmin", userData.user.isAdmin);

        login(userData); // optional context logic
        onClose(); // close modal
        if (userData.user.is_admin === 1 || userData.user.is_admin === 1) {
          console.log("Redirecting to admin panel...");
          navigate("/admin");
        } else {
          console.log("Redirecting to account page...");
          navigate("/account");
        }
      } else {
        // ✅ On register: switch to sign-in mode
        setIsSignIn(true);
        setFormData({ username: "", email: "", password: "" });
        setError("Registration successful. Please log in.");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          {isSignIn ? "Sign In" : "Register"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="JohnDoe123"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSignIn ? "Sign In" : "Register"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            {isSignIn
              ? "Need an account? Register"
              : "Already have an account? Sign In"}
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SignInRegisterForm;
