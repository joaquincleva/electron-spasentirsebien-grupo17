import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
