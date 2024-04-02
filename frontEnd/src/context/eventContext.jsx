import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { LocalContext } from "./LocalContext";

const EventContext = createContext();

axios.defaults.withCredentials = true;

const EventProvider = ({ children }) => {

  const [event, setEvent] = useState([]);
  const { setUserInfo } = useContext(UserContext);
  const { update } = useContext(LocalContext);

  const createEvent = async (newEvent) => {
    try {
      await axios.post(`${import.meta.env.VITE_FRONTEND}/event`, newEvent);
      getAllEvent();
      update();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEvent = async (deletedEvent) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_FRONTEND}/event/${deletedEvent}`
      );
      getAllEvent();
      update();
    } catch (err) {
      console.error(err);
    }
  };

  const editEvent = async (editedEvent) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_FRONTEND}/event/${editedEvent._id}`,
        editedEvent
      );

      const editedEventData = response.data;

      await setUserInfo((prevUserInfo) => {
        const updatedEvents = prevUserInfo.events.map((event) =>
          event._id === editedEventData._id ? editedEventData : event
        );

        update();
        return {
          ...prevUserInfo,
          events: updatedEvents,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getAllEvent = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_FRONTEND}/event`
      );
      setEvent(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const contextValues = {
    createEvent,
    deleteEvent,
    event,
    setEvent,
    getAllEvent,
    editEvent,
  };

  return (
    <EventContext.Provider value={contextValues}>
      {children}
    </EventContext.Provider>
  );
};

export { EventContext, EventProvider };
