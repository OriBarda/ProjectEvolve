import axios from "axios";
import { createContext, useContext, useState } from "react";
import { LocalContext } from "./LocalContext";

const ExecContext = createContext();

axios.defaults.withCredentials = true;

const ExecProvider = ({ children }) => {
  
  const [exec, setExec] = useState([]);
  const { update } = useContext(LocalContext);

  const createExec = async (newExec) => {
    try {
      await axios.post(`${import.meta.env.VITE_FRONTEND}/exec/`, newExec);
      update();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteExec = async (deletedExecId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_FRONTEND}/exec/${deletedExecId}`
      );
      update();
    } catch (err) {
      console.error(err);
    }
  };

  const getAllExec = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_FRONTEND}/exec`);
      update();
      setExec(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const contextValues = { createExec, deleteExec, exec, setExec, getAllExec };

  return (
    <ExecContext.Provider value={contextValues}>
      {children}
    </ExecContext.Provider>
  );
};

export { ExecContext, ExecProvider };
