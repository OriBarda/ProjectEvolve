import React, { useContext, useState, useEffect } from "react";
import Cards from "react-credit-cards-2";
import { motion } from "framer-motion";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { LocalContext } from "../../context/LocalContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/UserContext";

function Payment() {
  const { createUser } = useContext(UserContext);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState();
  const [selectedPlan, setSelectedPlan] = useState("");
  const { navigate, setIsSignUpMode, createdUser } = useContext(LocalContext);
  const validateCardNumber = (cardNumber) => {
    return /^\d{16}$/.test(cardNumber);
  };

  const validateCardHolder = (cardHolder) => {
    return /^[a-zA-Z ]+$/.test(cardHolder);
  };

  const validateExpiry = (expiry) => {
    return /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiry);
  };

  const validateCvc = (cvc) => {
    return /^\d{3}$/.test(cvc);
  };

  const handleContinueClick = async () => {
    const isCardNumberValid = validateCardNumber(cardNumber);
    const isCardHolderValid = validateCardHolder(cardHolder);
    const isExpiryValid = validateExpiry(expiry);
    const isCvcValid = validateCvc(cvc);

    if (
      selectedPlan &&
      isCardNumberValid &&
      isCardHolderValid &&
      isExpiryValid &&
      isCvcValid
    ) {
      const paymentData = {
        selectedPlan,
        cardNumber,
        cardHolder,
        expiry,
        cvc,
      };

      const completedUserData = {
        ...createdUser,
        plan: paymentData.selectedPlan,
      };

      try {
        await createUser(completedUserData);
        navigate("/signup#login");
        setIsSignUpMode(false);
      } catch (err) {
        console.error("Error updating payment information", err);

        if (err.response) {
          console.error("Server response data:", err.response.data);
        }

        toast.error("Failed to update payment information. Please try again.");
      }
    } else {
      if (!selectedPlan) {
        toast.warn("Please select a plan.");
      }
      if (!isCardNumberValid) {
        toast.warn(
          "Invalid card number. Please enter a valid 16-digit number."
        );
      }
      if (!isCardHolderValid) {
        toast.warn("Invalid card holder name. Please enter a valid name.");
      }
      if (!isExpiryValid) {
        toast.warn(
          "Invalid expiry date. Please enter a valid date in MM/YY format."
        );
      }
      if (!isCvcValid) {
        toast.warn("Invalid CVC. Please enter a valid 3-digit number.");
      }
    }
  };

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 10,
      },
    },
  };

  const plans = [
    {
      id: 1,
      name: "Basic",
      price: "$49.99/month",
      color: "green-500",
      features: [
        "Gym Access",
        "Nutrition Counseling",
        "Monthly Spa Appointments",
        "Group Workouts",
      ],
      description:
        "Ideal for fitness enthusiasts who want a basic gym experience.",
    },
    {
      id: 2,
      name: "Pro",
      price: "$69.99/month",
      color: "red-300",
      features: [
        "All Previous Perks",
        "Access To Our Swimming Facility",
        "Pilates Classes",
        "Personal Training",
      ],
      description:
        "Perfect for those seeking additional perks and personalized training.",
    },
    {
      id: 3,
      name: "Free Lancer",
      price: "$49.99/month",
      color: "blue-500",
      features: [
        "Pilates Training",
        "Junior Gym Access",
        "Swimming Training",
        "Nutrition Counseling",
      ],
      description:
        "Tailored for freelancers with a focus on flexibility and well-rounded fitness.",
    },
  ];

  const handleSelectPlan = (plan) => {
    setActive(plan.id);
    setSelectedPlan(plan.name);
  };

  useEffect(() => {
    if (createdUser === undefined) {
      navigate("/");
    }
  }, []);
  
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-dark-blue py-20">
        <motion.div
          className="w-full md:w-2/3 lg:w-2/3 xl:w-1/2 p-6 bg-white/20 shadow-lg h-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {!isMobile && (
            <div className="mb-8">
              <Cards
                {...{ number: cardNumber, name: cardHolder, expiry, cvc }}
              />
            </div>
          )}
          <form className="mb-6  grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="cardNumber"
                className="block text-gray-300 font-semibold mb-2"
              >
                Card Number
              </label>
              <input
                type="text"
                placeholder="####-####-####-####"
                id="cardNumber"
                className="form-input w-full px-4 py-2 bg-dark-blue bg-opacity-30 rounded-md focus:outline-none focus:border-rose-500 focus:border-1 transition duration-300 text-white"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="cardHolder"
                className="block text-gray-300 font-semibold mb-2"
              >
                Card Holder
              </label>
              <input
                type="text"
                placeholder="Jhon Doe"
                id="cardHolder"
                className="form-input w-full px-4 py-2 bg-dark-blue bg-opacity-30 rounded-md focus:outline-none focus:border-rose-500 focus:border-1 transition duration-300 text-white"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="expiry"
                className="block text-gray-300 font-semibold mb-2"
              >
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="##/##"
                id="expiry"
                className="form-input w-full px-4 py-2 bg-dark-blue bg-opacity-30 rounded-md focus:outline-none focus:border-rose-500 focus:border-1 transition duration-300 text-white"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="cvc"
                className="block text-gray-300 font-semibold mb-2"
              >
                CVC
              </label>
              <input
                type="text"
                placeholder="###"
                id="cvc"
                className="form-input w-full px-4 py-2 bg-dark-blue bg-opacity-30 rounded-md focus:outline-none focus:border-rose-500 focus:border-1 transition duration-300 text-white"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
            </div>
          </form>
          <div className="my-72 h-60 flex s:flex-row flex-col justify-center items-center space-x-4 relative s:my-12">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => handleSelectPlan(plan)}
                className={`w-52 h-72 bg-dark-blue cursor-pointer transform transition-transform duration-500 text-white text-center ${
                  active === plan.id
                    ? "scale-110 z-50 border-2 border-red-500"
                    : "scale-90 opacity-70 border-2 border-transparen"
                } rounded-md p-4`}
              >
                <div className="font-semibold text-lg text-rose-500">
                  {plan.name}
                </div>
                <div className="text-sm mt-2 text-orange-300">{plan.price}</div>
                <ul className="text-xs mt-2 font-light list-disc pl-4">
                  {plan.features.map((item, index) => (
                    <li className="text-left my-2" key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="text-xs font-light mt-2 text-gray-400">
                  {plan.description}
                </div>
              </div>
            ))}
          </div>

          <motion.button
            className="bg-rose-700 hover:bg-rose-600 text-white font-bold py-3 px-6 border-1 border-white mt-6 focus:outline-none focus:shadow-outline-blue transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinueClick}
          >
            Continue
          </motion.button>
        </motion.div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
      />
    </>
  );
}

export default Payment;
