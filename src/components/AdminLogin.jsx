import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        // "https://paypalcom-nl.onrender.com/api/admin/login",
        { email, password },
      );

      if (res.data?.token) {
        // store token
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("admin", JSON.stringify(res.data.admin));

        //  SUCCESS TOAST
        toast.success("Login successful");

        // redirect after short delay (so toast shows)
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      } else {
        toast.error("Login failed ❌");
        setError("Login failed");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";

      // ❌ ERROR TOAST
      toast.error(msg);

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcf9f9] font-body text-[#002020] min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
        {/* LEFT SIDE */}
        <section className="hidden md:flex md:w-1/2 relative overflow-hidden bg-[#001736]">
          <div className="absolute inset-0 z-0">
            <img
              alt="Modern logistics hub with delivery trucks"
              className="w-full h-full object-cover"
              data-alt="Modern delivery trucks at a sleek warehouse loading bay"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMytzBPQ8EPZXO0tXgJRA5P4WNNqLX_EIRMSH6qyqWKnUY-AkewH22r2Dj_DyIoYIc7RN6V4qwNah2ek422_sM_yRFzkQk4beDT4wrLbQ4TjK9jXAmliDg_dqzYqFdNr_k-FN3tJfrGVoKouPgiLmYgEPvKocejdgWIBJ9nuv-PJHE_J5XDpOIOL0a0AY7UdWRaZzn-TOi6wWANDYiO99gm7vdzWySGl4rG-G1oA6zcxIhpMUAGQ1WuG7PZGLdW0CKQ8Qg5eAc4cPc"
            />
            <div className="absolute inset-0 bg-[#001736]/60 backdrop-blur-sm"></div>
          </div>
          <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24 w-full">
            <div className="space-y-6 max-w-lg">
              <span className="inline-block px-4 py-1 rounded-full bg-[#83fba5] text-[#00743a] text-xs font-bold uppercase tracking-widest">
                Global Logistics
              </span>
              <h2 className="text-5xl xl:text-6xl font-extrabold text-[#ffffff] tracking-tighter leading-tight">
                Speed, Precision, Global Reach
              </h2>
              <p className="text-lg text-[#c6e9e9]/80 font-medium leading-relaxed max-w-md">
                Connecting the world through high-speed infrastructure and
                intelligent fleet management systems.
              </p>
              <div className="pt-8 flex gap-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[#006d36]">
                    99.8%
                  </span>
                  <span className="text-xs uppercase tracking-tighter text-[#c6e9e9]">
                    On-Time Precision
                  </span>
                </div>
                <div className="w-[1px] h-12 bg-[#c4c6d0]/30"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[#006d36]">
                    24/7
                  </span>
                  <span className="text-xs uppercase tracking-tighter text-[#c6e9e9]">
                    Live Monitoring
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Kinetic Accent --> */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#006d36]/10 rounded-tl-full -mr-20 -mb-20"></div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex-grow md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-6">
            <h3 className="text-3xl font-extrabold">Welcome back</h3>
            <p className="text-gray-500">Login to admin dashboard</p>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            <form className="space-y-5" onSubmit={handleLogin}>
              {/* EMAIL */}
              <div>
                <label className="text-xs font-bold">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@email.com"
                  className="w-full border-b p-3 outline-none"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-xs font-bold">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border-b p-3 outline-none"
                  required
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 hover:bg-green-900 transition-colorsrounded-lg font-bold"
              >
                {loading ? "Logging in..." : "Sign In"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
