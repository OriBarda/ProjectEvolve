import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const LocalContext = createContext();

const LocalProvider = ({ children }) => {
  const [updated, setUpdated] = useState(null);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [createdUser, setCreadtedUser] = useState();
  const navigate = useNavigate();
  const update = () => {
    setUpdated((prevUpdated) => !prevUpdated);
  };
  const contextValues = {
    isSignUpMode,
    setIsSignUpMode,
    selectedPlan,
    setSelectedPlan,
    navigate,
    updated,
    setUpdated,
    update,
    createdUser,
    setCreadtedUser,
  };

  return (
    <LocalContext.Provider value={contextValues}>
      {children}
    </LocalContext.Provider>
  );
};

export { LocalContext, LocalProvider };
