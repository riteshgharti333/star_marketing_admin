import { useMemo } from "react";
import Table from "../../components/Table/Table";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../main";


const Contact = ({ isDarkMode }) => {

    const [contactData, setContactData] = useState([]);
  
  
    useEffect(() => {
      const contactAllData = async () => {
        const { data } = await axios.get(`${baseUrl}/contact/all-contacts`);
        if (data && data.success) {
          setContactData(data.contacts);
        }
      };
      contactAllData();
    }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: (info) => {
          const date = new Date(info.getValue());
          return date
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            .replace(" ", " ");
        },
      },
    ],
    []
  );

  return (
    <div className="">
      <div className="flex justify-between">
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Contacts
        </h1>
      </div>

      <Table data={contactData} columns={columns} path="contact" isDarkMode={isDarkMode} />
    </div>
  );
};

export default Contact;
