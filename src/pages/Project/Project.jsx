import { useMemo } from "react";
import Table from "../../components/Table/Table";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../main";

const Project = ({ isDarkMode }) => {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const projectAllData = async () => {
      const { data } = await axios.get(`${baseUrl}/project/all-projects`);
      if (data && data.success) {
        setProjectData(data.projects);
      }
    };
    projectAllData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "desc",
        header: "Description",
        cell: (info) => {
          const value = info.getValue();
          const words = value.split(" ");
          return words.length <= 5
            ? value
            : words.slice(0, 5).join(" ") + " ...";
        },
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
          Project
        </h1>

        <Link to={"/project/new-project"} className="btn-primary">
          {" "}
          Add New Project
        </Link>
      </div>

      <Table data={projectData} columns={columns} path="project" isDarkMode={isDarkMode} />
    </div>
  );
};

export default Project;
