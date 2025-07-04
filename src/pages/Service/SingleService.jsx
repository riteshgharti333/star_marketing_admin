import { useBackPage } from "../../utils/backFunc";
import { FiArrowLeft, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import { Link, useParams } from "react-router-dom";
import DeleteCard from "../../components/DeleteCard/DeleteCard";

const SingleService = ({ isDarkMode }) => {
  const backPage = useBackPage();
  const { id } = useParams();
  const [serviceData, setServiceData] = useState({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const serviceData = async () => {
      const { data } = await axios.get(`${baseUrl}/service/${id}`);
      if (data && data.success) {
        setServiceData(data.service);
      }
    };
    serviceData();
  }, [id]);

  const { bannerSection, strategy, benefits, howItWorks, contentSection } =
    serviceData;

  const deleteMessage = {
    title: "Delete Servie",
    desc: "Are you sure you want to delete this service.",
  };

  return (
    <div
      className={`p-1 sm:p-6 rounded-xl ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow-sm max-w-5xl mx-auto`}
    >
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4 justify-between w-full">
          <div className="flex  flex-wrap items-center gap-3 justify-between w-full">
            <div className="flex items-center gap-3">
              <button
                onClick={backPage}
                className={`p-2 rounded-lg cursor-pointer ${
                  isDarkMode
                    ? "hover:bg-gray-800 text-gray-400 hover:text-white"
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
                {bannerSection?.serviceName}
              </h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setDeleteId(id);
                  setShowDeleteModal(true);
                }}
                className="btn-danger"
              >
                {" "}
                <FiTrash2 size={18} /> Delete
              </button>
              <Link to={`/update-service/${id}`} className="btn-primary gap-2">
                {" "}
                <FiEdit2 size={16} /> Update
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Banner Section */}
      <section className="py-12 px-1 sm:px-4">
        <img
          src={bannerSection?.bannerImage}
          alt="Banner"
          className="mx-auto w-full mb-6 max-h-80 object-cover rounded-lg shadow"
        />
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          {bannerSection?.bannerTitle}
        </h1>
        <p className=" mx-auto text-lg">{bannerSection?.bannerDesc}</p>
      </section>

      {/* Strategy */}
      <section
        className={`py-16 px-4 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100 "
        } text-center`}
      >
        <h2 className="text-2xl font-semibold mb-2">{strategy?.title}</h2>
        <p className="text-gray-600 mb-10">{strategy?.desc}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {strategy?.items?.map((item, idx) => (
            <div
              key={idx}
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-gray-100 "
              } p-6 rounded-lg shadow`}
            >
              <h4 className="font-semibold text-lg mb-2">{item?.title}</h4>
              <p className="text-sm text-gray-600">{item?.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section
        className={`py-16 px-4 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100 "
        } text-center`}
      >
        <h2 className="text-2xl font-semibold mb-2">{benefits?.title}</h2>
        <p className="text-gray-600 mb-10">{benefits?.desc}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits?.items?.map((item, idx) => (
            <div
              key={idx}
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-gray-100 "
              } p-6 rounded-lg shadow-sm`}
            >
              <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        className={`py-16 px-4 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100 "
        } text-center`}
      >
        <h2 className="text-2xl font-semibold mb-2">{howItWorks?.title}</h2>
        <p className="text-gray-600 mb-10">{howItWorks?.desc}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {howItWorks?.items?.map((item, idx) => (
            <div
              key={idx}
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-gray-100 "
              } p-6 rounded-lg shadow-sm`}
            >
              <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className={`py-20 px-4  ${isDarkMode ? "bg-gray-900" : "bg-gray-100 "}`}
      >
        <img
          src={contentSection?.image}
          alt="Content"
          className="mx-auto mb-6 w-[300px] h-[400px] rounded-2xl object-cover"
        />
        <h2 className="text-2xl font-bold mb-4">{contentSection?.title}</h2>
        <p className=" mx-auto text-gray-700">{contentSection?.desc}</p>
      </section>

      {showDeleteModal && (
        <DeleteCard
          onClose={() => setShowDeleteModal(false)}
          isDarkMode={isDarkMode}
          deleteMessage={deleteMessage}
          deleteId={deleteId}
          path="service"
        />
      )}
    </div>
  );
};

export default SingleService;
