import {
  FiLogOut,
  FiMoon,
  FiSun,
  FiBell,
  FiSearch,
  FiMenu,
} from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../main";
import axios from "axios";
import { toast } from "sonner";
import { Context } from "../../Context/Context";
import { useContext, useState } from "react";
import { useDarkMode } from "../../Context/DarkModeContext";

const Navbar = ({ toggleSidebar }) => {
  const { user, dispatch } = useContext(Context);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const navigate = useNavigate();

  const handleLogout = async () => {
   

    try {
      const { data } = await axios.post(`${baseUrl}/auth/logout`, {
        withCredentials: true,
      });

      console.log(data);
      if (data && data.result == 1) {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div
      className={`flex border border-[#ddd] items-center rounded-2xl justify-between p-4 ${
        isDarkMode
          ? "bg-gray-800 border-b border-gray-800"
          : "bg-white border-b border-gray-200"
      } shadow-sm`}
    >
      {/* Left Section - Toggle and User */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FiMenu size={20} />
        </button>
        <Link
          to={"/profile"}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="relative">
            <div
              className={`w-10 h-10 rounded-full ${
                isDarkMode ? "bg-gray-700" : "bg-blue-50"
              } flex items-center justify-center ${
                isDarkMode ? "text-white" : "text-[#2671fe]"
              } font-semibold`}
            >
              {user?.user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-900 rounded-full"></span>
          </div>
          <div className="hidden min-[480px]:block">
            <p
              className={`text-sm font-semibold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <p>{user?.user?.name}</p>
            </p>
            <p
              className={`text-xs ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Admin
            </p>
          </div>
        </Link>
      </div>

      {/* Right Section - Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg cursor-pointer ${
            isDarkMode
              ? "bg-gray-800 hover:bg-gray-700 text-yellow-300"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          } transition-colors duration-200`}
        >
          {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        <Link
          to={"/login"}
          onClick={handleLogout}
          className={`p-2 rounded-lg flex items-center space-x-1 ${
            isDarkMode
              ? "hover:bg-gray-800 text-gray-400 hover:text-white"
              : "hover:bg-gray-100 text-gray-500 hover:text-gray-800"
          } transition-all duration-200`}
        >
          <FiLogOut size={20} />
          <span className="hidden md:inline-block text-sm font-medium cursor-pointer">
            Logout
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
