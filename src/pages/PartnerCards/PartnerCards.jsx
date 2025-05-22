import { useState } from "react";
import { companyCards } from "../../assets/data";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import DeleteCard from "../../components/DeleteCard/DeleteCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../main";
import { useEffect } from "react";

const PartnerCards = ({ isDarkMode }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const allCards = async () => {
      const { data } = await axios.get(
        `${baseUrl}/partner-card/all-partner-cards`
      );
      if (data && data.success) {
        setCardsData(data.partnerCards);
      }
    };
    allCards();
  }, []);

  const deleteMessage = {
    title: "Delete Partner Card",
    desc: "Are you sure you want to delete this card? This action cannot be undone.",
  };
  return (
    <div
      className={`p-2 sm:p-6 rounded-xl ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } shadow-sm min-h-screen`}
    >
      <div className="flex items-center justify-between mb-6">
        <h1
          className={`text-xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Partner Cards
        </h1>
        <Link to={"/new-partner-card"} className={`btn-primary`}>
          <FiPlus size={18} />
          <span>Add New</span>
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cardsData?.map((item, index) => (
          <div
            key={index}
            className={`relative group rounded-xl  overflow-hidden  ${
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            } shadow-sm transition-all duration-300 hover:shadow-md`}
          >
            {/* Card Image */}
            <img
              src={item.image}
              alt={`Company card ${index + 1}`}
              className="w-full h-[200px] object-contain p-4"
            />

            {/* Delete Button (appears on hover) */}
            <button
               onClick={() => {
                setDeleteId(item._id);
                setShowDeleteModal(true);
              }}
              className={`absolute top-3 right-3 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-red-400"
                  : "bg-gray-200 hover:bg-gray-300 cursor-pointer text-red-500"
              }`}
              title="Delete card"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        ))}
      </div>
       {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteCard
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            // Remove card from state immediately after delete
            setCardsData((prev) => prev.filter((card) => card._id !== deleteId));
            setShowDeleteModal(false);
          }}
          isDarkMode={isDarkMode}
          deleteMessage={deleteMessage}
          deleteId={deleteId}
          path="partner-card"
        />
      )}
    </div>
  );
};

export default PartnerCards;
