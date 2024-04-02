import React, { useState, useContext, useEffect } from "react";
import { WorkoutContext } from "../../../context/WorkoutContext";
import { ExecContext } from "../../../context/execContext";
import { UserContext } from "../../../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
Modal.setAppElement("#root");
import ModalBackground from "../../../assets/svg/WorkoutModalBackground.svg";
import { IoIosClose, IoIosAdd } from "react-icons/io";
import { LocalContext } from "../../../context/LocalContext";
import { css } from "@emotion/react";
import { ScaleLoader } from "react-spinners";

const ProgressTracking = () => {
  const { createExec, deleteExec, getAllExec } = useContext(ExecContext);
  const { createWorkout, deleteWorkout } = useContext(WorkoutContext);
  const { userInfo, navigate } = useContext(UserContext);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [specExec, setSpecExec] = useState();
  const [name, setName] = useState("");
  const [volume1, setVolume1] = useState("");
  const [volume2, setVolume2] = useState("");
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedWorkoutHistory, setSelectedWorkoutHistory] = useState([]);
  const { update } = useContext(LocalContext);
  const [loading, setLoading] = useState(true);

  const handleCreateExec = async (e) => {
    e.preventDefault();
    try {
      const userId = userInfo?._id;
      await createExec({ name, userId });
      setName("");
      getAllExec();
      update();
      toast.success("You have created the excercise")
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteExec = async (e, itemId) => {
    e.preventDefault();
    try {
      if (itemId) {
        await deleteExec(itemId);
        update();
      }
      toast.success("You have deleted the excercise")
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllExec();
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleCreateWorkout = async (e) => {
    e.preventDefault();
    try {
      const execId = specExec._id;
      await createWorkout({
        type1,
        volume1,
        type2,
        volume2,
        execId,
      });
      setType1("");
      setType2("");
      setVolume1("");
      setVolume2("");
      toast.success("You have created a new workout entery")
    } catch (err) {
      console.error("Error creating workout", err);
    }
  };

  const handleDeleteWorkout = async (itemId) => {
    try {
      await deleteWorkout(itemId);
      toast.success("You have deleted the wrokout")
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenModal = (workout) => {
    setSpecExec(workout);
    setSelectedWorkoutHistory(workout.workouts);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedWorkout(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (userInfo == undefined) {
      navigate("/");
    }
  });

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <ScaleLoader
            height={50}
            width={10}
            color="#FFA500"
            loading={loading}
          />
        </div>
      ) : (
        <div className="min-h-screen mx-auto p-4 max-w-screen-md pt-20">
          <h2 className="text-4xl font-bold mb-8 text-orange-1000">
            Progress Tracking
          </h2>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Your Exercises</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userInfo.exercises.map((item, index) => (
                <motion.li
                  key={index}
                  onClick={() => handleOpenModal(item)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.01 * index }}
                  className="group p-6 border border-gray-300 rounded-lg transition-transform transform cursor-pointer relative hover:shadow-md"
                >
                  <span className="text-lg font-semibold text-gray-700">
                    {item.name}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteExec(e, item._id);
                    }}
                    className="text-red-500 hover:text-red-700 absolute top-2 right-2 hidden group-hover:block text-4xl"
                  >
                    <IoIosClose />
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            className="flex items-center mb-8"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter workout name"
              className="input-field border-b-2 border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:ring focus:border-orange-300"
            />
            <button
              onClick={handleCreateExec}
              className="text-white bg-orange-1000 rounded-full px-2 py-2 hover:bg-orange-500 focus:outline-none focus:ring focus:border-orange-300 transition-colors ease-in-out ml text-4xl m-2"
            >
              <IoIosAdd />
            </button>
          </motion.div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-screen flex justify-center items-center "
            overlayClassName="overlay fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center h-screen w-screen"
          >
            <AnimatePresence>
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="p-6 rounded-lg shadow-lg bg-dark-blue xs:w-fit w-screen"
              >
                <form
                  onSubmit={handleCreateWorkout}
                  className="grid grid-cols-1 gap-4"
                >
                  <div className="mb-4">
                    <label
                      htmlFor="exercise"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Exercise:
                    </label>
                    {specExec && (
                      <div className="text-3xl uppercase font-semibold text-rose-500">
                        {specExec.name}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="weight"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      <input
                        className="p-1 text-lg bg-transparent text-white border-b-2 border-rose-500"
                        value={type1}
                        onChange={(e) => setType1(e.target.value)}
                        type="text"
                        placeholder="Enter Type"
                      />
                    </label>
                    <input
                      id="weight"
                      value={volume1}
                      onChange={(e) => setVolume1(e.target.value)}
                      type="text"
                      placeholder="Enter Volume"
                      className="input-field border-b-2 border-gray-600 px-4 py-2 rounded focus:outline-none focus:ring focus:border-orange-300"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="reps"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      <input
                        value={type2}
                        onChange={(e) => setType2(e.target.value)}
                        type="text"
                        placeholder="Enter Type"
                        className="p-1 text-lg bg-transparent text-white border-b-2 border-rose-500"
                      />
                    </label>
                    <input
                      id="reps"
                      value={volume2}
                      onChange={(e) => setVolume2(e.target.value)}
                      placeholder="Enter Volume"
                      type="text"
                      className="input-field border-b-2 border-gray-600 px-4 py-2 rounded focus:outline-none focus:ring focus:border-orange-300"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-rose-500 text-white py-2 px-4 rounded hover:bg-rose-700 focus:outline-none focus:ring focus:border-purple-300 transition-colors ease-in-out"
                  >
                    Add Workout
                  </button>
                </form>

                <div id="workoutScroll" className="mt-8 h-32 overflow-y-scroll">
                  <h3 className="text-2xl font-bold mb-4 text-gray-200">
                    Workout History
                  </h3>
                  {selectedWorkoutHistory.map((entry, index) => (
                    <table
                      key={index}
                      className="table-auto w-full border-b-2 border-collapse bg-slate-300 bg-opacity-50"
                    >
                      <thead>
                        <tr>
                          <th className="border-b-2 px-4 py-2">
                            {entry.type1}
                          </th>
                          <th className="border-b-2 px-4 py-2">
                            {entry.type2}
                          </th>
                          <th className="border-b-2 px-4 py-2">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-slate-300 bg-opacity-20">
                        <tr key={index}>
                          <td className="border-b-2 px-4 py-2 text-gray-700">
                            {entry.volume1}
                          </td>
                          <td className="border-b-2 px-4 py-2 text-gray-700">
                            {entry.volume2}
                          </td>
                          <td className="border-b-2 px-4 py-2 text-gray-700">
                            {new Date(entry.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <button
                              onClick={() => handleDeleteWorkout(entry._id)}
                              className="bg-red-600 hover:bg-red-500 rounded-full text-4xl m-1 transition-colors ease-in-out"
                            >
                              <IoIosClose />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
                </div>
                <button
                  onClickCapture={handleCloseModal}
                  className="bg-red-600 text-white mt-3 text-4xl rounded-full hover:bg-red-800 focus:bg-red-900 transition-colors ease-in-out"
                >
                  <IoIosClose />
                </button>
              </motion.div>
            </AnimatePresence>
          </Modal>

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
          />
        </div>
      )}
    </>
  );
};

export default ProgressTracking;
