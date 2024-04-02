import React, { useState, useContext, useMemo, useEffect } from "react";
import "../../Tools/PlanCalendar/Calendar.css";
import { motion, AnimatePresence } from "framer-motion";
import { EventContext } from "../../../context/eventContext";
import { Calendar as RBCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaTimes, FaEdit, FaCheck } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
Modal.setAppElement("#root");
import { IoIosArrowForward } from "react-icons/io";
const letters = "0123456789ABCDEF";
import { IoRemoveOutline } from "react-icons/io5";
import { UserContext } from "../../../context/UserContext";

const getRandomColor = () => {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Schedule = () => {
  const { createEvent, deleteEvent, editEvent } = useContext(EventContext);
  const { userInfo, setUserInfo, navigate } = useContext(UserContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [events, setEvents] = useState();
  const [specEvent, setSpecEvent] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    color: "",
    userId: "",
    _id: "",
  });

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start: new Date(),
    end: new Date(),
    color: getRandomColor(),
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [edit, setEdit] = useState(false);
  const { views, ...otherProps } = useMemo(
    () => ({
      views: {
        month: true,
        day: true,
      },
    }),
    []
  );

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        border: "2px solid black",
        borderRadius: "0px",
        color: "#ffffff",
        padding: "10px",
        cursor: "pointer",
        transition: "background 0.3s ease, transform 0.3s ease",
      },
    };
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSpecEvent({
      title: "",
      description: "",
      start: "",
      end: "",
      color: "",
      userId: "",
      _id: "",
    });
    setEdit(false);
  };

  function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const userId = userInfo._id;
    const { title, description, start, end, color } = newEvent;
    try {
      await createEvent({ title, description, start, end, color, userId });
      setModalIsOpen(false);
      toast.success("You have created a new event")
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();
    try {
      await editEvent({
        title: specEvent.title,
        description: specEvent.description,
        start: specEvent.start,
        end: specEvent.end,
        color: specEvent.color,
        _id: specEvent._id,
      });
      setModalIsOpen(false);
      toast.success("Event successfully edited")
    } catch (err) {
      console.error("Edit user failed", err);
    }
  };

  const handleDeleteEvent = async (e) => {
    e.preventDefault();
    try {
      await deleteEvent(specEvent._id);
      setModalIsOpen(false);
      toast.success("You have deleted the event")
    } catch (err) {
      console.log(err);
    }
  };

  const handlespecEvent = (event) => {
    setSpecEvent(event);
    handleOpenModal();
  };

  const enableEdit = () => {
    setEdit(true);
  };

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map((ev) =>
      ev === event ? { ...ev, start, end } : ev
    );

    setUserInfo({ ...userInfo, events: updatedEvents });

    setEvents(updatedEvents);
  };

  const filteredEvents = userInfo.events?.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moment(event.start).format("YYYY-MM-DD").includes(searchTerm)
  );

  useEffect(() => {
    if (userInfo == undefined) {
      navigate("/");
    }
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gray-100 p-8 pt-20"
      >
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-purple-1000 w-screen flex justify-center"
          >
            Schedule everything you need for yourself
          </motion.h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <RBCalendar
              localizer={localizer}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handlespecEvent}
              onEventDrop={handleEventDrop}
              eventPropGetter={eventStyleGetter}
              views={views}
            />
          </motion.div>
          <motion.div className="h-fit py-4 px-2 bg-dark-blue rounded-lg">
            <h2 className="text-3xl font-light mb-4 text-white">Events</h2>
            <ul
              id="myEventList"
              className="list-none max-h-screen overflow-y-scroll"
            >
              {userInfo.events?.map((event, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: parseFloat(0.3 * (event.id || index)) }}
                  className="flex justify-between items-center mb-2 p-4 border-gray-400 hover:bg-gray-950 border-b-1 border-t-1 transition-all ease-in-out cursor-pointer"
                  onClick={() => handlespecEvent(event)}
                >
                  <div className="flex">
                    <div className="text-white pl-2 pr-8 flex items-center">
                      <div>
                        <div className="text-3xl font-bold text-orange-1000">
                          {moment(event.start).format("D")}
                        </div>
                        <div className="flex flex-col text-xs font-light">
                          <p>
                            {moment(event.start).format("MMM")}-
                            {moment(event.start).format("YYYY")}
                          </p>
                        </div>
                      </div>
                      <IoRemoveOutline className="mr-3" />
                      <div>
                        <div className="text-3xl font-bold text-orange-1000">
                          {moment(event.end).format("D")}
                        </div>
                        <div className="flex flex-col text-xs font-light">
                          <span>
                            {moment(event.end).format("MMM")}-
                            {moment(event.end).format("YYYY")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-white flex flex-col justify-center items-baseline">
                      <span className="text-3xl font-light">{event.title}</span>
                      <span className="font-extralight">
                        {event.description}
                      </span>
                    </div>
                  </div>
                  <IoIosArrowForward className="text-white font-extralight text-6xl hover:text-rose-500 transition-all ease-in-out" />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent z-50 bg-repeat"
          overlayClassName="overlay fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center h-screen w-screen bg-repeat"
          contentLabel="Add Event Modal"
        >
          <AnimatePresence>
            {edit ? (
              <motion.div
                key="edit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col justify-center text-center items-center space-y-4 bg-dark-blue p-4 rounded-xl"
              >
                <label className="text-lg text-white flex flex-col">
                  Title:
                  <input
                    type="text"
                    defaultValue={specEvent.title}
                    onChange={(e) =>
                      setSpecEvent({ ...specEvent, title: e.target.value })
                    }
                    className="border border-gray-300 p-2 rounded-md bg-white text-gray-800 focus:outline-none hover:bg-opacity-80 focus:bg-opacity-50 focus:border-purple-500 transition-all ease-in-out"
                    required
                  />
                </label>
                <label className="text-lg text-white flex flex-col">
                  <span>Description:</span>
                  <textarea
                    type=""
                    defaultValue={specEvent.description}
                    onChange={(e) => {
                      setSpecEvent({
                        ...specEvent,
                        description: e.target.value,
                      });
                    }}
                    className="border border-gray-300 p-2 rounded-md bg-white text-gray-800 focus:outline-none hover:bg-opacity-80 focus:bg-opacity-50 focus:border-purple-500 transition-all ease-in-out "
                  />
                </label>
                <label className="text-lg text-white items-center space-x-2 flex  flex-col">
                  <span>Date:</span>
                  <input
                    type="datetime-local"
                    defaultValue={moment(specEvent.start).format(
                      "YYYY-MM-DDTHH:mm"
                    )}
                    onChange={(e) =>
                      setSpecEvent({
                        ...specEvent,
                        start: e.target.value,
                      })
                    }
                    className="border border-gray-300 p-2 rounded-md bg-white text-gray-800 focus:outline-none hover:bg-opacity-80 focus:bg-opacity-50 focus:border-purple-500 transition-all ease-in-out"
                  />
                  <span>to</span>
                  <input
                    type="datetime-local"
                    defaultValue={moment(specEvent.end).format(
                      "YYYY-MM-DDTHH:mm"
                    )}
                    onChange={(e) =>
                      setSpecEvent({
                        ...specEvent,
                        end: e.target.value,
                      })
                    }
                    className="border border-gray-300 p-2 rounded-md bg-white text-gray-800 focus:outline-none hover:bg-opacity-80 focus:bg-opacity-50 focus:border-purple-500 transition-all ease-in-out"
                  />
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={handleEditEvent}
                    className="bg-purple-700 text-white p-3 rounded-full text-3xl hover:bg-purple-800 focus:outline-none focus:bg-purple-800 transition-colors ease-in-out hover:text-opacity-60"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="bg-orange-1000 text-white p-3 rounded-full text-3xl hover:bg-orange-600 focus:outline-none focus:bg-orange-800 transition-colors ease-in-out hover:text-opacity-60"
                  >
                    <FaTimes />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col rounded-xl p-8 text-white w-full max-w-md mx-auto bg-dark-blue"
              >
                {specEvent.title.length > 2 ? (
                  <>
                    <div className="bg-dark-blue xs:w-80 rounded-xl text-white flex justify-between">
                      <div className="bg-dark-blue xs:w-80 rounded-xl text-white">
                        <div className="h-full flex flex-col justify-evenly items-start w-full pl-3">
                          <div className="text-center flex w-1/3 justify-evenly items-center">
                            <p className="text-3xl font-bold text-rose-600 mb-1">
                              {moment(specEvent.start).format("D")}
                            </p>
                            <div className="flex flex-col justify-center items-start ml-3">
                              <p className="text-lg font-light text-gray-500">
                                {moment(specEvent.start).format("MMM")}
                              </p>
                              <p className="font-light">
                                {moment(specEvent.start).format("YYYY")}
                              </p>
                            </div>
                          </div>
                          <span className="w-20 border-1 border-rose-500 "></span>
                          <div className="text-center flex w-1/3 justify-evenly items-center">
                            <p className="text-3xl font-bold text-rose-600 mb-1">
                              {moment(specEvent.end).format("D")}
                            </p>
                            <div className="flex flex-col justify-center items-start ml-3">
                              <p className="text-lg font-light ">
                                {moment(specEvent.end).format("MMM")}
                              </p>
                              <p className="font-light">
                                {moment(specEvent.end).format("YYYY")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="w-full flex flex-col items-start font-light">
                          <h2 className="text-4xl font-light mb-6 text-center text-rose-600">
                            {specEvent.title}
                          </h2>
                          <div className="mb-4 font-normal">
                            <p
                              id="allEvents"
                              className="mb-2 text-white h-fit overflow-y-scroll"
                            >
                              {specEvent.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-evenly mt-4 w-full">
                          <button
                            className="bg-purple-700 text-white p-2 rounded-full text-2xl hover:bg-purple-800 focus:outline-none focus:bg-purple-800 transition-colors ease-in-out hover:text-opacity-60"
                            onClick={enableEdit}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={handleCloseModal}
                            className="bg-orange-1000 text-white p-2 rounded-full text-2xl hover:bg-orange-600 focus:outline-none focus:bg-orange-800 transition-colors ease-in-out hover:text-opacity-60"
                          >
                            <FaTimes />
                          </button>
                          <button
                            className="bg-rose-700 text-white p-2 rounded-full text-2xl hover:bg-rose-800 focus:outline-none focus:bg-red-800 transition-colors ease-in-out hover:text-opacity-60"
                            onClick={handleDeleteEvent}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-6 text-center text-white">
                      Schedule A Workout
                    </h2>
                    <input
                      type="text"
                      placeholder="Workout Title"
                      value={newEvent.title}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                      }
                      className="mb-4 p-4 border rounded focus:outline-none focus:border-gray-300 text-gray-800"
                    />
                    <textarea
                      placeholder="Workout Description"
                      value={newEvent.description}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          description: e.target.value,
                        })
                      }
                      className="mb-4 p-4 border rounded focus:outline-none focus:border-gray-300 text-gray-800"
                    />
                    <label className="mb-2 text-white">Workout Time:</label>
                    <div className="flex flex-col md:flex-row mb-6">
                      <input
                        type="datetime-local"
                        value={moment(newEvent.start).format(
                          "YYYY-MM-DDTHH:mm"
                        )}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            start: new Date(e.target.value),
                          })
                        }
                        className="mb-2 md:mb-0 md:mr-2 p-4 border rounded focus:outline-none focus:border-gray-500 text-gray-800"
                      />
                      <span className="text-gray-800 md:hidden block mb-2">
                        to
                      </span>
                      <input
                        type="datetime-local"
                        value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            end: new Date(e.target.value),
                          })
                        }
                        className="p-4 border rounded focus:outline-none focus:border-gray-500 text-gray-800"
                      />
                    </div>
                    <label className="mb-2 text-white">Event Color:</label>
                    <input
                      type="color"
                      value={newEvent.color}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, color: e.target.value })
                      }
                      className="mb-4 p-2 border rounded focus:outline-none focus:border-gray-500"
                    />
                    <div className="mb-4">
                      <label className="text-white mr-4">
                        Recurring Event:
                      </label>
                      <input
                        type="checkbox"
                        checked={newEvent.recurring}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            recurring: e.target.checked,
                          })
                        }
                      />
                    </div>
                    <button
                      onClick={handleCreateEvent}
                      className="bg-gray-700 text-white p-4 rounded hover:bg-gray-800 focus:outline-none focus:bg-gray-800 transition-colors ease-in-out mb-3"
                    >
                      Add Event
                    </button>
                    <button
                      onClick={handleCloseModal}
                      className="bg-orange-1000 text-white p-3 rounded text-xl hover:bg-orange-600 focus:outline-none focus:bg-orange-800 transition-colors ease-in-out hover:text-opacity-60"
                    >
                      Close
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Modal>

        <div className="fixed bottom-8 right-8">
          <button
            onClick={handleOpenModal}
            className="px-6 py-3 bg-orange-1000 rounded-md hover:bg-orange-400 focus:bg-orange-600 transition-all ease-in-out text-white text-3xl font-extrabold"
          >
            +
          </button>
        </div>
      </motion.div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
      />
    </>
  );
};

export default Schedule;
