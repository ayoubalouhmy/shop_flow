import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/admin/Sidebar";
import AdminNavbar from "../components/admin/AdminNavbar";
import "../styles/admin.css";

/**
 * AdminLayout – wraps every admin page with the sidebar and top navbar.
 * Uses React Router's <Outlet /> to render child routes.
 */
export default function AdminLayout() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return null; // Ou un composant de chargement

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-root">
      <div className="admin-shell">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main area */}
        <div className="admin-main">
          {/* Top navbar */}
          <AdminNavbar onMenuClick={() => setSidebarOpen(prev => !prev)} />

          {/* Page content */}
          <main className="admin-content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}