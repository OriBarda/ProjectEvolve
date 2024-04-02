import React, { useContext } from "react";
import { LocalContext } from "../../context/LocalContext";
import { Link } from "react-router-dom";
import bg1 from "../../assets/service/spa.jpg";
import bg2 from "../../assets/service/nutrition.jpg";
import bg3 from "../../assets/service/pilates.jpg";
import bg4 from "../../assets/service/jgym.jpg";
import bg5 from "../../assets/service/personalTraining.jpg";
import bg6 from "../../assets/service/swimmer.jpg";
import icon1 from "../../assets/service/icon1.webp";
import icon2 from "../../assets/service/icon2.webp";
import icon3 from "../../assets/service/icon3.webp";
import icon4 from "../../assets/service/icon4.webp";
import icon5 from "../../assets/service/icon5.webp";
import icon6 from "../../assets/service/icon6.webp";

const plansData = [
  {
    bgImage: bg6,
    icon: icon1,
    title: "Swimming",
    description:
      "Dive into expert-led sessions for a perfect blend of fun and skill.",
    id: 1,
  },
  {
    bgImage: bg4,
    icon: icon2,
    title: "Junior Gym",
    description:
      "Nurture kids' health with engaging programs and professional guidance.",
    id: 2,
  },
  {
    bgImage: bg2,
    icon: icon3,
    title: "Nutrition",
    description:
      "Fuel muscle growth with personalized plans and expert nutrition advice.",
    id: 3,
  },
  {
    bgImage: bg5,
    icon: icon4,
    title: "Personal Training",
    description:
      "Achieve fitness goals with the best coaches in personalized training sessions.",
    id: 4,
  },
  {
    bgImage: bg1,
    icon: icon5,
    title: "Spa",
    description:
      "Relaxation awaits after workouts with our rejuvenating spa services.",
    id: 5,
  },
  {
    bgImage: bg3,
    icon: icon6,
    title: "Pilates",
    description:
      "Stretch and strengthen with transformative Pilates sessions for enhanced well-being.",
    id: 6,
  },
];

function PlansTry() {
  const { setSelectedPlan } = useContext(LocalContext);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="w-screen h-full inset-0 flex  items-center flex-col sm:py-20 border-b-8 border-b-red-500 bg-dark-blue">
      <div className="text-white my-12 s:text-3xl text-xl font-extralight w-full flex flex-col justify-center items-center">
        <div className="absolute bg-dark-blue z-20">A World Of Experiences</div>
        <div className="absolute lg:w-2/3 w-5/6 h-0.5 bg-rose-500"></div>
      </div>
      <div className="sm:w-2/3 w-screen text-center text-xl font-normal p-5 text-white">
        Our Compeny invite you to try and make a use and enjoy our facilities we
        offer from kids to elderly anyone can find something sutiable for them
      </div>
      <div className="relatvie w-screen sm:h-96 bg-black bg-opacity-50 sm:flex grid grid-cols-2 h-full">
        {plansData.map((plan, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${plan.bgImage})`,
              backgroundSize: `cover`,
              backgroundPosition: `center`,
            }}
            className={`sm:h-97 h-96 sm:w-1/5 w-full sm:hover:w-2/6 hover:w-5.4 relative duration-700 transition-all ease-in-out flex flex-col justify-center items-center`}
          >
            <div className="bg-black w-full h-full bg-opacity-40 text-white flex flex-col justify-center items-center">
              <div className="flex flex-col justify-evenly items-center h-72">
                <div className="flex flex-col justify-center items-center space-y-2">
                  <img src={plan.icon} alt="" />
                  <div className="w-12 border-b-2 border-yellow-300" />
                  <header className="text-3xl font-light text-center">
                    {plan.title}
                  </header>
                </div>
                <p className="w-3/4 text-center font-medium">
                  {plan.description}
                </p>
                <button
                  className="underline font-extralight"
                  onClick={() => handlePlanSelection(plan)}
                >
                  <Link to={"/service"}>Learn More</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlansTry;
