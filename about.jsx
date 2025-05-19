import React from "react";
import Navbar from "./Navbar";
import Chat from "./components/Chat";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 text-gray-900">
      {/* Navbar and Chat */}
      <Navbar />
      <Chat />

      {/* Hero Section */}
      <section className="py-20 px-6 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
          <img
            src="https://res.cloudinary.com/dvgieawnp/image/upload/v1695017914/eac-pm-calls-for-codification-of-law-of-torts-punitive-damages-to-victims_yjmj3g.jpg"
            alt="Law Photo"
            className="w-40 h-40 mx-auto rounded-full border-4 border-teal-500 mb-6"
          />
          <h1 className="text-4xl font-bold text-teal-700 mb-4">
            About DocBuddy
          </h1>
          <h2 className="text-xl text-gray-600 mb-6">
            Your AI-Powered Legal Document Generator
          </h2>
          <p className="text-gray-700 leading-relaxed widt">
            DocBuddy is a revolutionary web-based platform designed to simplify
            legal document creation for small businesses, individuals, and
            professionals. Whether you need contracts, agreements, or compliance
            documents, we’ve got you covered with an intuitive, AI-driven
            solution that saves time and eliminates complexity.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-white/90">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-semibold text-teal-800 mb-6">
            Our Mission
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At DocBuddy, we aim to democratize access to legal resources. By
            leveraging cutting-edge AI technology and a comprehensive legal
            database, we empower users to draft professional, accurate, and
            legally sound documents without needing a law degree or expensive
            consultations.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-semibold text-white text-center mb-12">
            How It Works
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl font-bold text-teal-700 mb-4">
                1. Choose Your Document
              </h4>
              <p className="text-gray-600">
                Select the type of legal document you need from our extensive
                library—contracts, NDAs, leases, and more.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl font-bold text-teal-700 mb-4">
                2. Answer Simple Questions
              </h4>
              <p className="text-gray-600">
                Provide basic details like names, dates, and specific terms
                through our guided questionnaire—no legal jargon required.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl font-bold text-teal-700 mb-4">
                3. Generate & Customize
              </h4>
              <p className="text-gray-600">
                Our AI integrates your inputs into professionally crafted
                templates, which you can edit and download instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6 bg-white/90">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-semibold text-teal-800 mb-12">
            Why Choose DocBuddy?
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                ⚡
              </div>
              <h4 className="text-lg font-semibold text-gray-800">
                Fast & Efficient
              </h4>
              <p className="text-gray-600 mt-2">
                Create documents in minutes, not hours.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                $
              </div>
              <h4 className="text-lg font-semibold text-gray-800">
                Cost-Effective
              </h4>
              <p className="text-gray-600 mt-2">
                Save on legal fees with affordable AI solutions.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                🛡️
              </div>
              <h4 className="text-lg font-semibold text-gray-800">
                Reliable & Secure
              </h4>
              <p className="text-gray-600 mt-2">
                Built on trusted legal frameworks with data privacy in mind.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                🌐
              </div>
              <h4 className="text-lg font-semibold text-gray-800">
                Accessible Anywhere
              </h4>
              <p className="text-gray-600 mt-2">
                Use DocBuddy on any device, anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-800 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-200 mb-4">
            © {new Date().getFullYear()} DocBuddy. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a
              href="/privacy-policy"
              className="hover:text-teal-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="hover:text-teal-300 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              className="hover:text-teal-300 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
