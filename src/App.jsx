import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "./pages/Message";
import Notification from "./pages/Notification";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* User/Client Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Login />} />
        </Route>

        {/* Admin Section (Protected/Dashboard Area) */}
        <Route path="admin" element={<AdminLayout />}>
          {/* URL: /admin */}
          <Route index element={<AdminDashboard />} />

          {/* URL: /admin/message */}
          <Route path="message" element={<Message />} />

          {/* URL: /admin/notification */}
          <Route path="notification" element={<Notification />} />
        </Route>

        {/* Admin Authentication */}
        <Route path="adminLogin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
