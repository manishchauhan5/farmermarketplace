import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer'; // Import your Footer component
import Navbar, { PhoneNavbar } from '../Navbar'; // Import your Navbar component

const AppLayout = () => {
  const location = useLocation();

  // Routes where the footer should not be displayed
  const noFooterRoutes = ['/login', '/signup', '/forgot'];

  // Check if the current route is in the noFooterRoutes array
  const shouldShowFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar (always visible) */}
      <Navbar />
      <PhoneNavbar/>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Conditionally Render Footer */}
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default AppLayout;