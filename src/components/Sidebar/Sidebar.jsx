import React, { useState } from "react";
import {
  FiHome,
  FiBarChart2,
  FiTarget,
  FiMail,
  FiSettings,
  FiUsers,
  FiPieChart,
  FiCalendar,
  FiShoppingBag,
  FiMoon,
  FiSun,
  FiChevronLeft,
  FiMenu,
  FiBell,
} from "react-icons/fi";
import { RiRocketLine } from "react-icons/ri";
import { FaRegImage } from "react-icons/fa";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { VscPreview } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Review from "../../pages/Review/Review";
import { GoProjectRoadmap } from "react-icons/go";
import { GrContactInfo } from "react-icons/gr";
import { MdMiscellaneousServices } from "react-icons/md";

const Sidebar = ({ isMobileOpen, closeMobileSidebar, isDarkMode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <FiHome size={21} />, link: "" },
    {
      name: "Company Cards",
      icon: <FaRegImage size={21} />,
      link: "company-cards",
    },
    {
      name: "Associate Partner",
      icon: <FaRegImage size={21} />,
      link: "partner-cards",
    },
    {
      name: "Review",
      icon: <VscPreview size={21} />,
      link: "review",
    },
    {
      name: "Project",
      icon: <GoProjectRoadmap size={21} />,
      link: "project",
    },

    {
      name: "Contacts",
      icon: <GrContactInfo size={21} />,
      link: "contacts",
    },

    {
      name: "Service",
      icon: <MdMiscellaneousServices size={21} />,
      link: "service",
    },
  ];

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    // Close sidebar on mobile when an item is clicked
    if (isMobileOpen) {
      closeMobileSidebar();
    }
  };

  return (
    <div
      className={`flex flex-col border border-[#ddd] rounded-2xl min-h-screen
 ${
   isDarkMode ? "bg-gray-800" : "bg-white"
 } transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      } h-full border-r ${
        isDarkMode ? "border-gray-800" : "border-gray-200"
      } shadow-sm`}
    >
      {/* Mobile close button (only shows on mobile) */}
      <div className="md:hidden flex justify-end p-2">
        <button
          onClick={closeMobileSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <FiChevronLeft size={20} />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-2 px-2">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <Link key={index} to={`/${item.link}`}>
              <li>
                <button
                  onClick={() => handleItemClick(item.name)}
                  className={`flex cursor-pointer items-center w-full p-3 ${
                    isCollapsed ? "justify-center" : "px-4"
                  } rounded-lg transition-all duration-200 group ${
                    activeItem === item.name
                      ? `${
                          isDarkMode
                            ? "bg-[#2671fe] text-white"
                            : "bg-[#2671fe] text-white"
                        } font-semibold`
                      : `${
                          isDarkMode
                            ? "hover:bg-gray-800 text-gray-300 hover:text-white"
                            : "hover:bg-blue-50 text-gray-600 hover:text-[#2671fe]"
                        } font-medium`
                  }`}
                >
                  <span
                    className={`${
                      activeItem === item.name
                        ? "text-white"
                        : isDarkMode
                        ? "group-hover:text-white text-gray-400"
                        : "group-hover:text-[#2671fe] text-gray-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <div className="flex items-center justify-between w-full ml-3">
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
