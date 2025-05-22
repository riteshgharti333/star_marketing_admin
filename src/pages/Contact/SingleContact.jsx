import { FiArrowLeft, FiTrash2 } from "react-icons/fi";
import { useBackPage } from "../../utils/backFunc";
import { toast } from "sonner";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../../main";
import DeleteCard from "../../components/DeleteCard/DeleteCard";

const SingleContact = ({ isDarkMode }) => {
  const backPage = useBackPage();

  const [contact, setContact] = useState({});

  const { id } = useParams();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/contact/${id}`);
        console.log(data);
        setContact(data.contact);
      } catch (error) {
        console.error("❌ Error fetching contact:", error);
        toast.error(error.response.data.mesage);
      }
    };

    fetchContact();
  }, [id]);

  const {
    name,
    email,
    phoneNumber,
    businessName,
    projectType,
    projectDescription,
    budget,
    heardAboutUs,
  } = contact;


   const deleteMessage = {
    title: "Delete Contact",
    desc: "Are you sure you want to delete this contact.",
  };


  return (
    <div className={`min-h-screen`}>
      <div
        className={`p-2 sm:p-6 rounded-xl ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-sm max-w-4xl mx-auto`}
      >
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
                Review Details
              </h1>
            </div>
            <button  onClick={() => {
              setDeleteId(id);
              setShowDeleteModal(true);
            }} className="btn-danger">
              <FiTrash2 size={18} /> Delete
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Personal Information */}
          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <h2
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Your Name
                </p>
                <p
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {name}
                </p>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Business Name
                </p>
                <p
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {businessName}
                </p>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Email Address
                </p>
                <p
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {email}
                </p>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Contact Number
                </p>
                <p
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {phoneNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Project Information */}
          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <h2
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Project Details
            </h2>
            <div className="space-y-4">
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Type of Project
                </p>
                <p
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {projectType}
                </p>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Tell us about your project *
                </p>
                <p
                  className={`mt-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {projectDescription}
                </p>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  How much is your budget? *
                </p>
                <p
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {budget}
                </p>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  How did you hear about us? *
                </p>
                <p
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {heardAboutUs}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
        {showDeleteModal && (
        <DeleteCard
          onClose={() => setShowDeleteModal(false)}
          isDarkMode={isDarkMode}
          deleteMessage={deleteMessage}
          deleteId={deleteId}
          path="contact"
        />
      )}
    </div>
  );
};

export default SingleContact;
