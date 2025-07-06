import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { baseUrl } from "../../main";
import { useContext, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Context } from "../../Context/Context";
import logo from "../../assets/images/logo.png";

const Login = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await axios.post(
        `${baseUrl}/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      if (response.data?.result === 1) {
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        toast.success(response?.data?.message || "Login successful!");
        navigate("/");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      console.log(error)
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Logo */}
      <div className="flex justify-center w-full mt-5">
        <img src={logo} alt="Logo" className="w-[100px] h-[100px]" />
      </div>

      {/* Main Container */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div
          className={`w-full max-w-md rounded-lg shadow-md overflow-hidden ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Header */}
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p
              className={`mt-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Please enter your credentials to login
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 pb-8">
            {/* Email Input */}
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope
                  className={isDarkMode ? "text-gray-400" : "text-gray-400"}
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full pl-10 pr-3 py-2 border-b-2 bg-transparent ${
                  isDarkMode
                    ? "border-gray-600 focus:border-blue-400 text-white placeholder-gray-400"
                    : "border-gray-300 focus:border-blue-500"
                } focus:outline-none`}
              />
            </div>

            {/* Password Input */}
            <div className="mb-8 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full pl-10 pr-10 py-2 border-b-2 bg-transparent ${
                  isDarkMode
                    ? "border-gray-600 focus:border-blue-400 text-white placeholder-gray-400"
                    : "border-gray-300 focus:border-blue-500"
                } focus:outline-none`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400 hover:text-gray-300" />
                ) : (
                  <FaEye className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition-colors duration-200 flex items-center justify-center`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
