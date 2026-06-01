import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import AdminNavbar from "../components/admin/AdminNavbar";
import "../styles/admin.css";

/**
 * AdminLayout – wraps every admin page with the sidebar and top navbar.
 * Uses React Router's <Outlet /> to render child routes.
 */
export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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