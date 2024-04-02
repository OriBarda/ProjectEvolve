import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalContext } from "./LocalContext";

const UserContext = createContext();

axios.defaults.withCredentials = true;

const UserProvider = ({ children }) => {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const { update } = useContext(LocalContext);

  const createUser = async (newUser) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_FRONTEND}/users/signup`,
        newUser
      );
      return response.data;
    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
  };

  const logInUser = async (user) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_FRONTEND}/users/login`,
        user
      );
      setUserInfo(response.data);
      navigate("/member");
    } catch (err) {
      console.log(err);
    }
  };

  const logOutUser = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_FRONTEND}/users/`);
      setUserInfo(undefined);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const editUser = async (editedUser) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_FRONTEND}/users/${userInfo._id}`,
        editedUser
      );
      update();
      setUserInfo(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (deletedUser) => {
    const user = deletedUser;
    try {
      await axios.delete(`${import.meta.env.VITE_FRONTEND}/users/${user}`);
      update();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const contextValues = {
    //v
    userInfo,
    setUserInfo,
    navigate,
    //a
    createUser,
    logOutUser,
    logInUser,
    editUser,
    deleteUser,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
