import React, { useState } from "react";
import {
  FiChevronDown,
  FiUpload,
  FiPlus,
  FiX,
  FiImage,
  FiArrowLeft,
} from "react-icons/fi";
import SizeRec from "../../components/SizeRec/SizeRec";

import design_img1 from "../../assets/images/serviceImg/d1.png";
import design_img2 from "../../assets/images/serviceImg/d2.png";
import design_img3 from "../../assets/images/serviceImg/d3.png";
import design_img4 from "../../assets/images/serviceImg/d4.png";
import design_img5 from "../../assets/images/serviceImg/d5.png";
import design_img6 from "../../assets/images/serviceImg/d6.png";
import { useBackPage } from "../../utils/backFunc";
import { baseUrl } from "../../main";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const NewService = ({ isDarkMode = false }) => {
  const backPage = useBackPage();

  const [loading, setLoading] = useState();
  const navigate = useParams();

  const [formData, setFormData] = useState({
    bannerSection: {
      bannerImage: "",
      bannerTitle: "",
      bannerDesc: "",
      serviceName: "",
    },
    selectedService: "",
    howItWorks: {
      title: "",
      desc: "",
      items: [
        { title: "", desc: "" },
        { title: "", desc: "" },
      ],
    },
    benefits: {
      title: "",
      items: [{ title: "", desc: "" }],
    },

    strategy: {
      title: "",
      desc: "",
      items: [{ title: "", desc: "" }],
    },
    contentSection: {
      image: "",
      title: "",
      desc: "",
    },
  });

  const [activeSection, setActiveSection] = useState("banner");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    const updatedItems = [...formData[section].items];
    updatedItems[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        items: updatedItems,
      },
    }));
  };

  const addCard = (section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        items: [...prev[section].items, { title: "", desc: "" }],
      },
    }));
  };

  const removeCard = (section, index) => {
    const updatedItems = formData[section].items.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        items: updatedItems,
      },
    }));
  };

  const handleImageUpload = (e, section, field, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    // For flat fields like bannerImage
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: file,
      },
    }));
  };

  const sections = [
    { id: "banner", label: "Banner" },
    { id: "service", label: "Service Type" },
    { id: "strategy", label: "Strategy" },
    { id: "benefits", label: "Benefits" },
    { id: "howItWorks", label: "How It Works" },
    { id: "content", label: "Content" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // 1. Append banner image (single)
      if (formData.bannerSection.bannerImage instanceof File) {
        formDataToSend.append(
          "bannerImage",
          formData.bannerSection.bannerImage
        );
      }

      // 3. Append content section image (single)
      if (formData.contentSection.image instanceof File) {
        formDataToSend.append(
          "contentSectionImage",
          formData.contentSection.image
        );
      }

      // 4. Prepare and append serviceData JSON
      const serviceData = {
        bannerSection: {
          bannerTitle: formData.bannerSection.bannerTitle,
          bannerDesc: formData.bannerSection.bannerDesc,
          bannerImage: formData.bannerSection.bannerImage,
          serviceName: formData.bannerSection.serviceName,
        },
        selectedService: formData.selectedService,
        strategy: {
          title: formData.strategy.title,
          desc: formData.strategy.desc,
          items: formData.strategy.items.map((item) => ({
            title: item.title,
            desc: item.desc,
          })),
        },
        benefits: {
          title: formData.benefits.title,
          items: formData.benefits.items.map((item) => ({
            title: item.title,
            desc: item.desc,
          })),
        },
        howItWorks: {
          title: formData.howItWorks.title,
          desc: formData.howItWorks.desc,
          items: formData.howItWorks.items.map((item) => ({
            title: item.title,
            desc: item.desc,
            image: item.image,
          })),
        },
        contentSection: {
          title: formData.contentSection.title,
          desc: formData.contentSection.desc,
          image: formData.contentSection.image || "",
        },
      };

      console.log(serviceData);

      formDataToSend.append("serviceData", JSON.stringify(serviceData));

      // API call
      const { data } = await axios.post(
        `${baseUrl}/service/new-service`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data && data.success) {
        toast.success(data.message);
        navigate("/service");
      } else  {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error(error.response?.data?.message || "Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      } py-8`}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
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
            className={`text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Create New Service
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div
            className={`lg:w-64 rounded-xl p-4 h-fit sticky top-8 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-sm`}
          >
            <h2 className="font-semibold mb-4 text-lg">Sections</h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-2 cursor-pointer rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? `${
                          isDarkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-700"
                        }`
                      : `${
                          isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
            >
              {loading ? "Saving..." : "Save Service"}
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Banner Section */}
            {activeSection === "banner" && (
              <div
                className={`rounded-xl overflow-hidden ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <span className="w-2 h-6 rounded bg-gradient-to-b from-blue-500 to-blue-600"></span>
                    Banner Section
                  </h2>
                  <p
                    className={`text-sm mt-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Upload an eye-catching banner image and add compelling text
                  </p>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <label
                      className={`block mb-3 font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Banner Image
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex items-center justify-center space-x-4">
                      {formData.bannerSection.bannerImage ? (
                        <div className="relative group ">
                          <img
                            src={URL.createObjectURL(
                              formData.bannerSection.bannerImage
                            )}
                            alt="Banner preview"
                            className="h-48 w-full object-cover rounded-lg shadow-md"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 rounded-lg flex items-center justify-center">
                            <button
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  bannerSection: {
                                    ...prev.bannerSection,
                                    bannerImage: "",
                                  },
                                }))
                              }
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors cursor-pointer"
                            >
                              <FiX size={18} />
                            </button>
                          </div>
                        </div>
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
                                Click to upload banner image
                              </span>
                            </p>
                            <p
                              className={`text-xs ${
                                isDarkMode ? "text-gray-500" : "text-gray-400"
                              }`}
                            >
                              up to 2MB (Recommend size : 1800 x 1000)
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(
                                e,
                                "bannerSection",
                                "bannerImage"
                              )
                            }
                          />
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      className={`block mb-3 font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Service Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.bannerSection.serviceName}
                      onChange={(e) =>
                        handleNestedChange(
                          "bannerSection",
                          "serviceName",
                          e.target.value
                        )
                      }
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                          : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                      } focus:ring-2 focus:outline-none transition-all duration-200`}
                      placeholder="e.g. Premium Web Design Services"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      className={`block mb-3 font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Banner Title
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.bannerSection.bannerTitle}
                      onChange={(e) =>
                        handleNestedChange(
                          "bannerSection",
                          "bannerTitle",
                          e.target.value
                        )
                      }
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                          : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                      } focus:ring-2 focus:outline-none transition-all duration-200`}
                      placeholder="e.g. Premium Web Design Services"
                    />
                  </div>

                  <div className="mb-2">
                    <label
                      className={`block mb-3 font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Banner Description
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      name="formD.bannerDesc"
                      value={formData.bannerSection.bannerDesc}
                      onChange={(e) =>
                        handleNestedChange(
                          "bannerSection",
                          "bannerDesc",
                          e.target.value
                        )
                      }
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                          : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                      } focus:ring-2 focus:outline-none transition-all duration-200`}
                      placeholder="Describe your service in a compelling way"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Service Selection */}
            {activeSection === "service" && (
              <div
                className={`rounded-xl overflow-hidden ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <span className="w-2 h-6 rounded bg-gradient-to-b from-blue-500 to-blue-600"></span>
                    Service Selection
                  </h2>
                  <p
                    className={`text-sm mt-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Choose the type of service you're offering
                  </p>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <label
                      className={`block mb-3 font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Service Type
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="selectedService"
                        value={formData.selectedService}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 cursor-pointer rounded-lg border appearance-none ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                            : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                        } focus:ring-2 focus:outline-none transition-all duration-200`}
                      >
                        <option value="">Select a service category</option>
                        <option value="design">Design Service</option>
                        <option value="development">Development Service</option>
                        <option value="marketing">Marketing Service</option>
                      </select>
                      <FiChevronDown
                        className={`absolute right-4 top-4 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Strategy Section */}
            {activeSection === "strategy" && (
              <div
                className={`rounded-xl overflow-hidden ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <span className="w-2 h-6 rounded bg-gradient-to-b from-blue-500 to-blue-600"></span>
                      Strategy Section
                    </h2>
                    <p
                      className={`text-sm mt-1 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Detail your strategic approach to the service
                    </p>
                  </div>
                </div>

                <div>
                  <img
                    src={design_img5}
                    alt=""
                    className="mt-10 block h-50 w-full object-contain"
                  />
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <label
                      className={`block mb-3 font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Section Title
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.strategy.title}
                      onChange={(e) =>
                        handleNestedChange("strategy", "title", e.target.value)
                      }
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                          : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                      } focus:ring-2 focus:outline-none transition-all duration-200`}
                      placeholder="e.g. Our Winning Strategy"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      className={`block mb-3 font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Section Description
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      value={formData.strategy.desc}
                      onChange={(e) =>
                        handleNestedChange("strategy", "desc", e.target.value)
                      }
                      rows={3}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                          : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                      } focus:ring-2 focus:outline-none transition-all duration-200`}
                      placeholder="Briefly describe your strategic approach"
                    />
                  </div>

                  <div className="space-y-6">
                    {formData.strategy.items.map((item, index) => (
                      <div
                        key={index}
                        className={`p-5 rounded-xl border ${
                          isDarkMode
                            ? "bg-gray-700/50 border-gray-600"
                            : "bg-gray-50 border-gray-200"
                        } relative transition-all duration-200 hover:shadow-md`}
                      >
                        <button
                          onClick={() => removeCard("strategy", index)}
                          className={`absolute cursor-pointer top-4 right-4 p-1 rounded-full ${
                            isDarkMode
                              ? "hover:bg-gray-600 text-red-400 hover:text-red-300"
                              : "hover:bg-gray-200 text-red-500 hover:text-red-600"
                          } transition-colors duration-200`}
                        >
                          <FiX size={18} />
                        </button>

                        <div className="mb-5">
                          <label
                            className={`block mb-2 font-medium ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Strategy Title
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) =>
                              handleArrayChange(
                                "strategy",
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                                : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                            } focus:ring-2 focus:outline-none transition-all duration-200`}
                            placeholder="e.g. Data-Driven Approach"
                          />
                        </div>

                        <div>
                          <label
                            className={`block mb-2 font-medium ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Strategy Description
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <textarea
                            value={item.desc}
                            onChange={(e) =>
                              handleArrayChange(
                                "strategy",
                                index,
                                "desc",
                                e.target.value
                              )
                            }
                            rows={3}
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                                : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                            } focus:ring-2 focus:outline-none transition-all duration-200`}
                            placeholder="Explain this strategic component"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => addCard("strategy")}
                    className="btn-primary mt-5"
                  >
                    <FiPlus size={18} />
                    <span>Add Strategy</span>
                  </button>
                </div>
              </div>
            )}

            {/* How It Works Section */}
            {activeSection === "howItWorks" && (
              <div
                className={`rounded-xl overflow-hidden ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <span className="w-2 h-6 rounded bg-gradient-to-b from-blue-500 to-blue-600"></span>
                      How It Works
                    </h2>
                    <p
                      className={`text-sm mt-1 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Explain how your service works and its benefits
                    </p>
                  </div>
                </div>

                <div>
                  <img
                    src={design_img1}
                    alt=""
                    className="mt-10 block h-50 w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <label
                      className={`block mb-3 font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Section Title
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.howItWorks.title}
                      onChange={(e) =>
                        handleNestedChange(
                          "howItWorks",
                          "title",
                          e.target.value
                        )
                      }
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                          : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                      } focus:ring-2 focus:outline-none transition-all duration-200`}
                      placeholder="e.g. Why Our Service Works"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      className={`block mb-3 font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Section Description
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      value={formData.howItWorks.desc}
                      onChange={(e) =>
                        handleNestedChange("howItWorks", "desc", e.target.value)
                      }
                      rows={3}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                          : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                      } focus:ring-2 focus:outline-none transition-all duration-200`}
                      placeholder="Briefly describe why your service is effective"
                    />
                  </div>

                  <div className="space-y-6">
                    {formData.howItWorks.items.map((item, index) => (
                      <div
                        key={index}
                        className={`p-5 rounded-xl border ${
                          isDarkMode
                            ? "bg-gray-700/50 border-gray-600"
                            : "bg-gray-50 border-gray-200"
                        } relative transition-all duration-200 hover:shadow-md`}
                      >
                        <button
                          onClick={() => removeCard("howItWorks", index)}
                          className={`absolute top-4 right-4 p-1 rounded-full cursor-pointer ${
                            isDarkMode
                              ? "hover:bg-gray-600 text-red-400 hover:text-red-300"
                              : "hover:bg-gray-200 text-red-500 hover:text-red-600"
                          } transition-colors duration-200`}
                        >
                          <FiX size={18} />
                        </button>

                        <div className="mb-5">
                          <label
                            className={`block mb-2 font-medium ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Item Title
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) =>
                              handleArrayChange(
                                "howItWorks",
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                                : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                            } focus:ring-2 focus:outline-none transition-all duration-200`}
                            placeholder="e.g. Mass Reach"
                          />
                        </div>

                        <div>
                          <label
                            className={`block mb-2 font-medium ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Item Description
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <textarea
                            value={item.desc}
                            onChange={(e) =>
                              handleArrayChange(
                                "howItWorks",
                                index,
                                "desc",
                                e.target.value
                              )
                            }
                            rows={3}
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                                : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                            } focus:ring-2 focus:outline-none transition-all duration-200`}
                            placeholder="Explain this aspect of your service"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addCard("howItWorks")}
                    className="btn-primary mt-5"
                  >
                    <FiPlus size={18} />
                    <span>Add Item</span>
                  </button>
                </div>
              </div>
            )}

            {/* Benefits Section */}
            {activeSection === "benefits" && (
              <div
                className={`rounded-xl overflow-hidden ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <span className="w-2 h-6 rounded bg-gradient-to-b from-blue-500 to-blue-600"></span>
                      Benefits Section
                    </h2>
                    <p
                      className={`text-sm mt-1 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Highlight the key benefits of your service
                    </p>
                  </div>
                </div>

                <div>
                  <img
                    src={design_img2}
                    alt=""
                    className="mt-10 block h-50 w-full object-contain"
                  />
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <label
                      className={`block mb-3 font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Section Title
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.benefits.title}
                      onChange={(e) =>
                        handleNestedChange("benefits", "title", e.target.value)
                      }
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                          : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                      } focus:ring-2 focus:outline-none transition-all duration-200`}
                      placeholder="e.g. Key Benefits of Our Service"
                    />
                  </div>

                  <div className="space-y-6">
                    {formData.benefits.items.map((item, index) => (
                      <div
                        key={index}
                        className={`p-5 rounded-xl border ${
                          isDarkMode
                            ? "bg-gray-700/50 border-gray-600"
                            : "bg-gray-50 border-gray-200"
                        } relative transition-all duration-200 hover:shadow-md`}
                      >
                        <button
                          onClick={() => removeCard("benefits", index)}
                          className={`absolute top-4 right-4 p-1 rounded-full  cursor-pointer ${
                            isDarkMode
                              ? "hover:bg-gray-600 text-red-400 hover:text-red-300"
                              : "hover:bg-gray-200 text-red-500 hover:text-red-600"
                          } transition-colors duration-200`}
                        >
                          <FiX size={18} />
                        </button>

                        <div className="mb-5">
                          <label
                            className={`block mb-2 font-medium ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Benefit Title
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) =>
                              handleArrayChange(
                                "benefits",
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                                : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                            } focus:ring-2 focus:outline-none transition-all duration-200`}
                            placeholder="e.g. Increased Conversion Rates"
                          />
                        </div>

                        <div>
                          <label
                            className={`block mb-2 font-medium ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Benefit Description
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <textarea
                            value={item.desc}
                            onChange={(e) =>
                              handleArrayChange(
                                "benefits",
                                index,
                                "desc",
                                e.target.value
                              )
                            }
                            rows={3}
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                                : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                            } focus:ring-2 focus:outline-none transition-all duration-200`}
                            placeholder="Explain how this benefit helps your clients"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => addCard("benefits")}
                    className="btn-primary mt-5"
                  >
                    <FiPlus size={18} />
                    <span>Add Benefit</span>
                  </button>
                </div>
              </div>
            )}

            {/* Content Section */}
            {activeSection === "content" && (
              <div
                className={`rounded-xl overflow-hidden ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <span className="w-2 h-6 rounded bg-gradient-to-b from-blue-500 to-blue-600"></span>
                    Content Section
                  </h2>
                  <p
                    className={`text-sm mt-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Add a final content section with image and text
                  </p>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <label
                      className={`block mb-3 font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Content Image
                    </label>
                    <div className="flex items-center justify-center space-x-4">
                      {formData.contentSection.image ? (
                        <div className="relative group">
                          <img
                            src={URL.createObjectURL(
                              formData.contentSection.image
                            )}
                            alt="Content preview"
                            className="h-[400px] w-[300px] object-cover rounded-lg shadow-md"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 rounded-lg flex items-center justify-center">
                            <button
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  contentSection: {
                                    ...prev.contentSection,
                                    image: "",
                                  },
                                }))
                              }
                              className="p-2 bg-red-500 text-white cursor-pointer rounded-full hover:bg-red-600 transition-colors"
                            >
                              <FiX size={18} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label
                          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
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
                              up to 1MB (Recommend size : 500 x 600)
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(e, "contentSection", "image")
                            }
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      className={`block mb-3 font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={formData.contentSection.title}
                      onChange={(e) =>
                        handleNestedChange(
                          "contentSection",
                          "title",
                          e.target.value
                        )
                      }
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                          : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                      } focus:ring-2 focus:outline-none transition-all duration-200`}
                      placeholder="e.g. Why Choose Our Service?"
                    />
                  </div>

                  <div className="mb-2">
                    <label
                      className={`block mb-3 font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Section Content
                    </label>
                    <textarea
                      value={formData.contentSection.desc}
                      onChange={(e) =>
                        handleNestedChange(
                          "contentSection",
                          "desc",
                          e.target.value
                        )
                      }
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50"
                          : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:ring-blue-400/50"
                      } focus:ring-2 focus:outline-none transition-all duration-200`}
                      placeholder="Write a compelling conclusion about your service"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewService;
