import React from 'react';  
import { Outlet, useLocation } from 'react-router-dom';  
import Sidebar from './Sidebar';  

const Layout = () => {  
  const location = useLocation();  

  // Specify routes where the sidebar should NOT be displayed  
  const hideSidebarRoutes = ['/', '/login', '/MusicianSignup', '/RestaurantSignup'];  
  
  // Determine if the current route is in the list  
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);  

  return (  
    <div className="flex min-h-screen">  
      {/* Conditionally Render Sidebar */}  
      {showSidebar && <Sidebar />}  

      {/* Main Content Area */}  
      <div className={`${showSidebar ? 'ml-60' : ''} flex-1 p-4`}>  
        <Outlet />  
      </div>  
    </div>  
  );  
};  

export default Layout;