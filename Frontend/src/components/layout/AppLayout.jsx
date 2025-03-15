import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer'; 
import Navbar, { PhoneNavbar } from '../Navbar';

const AppLayout = () => {
  const location = useLocation();

  const noFooterRoutes = ['/login', '/signup', '/forgot'];

  const shouldShowFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />
      <PhoneNavbar/>


      <main className="flex-grow">
        <Outlet />
      </main>

      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default AppLayout;