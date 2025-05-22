import React, { useState } from "react";
import { FiArrowLeft, FiPlus, FiUpload, FiX } from "react-icons/fi";
import { useBackPage } from "../../utils/backFunc";
import SizeRec from "../../components/SizeRec/SizeRec";

import axios from "axios";
import { baseUrl } from "../../main";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const NewPartnerCards = ({ isDarkMode }) => {
 
   const backPage = useBackPage();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading , setLoading] = useState(false);
    
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      toast.error("Please select an image first!");
      return;
    }

    setLoading(true)

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const { data } = await axios.post(
        `${baseUrl}/partner-card/new-partner-card`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data && data.success) {
        toast.success(data.message);
        navigate("/partner-cards");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response.data.message);
    }finally{
       setLoading(false)
    }
  };



  return (
    <div
      className={`p-3 sm:p-6 rounded-xl ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } shadow-sm max-w-2xl mx-auto`}
    >
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={backPage}
            className={`p-2 rounded-lg ${
              isDarkMode
                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-800"
            } cursor-pointer transition-colors duration-200`}
          >
            <FiArrowLeft size={20} />
          </button>
          <h1
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            New Partner Card
          </h1>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="">
        <div
          className={`border-2 border-dashed ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          } rounded-xl p-6 text-center transition-all duration-200 ${
            !previewImage &&
            (isDarkMode ? "hover:border-gray-600" : "hover:border-gray-400")
          }`}
        >
          {previewImage ? (
            <div className="relative">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-[170px] object-contain mx-auto rounded-lg"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className={`mx-auto flex items-center justify-center w-16 h-16 rounded-full ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <FiUpload
                  size={24}
                  className={isDarkMode ? "text-gray-400" : "text-gray-500"}
                />
              </div>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                Add your image here
              </p>
              <input
                type="file"
                id="card-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="card-upload"
                className={`inline-block px-4 py-2 rounded-lg font-medium cursor-pointer ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                } transition-colors duration-200`}
              >
                Select Image
              </label>
            </div>
          )}
        </div>
      </div>

      <SizeRec isDarkMode={isDarkMode} w="250" h="200" />

      {/* Action Buttons */}


      <div className="flex justify-center space-x-3">
        <input
          type="file"
          id="card-upload"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => document.getElementById("card-upload").click()}
          className="btn-secondary flex items-center space-x-2"
        >
          <FiPlus size={18} />
          <span>Add Image</span>
        </button>

      
        <button className={`btn-primary`} disabled={loading} onClick={handleSubmit}>
          <span>{loading ? "Uploading..." : "Upload"}</span>
        </button>
      </div>
    </div>
  );
};

export default NewPartnerCards;
