import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Navigate } from "react-router-dom";
import icon1 from "../../assets/icons/icon1.png";
import icon2 from "../../assets/icons/icon2.jpg";
import icon3 from "../../assets/icons/icon3.png";
import icon4 from "../../assets/icons/icon4.png";
import icon5 from "../../assets/icons/icon5.png";
import icon6 from "../../assets/icons/icon6.jpg";
import defaultIcon from "../../assets/icons/icon7.jpg";
import { MdArrowForwardIos } from "react-icons/md";
import { IoIosCloseCircle, IoIosCheckmark, IoIosClock } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile({ handleCloseModal }) {
  const { editUser, deleteUser, userInfo,navigate } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const profileIcons = [icon1, icon2, icon3, icon4, icon5, icon6, defaultIcon];
  const [username, setUsername] = useState(userInfo?.username || "");
  const [password, setPassword] = useState(userInfo?.password || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [birthday, setBirthday] = useState(userInfo?.birthday || "");

  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setImage(null);
  };
  const handleEdit = () => {
    setEdit(true);
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const { password } = userInfo;
      const currentUserPassword = userInfo.password;
      const editedUser = { username, email, birthday };

      if (password === currentUserPassword) {
        await editUser(editedUser);
        toast.success("User successfully edited");
      } else {
        editedUser.password = password;
        await editUser(editedUser);
        toast.success("User successfully edited with new password");
      }
      setEdit(false);
    } catch (err) {
      console.error("Edit user failed", err);
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      await deleteUser(userInfo?._id);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AnimatePresence>
        {userInfo ? (
          <motion.div
            key={"hello"}
            initial={{ opacity: 0, y: -350 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -350 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center items-center w-screen space-y-4 sm:space-y-0 sm:space-x-8 mt-16 mb-12"
          >
            <div
              id="profile"
              className="bg-gray-900 text-white p-8  xs:w-98 xs:h-[80vh] h-screen w-screen overflow-y-auto rounded-xl"
            >
              <div className="text-purple-200 relative text-4xl flex justify-between">
                <button>
                  <IoIosCloseCircle
                    className="hover:text-white transition-colors ease-in-out"
                    onClick={() => {
                      handleCloseModal();
                    }}
                  />
                </button>
              </div>
              <div className="w-full h-fit flex justify-center items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-300">
                  {" "}
                  <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-300">
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={handleFileChange}
                    />
                    {image && (
                      <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full">
                        <img
                          src={image}
                          alt="Selected"
                          className="w-full h-full object-cover"
                        />
                        <button
                          className="absolute top-2 right-2 bg-white p-1 rounded-full"
                          onClick={handleClearImage}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14.293 5.293a1 1 0 011.414 1.414L11.414 12l4.293 4.293a1 1 0 01-1.414 1.414L10 13.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 12 4.293 7.707a1 1 0 011.414-1.414L10 10.586l4.293-4.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {edit ? (
                  <motion.form
                    key="edit-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleEditUser}
                    className="space-y-4 w-full mx-auto sm:w-64 flex flex-col items-center justify-center"
                  >
                    <div>
                      <label className="block text-gray-300 text-sm font-bold">
                        Your Username:
                      </label>
                      <input
                        className="px-3 py-2 border rounded-full focus:outline-none focus:border-[#08ffad] bg-gray-700 hover:opacity-90  transition-all ease-in-out"
                        type="text"
                        defaultValue={userInfo.username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-bold">
                        Your Password:
                      </label>
                      <input
                        className="px-2 py-2 border rounded-full focus:outline-none focus:border-[#08ffad] bg-gray-700 hover:opacity-90  transition-all ease-in-out duration-500"
                        type="password"
                        defaultValue={userInfo.password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-bold">
                        Your Email:
                      </label>
                      <input
                        className="w-auto px-2 py-2 border rounded-full focus:outline-none focus:border-[#08ffad] bg-gray-700 hover:opacity-90  transition-all ease-in-out"
                        type="email"
                        defaultValue={userInfo.email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-bold">
                        Your Birthday:
                      </label>
                      <input
                        className="w-60 px-2 py-2 border rounded-full focus:outline-none focus:border-[#08ffad] bg-gray-700 hover:opacity-90  transition-all ease-in-out"
                        type="date"
                        value={userInfo.birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center justify-evenly w-60">
                      <button
                        className="bg-[#61ffca] text-gray-700 text-xl p-3 rounded-full hover:bg-[#08ffad] transition-colors ease-in-out flex justify-center w-14 h-14 items-center self-center"
                        onClick={() => setEdit(false)}
                      >
                        X
                      </button>
                      <motion.button
                        type="submit"
                        className="bg-[#61ffca] text-gray-700 text-xl p-3 rounded-full hover:bg-[#08ffad] transition-colors ease-in-out flex justify-center w-14 self-center"
                      >
                        {loading ? (
                          <IoIosClock className="text-3xl" />
                        ) : (
                          <IoIosCheckmark className="text-3xl" />
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="profile-details"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white text-center flex flex-col justify-center items-center w-full"
                  >
                    <p className="text-[#08ffad] ">
                      Member since{" "}
                      {userInfo.createdAt
                        ? new Date(userInfo.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <div className="bg-gray-800 w-full m-4 py-2 rounded-xl flex flex-col items-start p-3">
                      <motion.div className="mb-6 flex flex-col items-start">
                        <header className="font-light text-lg text-[#08ffad]">
                          Username:
                        </header>
                        {userInfo?.username || "N/A"}
                      </motion.div>
                      <motion.div className="mb-4 flex flex-col items-start">
                        <header className="font-light text-lg text-[#08ffad]">
                          Email:
                        </header>
                        {userInfo?.email || "N/A"}
                      </motion.div>
                      <motion.div className="mb-4 flex flex-col items-start">
                        <header className="font-light text-lg text-[#08ffad]">
                          Birthday:
                        </header>
                        {userInfo?.birthday || "N/A"}
                      </motion.div>
                      <motion.div className="mb-4 flex flex-col items-start">
                        <header className="font-light text-lg text-[#08ffad]">
                          Plan:
                        </header>
                        {userInfo?.plan || "N/A"}
                      </motion.div>
                      <motion.button
                        onClick={handleEdit}
                        className=" bg-gray-700 w-fit px-2 py-1 text-[#08ffad] text-lg font-normal rounded-full mb-4 flex items-center hover:text-gray-400 hover:bg-gray-900 transition-all ease-in-out "
                      >
                        Edit Profile
                        <MdArrowForwardIos />
                      </motion.button>
                    </div>
                    <div className="w-full h-1 bg-gray-700 " />
                    <button
                      className="bg-gray-800 rounded-full px-2 py-1 mt-3 text-gray-400 hover:text-orange-1000 transition-all ease-in-out "
                      onClick={(e) => handleDeleteUser(e)}
                    >
                      Delete User
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <div className="text-black text-lg">
            You're not logged in-
            <Link
              to={"/signup"}
              className="text-yellow-500 underline font-extrabold"
            >
              Log In
            </Link>
          </div>
        )}

        {/* Profile Icon Modal */}
        {showModal && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-orange-1000">
                Choose a Profile Icon
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {profileIcons.map((icon, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleIconChange(icon)}
                  >
                    <img
                      src={icon}
                      alt={`Profile Icon ${index + 1}`}
                      className="w-16 h-16 rounded-full border-4 border-orange-1000"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
        />
      </AnimatePresence>
    </>
  );
}

export default Profile;
