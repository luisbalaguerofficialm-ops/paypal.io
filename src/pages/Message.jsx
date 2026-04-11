import React from "react";
import { useNavigate } from "react-router-dom";
// Import Lucide icons
import {
  ArrowLeft,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Code,
  Trash2,
  CloudUpload,
  Lock,
  Plus,
} from "lucide-react";

export default function Message() {
  // BUG FIX: Added 'const' to define navigate
  const navigate = useNavigate();

  const handleNotification = () => {
    navigate("/admin/notification");
  };

  return (
    <div className="bg-[#fcf9f9] text-[#313234] flex min-h-screen">
      <main className="flex-1 min-h-screen flex flex-col">
        {/* Main Content Canvas */}
        <div className="flex-1 p-10 overflow-y-auto">
          {/* Breadcrumbs / Navigation */}
          <div className="flex items-center justify-between gap-7 mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="text-[#5e5f61] hover:text-[#0053dc] transition-colors flex items-center bg-transparent border-none cursor-pointer"
              >
                <ArrowLeft size={18} className="mr-1" />
                <span className="text-sm font-medium font-inter">
                  Communications
                </span>
              </button>
              <span className="text-[#b2b2b4]">/</span>
              <span className="text-sm font-bold text-[#313234] font-inter">
                New Message
              </span>
            </div>
            <div>
              <button
                onClick={handleNotification}
                className="px-3 py-1 bg-blue-500 w-40 h-9 text-white hover:bg-blue-700 text-[11px] font-bold rounded-full uppercase transition-all shadow-md"
              >
                Notification History
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Composition Area */}
            <section className="col-span-8 space-y-6">
              <div className="bg-[#ffffff] rounded-xl p-8 shadow-sm border border-[#b2b2b4]/5">
                <header className="mb-10">
                  <h1 className="text-3xl font-extrabold text-[#1A2B3C] tracking-tight mb-2">
                    Secure Correspondence
                  </h1>
                  <p className="text-[#5e5f61] font-inter text-sm">
                    System broadcast for Terminal 01-A
                  </p>
                </header>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-1">
                        Recipient Email
                      </label>
                      <input
                        className="w-full py-3 px-4 text-[#313234] placeholder:text-[#b2b2b4] font-medium bg-[#fcf9f9] border border-[#b2b2b4]/30 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                        placeholder="admin@vault-security.io"
                        type="email"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-1">
                        Subject Header
                      </label>
                      <input
                        className="w-full py-3 px-4 text-[#313234] placeholder:text-[#b2b2b4] font-medium bg-[#fcf9f9] border border-[#b2b2b4]/30 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                        placeholder="System deployment authorization"
                        type="text"
                      />
                    </div>
                  </div>

                  {/* Priority Selector */}
                  <div>
                    <label className="block text-[10px] font-bold text-[#565e74] uppercase tracking-[0.2em] mb-4">
                      Transmission Priority
                    </label>
                    <div className="flex space-x-3">
                      {["Low", "Medium", "High", "Critical"].map((lvl) => (
                        <button
                          key={lvl}
                          className="flex-1 py-3 px-4 rounded-xl border border-[#b2b2b4]/20 hover:bg-[#e9e8e9] transition-all text-xs font-bold uppercase tracking-widest text-[#5e5f61] flex items-center justify-center"
                        >
                          <span
                            className={`w-2 h-2 rounded-full mr-2 ${lvl === "High" ? "bg-blue-600 animate-pulse" : "bg-slate-400"}`}
                          ></span>
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Editor Terminal */}
                  <div>
                    <label className="block text-[10px] font-bold text-[#565e74] uppercase tracking-[0.2em] mb-2">
                      Composition Terminal
                    </label>
                    <div className="border border-[#b2b2b4]/20 rounded-xl overflow-hidden shadow-inner">
                      <div className="bg-[#efedef] px-4 py-2 flex items-center space-x-5 border-b border-[#b2b2b4]/20">
                        <Bold
                          size={16}
                          className="text-[#5e5f61] cursor-pointer hover:text-blue-600"
                        />
                        <Italic
                          size={16}
                          className="text-[#5e5f61] cursor-pointer hover:text-blue-600"
                        />
                        <List
                          size={16}
                          className="text-[#5e5f61] cursor-pointer hover:text-blue-600"
                        />
                        <LinkIcon
                          size={16}
                          className="text-[#5e5f61] cursor-pointer hover:text-blue-600"
                        />
                        <div className="flex-1"></div>
                        <Code
                          size={16}
                          className="text-[#5e5f61] cursor-pointer hover:text-blue-600"
                        />
                      </div>
                      <textarea
                        className="w-full p-6 text-[#313234] font-inter text-base border-none focus:ring-0 placeholder:text-[#b2b2b4]/40 resize-none outline-none"
                        placeholder="Enter secure message content here..."
                        rows="12"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sidebar Assets & Actions */}
            <aside className="col-span-4 space-y-6 sticky top-24">
              <div className="bg-[#f5f3f4] rounded-xl p-6 border border-[#b2b2b4]/5 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1A2B3C]">
                    Active Assets
                  </h3>
                  <button className="text-blue-600 font-bold text-[10px] uppercase tracking-wider hover:underline flex items-center">
                    <Plus size={12} className="mr-1" /> Add New
                  </button>
                </div>

                <div className="space-y-3">
                  {/* File Item 1 */}
                  <div className="flex items-center p-3 bg-white rounded-lg shadow-sm group hover:ring-1 hover:ring-blue-500/30 transition-all cursor-pointer">
                    <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center mr-4">
                      <span className="text-[10px] font-bold text-blue-600">
                        PDF
                      </span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-bold text-[#313234] truncate">
                        security_protocol_v4.pdf
                      </p>
                      <p className="text-[10px] text-[#5e5f61] uppercase">
                        PDF • 2.4 MB
                      </p>
                    </div>
                    <Trash2
                      size={16}
                      className="text-[#b2b2b4] group-hover:text-red-500 transition-colors"
                    />
                  </div>

                  {/* Upload Placeholder */}
                  <div className="border-2 border-dashed border-[#5e5f61]/20 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-blue-500/40 transition-colors cursor-pointer bg-white/50">
                    <CloudUpload size={24} className="text-[#b2b2b4] mb-2" />
                    <p className="text-[10px] font-bold text-[#5e5f61] uppercase tracking-widest">
                      Drop secure files here
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions Panel */}
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-white/40 shadow-xl space-y-4">
                <button className="w-full bg-[#001736] text-white hover:bg-[#002b5b] py-4 rounded-xl font-bold text-xs tracking-widest uppercase shadow-lg transition-all active:scale-[0.98]">
                  Send Message
                </button>
                <button className="w-full py-4 bg-[#e9e8e9] text-[#1A2B3C] rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-[#dedede] transition-colors active:scale-[0.98]">
                  Save as Draft
                </button>
                <div className="pt-4 mt-4 border-t border-[#b2b2b4]/10">
                  <div className="flex items-center text-green-600 text-[10px] font-bold uppercase tracking-wider">
                    <Lock size={12} className="mr-2" />
                    End-to-end Encrypted Transmission
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
