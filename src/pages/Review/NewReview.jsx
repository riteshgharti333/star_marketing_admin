import { useState, useRef } from "react";
import { FiArrowLeft, FiSave, FiUpload } from "react-icons/fi";
import { useBackPage } from "../../utils/backFunc";
import axios from "axios";
import { baseUrl } from "../../main";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NewReview = () => {
  const backPage = useBackPage();
  const navigate = useNavigate();

  const [isDarkMode] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

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
      const { data } = await axios.post(
        `${baseUrl}/review/new-review`,
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
        navigate("/review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(error?.response?.data?.message);
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
              Create New Review
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
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden border-2 border-[#2671fe] flex items-center justify-center">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUpload
                      className={`${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                      size={24}
                    />
                  )}
                </div>
                <div className="mt-2 flex space-x-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="new-review-image-upload"
                  />
                  <label
                    htmlFor="new-review-image-upload"
                    className={`text-xs px-2 py-1 rounded ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    } cursor-pointer transition-colors duration-200`}
                  >
                    {previewImage ? "Change" : "Upload"}
                  </label>
                  {previewImage && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className={`text-xs px-2 py-1 cursor-pointer rounded ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-red-400"
                          : "bg-gray-100 hover:bg-gray-200 text-red-500"
                      } transition-colors duration-200`}
                    >
                      Remove
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
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={`w-full px-3 py-2 outline-none rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-800"
                    } border focus:ring-2 focus:ring-[#2671fe] focus:border-transparent`}
                    placeholder="Enter your name"
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
              Your Review *
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
              className={`w-full px-4 py-3 outline-none rounded-lg ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-800"
              } border focus:ring-2 focus:ring-[#2671fe] focus:border-transparent min-h-[150px]`}
              placeholder="Share your experience..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-between pt-4 space-y-4 sm:space-y-0 space-y-reverse">
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

            <button
              type="submit"
              disabled={loading}
              className={`flex cursor-pointer justify-center  items-center space-x-2 px-6 py-2 rounded-lg bg-[#2671fe] hover:bg-blue-600 text-white transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              <FiSave size={18} />
              <span>{loading ? "submiting..." : "Submit Review"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewReview;
