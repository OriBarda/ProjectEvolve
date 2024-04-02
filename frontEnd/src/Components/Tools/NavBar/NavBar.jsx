import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LocalContext } from "../../../context/LocalContext";
import { UserContext } from "../../../context/UserContext";
import SmallLogo from "../../../assets/SmallLogo.png";
import NavLogo from "../../../assets/EvolveText.png";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { BiMenuAltRight } from "react-icons/bi";
import { IoHomeSharp } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import { FiInfo } from "react-icons/fi";
import { SlArrowDown, SlArrowRight } from "react-icons/sl";
import Background from "../../../assets/svg/NavBackground.svg";

const plansData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
];

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const { setIsSignUpMode, setSelectedPlan } = useContext(LocalContext);
  const { userInfo, logOutUser } = useContext(UserContext);
  const [service, setService] = useState(false);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setService(false);
    setMenuOpen(false);
  };

  const handleBurgerClick = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleScroll = () => {
    setIsTop(window.scrollY === 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const variants = {
    hidden: {
      width: 0,
      padding: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    visible: {
      width: "80%",
      padding: "1rem",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleLogOut = async () => {
    try {
      await logOutUser();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
    setMenuOpen(false);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
    setMenuOpen(false);
  };

  return (
    <div>
      {/* full screen navbar start */}
      <nav
        className={`w-full px-4 py-4 flex justify-between items-center z-50 text-orange-1000 bg-black fixed ${
          isTop ? "bg-opacity-0" : "bg-opacity-80"
        } transition-all duration-300`}
      >
        {userInfo ? (
          <Link className="text-3xl font-bold leading-none" to={"/member"}>
            <img className="relative w-36" src={NavLogo} alt="" />
          </Link>
        ) : (
          <Link className="text-3xl font-bold leading-none" to={"/"}>
            <img className="relative w-36" src={NavLogo} alt="" />
          </Link>
        )}
        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center text-orange-600 p-3"
            onClick={handleBurgerClick}
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul
          className={`hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto  lg:items-center lg:w-auto lg:space-x-6 ${
            isMenuOpen ? "" : "hidden"
          }`}
        >
          <li>
            {userInfo ? (
              <Link
                className="text-lg hover:text-orange-500 transition-all ease-in-out  "
                to={"/member"}
                onClick={handleMenuClose}
              >
                Home
              </Link>
            ) : (
              <Link
                className="text-lg hover:text-orange-500 transition-all ease-in-out "
                to={"/"}
                onClick={handleMenuClose}
              >
                Home
              </Link>
            )}
          </li>
          <li>
            <Link
              className="text-lg hover:text-orange-500 transition-all ease-in-out "
              to={"/about"}
              onClick={handleMenuClose}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center text-lg hover:text-orange-500 transition-all ease-in-out  "
              onClick={() => setService(!service)}
            >
              Services <SlArrowDown className="m-2" />
            </Link>
            <AnimatePresence>
              {service ? (
                <motion.ul
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, duration: 500, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute bg-dark-blue text-white font-light text-sm rounded-md p-2 shadow-lg divide-y divide-gray-800"
                >
                  <Link
                    onClick={() => handlePlanSelection(plansData[0])}
                    to={"/service"}
                  >
                    <li className="py-2 px-3 cursor-pointer hover:bg-rose-500 hover:text-dark-blue transition flex items-center">
                      <SlArrowRight className="font-extrabold mr-2" />
                      Swimming
                    </li>
                  </Link>
                  <Link
                    onClick={() => handlePlanSelection(plansData[1])}
                    to={"/service"}
                  >
                    <li className="py-2 px-3 cursor-pointer hover:bg-rose-500 hover:text-dark-blue transition flex items-center">
                      <SlArrowRight className="font-extrabold mr-2" />
                      Junior
                    </li>
                  </Link>
                  <Link
                    onClick={() => handlePlanSelection(plansData[2])}
                    to={"/service"}
                  >
                    <li className="py-2 px-3 cursor-pointer hover:bg-rose-500 hover:text-dark-blue transition flex items-center">
                      <SlArrowRight className="font-extrabold mr-2" />
                      Nutrition
                    </li>
                  </Link>
                  <Link
                    onClick={() => handlePlanSelection(plansData[3])}
                    to={"/service"}
                  >
                    <li className="py-2 px-3 cursor-pointer hover:bg-rose-500 hover:text-dark-blue transition flex items-center">
                      <SlArrowRight className="font-extrabold mr-2" />
                      Personal
                    </li>
                  </Link>
                  <Link
                    onClick={() => handlePlanSelection(plansData[4])}
                    to={"/service"}
                  >
                    <li className="py-2 px-3 cursor-pointer hover:bg-rose-500 hover:text-dark-blue transition flex items-center">
                      <SlArrowRight className="font-extrabold mr-2" />
                      Spa
                    </li>
                  </Link>
                  <Link
                    onClick={() => handlePlanSelection(plansData[5])}
                    to={"/service"}
                  >
                    <li className="py-2 px-3 cursor-pointer hover:bg-rose-500 hover:text-dark-blue transition flex items-center">
                      <SlArrowRight className="font-extrabold mr-2" />
                      Pilates
                    </li>
                  </Link>
                </motion.ul>
              ) : null}
            </AnimatePresence>
          </li>
          <li>
            <Link
              className="text-lg hover:text-orange-500 transition-all ease-in-out  "
              to={"/help"}
              onClick={handleMenuClose}
            >
              Contact
            </Link>
          </li>
        </ul>
        {userInfo ? (
          <Link
            className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-black bg-oapcity-50 border-2 border-white hover:bg-oapcity-100 hover:bg-gray-600 text-md text-white font-bold transition duration-200"
            to={"/"}
            onClick={() => handleLogOut()}
          >
            Log Out
          </Link>
        ) : (
          <>
            <Link
              className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-black bg-oapcity-50 border-2 border-white hover:bg-oapcity-100 hover:bg-gray-600 text-md text-white font-bold transition duration-200"
              to={"/signup#login"}
              onClick={handleSignInClick}
            >
              Sign In
            </Link>
            <Link
              className="hidden lg:inline-block  py-2 px-4 bg-orange-500 hover:bg-orange-600 text-md text-white font-bold border-2 border-white bg-opacity-50 hover:bg-opacity-100 transition duration-200"
              to={"/signup"}
              onClick={handleSignUpClick}
            >
              Sign up
            </Link>
          </>
        )}
      </nav>
      {/* full screen navbar end */}
      {/* mobile screen navbar start */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="navbar-menu fixed inset-0 z-50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
          >
            <div
              className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
              onClick={handleMenuClose}
            ></div>
            <motion.nav
              className="fixed top-0 left-0 bottom-0 flex flex-col justify-between w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto"
              variants={variants}
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPositionY: `bottom`,
                backgroundSizeL: `contain`,
                background: `url(${Background})`,
              }}
            >
              {userInfo ? (
                <Link
                  className="text-3xl font-bold leading-none"
                  to={"/member"}
                >
                  <img className="relative w-12" src={SmallLogo} alt="" />
                </Link>
              ) : (
                <Link className="text-3xl font-bold leading-none" to={"/"}>
                  <img className="relative w-12" src={SmallLogo} alt="" />
                </Link>
              )}
              <ul className="h-96 flex flex-col justify-evenly w-full  ">
                <li>
                  {userInfo ? (
                    <Link
                      className="py-2 px-3 font-bold cursor-pointer hover:bg-rose-500 hover:text-dark-blue transition flex items-center"
                      to={"/member"}
                      onClick={handleMenuClose}
                    >
                      <IoHomeSharp className="font-extrabold mr-2" /> Home
                    </Link>
                  ) : (
                    <Link
                      className="py-2 px-3 font-bold cursor-pointer hover:bg-rose-500 hover:text-dark-blue transition flex items-center "
                      to={"/"}
                      onClick={handleMenuClose}
                    >
                      <IoHomeSharp className="font-extrabold mr-2" /> Home
                    </Link>
                  )}
                </li>
                <li>
                  <Link
                    className="py-2 px-3 font-bold cursor-pointer hover:bg-rose-500 hover:text-dark-blue transition flex items-center  "
                    to={"/about"}
                    onClick={handleMenuClose}
                  >
                    <HiUserGroup className="font-extrabold mr-2" /> About Us
                  </Link>
                </li>
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, duration: 300 }}
                  className="  text-black"
                >
                  <Link
                    onClick={() => handlePlanSelection(plansData[0])}
                    to={"/service"}
                  >
                    <li className="py-2 px-3 font-bold cursor-pointer hover:bg-rose-500 hover:text-dark-blue transition flex items-center">
                      <SlArrowRight className="font-extrabold mr-2" />
                      Spa
                    </li>
                  </Link>
                  <Link
                    onClick={() => handlePlanSelection(plansData[1])}
                    to={"/service"}
                  >
                    <li className="py-2 px-3 font-bold cursor-pointer hover:bg-rose-500 hover:text-dark-blue transition flex items-center">
                      <SlArrowRight className="font-extrabold mr-2" />
                      Swimming
                    </li>
                  </Link>
                  <Link
                    onClick={() => handlePlanSelection(plansData[2])}
                    to={"/service"}
                  >
                    <li className="py-2 px-3 font-bold cursor-pointer hover:bg-rose-500 hover:text-dark-blue transition flex items-center">
                      <SlArrowRight className="font-extrabold mr-2" />
                      Junior
                    </li>
                  </Link>
                  <Link
                    onClick={() => handlePlanSelection(plansData[3])}
                    to={"/service"}
                  >
                    <li className="py-2 px-3 font-bold cursor-pointer hover:bg-rose-500 hover:text-dark-blue transition flex items-center">
                      <SlArrowRight className="font-extrabold mr-2" />
                      Pilates
                    </li>
                  </Link>
                  <Link
                    onClick={() => handlePlanSelection(plansData[4])}
                    to={"/service"}
                  >
                    <li className="py-2 px-3 font-bold cursor-pointer hover:bg-rose-500 hover:text-dark-blue transition flex items-center">
                      <SlArrowRight className="font-extrabold mr-2" />
                      Personal
                    </li>
                  </Link>
                  <Link
                    onClick={() => handlePlanSelection(plansData[5])}
                    to={"/service"}
                  >
                    <li className="py-2 px-3 font-bold cursor-pointer hover:bg-rose-500 hover:text-dark-blue transition flex items-center">
                      <SlArrowRight className="font-extrabold mr-2" />
                      Nutrition
                    </li>
                  </Link>
                </motion.ul>
                <li>
                  <Link
                    className="py-2 px-3 font-bold cursor-pointer hover:bg-rose-500 hover:text-dark-blue transition flex items-center"
                    to={"/help"}
                    onClick={handleMenuClose}
                  >
                    <FiInfo className="font-extrabold mr-2" /> Contact
                  </Link>
                </li>
              </ul>
              <div className="flex flex-col">
                {userInfo ? (
                  <Link
                    className="inline-block text-center mb-2 sm:ml-auto sm:mr-3 py-2 px-6 bg-gray-200 hover:bg-gray-300 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
                    to={"/"}
                    onClick={() => handleLogOut()}
                  >
                    Log Out
                  </Link>
                ) : (
                  <>
                    <Link
                      className="inline-block text-center mb-2 sm:ml-auto sm:mr-3 py-2 px-6 bg-gray-200 hover:bg-gray-300 text-md text-gray-900 font-bold rounded-xl transition duration-200 w-full"
                      to={"/signup#login"}
                      onClick={handleSignInClick}
                    >
                      Sign In
                    </Link>
                    <Link
                      className="inline-block text-center mb-2 py-2 px-6 bg-orange-500 hover:bg-orange-600 text-md text-white font-bold rounded-xl transition duration-200"
                      to={"/signup"}
                      onClick={handleSignUpClick}
                    >
                      Sign up
                    </Link>
                  </>
                )}
                <div className="w-full">
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://github.com/your-github"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-orange-500 transition duration-300"
                    >
                      <FaGithub className="text-2xl" />
                    </a>
                    <a
                      href="https://linkedin.com/in/your-linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-orange-500 transition duration-300"
                    >
                      <FaLinkedin className="text-2xl" />
                    </a>
                    <a
                      href="https://instagram.com/your-instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-orange-500 transition duration-300"
                    >
                      <FaInstagram className="text-2xl" />
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm mt-4 animate__animated animate__fadeIn animate__delay-1s">
                    &copy; {new Date().getFullYear()} HailTheThief. All Rights
                    Reserved.
                  </p>
                </div>
              </div>
              <div className="absolute top-5 right-5" onClick={handleMenuClose}>
                <BiMenuAltRight className="text-2xl" />
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
