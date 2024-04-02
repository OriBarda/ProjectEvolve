import React, { useContext, useEffect, useState } from "react";
import Profile from "../../UserData/Profile";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import Track from "../../../assets/userHome/Track.webp";
import Schedule from "../../../assets/userHome/Scedule.jpg";
import ClassWork from "../../../assets/userHome/ClassWork.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../context/UserContext";

function UserHome() {
  const { userInfo, navigate } = useContext(UserContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (userInfo == undefined) {
      navigate("/");
    }
  });

  return (
    <div className="flex flex-col min-h-screen w-screen md:mb-4 md:pt-2">
      <div className="grid md:grid-cols-3 grid-row-1 w-screen h-screen">
        {[
          { style: Schedule, title: "Schedule a Workout", color: `white` },
          { style: Track, title: "Track Your Progress", color: `red-600` },
          {
            style: ClassWork,
            title: "Join Group Classes",
            color: `orange-500`,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 * index }}
            className="mx-3 sm:mx-1 flex flex-col items-center justify-center bg-center h-screen rounded-xl overflow-hidden group transition-transform transform sm::my-0 my-1"
            style={{
              backgroundImage: `url(${item.style})`,
              backgroundSize: "cover",
            }}
          >
            <div className="bg-black bg-opacity-50 p-4 h-screen flex flex-col justify-center rounded-xl transition-all ease-in-out duration-300 group-hover:bg-opacity-25 ">
              <h2 className={`text-2xl font-bold mb-4 text-${item.color}`}>
                {item.title}
              </h2>
              <p className="text-white mb-4">
                {index === 0
                  ? "Plan your fitness journey by scheduling personalized workouts. Choose the date, time, and type of exercise for a tailored experience."
                  : index === 1
                  ? "Monitor your fitness progress with advanced tracking features. Record your workouts, set goals, and track achievements to stay motivated."
                  : "Engage in our vibrant community by joining group fitness classes. From yoga to high-intensity workouts, find the perfect class to energize your fitness routine."}
              </p>
              {index === 0 ? (
                <Link to={"/schedule"} className="justify-self-end w-40">
                  <button className="bg-white w-40 text-purple-1000 px-4 py-2 rounded-md hover:bg-purple-1000 hover:text-white transition-all ease-in-out">
                    Schedule Now
                  </button>
                </Link>
              ) : index === 1 ? (
                <Link to={"/workout"} className="justify-self-end w-40">
                  <button className="bg-white w-40 text-red-700 px-4 py-2 rounded-md hover:bg-red-700 hover:text-white transition-all ease-in-out">
                    Start Tracking
                  </button>
                </Link>
              ) : (
                <Link to={"/classes"} className="justify-self-end w-40">
                  <button className="bg-white w-40 text-orange-1000 px-4 py-2 rounded-md hover:bg-orange-1000 hover:text-white transition-all ease-in-out">
                    Join Now
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="fixed bottom-8 right-8">
        <button
          onClick={handleOpenModal}
          className="px-6 py-3 bg-orange-1000 rounded-md hover:bg-orange-400 focus:bg-orange-600 transition-all ease-in-out text-white text-3xl"
        >
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent z-50 bg-repeat"
        overlayClassName="overlay fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center h-screen w-screen bg-repeat"
        contentLabel="Add Event Modal"
      >
        <Profile handleCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
}

export default UserHome;
