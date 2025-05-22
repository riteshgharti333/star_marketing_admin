import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiEdit2, FiTrash2 } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { useBackPage } from "../../utils/backFunc";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../main";
import DeleteCard from "../../components/DeleteCard/DeleteCard";

const SingleProject = ({ isDarkMode }) => {
  const backPage = useBackPage();

  const { id } = useParams();
  const [project, setProject] = useState();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const projectData = async () => {
      const { data } = await axios.get(`${baseUrl}/project/${id}`);
      if (data && data?.success) {
        setProject(data?.project);
      }
    };
    projectData();
  }, [id]);

  const deleteMessage = {
    title: "Delete Project",
    desc: "Are you sure you want to delete this project.",
  };

  return (
    <div
      className={`p-2 sm:p-6 rounded-xl ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow-sm max-w-3xl mx-auto`}
    >
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4 justify-between w-full">
          <div className="flex items-center gap-3 justify-between ">
            <button
              onClick={backPage}
              className={`p-2 rounded-lg cursor-pointer ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                  : "hover:bg-gray-100 text-gray-500 hover:text-gray-800"
              } transition-colors duration-200`}
            >
              <FiArrowLeft size={20} />
            </button>
            <h1
              className={`text-xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Project Details
            </h1>
          </div>
          <button
            className="btn-danger "
            onClick={() => {
              setDeleteId(project._id);
              setShowDeleteModal(true);
            }}
          >
            <FiTrash2 size={18} /> Delete
          </button>
        </div>
      </div>

      {/* Review Content */}
      <div className="">
        {/* User Info */}
        <div className="flex items-center flex-col">
          <div className="flex-shrink-0">
            <img
              src={project?.image}
              className="w-[400px] h-[500px] rounded-2xl object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3
                className={`text-3xl font-semibold my-5 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {project?.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Review Text */}
        <div>
          <p
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            } leading-relaxed`}
          >
            {project?.desc}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <Link to={`/update-project/${project?._id}`} className="btn-primary">
            <FiEdit2 size={16} />
            <span>Update Project</span>
          </Link>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteCard
          onClose={() => setShowDeleteModal(false)}
          isDarkMode={isDarkMode}
          deleteMessage={deleteMessage}
          deleteId={deleteId}
          path="project"
        />
      )}
    </div>
  );
};

export default SingleProject;
