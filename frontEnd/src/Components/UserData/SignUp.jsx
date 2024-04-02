import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { LocalContext } from "../../context/LocalContext";
import SignUpImg from "../../assets/HomePageGraphic.png";
import LogInImg from "../../assets/BenefitsPageGraphic.png";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEnvelope,
  faBirthdayCake,
} from "@fortawesome/free-solid-svg-icons";
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const { logInUser } = useContext(UserContext);
  const {
    setIsSignUpMode,
    isSignUpMode,
    createdUser,
    setCreadtedUser,
    navigate,
  } = useContext(LocalContext);
  const [signUp, setSignUp] = useState({
    username: "",
    password: "",
    email: "",
    birthday: "",
  });
  const [logIn, setLogIn] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await logInUser(logIn);
      toast.success("User logged in successfully");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await setCreadtedUser(signUp); 
      navigate("/payment");
      toast.success("User created successfully");
    } catch (error) {
      console.error("Sign up failed", error);
    }
  };
  

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  return (
    <div className="pt-12">
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className={`container ${isSignUpMode ? "sign-up-mode" : ""} h-screen`}
      >
        <div className="overflow-hidden forms-container font-extrabold ">
          <div className="overflow-hidden signin-signup" id="login">
            {/* log in section */}
            <form
              onSubmit={handleLogin}
              className="overflow-hidden sign-in-form"
            >
              <h2 className="overflow-hidden title">Sign in</h2>
              <div className="overflow-hidden input-field">
                <i className="overflow-hidden fas fa-user">
                  <FontAwesomeIcon icon={faUser} />
                </i>
                <input
                  placeholder="Username"
                  autoComplete="current-username"
                  type="text"
                  value={logIn.username}
                  onChange={(e) =>
                    setLogIn({ ...logIn, username: e.target.value })
                  }
                />
              </div>
              <div className="overflow-hidden input-field">
                <i className="overflow-hidden fas fa-lock">
                  <FontAwesomeIcon icon={faLock} />
                </i>
                <input
                  placeholder="Password"
                  type="password"
                  value={logIn.password}
                  onChange={(e) =>
                    setLogIn({ ...logIn, password: e.target.value })
                  }
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                value="Login"
                className="overflow-hidden btn solid"
              >
                Log In
              </button>
              <p className="overflow-hidden social-text">
                Or Sign in with social platforms
              </p>
              <div className="overflow-hidden social-media">
                <a href="#" className="overflow-hidden social-icon">
                  <i className="overflow-hidden fab fa-facebook-f">
                    <FaGithub className="overflow-hidden text-2xl" />
                  </i>
                </a>
                <a href="#" className="overflow-hidden social-icon">
                  <i className="overflow-hidden fab fa-twitter">
                    <FaEnvelope />
                  </i>
                </a>
                <a href="#" className="overflow-hidden social-icon">
                  <i className="overflow-hidden fab fa-google">
                    <FaInstagram className="overflow-hidden text-2xl" />
                  </i>
                </a>
                <a href="#" className="overflow-hidden social-icon">
                  <i className="overflow-hidden fab fa-linkedin-in">
                    <FaLinkedin className="overflow-hidden text-2xl" />
                  </i>
                </a>
              </div>
            </form>
            {/* sign in end */}
            {/* sign up section */}
            <form
              onSubmit={handleSignUp}
              className="overflow-hidden sign-up-form"
            >
              <h2 className="overflow-hidden title">Sign up</h2>
              <div className="overflow-hidden input-field">
                <i className="overflow-hidden fas fa-user">
                  <FontAwesomeIcon icon={faUser} />
                </i>
                <input
                  type="text"
                  value={signUp.username}
                  onChange={(e) =>
                    setSignUp({ ...signUp, username: e.target.value })
                  }
                  placeholder="Username"
                  autoComplete="current-username"
                />
              </div>
              <div className="overflow-hidden input-field">
                <i className="overflow-hidden fas fa-lock">
                  <FontAwesomeIcon icon={faLock} />
                </i>
                <input
                  type="password"
                  value={signUp.password}
                  onChange={(e) =>
                    setSignUp({ ...signUp, password: e.target.value })
                  }
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </div>
              <div className="overflow-hidden input-field">
                <i className="overflow-hidden fas fa-envelope">
                  <FontAwesomeIcon icon={faEnvelope} />
                </i>
                <input
                  type="email"
                  value={signUp.email}
                  onChange={(e) =>
                    setSignUp({ ...signUp, email: e.target.value })
                  }
                  placeholder="Email"
                />
              </div>
              <div className="overflow-hidden input-field">
                <i className="overflow-hidden fas fa-lock">
                  <FontAwesomeIcon icon={faBirthdayCake} />
                </i>
                <input
                  type="date"
                  value={signUp.birthday}
                  onChange={(e) =>
                    setSignUp({ ...signUp, birthday: e.target.value })
                  }
                  placeholder="Birthday"
                />
              </div>
              <input
                type="submit"
                className="overflow-hidden btn"
                value="Sign up"
              />
              <p className="overflow-hidden social-text">
                Or Sign up with social platforms
              </p>
              <div className="overflow-hidden social-media">
                <a href="#" className="overflow-hidden social-icon">
                  <i className="overflow-hidden fab fa-facebook-f">
                    <FaGithub className="overflow-hidden text-2xl" />
                  </i>
                </a>
                <a href="#" className="overflow-hidden social-icon">
                  <i className="overflow-hidden fab fa-twitter">
                    <FaEnvelope />
                  </i>
                </a>
                <a href="#" className="overflow-hidden social-icon">
                  <i className="overflow-hidden fab fa-google">
                    <FaInstagram className="overflow-hidden text-2xl" />
                  </i>
                </a>
                <a href="#" className="overflow-hidden social-icon">
                  <i className="overflow-hidden fab fa-linkedin-in">
                    <FaLinkedin className="overflow-hidden text-2xl" />
                  </i>
                </a>
              </div>
            </form>
          </div>
        </div>
        {/* sign up end */}
        {/* transition */}
        <div className="overflow-hidden panels-container">
          <div className="overflow-hidden panel left-panel">
            <div className="overflow-hidden content">
              <h3>New here ?</h3>
              <p>
                Join us and embark on a journey to a healthier you today.
                Discover a world of wellness, fitness, and vitality that will
                transform your life.
              </p>
              <button
                className="overflow-hidden btn  hover:bg-white bg-orange-500 hover:text-orange-500 transition-all ease-in-out focus:border-orange-500 focus:border-2 "
                id="sign-up-btn"
                onClick={handleSignUpClick}
              >
                Sign up
              </button>
            </div>
            <img src={LogInImg} className="overflow-hidden image" alt="" />
          </div>
          <div className="overflow-hidden panel right-panel">
            <div className="overflow-hidden content">
              <h3>Already A Member?</h3>
              <p>
                If you're already part of our community, welcome back! We're
                here to support your journey towards a healthier you.
              </p>
              <button
                className="overflow-hidden btn  hover:bg-white hover:text-orange-500 transition-all ease-in-out focus:border-orange-500 focus:border-2"
                id="sign-in-btn"
                onClick={handleSignInClick}
              >
                Sign In
              </button>
            </div>
            <img src={SignUpImg} className="overflow-hidden image" alt="" />
          </div>
        </div>
        {/* transitions end */}
      </motion.div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
      />
    </div>
  );
}
export default SignUp;
