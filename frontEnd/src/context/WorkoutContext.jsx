import axios from "axios";
import { createContext, useContext, useState } from "react";
import { LocalContext } from "./LocalContext";

const WorkoutContext = createContext();

axios.defaults.withCredentials = true;

const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const { update } = useContext(LocalContext);

  const getAllWorkout = async () => {
    try {
      const allWorkouts = await axios.get(
        `${import.meta.env.VITE_FRONTEND}/workout`
      );
      setWorkouts([allWorkouts]);
    } catch (err) {
      console.log(err);
    }
  };

  const createWorkout = async (newWorkout) => {
    try {
      const pushWorkout = await axios.post(
        `${import.meta.env.VITE_FRONTEND}/workout/create`,
        newWorkout
      );
      const createdWorkout = pushWorkout.data;
      setWorkouts([...workouts, createdWorkout]);
      getAllWorkout();
      update();
      return createdWorkout;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const deleteWorkout = async (workout) => {
    try {
      await axios.delete(`${import.meta.env.VITE_FRONTEND}/workout/${workout}`);
      getAllWorkout();
      update();
    } catch (err) {
      console.log(err);
    }
  };

  const contextValues = { createWorkout, deleteWorkout };

  return (
    <WorkoutContext.Provider value={contextValues}>
      {children}
    </WorkoutContext.Provider>
  );
};

export { WorkoutContext, WorkoutProvider };
