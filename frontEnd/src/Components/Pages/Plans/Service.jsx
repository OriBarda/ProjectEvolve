import React, { useContext, useEffect, useState } from "react";
import { LocalContext } from "../../../context/LocalContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import icon11 from "../../../assets/service/icon11.webp";
import icon12 from "../../../assets/service/icon12.webp";
import icon13 from "../../../assets/service/icon13.webp";
import icon14 from "../../../assets/service/icon14.webp";
import icon21 from "../../../assets/service/icon21.webp";
import icon22 from "../../../assets/service/icon22.webp";
import icon24 from "../../../assets/service/icon24.webp";
import icon31 from "../../../assets/service/icon31.webp";
import icon32 from "../../../assets/service/icon32.webp";
import icon33 from "../../../assets/service/icon33.webp";
import icon34 from "../../../assets/service/icon34.webp";
import icon41 from "../../../assets/service/icon41.webp";
import icon51 from "../../../assets/service/icon55.png";
import icon52 from "../../../assets/service/icon56.png";
import icon53 from "../../../assets/service/icon57.png";
import icon54 from "../../../assets/service/icon58.png";
import icon61 from "../../../assets/service/icon61.png";
import icon62 from "../../../assets/service/icon62.png";
import icon63 from "../../../assets/service/icon63.png";
import icon64 from "../../../assets/service/icon64.png";
import bgNut from "../../../assets/service/nutritionBg.jpg";
import bgSwm from "../../../assets/service/SwimmingBg.jpg";
import bgJgym from "../../../assets/service/JgymBg.jpg";
import bgSpa from "../../../assets/service/spaBg.jpg";
import bgPil from "../../../assets/service/pilBg.jpg";
import bgPer from "../../../assets/service/perBg.jpg";
function Service() {
  const plansData = [
    {
      id: 1,
      bg: bgSwm,
      title: "Dive into Bliss",
      subTitle:
        'Embark on a journey of revitalization! After conquering a challenging workout, surrender to the allure of our invigorating pools. With memberships like "Pro" and "Free Lancer," plunge into a world of recovery and serenity.',
      secTitle: "Chase the Sunset Waves",
      secSubTitle:
        "Dive into our world whether you're a fitness novice or a seasoned pro, and explore the possibilities:",

      sections: [
        {
          icon: icon11,
          title: `Hot Jacuzzi and Sauna`,
          desc: "Reward yourself with a soothing soak after an intense workout.",
        },
        {
          icon: icon13,
          title: `Olympic Pools`,
          desc: `For those craving an exhilarating challenge in the water.`,
        },
        {
          icon: icon14,
          title: `Pools for Toddlers`,
          desc: `Safe and delightful aquatic experiences designed for our little ones.`,
        },
        {
          icon: icon12,
          title: `Group Classes`,
          desc: `Explore the joy of swimming together through our engaging group sessions.`,
        },
      ],
    },
    {
      id: 2,
      bg: bgJgym,
      title: "Junior Gym Adventures",
      subTitle:
        "Ignite a passion for a healthy lifestyle in your kids with our Junior Gym programs. It's more than exercise; it's an empowering experience.",
      secTitle: "Nurture Young Talent",
      secSubTitle:
        "Empower your kids with these engaging programs designed for their health and wellness:",

      sections: [
        {
          icon: icon21,
          title: "Professional Guidance",
          desc: "Nurture your kids' well-being with engaging programs and expert guidance.",
        },
        {
          icon: icon24,
          title: "Fun Workouts",
          desc: "Transform fitness into an enjoyable adventure for your little ones.",
        },
        {
          icon: icon22,
          title: "Interactive Activities",
          desc: "Exciting activities fostering both physical and mental development.",
        },
        {
          icon: icon32,
          title: "Health Education",
          desc: "Teach kids about the importance of a healthy and active lifestyle.",
        },
      ],
    },
    {
      id: 3,
      bg: bgNut,
      title: "Nutrition Revolution",
      subTitle:
        "Embark on a culinary journey to achieve your fitness goals with personalized nutrition plans and expert advice.",
      secTitle: "Fuel Your Journey",
      secSubTitle: "Experience the benefits of:",
      sections: [
        {
          icon: icon31,
          title: "Personalized Plans",
          desc: "Ignite muscle growth with tailor-made nutrition plans and expert advice.",
        },
        {
          icon: icon32,
          title: "Dietary Guidance",
          desc: "Unlock the secrets of a balanced and effective diet with expert nutritional advice.",
        },
        {
          icon: icon33,
          title: "Nutritional Workshops",
          desc: "Immerse yourself in educational sessions highlighting the importance of nutrition in your fitness journey.",
        },
        {
          icon: icon34,
          title: "Supplement Recommendations",
          desc: "Navigate the world of supplements with guidance tailored to complement your unique fitness journey.",
        },
      ],
    },
    {
      id: 4,
      bg: bgPer,
      title: "Personalized Fitness Odyssey",
      subTitle:
        "Embark on a personalized fitness journey with the best coaches in tailored training sessions.",
      secTitle: "Your Fitness, Your Way",
      secSubTitle: "Tailor your fitness experience and enjoy the perks of:",

      sections: [
        {
          icon: icon41,
          title: "Expert Coaches",
          desc: "Team up with certified trainers dedicated to sculpting your success story.",
        },
        {
          icon: icon41,
          title: "Customized Workouts",
          desc: "Savor workouts crafted exclusively for you, reflecting your goals and preferences.",
        },
        {
          icon: icon41,
          title: "Progress Tracking",
          desc: "Embark on a journey of self-discovery as you monitor your fitness milestones and make informed adjustments.",
        },
        {
          icon: icon41,
          title: "Motivational Support",
          desc: "Elevate your spirits with unwavering encouragement from your dedicated trainer.",
        },
      ],
    },
    {
      id: 5,
      bg: bgSpa,
      title: "Serene Spa Haven",
      subTitle:
        "Bask in the lap of relaxation after invigorating workouts with our rejuvenating spa services.",
      secTitle: "Indulge and Unwind",
      secSubTitle:
        "Unwind and pamper yourself with these luxurious spa experiences:",

      sections: [
        {
          icon: icon51,
          title: "Massage Therapy",
          desc: "Melt away tension as expert hands soothe your muscles and calm your mind.",
        },
        {
          icon: icon52,
          title: "Facial Treatments",
          desc: "Revitalize your skin and embrace your natural glow with our expert facial treatments.",
        },
        {
          icon: icon53,
          title: "Sauna Sessions",
          desc: "Detoxify your body and unwind in our state-of-the-art saunas.",
        },
        {
          icon: icon54,
          title: "Aromatherapy",
          desc: "Immerse yourself in the calming scents of aromatherapy, elevating your relaxation experience.",
        },
      ],
    },
    {
      id: 6,
      bg: bgPil,
      title: "Pilates Transformation",
      subTitle:
        "Stretch and strengthen your way to enhanced well-being with transformative Pilates sessions.",
      secTitle: "Experience the Power of Pilates",
      secSubTitle:
        "Immerse yourself in the world of Pilates and unlock the benefits of:",
      sections: [
        {
          icon: icon61,
          title: "Core Strengthening",
          desc: "Target and tone your core muscles, unlocking improved stability and strength.",
        },
        {
          icon: icon62,
          title: "Flexibility Enhancement",
          desc: "Expand your range of motion and enhance flexibility through purposeful Pilates exercises.",
        },
        {
          icon: icon63,
          title: "Mind-Body Connection",
          desc: "Forge a profound connection between your mind and body through mindful movement and breath control.",
        },
        {
          icon: icon64,
          title: "Posture Improvement",
          desc: "Attain better posture and alignment, reaping the benefits of Pilates principles.",
        },
      ],
    },
  ];

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gym, setGym] = useState("");
  const { selectedPlan } = useContext(LocalContext);
  const usePlanId = selectedPlan.id;
  const foundPlan = plansData.find((plan) => plan.id === usePlanId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && gym) {
      setEmail("");
      setGym("");
      setPhone("");
      setName("");
      toast.success("We will get back to you in 1-3 business days!");
    } else {
      toast.warn("Please fill out the form");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div
          className="w-full h-0 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${foundPlan?.bg})`,
            backgroundSize: `cover`,
            backgroundPosition: `center`,
            backgroundRepeat: `no-repeat`,
          }}
        >
          <div className="absolute w-full h-full bg-black bg-opacity-20"></div>
          <div className="text-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
            <h1 className="sm:text-4xl text-3xl font-bold m-4">
              {foundPlan.title}
            </h1>
            <p className="text-gray-200 sm:text-xl  text-xs px-4 sm:px-20 w-screen">
              {foundPlan.subTitle}
            </p>
          </div>
        </div>
        <div className="w-full p-4 sm:p-8 bg-white flex flex-col justify-center items-center">
          <div className="text-white my-8 sm:my-12 s:text-3xl text-xl font-extralight w-full flex flex-col justify-center items-center">
            <div className="absolute text-black bg-white z-20 font-light">
              {foundPlan.secTitle}
            </div>
            <div className="absolute lg:w-2/3 w-5/6 h-0.5 bg-rose-500"></div>
          </div>
          <p className="text-gray-700 mb-4 sm:mb-8 font-normal text-xl">
            {foundPlan.secSubTitle}
          </p>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 ">
            {foundPlan.sections.map((item, index) => (
              <div
                className="p-4 flex flex-col justify-center items-center text-center"
                key={index}
              >
                <img
                  className="rounded-full w-32 h-32 bg-wheet"
                  src={item.icon}
                  alt=""
                />
                <p className="font-bold mb-2">{item.title}</p>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full p-4 sm:p-12 bg-dark-blue text-white">
          <div className="h-full w-full max-w-screen-md mx-auto flex flex-col justify-center items-center text-center ">
            <div className="text-white my-8 sm:my-12 s:text-3xl text-xl font-extralight w-full flex flex-col justify-center items-center">
              <div className="absolute text-white bg-dark-blue z-20 font-light">
                Want To Know More?
              </div>
              <div className="absolute lg:w-2/3 w-5/6 h-0.5 bg-rose-500"></div>
            </div>
            <p className="text-gray-300 mb-4">
              Leave your info below, and we will get back to you.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-full p-4 grid sm:grid-cols-4 xs:grid-cols-2 grid-cols-1 text-dark-blue">
                <label className="mb-2 sm:mr-2 m-2">
                  <input
                    value={name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="p-2  border-rose-700 border-2 rounded-md w-40"
                    placeholder="Name"
                  />
                </label>
                <label className="mb-2 sm:mr-2 m-2">
                  <input
                    type="tel"
                    onChange={(e) => setPhone(e.target.value)}
                    pattern="\d{10}"
                    value={phone}
                    className="p-2  border-rose-700 border-2 rounded-md w-40"
                    placeholder="Phone"
                  />
                </label>
                <label className="mb-2 sm:mr-2 m-2">
                  <input
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2  border-rose-700 border-2 rounded-md w-40"
                    placeholder="Email"
                  />
                </label>
                <label className="mb-2 sm:mr-2 m-2">
                  <select
                    className="p-2  border-rose-700 border-2 rounded-md w-40"
                    name="Gym"
                    onChange={(e) => setGym(e.target.value)}
                    value={gym}
                    id=""
                  >
                    <option disabled value="default" defaultValue>
                      Choose Your Gym
                    </option>
                    <option value="1">PE - 123 Main St, Lime City</option>
                    <option value="2">PE - 456 Oak St, Stone City</option>
                    <option value="3">PE - 789 Maple St, Orion City</option>
                    <option value="4">PE-GYM - 111 Pine Ave, Sun City</option>
                    <option value="5">PE-POOL - 222 Elm St, River City</option>
                    <option value="6">
                      PE-HEALTH - 333 Birch Blvd, Mountain Town
                    </option>
                  </select>
                </label>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-transparent border-rose-500 border-1 hover:border-dark-blue rounded-md w-40 mt-2 sm:mt-0 hover:bg-rose-700 transition-all ease-in-out"
              >
                Send
              </button>
            </form>
          </div>
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

export default Service;
