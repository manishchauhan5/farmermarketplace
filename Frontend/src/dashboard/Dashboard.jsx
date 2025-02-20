import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;