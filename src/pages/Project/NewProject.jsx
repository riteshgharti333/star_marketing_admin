import React, { useState, useRef } from "react";
import { FiArrowLeft, FiImage, FiSave, FiUpload, FiX } from "react-icons/fi";
import { useBackPage } from "../../utils/backFunc";
import axios from "axios";
import { baseUrl } from "../../main";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NewProject = ({ isDarkMode }) => {
  const backPage = useBackPage();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [project, setProject] = useState({
    title: "",
    image: "",
    description: "",
    url: "",
  });

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

      // Validate that an image is uploaded
      if (!fileInputRef.current?.files[0]) {
        toast.error("Please upload a project image");
        return;
      }

      formData.append("name", project.title);
      formData.append("desc", project.description);
      formData.append("url", project.url);
      formData.append("image", fileInputRef.current.files[0]);

      const { data } = await axios.post(
        `${baseUrl}/project/new-project`,
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(data);

      if (data.success) {
        toast.success(data.message);
        navigate("/project");
      }
    } catch (error) {
      console.error("Error submitting project:", error);
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to create project"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen  p-4 md:p-8`}>
      <div
        className={`p-6 rounded-xl ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-sm max-w-4xl mx-auto`}
      >
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
              Add New Project
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Project Image Upload */}
          <div className="mb-6">
            <div className="relative">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-[300px] h-[500px] object-cover rounded-2xl mx-auto"
                />
              ) : (
                <label
                  className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
                    isDarkMode
                      ? "border-gray-600 hover:border-blue-500 bg-gray-700 hover:bg-gray-700/80"
                      : "border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div
                      className={`p-3 rounded-full mb-3 ${
                        isDarkMode ? "bg-gray-600" : "bg-gray-200"
                      }`}
                    >
                      <FiImage
                        className={`${
                          isDarkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                        size={24}
                      />
                    </div>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <span className="font-medium text-blue-500">
                        Click to upload image
                      </span>
                    </p>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      up to 2MB (Recommend size : 500 x 600)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleImageUpload(e, "bannerSection", "bannerImage")
                    }
                  />
                </label>
              )}
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

          {/* Image URL */}
          <div className="mb-6">
            <label
              className={`block mb-2 text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Project URL
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
              required
            />
          </div>

          {/* Title */}
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

          {/* Description */}
          <div className="mb-6">
            <label
              className={`block mb-2 text-sm font-medium ${
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
              <span>{loading ? "Adding..." : "Add Project"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProject;
