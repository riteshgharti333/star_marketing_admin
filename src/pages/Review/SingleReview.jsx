import React from "react";
import { FiArrowLeft, FiEdit2, FiTrash2 } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { useBackPage } from "../../utils/backFunc";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import DeleteCard from "../../components/DeleteCard/DeleteCard";

const SingleReview = ({ isDarkMode }) => {
  const backPage = useBackPage();

  const { id } = useParams();
  const [review, setReview] = useState();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const reviewData = async () => {
      const { data } = await axios.get(`${baseUrl}/review/${id}`);
      if (data && data?.success) {
        setReview(data?.review);
      }
    };
    reviewData();
  }, [id]);

  const deleteMessage = {
    title: "Delete Review",
    desc: "Are you sure you want to delete this review.",
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
              Review Details
            </h1>
          </div>
          <button
            onClick={() => {
              setDeleteId(review._id);
              setShowDeleteModal(true);
            }}
            className="btn-danger"
          >
            <FiTrash2 size={18} /> Delete
          </button>
        </div>
      </div>

      {/* Review Content */}
      <div className="space-y-6">
        {/* User Info */}
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              src={review?.image}
              className="w-[70px] h-[70px] rounded-full object-cover border-2 border-[#2671fe]"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {review?.name}
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
            {review?.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <Link to={`/update-review/${review?._id}`} className="btn-primary">
            <FiEdit2 size={16} />
            <span>Update Review</span>
          </Link>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteCard
          onClose={() => setShowDeleteModal(false)}
          isDarkMode={isDarkMode}
          deleteMessage={deleteMessage}
          deleteId={deleteId}
          path="review"
        />
      )}
    </div>
  );
};

export default SingleReview;
