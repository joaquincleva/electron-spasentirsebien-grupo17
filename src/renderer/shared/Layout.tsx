import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
    
      <Outlet />

      <Footer />



    </div>
  );
}

export default Layout;
