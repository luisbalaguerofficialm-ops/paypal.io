import React, { useState } from "react";
import { Home, SendHorizonal, Plus, User, Bell, LogOut, X } from "lucide-react";

import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false); // close on mobile after click
  };

  const handleLogout = () => {
    setShowLogout(false);
    navigate("/");
  };

  const menuItems = [
    {
      section: "MAIN",
      items: [
        { icon: Home, label: "Dashboard", path: "" },
        // {
        //   icon: SendHorizonal,
        //   label: "Send Message ",
        //   path: "/admin/message",
        // },
      ],
    },
  ];

  return (
    <>
      {/* Overlay (Mobile Only) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
                  fixed md:top-0 top-20 left-0 h-screen w-64 z-50 bg-gray-300 text-[#006A91]
                  transform transition-transform duration-300
                  ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                  md:translate-x-0 md:static md:shadow-none
                `}
      >
        <div className="h-full overflow-y-auto p-6 flex flex-col relative">
          {/* Close Button (Mobile Only) */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden absolute hover:text-[#1d9cca] top-5 right-5"
          >
            <X className="w-9 h-9" />
          </button>

          {/* Logo */}
          {/* <div className="flex justify-between mb-10 mt-6 md:mt-0">
           
          </div> */}

          {/* Menu Sections */}
          <div className="flex flex-col gap-8 flex-1">
            {menuItems.map((section, idx) => (
              <div key={idx}>
                <p className="text-[15px] gap-5 font-semibold mb-2">
                  {section.section}
                </p>
                {section.items.map((item, i) => (
                  <SidebarItem
                    key={i}
                    icon={item.icon}
                    label={item.label}
                    active={location.pathname === item.path}
                    onClick={() => handleNavigate(item.path)}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Logout */}
          <div className="mt-auto pt-6">
            <SidebarItem
              icon={LogOut}
              label="Logout"
              textColor="text-red-500"
              iconColor="text-red-500"
              onClick={() => setShowLogout(true)}
            />
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogout && (
        <div className="fixed inset-0 flex items-center justify-center z-[60]">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowLogout(false)}
          ></div>
          <div className="bg-white rounded-xl shadow-lg p-8 z-50 w-80">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogout(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const SidebarItem = ({
  icon: Icon,
  label,
  onClick,
  active = false,
  textColor = "text-black",
  iconColor = "text-black",
}) => {
  return (
    <div
      onClick={onClick}
      className={`
                flex items-center gap-3 py-2 px-3 cursor-pointer rounded-lg
                ${active ? "bg-gray-500 text-white" : "hover:bg-gray-400"}
                transition
              `}
    >
      <Icon className={`w-5 h-5 ${iconColor}`} />
      <span className={`text-[16px] ${textColor}`}>{label}</span>
    </div>
  );
};
