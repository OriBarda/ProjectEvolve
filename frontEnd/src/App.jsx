import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/Tools/NavBar/NavBar";
import UserHome from "./Components/Pages/Home/UserHome";
import WorkOut from "./Components/Pages/Member/Workout";
import Classes from "./Components/Pages/Member/Classes";
import Schedule from "./Components/Pages/Member/Schedule";
import SignUp from "./Components/UserData/SignUp";
import Payment from "./Components/UserData/Payment";
import Footer from "./Components/Tools/Footer";
import Profile from "./Components/UserData/Profile";
import Help from "./Components/Pages/Info/Help";
import About from "./Components/Pages/Info/About";
import Plan from "./Components/Tools/Plans";
import Home from "./Components/Pages/Home/Home";
import Service from "./Components/Pages/Plans/Service";
import axios from "axios";
import ScrollToTop from "./Components/Tools/ScrollToTop";
import { UserContext } from "./context/UserContext";
import { LocalContext } from "./context/LocalContext";
axios.defaults.withCredentials = true;

function App() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const { updated } = useContext(LocalContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_FRONTEND}/users/${userInfo?._id}`
        );
        setUserInfo(res.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (userInfo?._id) {
      fetchData();
    }
  }, [updated]);

  useEffect(() => {
    const aut = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_FRONTEND}/users/authenticate`
        );
        setUserInfo(res.data);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    aut();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="/*"
          element={
            <ScrollToTop>
              <Routes>
                <Route path="/service" element={<Service />} />
                <Route path="/Plans" element={<Plan />} />
                <Route path="/" element={<Home />} />
                <Route path="/member" element={<UserHome />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
                <Route path="/workout" element={<WorkOut />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/classes" element={<Classes />} />
              </Routes>
            </ScrollToTop>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
