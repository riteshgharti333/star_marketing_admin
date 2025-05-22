import React, { useState } from "react";
import { FiX, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { baseUrl } from "../../main";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const DeleteCard = ({
  onClose,
  onConfirm,
  isDarkMode,
  deleteMessage,
  deleteId,
  path,
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`${baseUrl}/${path}/${deleteId}`);

      if (data && data.success) {
        toast.success("Deleted successfully");
        if (path === "review") {
        } else if (path === "project") {
          navigate("/project");
        } else if (path === "service") {
          navigate("/service");
        } else if (path === "contact") {
          navigate("/contacts");
        } else {
          onConfirm();
        }
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className={`relative p-6 rounded-xl ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } w-full max-w-md mx-4 shadow-xl`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`cursor-pointer absolute top-4 right-4 p-1 rounded-full ${
            isDarkMode
              ? "hover:bg-gray-700 text-gray-400"
              : "hover:bg-gray-100 text-gray-500"
          }`}
        >
          <FiX size={20} />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <div
            className={`mx-auto flex items-center justify-center w-16 h-16 rounded-full ${
              isDarkMode ? "bg-red-900/20" : "bg-red-100"
            } mb-4`}
          >
            <FiTrash2 size={24} className="text-red-500" />
          </div>

          <h3
            className={`text-lg font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {deleteMessage.title}
          </h3>
          <p
            className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            {deleteMessage.desc}
          </p>

          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className={`px-6 py-2 rounded-lg font-medium cursor-pointer ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              } transition-colors duration-200`}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className={`cursor-pointer px-6 py-2 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 flex items-center space-x-2`}
            >
              <FiTrash2 size={16} />
              <span>{loading ? "Deleting..." : "Delete"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCard;
