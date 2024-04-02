import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { LocalContext } from "./LocalContext";

const ClassContext = createContext();

axios.defaults.withCredentials = true;

const ClassProvider = ({ children }) => {
  const [classList, setClassList] = useState([]);
  const { update } = useContext(LocalContext);

  const joinClass = async (joinedClass) => {
    const userId = joinedClass.userId;
    try {
      await axios.post(
        `${import.meta.env.VITE_FRONTEND}/class/${
          joinedClass.classId
        }/${userId}`
      );
      getAllClass();
      update();
    } catch (err) {
      console.error(err);
    }
  };

  const leaveClass = async (classToLeave) => {
    const { classId, userId } = classToLeave;
    try {
      await axios.delete(
        `${import.meta.env.VITE_FRONTEND}/class/${classId}/${userId}`
      );
      getAllClass();
      update();
    } catch (err) {
      console.error(err);
    }
  };

  const getAllClass = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_FRONTEND}/class`
      );
      setClassList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClassRemove = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_FRONTEND}/class/remove`);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchClassRemove();

    const interval = setInterval(fetchClassRemove, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const contextValues = {
    joinClass,
    leaveClass,
    classList,
    setClassList,
    getAllClass,
  };

  return (
    <ClassContext.Provider value={contextValues}>
      {children}
    </ClassContext.Provider>
  );
};

export { ClassContext, ClassProvider };
