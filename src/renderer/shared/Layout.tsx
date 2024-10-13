import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="">
      <Navbar />
    
      <Outlet />

      <Footer />



    </div>
  );
}

export default Layout;
