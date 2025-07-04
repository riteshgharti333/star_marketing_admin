import { useState } from "react";
import { useEffect } from "react";
import { FiUsers, FiMail } from "react-icons/fi";
import { baseUrl } from "../../main";
import axios from "axios";

const Dashboard = ({ isDarkMode }) => {
  // Dummy data

  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    const contactAllData = async () => {
      const { data } = await axios.get(`${baseUrl}/contact/all-contacts`);
      if (data && data.success) {
        setContactData(data?.contacts?.length);
      }
    };
    contactAllData();
  }, []);

  const stats = {
    // visitors: {
    //   count: 300,
    //   label: "Total Visitors",
    //   change: "+12% from last month",
    //   icon: <FiUsers className="text-blue-500" size={24} />,
    //   color: "blue",
    // },
    contacts: {
      count: contactData,
      label: "New Contacts",
      // change: "+2 today",
      icon: <FiMail className="text-green-500" size={24} />,
      color: "green",
    },
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.values(stats).map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {stat.label}
                </p>
                <h3
                  className={`text-3xl font-bold mt-2 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {stat.count}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    isDarkMode
                      ? `text-${stat.color}-400`
                      : `text-${stat.color}-600`
                  }`}
                >
                  {stat.change}
                </p>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : `bg-${stat.color}-50`
                }`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
