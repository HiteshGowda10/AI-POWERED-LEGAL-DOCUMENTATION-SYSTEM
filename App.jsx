import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import React from "react";
import Home from "./Home";
import Service from "./Service";
import About from "./about";
import Navbar from "./Navbar";
import InputForm from "./InputForm";
import Footer from "./footer";
import Chatbot from "./chatbot";
import Faq from "./Faq";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./loginPage";
import Signup from "./signup";
import { ContextProvider } from "./context/StepContext";
import Chat from "./components/Chat";
import LandingPage from "./LandingPage";

function App() {

  
  return (
    <ContextProvider>
      <Router>
       

        <Routes>
          <Route path="/" element={<LandingPage  />} />

          <Route path="/home" element={<Home />} />
          <Route path="/service/:id" element={<Service />} />
          <Route path="/form/:id" element={<InputForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          {/* <Route path="/login" element={<Login onLogin={handleLogin} />} /> Pass handleLogin to set logged-in state */}
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/chat" element={<Chat />} />
        </Routes>

        <ToastContainer />
      </Router>

      <Footer />
    </ContextProvider>
  );
}

export default App;
