import React, { useEffect, useContext, useState } from "react";
import { LocalContext } from "../../../context/LocalContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Plans from "../../Tools/Plans";
import Reveal from "../../Tools/Reveal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCalendarAlt, FaUsers, FaRegListAlt } from "react-icons/fa";

function Home() {
  const { setIsSignUpMode } = useContext(LocalContext);
  const [display, setDisplay] = useState(true);
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);

  const Benefits = [
    {
      title: "Body Analysis",
      description:
        "Kickstart your fitness journey with a comprehensive health assessment. I utilize functional movement screenings and body composition analysis to accurately gauge your fitness level. This forms the foundation for a tailored approach to your well-being.",
      icon: `${import.meta.env.VITE_CLOUDINARY}women_j3jsns.jpg`,
    },
    {
      title: "Fitness Programs",
      description:
        "Elevate your fitness experience with customized workout routines. After assessing your fitness levels, I design programs tailored to your goals, time constraints, and budget. Let's embark on a journey where I encourage, motivate, and guide you to achieve your health and fitness aspirations.",
      icon: `${import.meta.env.VITE_CLOUDINARY}muscle_w545tq.jpg`,
    },
    {
      title: "Health and Nutrition",
      description:
        "Explore a holistic approach to well-being with personalized nutrition coaching. Together, we'll develop a sustainable meal plan that aligns with your lifestyle, creating habits that support and maximize your fitness goals. Let's revolutionize your nutritional habits.",
      icon: `${import.meta.env.VITE_CLOUDINARY}report_jbbilc.jpg`,
    },
    {
      title: "Flexibility",
      description:
        "Embrace flexibility in your fitness journey. Our programs are designed to adapt to your unique health and fitness goals. Let's work together to customize an exercise and meal plan that not only aligns with your short-term objectives but also sets the stage for long-term success.",
      icon: `${import.meta.env.VITE_CLOUDINARY}dumbbell_efovyo.jpg`,
    },
  ];

  const icons = [
    {
      icon: (
        <img
          src={`${import.meta.env.VITE_CLOUDINARY}apart1_mn7jt0`}
          alt="Apart1"
        />
      ),
      title: "Transformation Journeys",
    },
    {
      icon: (
        <img
          src={`${import.meta.env.VITE_CLOUDINARY}apart2_qyoyfq`}
          alt="Apart2"
        />
      ),
      title: "Body Sculpting Quests",
    },
    {
      icon: (
        <img
          src={`${import.meta.env.VITE_CLOUDINARY}apart3_kckf8i`}
          alt="Apart3"
        />
      ),
      title: "Cardio Adventures",
    },
    {
      icon: (
        <img
          src={`${import.meta.env.VITE_CLOUDINARY}apart4_kuixug`}
          alt="Apart4"
        />
      ),
      title: "Out Doors Training",
    },
    {
      icon: (
        <img
          src={`${import.meta.env.VITE_CLOUDINARY}apart5_ql8kti`}
          alt="Apart5"
        />
      ),
      title: "Companionship in Wellness",
    },
    {
      icon: (
        <img
          src={`${import.meta.env.VITE_CLOUDINARY}apart6_ujgptp`}
          alt="Apart6"
        />
      ),
      title: "Nutritional Compass",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 751) {
        setDisplay(true);
      } else {
        setDisplay(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.length > 0) {
      setSubmit(true);
      toast.success("Thank you we will keep in touch");
      setEmail("");
    } else {
      toast.warn("Please enter your email");
    }
  };

  return (
    <>
      <div
        id="home"
        style={{
          background: `url(${
            import.meta.env.VITE_CLOUDINARY
          }homePage_vopryd.jpg)`,
          backgroundSize: `cover`,
          backgroundRepeat: "no-repeat",
        }}
        className="w-screen min-h-screen relative flex items-center sm:justify-start justify-center"
      >
        <div className="absolute bg-black z-30 opacity-50 w-screen h-full"></div>
        <div className="relative z-40 md:w-3/4 w-full flex flex-col justify-center md:items-start items-center sm:pl-12 sm:pb-40 text-white p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{
              type: `spring`,
              stiffness: 100,
              duration: 1.2,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="w-screen h-full flex flex-col items-center justify-center"
          >
            <img
              className="absolute z-50 w-40"
              src={`${import.meta.env.VITE_CLOUDINARY}SmallLogo_gm2xpd`}
              alt="Small Logo"
            />
            <div className="relative">
              <svg
                className="w-96 opacity-70 "
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FFE1E0"
                  d="M56.5,-57.1C68.2,-44.8,69.2,-22.4,69.6,0.4C69.9,23.1,69.6,46.2,57.9,59.5C46.2,72.8,23.1,76.2,2.3,73.9C-18.6,71.6,-37.2,63.7,-52.5,50.4C-67.8,37.2,-79.9,18.6,-79.3,0.6C-78.6,-17.3,-65.3,-34.6,-49.9,-46.9C-34.6,-59.2,-17.3,-66.6,2.6,-69.2C22.4,-71.7,44.8,-69.4,56.5,-57.1Z"
                  transform="translate(100 100)"
                >
                  <animate
                    attributeName="d"
                    dur="8s"
                    values="
              M56.5,-57.1C68.2,-44.8,69.2,-22.4,69.6,0.4C69.9,23.1,69.6,46.2,57.9,59.5C46.2,72.8,23.1,76.2,2.3,73.9C-18.6,71.6,-37.2,63.7,-52.5,50.4C-67.8,37.2,-79.9,18.6,-79.3,0.6C-78.6,-17.3,-65.3,-34.6,-49.9,-46.9C-34.6,-59.2,-17.3,-66.6,2.6,-69.2C22.4,-71.7,44.8,-69.4,56.5,-57.1Z;
              M51.4,-54.7C63.8,-39,69.1,-19.5,67.4,-1.6C65.8,16.2,57.2,32.4,44.8,48.3C32.4,64.2,16.2,79.8,-2.3,82.1C-20.8,84.4,-41.6,73.4,-56.4,57.5C-71.2,41.6,-80,20.8,-78.4,1.6C-76.8,-17.6,-64.7,-35.1,-49.9,-50.9C-35.1,-66.6,-17.6,-80.5,1,-81.5C19.5,-82.5,39,-70.5,51.4,-54.7Z;
              M57.1,-57.6C67.7,-46.4,65.8,-23.2,64.2,-1.6C62.7,20.1,61.5,40.2,50.8,53.7C40.2,67.3,20.1,74.3,2,72.3C-16.1,70.3,-32.2,59.3,-43.9,45.8C-55.5,32.2,-62.8,16.1,-64.4,-1.6C-66,-19.3,-62,-38.6,-50.3,-49.9C-38.6,-61.1,-19.3,-64.1,1.9,-66.1C23.2,-68,46.4,-68.9,57.1,-57.6Z;
              M58.9,-59.2C73.8,-44,81.7,-22,81.5,-0.2C81.3,21.6,73.1,43.2,58.1,56.1C43.2,69,21.6,73.2,-0.7,73.9C-23.1,74.6,-46.1,71.9,-56.5,59C-67,46.1,-64.8,23.1,-61.3,3.5C-57.8,-16,-52.9,-32.1,-42.5,-47.3C-32.1,-62.5,-16,-76.9,3,-79.9C22,-82.9,44,-74.4,58.9,-59.2Z;
              M48.3,-43.9C63.7,-32.8,78.2,-16.4,77.5,-0.7C76.8,15,60.9,30,45.5,45.9C30,61.7,15,78.5,-0.9,79.4C-16.9,80.3,-33.8,65.5,-49.4,49.6C-65.1,33.8,-79.6,16.9,-81.6,-2C-83.6,-20.8,-73,-41.6,-57.3,-52.8C-41.6,-63.9,-20.8,-65.4,-2.2,-63.1C16.4,-60.9,32.8,-55.1,48.3,-43.9Z;
              M56.5,-57.1C68.2,-44.8,69.2,-22.4,69.6,0.4C69.9,23.1,69.6,46.2,57.9,59.5C46.2,72.8,23.1,76.2,2.3,73.9C-18.6,71.6,-37.2,63.7,-52.5,50.4C-67.8,37.2,-79.9,18.6,-79.3,0.6C-78.6,-17.3,-65.3,-34.6,-49.9,-46.9C-34.6,-59.2,-17.3,-66.6,2.6,-69.2C22.4,-71.7,44.8,-69.4,56.5,-57.1Z"
                    transform="translate(100 100)"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </div>
          </motion.div>
          <Reveal>
            <header className="font-light md:text-8xl sm:text-7xl xs:text-7xl text-7xl mb-6 flex sm:flex-row flex-col items-center justify-center ">
              PROJECT
              <span className="text-orange-1000 sm:ml-6 ml-0 font-bold">
                EVEOLVE
              </span>
            </header>
          </Reveal>
          <Reveal>
            <p className="text-2xl sm:text-3xl md:text-4xl md:text-left text-center font-light my-6">
              Helping People Live Happier, Healthier Lives Through Improved
              Fitness, Nutrition, And Mindset.
            </p>
          </Reveal>
          <Reveal>
            <button
              onClick={handleSignUpClick}
              className="text-white bg-black bg-opacity-60 px-4 py-2 border-1 border-white text-xl mt-4 hover:bg-opacity-90 transition-all ease-in-out hover:border-orange-200"
            >
              <Link to={"/signup"}>Get Started</Link>
            </button>
          </Reveal>
        </div>
      </div>
      <div className="w-screen h-full border-y-8 border-y-red-500 sm:grid sm:grid-cols-2 flex flex-col justify-center items-center">
        <div className="sm:w-4/5 w-full flex flex-col justify-center p-12">
          <Reveal>
            <header className="text-4xl font-bold mb-4 border-b-4 border-red-500 w-fit">
              UNLEASH YOUR POTENTIAL
            </header>
          </Reveal>
          <Reveal>
            <p className="text-lg mb-6 font-light">
              Everyone is unique. Let's maximize your life and stop waiting to
              get in shape! We are here to help you sculpt the body that
              perfectly fits your lifestyle and guide you in maintaining it
              through all aspects of life.
            </p>
          </Reveal>
          <Reveal>
            <p className="text-lg mb-6 font-light">
              Why sacrifice the things you love? Let us walk you through every
              step of transforming your body — from personalized nutrition plans
              to tailored exercises, down to the very essence of your molecular
              structure.
            </p>
          </Reveal>
          <Reveal>
            <p className="text-lg mb-6 font-light">
              Personalization is the key to unlocking the best results. Our
              workout programs are customized to your individual fitness goals
              and level, whether you're a beginner or an experienced fitness
              enthusiast. Our fitness masterclass is designed for you to achieve
              your goals and, most importantly, to enjoy your life!
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-8">
          {Benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="w-full flex flex-col justify-center text-left p-6 bg-gray-100 rounded-md relative"
            >
              <Reveal>
                <img
                  src={benefit.icon}
                  alt={`${benefit.title} icon`}
                  className="ml-2 inline w-12"
                />
              </Reveal>
              <Reveal>
                <header className="text-xl font-bold mb-4 text-purple-1000">
                  {benefit.title}
                </header>
                <div className="border-b-2 border-b-red-500 w-12 mb-4"></div>
              </Reveal>
              <Reveal>
                <p className="font-normal">{benefit.description}</p>
              </Reveal>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="h-full w-screen bg-dark-blue md:grid md:grid-cols-2 flex flex-col justify-center items-center pt-12">
        <div className="text-white flex flex-col justify-center md:w-3/4 md:pl-12 text-xl font-light my-12 p-4">
          <Reveal>
            <header className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-orange-1000 w-80">
              FITNESS PROGRAMS
            </header>
          </Reveal>
          <Reveal>
            <p className="mb-8 leading-8">
              Going on a fitness journey should never feel like a punishment.
              It's a remarkable and empowering{" "}
              <span className="text-red-500">lifestyle</span> choice that's
              within reach for <span className="text-orange-500">everyone</span>
              . We are passionate about discovering the enjoyable side of
              fitness. While you might encounter some sore muscles along the
              way, the fun and energy levels you'll experience far surpass any
              temporary discomfort.
            </p>{" "}
          </Reveal>
          <Reveal>
            <p className="leading-8 mb-8">
              As <span className="text-yellow-500">specialists</span> in weight
              loss training, We go beyond by offering a diverse range of
              personalized training programs tailored to your unique needs.
              Whether you're looking for individualized programs, athletic and
              sports training, cardiovascular conditioning, functional fitness,
              muscle building, muscle toning, injury rehab, mind-body
              connection, nutrition coaching, or fitness for seniors, We got you
              covered.
            </p>{" "}
          </Reveal>
          <Reveal>
            <p className="leading-8">
              <span className="text-rose-500">Your fitness journey </span>is
              about more than just working out; it's about embracing a holistic
              and fulfilling lifestyle.
            </p>
          </Reveal>
        </div>

        <div className="relative flex flex-col justify-center items-center text-white">
          <div className="relative">
            <Reveal>
              <img
                className="mb-4 w-full"
                src={`${import.meta.env.VITE_CLOUDINARY}abo_blgvw2`}
                alt="Training"
              />
            </Reveal>
            <ul className="grid sm:grid-cols-3 sm:grid-rows-2 xs:grid-cols-2 xs:grid-rows-3">
              {icons.map((icon, index) => (
                <li
                  className="font-light flex flex-col justify-center items-center"
                  key={index}
                >
                  <Reveal>
                    <header className="w-16">{icon.icon}</header>{" "}
                  </Reveal>
                  <Reveal>
                    <p>{icon.title}</p>{" "}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div id="services" className="h-max">
        <Plans />
      </div>
      <div className="w-screen h-full sm:grid sm:grid-cols-2 flex flex-col justify-center items-center p-12 border-b-8 border-b-red-500">
        <div className="w-3/4">
          <Reveal>
            <header className="sm:text-6xl xs:text-5xl text-3xl font-light sm:text-start text-center">
              Make a use of our{" "}
              <span className="text-purple-1000 font-bold sm:text-left text-center">
                Technologies
              </span>{" "}
            </header>
          </Reveal>
          <div className="grid grid-rows-3 pt-6">
            <div className="sm:text-left text-center py-3 rounded-md">
              <Reveal>
                <header className="text-3xl font-bold text-rose-500 mb-4">
                  <span>
                    <FaCalendarAlt />
                  </span>{" "}
                  Schedule Your Workout
                </header>
              </Reveal>
              <Reveal>
                <p className="text-gray-700 font-light text-xl">
                  Plan your fitness journey with ease by scheduling personalized
                  workout sessions. Our easy-to-use scheduling system ensures
                  that you stay consistent and motivated on your path to a
                  healthier lifestyle.
                </p>
              </Reveal>
            </div>
            <div className="sm:text-left text-center py-3 rounded-md">
              <Reveal>
                <header className="text-3xl font-bold text-red-500 mb-4">
                  <FaUsers /> Track Your Records
                </header>
              </Reveal>
              <Reveal>
                <p className="text-gray-700 font-light text-xl">
                  Keep a record of your achievements and progress. Our advanced
                  tracking system allows you to monitor your performance, set
                  goals, and celebrate your milestones. Tracking your records is
                  a key component of a successful fitness journey.
                </p>
              </Reveal>
            </div>
            <div className="sm:text-left text-center py-3 rounded-md">
              <Reveal>
                <header className="text-3xl font-bold text-orange-500 mb-4">
                  <FaRegListAlt /> Join Group Classes
                </header>
              </Reveal>
              <Reveal>
                <p className="text-gray-700 font-light text-xl">
                  Experience the power of community in our group classes. Join
                  like-minded individuals on a shared fitness journey. Our group
                  classes provide a supportive and motivating environment to
                  help you achieve your fitness goals together.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
        {display ? (
          <div className="text-center p-8 flex flex-col justify-center items-center">
            <Reveal>
              <p className="text-gray-700 font-light text-xl">
                Oh, and we think we forgot to mention that you can do all of
                that and more right from your phone! Our user-friendly website
                makes it easy for you to track your progress, schedule workouts,
                and join group classes from anywhere you are. Whether you're at
                home, in the gym, or on the go, we've got you covered.
              </p>
            </Reveal>
            <Reveal>
              <img
                src={`${import.meta.env.VITE_CLOUDINARY}phone_tsgajc`}
                alt=""
              />
            </Reveal>
          </div>
        ) : null}
      </div>
      <div className="bg-dark-blue py-12 flex flex-col lg:flex-row justify-between items-center text-white md:p-12 p-4">
        <div className="lg:w-1/2 lg:pr-8">
          <Reveal>
            <h1 className="text-4xl font-bold text-orange-1000 mb-4">
              Start Your Fitness Journey
            </h1>
          </Reveal>
          <div className="text-lg leading-loose">
            <Reveal>
              Congratulations on taking the first step towards a healthier, more
              vibrant you! Our website is more than just a platform; it's your
              gateway to a world of wellness. Crafted with passion and
              expertise, we're here to guide you through the incredible journey
              of fitness and self-discovery.
            </Reveal>
            <Reveal>
              <span className="block mt-4">
                Now, ask yourself, how committed are you to becoming the best
                version of yourself? Ready to push boundaries and redefine your
                limits?{" "}
              </span>{" "}
            </Reveal>
            <Reveal>
              <span className="font-bold text-rose-500 uppercase mt-2">
                It's time to make a powerful choice.
              </span>
            </Reveal>
          </div>
          <Reveal>
            <div className="mt-6 flex space-x-4">
              <button className="bg-purple-700 text-white px-6 py-2 uppercase hover:bg-opacity-80 transition-all ease-in-out">
                <a href={"/#services"}>Explore Programs</a>
              </button>
              <button className="bg-rose-500 text-white px-6 py-2 uppercase hover:bg-opacity-80 transition-all ease-in-out">
                <Link to={"/about#adventage"}> Want To Know More? </Link>
              </button>
            </div>
          </Reveal>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0 flex flex-col items-center">
          <Reveal>
            <img
              src={`${
                import.meta.env.VITE_CLOUDINARY
              }ContactUsPageGraphic_b3ymwo`}
              alt="Fitness App"
              className="w-full max-w-md mx-auto rounded-md shadow-lg"
            />
          </Reveal>
          <Reveal>
            <div className="mt-4 text-gray-400 text-sm text-center">
              Subscribe to our newsletter for exclusive fitness tips, recipes,
              and special offers. Let's support each other every step of the
              way!
            </div>
          </Reveal>
          <form onSubmit={handleEmailSubmit}>
            <Reveal>
              <input
                placeholder="Your Email"
                className="p-1 bg-transparent border-b-2 focus:bg-white focus:bg-opacity-10"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Reveal>
            <Reveal>
              <button
                type="submit"
                onSubmit={handleEmailSubmit}
                className="bg-orange-500 text-white px-6 py-2 uppercase mt-2 hover:bg-opacity-80 transition-all ease-in-out"
              >
                Subscribe Now
              </button>
            </Reveal>
          </form>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
      />
    </>
  );
}

export default Home;
