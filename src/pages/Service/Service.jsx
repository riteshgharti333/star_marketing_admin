import { useMemo } from "react";
import Table from "../../components/Table/Table";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../main";

const Service = ({ isDarkMode }) => {
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    const serviceAllData = async () => {
      const { data } = await axios.get(`${baseUrl}/service/all-services`);
     
      if (data && data.success) {
        setServiceData(data.services);
      }
    };
    serviceAllData();
  }, []);

  console.log(serviceData)

  const columns = useMemo(
    () => [
      {
           accessorKey: "bannerSection.serviceName",
        header: " Service Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "selectedService",
        header: "Service Type",
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
          Service
        </h1>

        <Link to={"/new-service"} className="btn-primary">
          {" "}
          Add New Service
        </Link>
      </div>

      <Table data={serviceData} columns={columns} path="service" isDarkMode={isDarkMode} />
    </div>
  );
};

export default Service;
