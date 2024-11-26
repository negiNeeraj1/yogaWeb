import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Login</h2>
      <form action="/login" method="POST" className="space-y-4">
        <div>
          <label htmlFor="login-email" className="block text-sm text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="login-email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="login-password" className="block text-sm text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="login-password"
            name="password"
            placeholder="Enter your password"
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-green-600 hover:underline">
          Signup
        </Link>
      </p>
    </div>
  );
}

export default Login;
