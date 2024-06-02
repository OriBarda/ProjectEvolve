import React, { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaReact,
  FaNodeJs,
  FaJs,
} from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

function Footer() {
  const isWideScreen = useMediaQuery({ minWidth: 1069 });
  const [display, setDisplay] = useState(isWideScreen);

  useEffect(() => {
    setDisplay(isWideScreen);
  }, [isWideScreen]);

  return (
    <>
      {display ? (
        <div className="text-white py-8 text-center bg-black flex justify-between px-12">
          <div className="flex flex-col items-start justify-center">
            <div className="flex justify-start space-x-4 mb-4">
              <a
                href="https://github.com/your-github"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition duration-300"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a
                href="https://linkedin.com/in/your-linkedin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition duration-300"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              <a
                href="https://instagram.com/your-instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition duration-300"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mb-2">
              &copy; {new Date().getFullYear()} HailTheThief. All Rights
              Reserved.
            </p>
          </div>
          <div className="flex justify-evenly items-center lg:flex-row flex-wrap">
            <div className="text-center p-2">
              <FaReact className="w-12 h-12 mx-auto mb-2 text-blue-500" />
            </div>
            <div className="text-center p-2">
              <FaNodeJs className="w-12 h-12 mx-auto mb-2 text-green-500" />
            </div>
            <div className="text-center p-2">
              <img
                src={`${import.meta.env.VITE_CLOUDINARY}tailwind-css_wcx6ab`}
                alt=""
                className="w-12 h-12 mx-auto mb-2 text-orange-500"
              />
            </div>
            <div className="text-center p-2">
              <FaJs className="w-12 h-12 mx-auto mb-2 text-yellow-500" />
            </div>
          </div>
          <div className="flex items-center">
            <img
              src={`${import.meta.env.VITE_CLOUDINARY}EvolveText_gh6rf0`}
              alt="Logo"
              className="h-8"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Footer;
