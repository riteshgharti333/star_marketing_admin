import React, { useContext, useState } from "react";
import { FiUser, FiMail, FiLock, FiEdit, FiCheck, FiX } from "react-icons/fi";
import { Context } from "../../Context/Context";
import { baseUrl } from "../../main";
import { toast } from "sonner";
import axios from "axios";

const Profile = ({ isDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openPass, setOpenPass] = useState(false);

  const [loading, setLoading] = useState(false);

  const { user } = useContext(Context);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const response = await axios.put(
        `${baseUrl}/auth/change-password`,
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
        },
        { withCredentials: true }
      );

      toast.success(response.data.message || "Password updated successfully!");
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOpenPass(false);
    } catch (error) {
      console.error("Password update error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" py-10 px-4 flex justify-center">
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }  shadow-lg rounded-xl w-full max-w-2xl p-6`}
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-blue-600 text-white w-16 h-16 flex items-center justify-center rounded-full text-xl font-semibold">
            {user?.user?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <h2 className="text-xl font-bold">{user?.user?.name}</h2>
        </div>

        {/* Details */}
        <div className="mt-8 space-y-6">
          <div className="flex items-center gap-4">
            <FiUser className="text-gray-500 text-xl" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-lg font-medium">{user?.user?.name}</p>
            </div>
            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="text-red-500 hover:text-red-600"
              >
                <FiX />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <FiMail className="text-gray-500 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="text-lg font-medium">{user?.user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FiLock className="text-gray-500 text-xl" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Password</p>
              <p className="text-lg font-medium">••••••••</p>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 ]  bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }  w-full max-w-md border border-[#ddd] rounded-lg p-6 shadow-lg relative`}
          >
            <h3 className="text-lg font-semibold mb-4">Update Password</h3>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <label
                  className={` block text-sm ${
                    isDarkMode ? "text-white" : "text-gray-600"
                  }   mb-1`}
                >
                  Current Password
                </label>
                <input
                  type={openPass ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  className={` block text-sm ${
                    isDarkMode ? "text-white" : "text-gray-600"
                  }   mb-1`}
                >
                  New Password
                </label>
                <input
                  type={openPass ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  className={` block text-sm ${
                    isDarkMode ? "text-white" : "text-gray-600"
                  }   mb-1`}
                >
                  Confirm New Password
                </label>
                <input
                  type={openPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  id="showPass"
                  type="checkbox"
                  onChange={(e) => setOpenPass(e.target.checked)}
                  className="cursor-pointer"
                />
                <label htmlFor="showPass" className="cursor-pointer">
                  Show Password
                </label>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className={`btn-danger`}
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 cursor-pointer rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
