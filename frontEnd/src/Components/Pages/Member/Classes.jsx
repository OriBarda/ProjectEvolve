import React, { useState, useEffect, useContext } from "react";
import { ClassContext } from "../../../context/classContext";
import { UserContext } from "../../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faUser, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ScaleLoader } from "react-spinners";

function Classes() {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const { joinClass, leaveClass, classList, getAllClass } =
    useContext(ClassContext);
  const { userInfo, navigate } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userInfo == undefined) {
      navigate("/");
    }
  });

  useEffect(() => {
    if (userInfo && userInfo.classes) {
      setSelectedClasses(userInfo.classes);
    }
  }, [getAllClass]);

  useEffect(() => {
    getAllClass()
      .then(() => setLoading(false))
      .catch((error) => console.error("Error loading classes:", error));
  }, []);

  const handleJoinClass = async (e, joinedClass) => {
    e.preventDefault();
    if (joinedClass && joinedClass.plans && joinedClass.plans.length > 0) {
      try {
        const userId = userInfo._id;
        const classId = joinedClass._id;
        await Promise.all(
          joinedClass.plans.map(async (plan) => {
            if (plan === userInfo.plan) {
              await joinClass({ classId, userId });
            }
          })
        );
        toast.success("You have joinded the class")
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Joined class or plans are undefined or empty.");
      toast.warning("this class is not fitting to your plan")
    }
  };

  const handleLeaveClass = async (e, leavedClass) => {
    e.preventDefault();
    const userId = userInfo._id;
    const classId = leavedClass._id;
    try {
      await leaveClass({ classId, userId });
      toast.success("You have left the class")
    } catch (err) {
      console.log(err);
    }
  };

  const getIcon = (className) => {
    switch (className) {
      case "Morning Gym":
      case "Afternoon Gym":
      case "Evening Gym":
        return faDumbbell;
      case "Morning Pilates":
      case "Evening Pilates":
        return faYinYang;
      case "Swimming Basics":
      case "Advanced Swimming":
        return faSwimmer;
      case "Morning Nutrition Class":
      case "Evening Nutrition Class":
        return faAppleAlt;
      case "Morning Spa":
      case "Afternoon Spa":
      case "Night Spa":
        return faSpa;
      case "Morning Junior Workout":
      case "Afternoon Junior Workout":
      case "Night Junior Workout":
        return faChild;
      default:
        return faUser;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-20 px-4 py-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">
        Available Classes
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ScaleLoader
            height={50}
            width={10}
            color="#FFA500"
            loading={loading}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classList.map((classDetails, index) => {
            const currentCapacity = classDetails.users.length;
            const isClassFull = currentCapacity >= 15;
            return (
              <div
                key={index}
                className="rounded-md overflow-hidden shadow-md flex flex-col justify-between"
              >
                <div className="bg-gray-200 p-4 h-44">
                  <div className="flex items-center">
                    <div className="bg-gray-200 p-4 rounded-xl">
                      <FontAwesomeIcon
                        icon={getIcon(classDetails.title)}
                        className="text-xl text-black"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">
                        {classDetails.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {classDetails.description}
                      </p>
                      <p className="text-sm text-gray-600">
                        Time: {classDetails.time}
                      </p>
                      <p className="text-sm text-gray-600">
                        Plan: {classDetails.plans.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 py-2 px-4 flex justify-between items-center bg-gray-300 h-12">
                  {isClassFull ? (
                    <span className="text-xs text-red-600">
                      <FontAwesomeIcon icon={faTimes} className="mr-1" />
                      Full
                    </span>
                  ) : (
                    <span className="text-xs text-green-600">
                      <FontAwesomeIcon icon={faCheck} className="mr-1" />
                      {currentCapacity}/15{" "}
                      <FontAwesomeIcon icon={faUser} className="ml-1" />
                    </span>
                  )}
                  {selectedClasses.some(
                    (selectedClass) => selectedClass === classDetails._id
                  ) ? (
                    <button
                      className="text-lg text-red-600 bg-gray-400 w-12 h-fit py-2 px-2 flex justify-center items-center rounded-md hover:bg-gray-600 transition-all ease-in-out"
                      onClick={(e) => handleLeaveClass(e, classDetails)}
                    >
                      <FontAwesomeIcon icon={faTimes} className="ml-1" />
                    </button>
                  ) : (
                    <button
                      className={`text-3xl ${
                        isClassFull
                          ? "text-gray-500 cursor-not-allowed"
                          : "text-green-300 hover:text-green-600"
                      } bg-gray-400 w-12 h-fit flex justify-center items-center rounded-md hover:bg-gray-600 transition-all ease-in-out`}
                      onClick={(e) =>
                        !isClassFull && handleJoinClass(e, classDetails)
                      }
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default Classes;
