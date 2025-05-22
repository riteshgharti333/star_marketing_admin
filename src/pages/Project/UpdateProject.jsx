import React, { useState, useRef } from "react";
import { FiArrowLeft, FiSave, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import { useBackPage } from "../../utils/backFunc";
import { useParams } from "react-router-dom";

import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import { toast } from "sonner";

const UpdateProject = ({ isDarkMode }) => {
  const backPage = useBackPage();
  const fileInputRef = useRef(null);

  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [project, setProject] = useState({
    title: "",
    image: "",
    description: "",
    url: "",
  });

  useEffect(() => {
    const projectData = async () => {
      const { data } = await axios.get(`${baseUrl}/project/${id}`);

      if (data && data.success) {
        setProject({
          title: data?.project?.name,
          description: data?.project?.desc,
          url: data?.project?.url,
          image: data?.project?.image,
        });
      }
    };
    projectData();
  }, [id]);

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", project.title);
      formData.append("desc", project.description);
      formData.append("url", project.url);
      formData.append("image", fileInputRef.current.files[0]);

      const { data } = await axios.put(`${baseUrl}/project/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);
        backPage();
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen`}>
      <div
        className={`p-2 sm:p-6 rounded-xl ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-sm max-w-4xl mx-auto`}
      >
        {/* Header with back button and actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
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
              Update Project
            </h1>
          </div>
        </div>

        {/* Project Form */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Project Image Upload */}
          <div className="mb-6">
            <div className="relative">
              <img
                src={previewImage || project.image}
                alt="Project preview"
                className="w-[300px] h-[500px] object-cover rounded-2xl mx-auto"
              />
              <div className="mt-3 flex justify-center space-x-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="project-image-upload"
                />
                <label
                  htmlFor="project-image-upload"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  } cursor-pointer transition-colors duration-200`}
                >
                  <FiUpload size={16} />
                  <span>{previewImage ? "Change Image" : "Upload Image"}</span>
                </label>
                {previewImage && (
                  <button
                    type="button"
                    onClick={removeUploadedImage}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-red-400"
                        : "bg-gray-200 hover:bg-gray-300 text-red-500"
                    } transition-colors duration-200`}
                  >
                    <FiX size={16} />
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Image URL Input (alternative to upload) */}
          <div className="mb-6">
            <label
              className={`block mb-2 text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Project Url
            </label>
            <input
              type="url"
              name="url"
              value={project.url}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg outline-none ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-800"
              } border focus:ring-2 focus:ring-[#2671fe] focus:border-transparent`}
            />
          </div>

          {/* Project Title */}
          <div className="mb-6">
            <label
              className={`block mb-2 text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Project Title
            </label>
            <input
              type="text"
              name="title"
              value={project.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg outline-none ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-800"
              } border focus:ring-2 focus:ring-[#2671fe] focus:border-transparent`}
              required
            />
          </div>

          {/* Project Description */}
          <div className="mb-6">
            <label
              className={`block mb-2 text-sm font-medium  ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Project Description
            </label>
            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-2 rounded-lg outline-none ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-800"
              } border focus:ring-2 focus:ring-[#2671fe] focus:border-transparent`}
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={backPage}
              className={`px-4 py-2 rounded-lg cursor-pointer ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              } transition-colors duration-200`}
            >
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              <FiSave size={18} />
              <span>{loading ? "Updating..." : "Update Project"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;
