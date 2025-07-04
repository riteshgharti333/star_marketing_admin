import React, { useState, useRef } from "react";
import { FiArrowLeft, FiSave, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { useBackPage } from "../../utils/backFunc";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import { toast } from "sonner";

const UpdateReview = ({ isDarkMode }) => {
  const backPage = useBackPage();
  const { id } = useParams();

  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const reviewData = async () => {
      const { data } = await axios.get(`${baseUrl}/review/${id}`);

      if (data && data.success) {
        setName(data.review?.name);
        setReviewText(data.review?.description);
        setImage(data.review?.image);
      }
    };
    reviewData();
  }, [id]);

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
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
      formData.append("name", name);
      formData.append("description", reviewText);
      if (fileInputRef.current?.files[0]) {
        formData.append("image", fileInputRef.current.files[0]);
      }

      const { data } = await axios.put(
        `${baseUrl}/review/${id}`,
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
        } shadow-sm max-w-3xl mx-auto`}
      >
        {/* Header with back button */}
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
              Update Review
            </h1>
          </div>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit}>
          {/* User Info Section */}
          <div className="mb-6 p-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4">
              {/* Image Upload */}
              <div className="flex-shrink-0 relative">
                <img
                  src={previewImage || image}
                  alt={name}
                  className="w-[70px] h-[70px] rounded-full object-cover border-2 border-[#2671fe]"
                />
                <div className="mt-2 flex space-x-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="review-image-upload"
                  />
                  <label
                    htmlFor="review-image-upload"
                    className={`text-xs px-2 py-1 rounded ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    } cursor-pointer transition-colors duration-200`}
                  >
                    Change
                  </label>
                  {previewImage && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className={`text-xs px-2 py-1 rounded ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-red-400"
                          : "bg-gray-100 hover:bg-gray-200 text-red-500"
                      } transition-colors duration-200`}
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Name and Rating */}
              <div className="flex-1 space-y-4">
                <div>
                  <label
                    className={`block mb-1 text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Reviewer Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full outline-none px-3 py-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-800"
                    } border focus:ring-2 focus:ring-[#2671fe] focus:border-transparent`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Review Text Area */}
          <div className="mb-6">
            <label
              className={`block mb-2 text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Your Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className={`w-full outline-none px-4 py-3 rounded-lg  ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-800"
              } border focus:ring-2 focus:ring-[#2671fe] focus:border-transparent min-h-[150px]`}
              placeholder="Share your experience..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-between pt-4 space-y-4 sm:space-y-0 space-y-reverse">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={backPage}
                className={`px-4 w-full py-2 rounded-lg cursor-pointer ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                } transition-colors duration-200`}
              >
                Cancel
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center space-x-2 px-6 py-2 rounded-lg bg-[#2671fe] hover:bg-blue-600 text-white transition-colors duration-200 cursor-pointer`}
            >
              <FiSave size={18} />
              <span>{loading ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateReview;
