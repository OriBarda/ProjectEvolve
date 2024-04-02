import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/SmallLogo.png";
import Home from "../../../assets/home/homePage.jpg";
import gymTrainer from "../../../assets/gym-trainer.webp";
import gym from "../../../assets/gym2.jpg";
import HweightTrainer from "../../../assets/boxer-trainer.webp";
import Hweight from "../../../assets/HweightBg.jpg";
import PilTrainer from "../../../assets/yoga-trainer.webp";
import yoga from "../../../assets/yoga2.jpg";
import swimTrainer from "../../../assets/swimmer-trainer.jpg";
import swim from "../../../assets/swim1.jpg";
import NutTrainer from "../../../assets/run-trainer.jpg";
import run from "../../../assets/swim1.jpg";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "react-toastify/dist/ReactToastify.css";

function About() {
  const Trainers = [
    {
      id: 0,
      image: gymTrainer,
      name: "Brian John",
      specialty: "Strength Training and Conditioning",
      description:
        "Is our fitness guru with expertise in strength training and conditioning.",
    },
    {
      id: 1,
      image: HweightTrainer,
      name: "Alexis Torres",
      specialty: "Weight Lifting Workouts",
      description:
        "Is our skilled boxing trainer who transformed into a weighling coach.",
    },
    {
      id: 2,
      image: PilTrainer,
      name: "Isabella Cruz",
      specialty: "Pilates Instruction",
      description:
        "Join her for transformative Pilates sessions, finding balance, strength, and inner peace.",
    },
    {
      id: 3,
      image: swimTrainer,
      name: "Nathan Rodriguez",
      specialty: "Swimming Techniques",
      description:
        "Dive into swimming with our expert swim trainer making each session enjoyable and effective.",
    },
    {
      id: 4,
      image: NutTrainer,
      name: "Olivia Miller",
      specialty: "Nutriton Programs",
      description:
        "Talk to our experienced coach dedicated to helping you achieve your dieting and nutrition goals.",
    },
  ];
  const quotes = [
    "Become the best version of you.",
    "Die with memories, not dreams.",
    "What we think, we become.",
    "Be so good they can’t ignore you.",
    "Simplicity is the ultimate sophistication.",
    "Yesterday you said tomorrow. Just do it today.",
  ];
  const advantage = [
    {
      icon: (
        <svg
          className="w-full h-full text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      header: "Growth",
      description:
        "Stick with us and you will see growth and development, but nothing good comes without hard work!",
    },
    {
      icon: (
        <svg
          className="w-full h-full text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      header: "Security",
      description:
        "Our facilities are covered with security cameras and guards at the exits, so you can feel the safest at any time!",
    },
    {
      icon: (
        <svg
          className="w-full h-full text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      ),
      header: "Cloud",
      description:
        "Using our app and website, you can save everything from workouts, schedule classes, and more...",
    },
    {
      icon: (
        <svg
          className="w-full h-full text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      header: "Speed",
      description:
        "With our training methods, we can help you improve in the fastest and best way possible and suitable for you!",
    },
    {
      icon: (
        <svg
          className="w-full h-full text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      header: "Support",
      description:
        "24/7 full-time support. You can reach us on the phone, website, app, and even in the gym up front! We will be happy to help you!",
    },
    {
      icon: (
        <svg
          className="w-full h-full text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ),
      header: "24/7",
      description:
        "Our facilities are open 24/7, so you can come whenever you feel suitable for you and train in the best gym facilities available!",
    },
  ];
  const statistics = [
    {
      value: "50+",
      heading: "Years of Experience",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
    },
    {
      value: "74%",
      heading: "Our Gym is Leading",
      description:
        "Out of 5 gym facilities, our gym came first with more than 74% of gym members choosing us!",
    },
    {
      value: "24",
      heading: "Open 24/7",
      description:
        "Always open so no excuses! Come in and workout whenever you feel like it!",
    },
    {
      value: "100%",
      heading: "We Pay Close Attention to Everyone",
      description:
        "100% of our members are happy with our services and support. What are you waiting for?",
    },
  ];
  const workoutOptions = [
    {
      imageSrc: gym,
      title: "Gym Facility",
      subtitle: "Strength and Conditioning",
      description:
        "Get stronger and improve your overall fitness with our state-of-the-art gym facilities. Our experienced trainers will guide you through personalized strength and conditioning programs tailored to your fitness goals.",
    },
    {
      imageSrc: Hweight,
      title: "Weight Lifting Arena",
      subtitle: "Heavy Weight Lifting",
      description:
        "Challenge yourself with our intense weight lifting arena. Enhance your cardio endurance and agility with dynamic workouts. Learn essential weight lifting techniques under the guidance of our expert trainers, achieving a full-body workout.",
    },
    {
      imageSrc: yoga,
      title: "Pilates Room",
      subtitle: "Mindful Stretching",
      description:
        "Immerse yourself in mindfulness with our dedicated Pilates room. Experience gentle stretching, balance exercises, and relaxation techniques. Our Pilates classes promote overall well-being and stress relief.",
    },
    {
      imageSrc: swim,
      title: "Swimming Pools",
      subtitle: "Aquatic Fitness",
      description:
        "Dive into fitness with our swimming pools. Enjoy low-impact exercises in the water, improving cardiovascular health and toning muscles. Our aquatic fitness programs cater to all skill levels, providing a refreshing and effective workout.",
    },
    {
      imageSrc: run,
      title: "Nutrition Counselors",
      subtitle: "Dietary Guidance",
      description:
        "Transform your health with our Nutrition Counselors. Receive personalized dietary guidance to achieve your fitness goals. Our expert nutritionists help you make informed choices for a balanced and nourishing lifestyle.",
    },
  ];

  const controls = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const options = {
    triggerOnce: true,
    threshold: 0.5,
  };

  const [ref, inView] = useInView(options);
  const [ref2, inView2] = useInView(options);
  const [ref3, inView3] = useInView(options);

  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.26,
          type: "spring",
          bounce: 0.1,
        },
      }));
    }
    if (inView2) {
      controls2.start((i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.26,
          type: "spring",
          bounce: 0.2,
        },
      }));
    }
    if (inView3) {
      controls3.start((i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.26,
          type: "spring",
          bounce: 0.7,
        },
      }));
    }
  }, [controls, inView, controls2, inView2, controls3, inView3]);

  useEffect(() => {
    controls.start({ pathLength: 0, opacity: 0 });
  }, [controls]);

  return (
    <>
      <div id="home" className="pt-20">
        <motion.div className="text-center flex flex-col gap-y-3 px-2 sm:mx-auto sm:max-w-xl">
          <h1 className="font-bold text-3xl text-slate-900 dark:text-gray-100 sm:text-4xl">
            Let's Get Started
          </h1>
          <p className="text-base dark:text-gray-400 sm:text-lg">
            So welcome to the about us section of our website, you want to know
            what we offer? why us? how you get started? and more... we are going
            to answer all that here.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 mt-8 sm:gap-x-12 gap-y-5 sm:gap-y-0 lg:mx-auto lg:max-w-4xl sm:mt-12">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="col-span-2 sm:col-span-1 flex justify-center"
          >
            <img
              className="w-full bg-gray-50 rounded"
              alt="No alt"
              src={Home}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="col-span-2 px-3 pb-3 dark:border-slate-700 border-gray-50 sm:col-span-1 sm:flex sm:flex-col sm:justify-center sm:pl-7"
          >
            <h1 className="font-semibold text-black tracking-tight text-xl sm:mb-2 md:my-1">
              The world of Fitness
            </h1>
            <p className="text-base font-normal tracking-tight leading-relaxed dark:divide-undefined text-gray-600">
              Now a days where everyone is working out to make them a better
              version of themselves, no one can stay behind, and yes we know it
              is a commitment and it sound scary an actual new world has opened
              up before you and it looks sometimes thretning that is why we made
              Project Evolve to give to best and easiet push in to this world of
              fitness while keeping you one step above the others.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="col-span-2 px-3 pb-3 order-3 dark:border-slate-700 border-gray-50 sm:col-span-1 sm:flex sm:flex-col sm:justify-center sm:pl-7 sm:order-none"
          >
            <h1 className="font-semibold text-black tracking-tight text-xl sm:mb-2 md:my-1">
              So what now
            </h1>
            <p className="text-base font-normal tracking-tight leading-relaxed text-gray-600">
              Now we are going to guide through your fitness journey and help
              get the softest and safest landing possible but first let us
              introduce ourselves better.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="col-span-2 order-2 sm:col-span-1 sm:order-none flex justify-center"
          >
            <img className="w-64 bg-gray-50" alt="No alt" src={Logo} />
          </motion.div>
        </div>
      </div>
      &nbsp;
      <section id="services" className="py-10" ref={ref}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate={controls}
            className="flex flex-wrap w-full px-4 pb-5"
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2 w-full mb-6 lg:mb-0"
            >
              <h1 className="text-3xl title-font mb-2 text-black font-bold sm:text-4xl">
                Dive in the water are freezing but it is ok!
              </h1>
              <div className="h-1 rounded bg-primary w-14">
                <div className="p-2"></div>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="w-full text-lg leading-snug font-light font-body lg:w-1/2 text-gray-600"
            >
              Sounds scary we get it, but we won't let you go through this on
              your own. We will jump with you and if needed, even before you. So
              let us display to you what we offer.
            </motion.p>
          </motion.div>
          <div className="flex sm:flex-row flex-col ">
            {workoutOptions.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={controls}
                custom={index}
                variants={{
                  hidden: { opacity: 0, y: 150 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="p-4 md:w-1/2 xl:w-1/4"
              >
                <div className="bg-gray-50 hover:bg-gray-200 rounded">
                  <img
                    className="h-40 rounded w-full object-cover object-center mb-2 xl:mb-0"
                    src={item.imageSrc}
                    alt={item.title}
                  />
                  <div className="p-6 rounded-lg dark:divide-undefined">
                    <h2 className="text-lg text-black title-font mb-0 font-heading font-semibold">
                      {item.title}
                    </h2>
                    <h3 className="tracking-widest text-xs font-medium title-font text-primary mb-2">
                      {item.subtitle}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div ref={ref2} id="trainers">
        <motion.div className="text-center px-3 py-16 max-w-7xl mx-auto">
          <motion.h1 className="font-black tracking-tight text-balck sm:text-4xl">
            We work as a Team!
          </motion.h1>
          <motion.p className="mt-3 text-lg max-w-lg mx-auto text-gray-600">
            Start your joureny with our top of the line best of the best
            trainers. and if you dont belive us let's meet them!
          </motion.p>
          <div className="grid gap-2 mt-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {Trainers.map((trainer) => (
              <motion.div
                key={trainer.id}
                initial="hidden"
                animate={controls2}
                custom={trainer.id}
                variants={{
                  hidden: { opacity: 0, y: 150 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-col justify-center items-center"
              >
                <img
                  className="w-48 h-48 rounded-full mb-4 object-cover"
                  alt={`Trainer ${trainer.id}`}
                  src={trainer.image}
                />
                <p className="mb-4">{trainer.name}</p>
                <p className="text-gray-600">{trainer.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <div
        id="doit"
        className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
      >
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <motion.h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight sm:text-4xl md:mx-auto">
            I could either watch it happen or be a part of it
          </motion.h2>
          <motion.p className="text-base md:text-lg">
            Become a better you, evolve to become the best there is. Let nothing
            and no one stop you, especially yourself.
          </motion.p>
        </div>
        <div ref={ref3} className="max-w-lg space-y-3 sm:mx-auto lg:max-w-xl">
          {quotes.map((e, index) => (
            <motion.div
              key={index}
              className="flex items-center p-2 transition-colors duration-200 border shadow group hover:bg-primary-500 hover:border-primary-500 rounded-global"
              initial={{ opacity: 0, y: 20 }}
              animate={controls3}
              custom={index}
            >
              <motion.div className="mr-2">
                <span className="w-6 h-6 transition-colors duration-200 group-hover:text-white text-primary-500 sm:w-8 sm:h-8">
                  <svg
                    className="w-6 h-6 transition-colors duration-200 group-hover:text-orange-1000 text-primary-500 sm:w-8 sm:h-8"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    ></polygon>
                  </svg>
                </span>
              </motion.div>
              <motion.span className="transition-colors duration-200 group-hover:text-purple-1000">
                {e}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
      <div
        id="nowornever"
        className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
      >
        <div className="mx-auto sm:text-center lg:max-w-2xl">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <div className=""></div>
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-black sm:text-4xl md:mx-auto">
              Time is everything
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Embark on your journey now, for the sooner you begin, the more
              remarkable your results will unfold!
            </p>
          </div>
          <div className="mb-4 lg:mb-6">
            <img
              className="object-cover w-full h-56 rounded sm:h-64 md:h-80 lg:h-96 lg:object-contain"
              alt="No alt"
              src="https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80"
            />
          </div>
          <p className="max-w-xl mb-4 text-base sm:mx-auto">
            Time, an irreplaceable essence, urges us to commence our fitness
            odyssey swiftly. Embrace the present as the catalyst for holistic
            well-being, where vitality and strength intertwine. The sooner you
            embark on this journey, the more immediate the dividends of health
            and joy become. Seize the moment, sculpt a future of resilience, and
            unlock the wealth of a vibrant life. In the tapestry of time, your
            commitment to fitness is the thread that weaves a story of lasting
            well-being.
          </p>
          <Link to={"/signup"}>
            {" "}
            <span className=""> Start Now </span>
            <span className="inline-block w-3 ml-2">
              <svg
                className="inline-block w-3 ml-2"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"></path>
              </svg>
            </span>
          </Link>
        </div>
      </div>
      <div id="adventage" className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <div className="mb-10 md:mb-16">
            <h2 className="font-bold text-center mb-4 text-3xl text-blackmd:mb-6 lg:text-4xl">
              Our competitive advantage
            </h2>
            <p className="max-w-screen-md md:text-lg text-center mx-auto text-gray-600">
              Doubtful? Let us illuminate you with a deeper understanding of
              what we offer.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-12 xl:gap-16">
            {advantage.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center text-indigo-500 mb-2 sm:mb-4">
                  <span className="w-full h-full text-primary">
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-center mb-2">
                  {item.header}
                </h3>
                <p className="text-center mb-2 text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <div className="mx-auto px-4 max-w-7xl">
          <div className="grid -mx-4 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map((item, index) => (
              <div key={index} className="px-4">
                <div className="py-6">
                  <h3 className="text-primary-500 text-4xl font-bold lg:mb-4 text-orange-400">
                    {item.value}
                  </h3>
                  <h5 className="text-black text-lg font-semibold ">
                    {item.heading}
                  </h5>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
