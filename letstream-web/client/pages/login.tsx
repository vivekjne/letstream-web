import React from "react";

export default function Login() {
  return (
    <div className="flex flex-1 items-center justify-center h-full px-6">
      <form
        className="bg-black px-4 py-6 w-full max-w-full 
        md:max-w-md space-y-4
        shadow-xl
        "
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-center text-white">Sign in</h1>
        <input
          className="w-full bg-black  border h-8 text-white px-4 text-sm"
          type="email"
          placeholder="Enter email address"
        />
        <input
          className="w-full bg-black  border h-8 text-white px-4 text-sm"
          type="password"
          placeholder="Enter password"
        />

        <div className="w-full flex justify-center flex-col items-center">
          <button
            type="submit"
            className="bg-red-600 w-24 h-8 hover:bg-red-500 text-white rounded-sm 
            focus:outline-none focus:ring focus:ring-red-400 focus:ring-opacity-50 
            text-sm font-semibold
            "
          >
            Sign In
          </button>

          <p className="text-sm mt-2">
            Don't have an account?{" "}
            <a href="/register" className="text-red-500">
              Sign Up
            </a>
          </p>

          <a
            href="/forgot-password"
            className="mt-2 text-sm transition  hover:text-red-500 "
          >
            Forgot your password?
          </a>
        </div>
      </form>
    </div>
  );
}
