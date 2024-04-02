import React, { useState } from "react";
import image from "../../../assets/contactUs.jpg";
import { motion, useAnimation } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="text-white ">
      <header className="bg-dark-blue py-16 text-center">
        <div className="mx-auto">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-extrabold mb-2"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-lg mt-4"
          >
            We're here to assist you!
          </motion.p>
        </div>
      </header>

      <section className=" mx-auto my-12 p-8 bg-white text-gray-800 rounded-md shadow-lg flex justify-evenly items-center md:flex-row flex-col">
        <div>
          <h2 className="text-4xl font-bold mb-6 text-blue-900">
            Get in Touch
          </h2>
          <p className="mb-4">
            Have a question or need assistance? Feel free to reach out to our
            support team.
          </p>
          <form
            className="flex flex-col items-start p-0"
            onSubmit={handleSubmit}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-4"
            >
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-3 w-full  focus:outline-none border-b-1 focus:border-dark-blue border-b-gray-300  "
                required
              />
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-4"
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-3 w-full  focus:outline-none border-b-1 focus:border-dark-blue border-b-gray-300  "
                required
              />
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-4"
            >
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="mt-1 p-3 w-full  focus:outline-none border-b-1 focus:border-dark-blue border-b-gray-300  "
                required
              ></textarea>
            </motion.div>

            <button
              type="submit"
              className="bg-purple-1000 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-all duration-300 tracking-widest"
            >
              Submit
            </button>
          </form>
        </div>
        <img className="w-98 rounded-lg shadow-md " src={image} alt="" />
      </section>

      <section className="bg-dark-blue py-16 text-center px-12">
        <div className="mx-auto">
          <h2 className="text-5xl font-extrabold mb-4">Common Questions</h2>
          <p className="text-2xl mb-8">
            Check out our frequently asked questions below.
          </p>

          <div className="flex  gap-8">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white p-8 rounded-md shadow-lg text-blue-900"
            >
              <h3 className="text-2xl font-bold mb-2">
                How do I contact support?
              </h3>
              <p>
                You can contact our support team through the provided contact
                form on our website or by emailing support@evolve.com.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white p-8 rounded-md shadow-lg text-blue-900"
            >
              <h3 className="text-2xl font-bold mb-2">
                Is technical assistance available?
              </h3>
              <p>
                Absolutely! Our support team is equipped to provide technical
                assistance for any issues you may encounter.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white p-8 rounded-md shadow-lg text-blue-900"
            >
              <h3 className="text-2xl font-bold mb-2">
                How can I share feedback?
              </h3>
              <p>
                We value your feedback! Feel free to share your thoughts and
                suggestions by contacting our support team or using our feedback
                form.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;
