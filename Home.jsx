import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { StepContext } from "./context/StepContext";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Chat from "./components/Chat";

function Home() {
  const context = useContext(StepContext);
  const [openNav, setOpenNav] = useState(false);
  const [data, setData] = useState([]);
  const documentsRef = useRef(null); // Reference to the "Available Documents" section

  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    window.scrollTo(0, 0);

    context.setStep1(false);
    context.setStep2(false);
    context.setStep3(false);
    context.setStep4(false);

    fetch("http://127.0.0.1:5000/api/services")
      .then((res) => {
        if (!res.ok) throw Error("Could not fetch");
        return res.json();
      })
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  // Function to scroll to the Available Documents section
  const handleGetStarted = () => {
    documentsRef.current.scrollIntoView({
      behavior: "smooth", // Smooth scroll
      block: "start", // Align to the top of the section
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Navbar />
      <Chat />

      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Simplify Your Legal Documents
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Generate professional legal documents in minutes. Answer simple questions—no legal expertise needed.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Dynamically link to the first service if data is available */}
            {data.length > 0 ? (
              <button
                onClick={handleGetStarted} // Handle the Get Started button click
                className="inline-block bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-50 hover:shadow-xl transition-all duration-300"
              >
                Get Started
              </button>
            ) : (
              <button
                disabled
                className="inline-block bg-gray-300 text-gray-500 font-semibold py-3 px-8 rounded-full cursor-not-allowed"
              >
                Loading...
              </button>
            )}
          </motion.div>
          <p className="mt-4 text-sm text-indigo-200">
            Need help? Chat with our AI assistant!
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-6">About LegalDoc AI</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We’re revolutionizing legal documentation by making it accessible, fast, and affordable. From individuals to businesses, our AI-powered platform delivers editable, expert-crafted templates.
          </p>
        </div>
      </section>

      {/* Legal Pages Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-4">Essential Legal Pages</h3>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Protect your business and build trust with key documents like Privacy Policies and Terms & Conditions.
          </p>
        </div>
      </section>

      {/* Available Documents */}
      {data.length > 0 && (
        <section className="py-24 px-6 bg-white" id="documents" ref={documentsRef}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 text-center mb-12">
              Available Documents
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((service) => (
                <Link to={`/service/${service.service_id}`} key={service.service_id}>
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300" style={{height:"100%"}}                  >
                    <img
                      className="h-48 w-full object-cover"
                      src={service.img_link}
                      alt={service.service_name}
                    />
                    <div className="p-6">
                      <h3 className="text-lg md:text-xl font-semibold text-indigo-900 mb-3 text-center">
                        {service.service_name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {data.length === 0 && (
        <div className="flex justify-center items-center py-24">
          <p className="text-lg text-indigo-600 font-medium animate-pulse">Loading documents...</p>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-indigo-900 text-white px-6 pt-12 pb-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-300 mb-6">
            © {new Date().getFullYear()} LegalDoc AI. All rights reserved.
          </p>
          <div className="flex justify-center gap-8 text-sm">
            <a href="/home#" className="hover:text-indigo-300 transition-colors">
              Privacy Policy
            </a>
            <a href="/home#" className="hover:text-indigo-300 transition-colors">
              Terms of Service
            </a>
            <a href="/home#" className="hover:text-indigo-300 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
