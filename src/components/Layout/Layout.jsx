import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Sidebar from "../../components/Sidebar/Sidebar";

const Layout = ({isDarkMode}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="p-2 max-w-[1600px] mx-auto ">
      <div className="flex flex-col lg:flex-row gap-5 relative">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0  bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`fixed left-0 lg:static z-50 h-screen lg:h-auto transition-transform duration-300 ease-in-out 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <Sidebar 
            isMobileOpen={sidebarOpen}
            closeMobileSidebar={() => setSidebarOpen(false)}
            isDarkMode={isDarkMode} 
          />
        </div>

        {/* Main content */}
        <div className="flex-1">
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="mt-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;