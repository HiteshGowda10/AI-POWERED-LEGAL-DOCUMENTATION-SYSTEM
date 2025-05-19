import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LandingPage = ({ onLogin }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    profilePic: null
  });
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });
  const [registerErrors, setRegisterErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    profilePic: ""
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateLoginField(name, value);
  };

  const handleRegisterChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setRegisterData((prev) => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setRegisterData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
    validateRegisterField(name, name === "profilePic" ? files[0] : value);
  };

  const validateLoginField = (name, value) => {
    setLoginErrors((prev) => ({
      ...prev,
      [name]: value.trim() === "" ? "This field is required" : "",
    }));
  };

  const validateRegisterField = (name, value) => {
    setRegisterErrors((prev) => ({
      ...prev,
      [name]:
        value === "" || value === null
          ? "This field is required"
          : name === "email" && !/\S+@\S+\.\S+/.test(value)
          ? "Invalid email format"
          : name === "password" && value.length < 6
          ? "Password must be at least 6 characters"
          : name === "confirmPassword" && value !== registerData.password
          ? "Passwords do not match"
          : name === "mobile" && !/^\d{10}$/.test(value)
          ? "Please enter a valid 10-digit mobile number"
          : name === "profilePic" && value && value.size > 2000000
          ? "Image size must be less than 2MB"
          : ""
    }));
  };

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    if (!email || !password) {
      setLoginErrors({
        email: !email ? "This field is required" : "",
        password: !password ? "This field is required" : "",
      });
      return;
    }

    toast.success("Logging in...");
    navigate("/home");

    

    try {
      const response = await axios.post(
        "http://128.0.0.1:8000/api/legal/login/",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        toast.success("Logged in successfully");
        console.log("Login successful:", response.data);
        setLoginData({ email: "", password: "" });
        setLoginErrors({ email: "", password: "" });
        setIsLoginOpen(false);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, mobile, profilePic } = registerData;

    const newErrors = {
      username: !username ? "This field is required" : "",
      email: !email
        ? "This field is required"
        : !/\S+@\S+\.\S+/.test(email)
        ? "Invalid email format"
        : "",
      password: !password
        ? "This field is required"
        : password.length < 6
        ? "Password must be at least 6 characters"
        : "",
      confirmPassword: !confirmPassword
        ? "This field is required"
        : confirmPassword !== password
        ? "Passwords do not match"
        : "",
      mobile: !mobile
        ? "This field is required"
        : !/^\d{10}$/.test(mobile)
        ? "Please enter a valid 10-digit mobile number"
        : "",
      profilePic: !profilePic ? "Profile picture is required" : ""
    };

    setRegisterErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    toast.success("Registering...");

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("mobile", mobile);
      formData.append("profilePic", profilePic);

      const response = await axios.post(
        "http://128.0.0.1:8000/api/legal/register/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status === 201) {
        toast.success("Registration successful");
        console.log("Registration successful:", response.data);
        setRegisterData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          mobile: "",
          profilePic: null
        });
        setRegisterErrors({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          mobile: "",
          profilePic: ""
        });
        setIsRegisterOpen(false);
        toggleLogin();
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  const toggleLogin = () => setIsLoginOpen(!isLoginOpen);
  const toggleRegister = () => setIsRegisterOpen(!isRegisterOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-lg fixed w-full z-10 top-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">LegalDoc</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLogin}
                className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                Login
              </button>
              <button
                onClick={toggleRegister}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleLoginSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                className={`border p-2 w-full rounded ${
                  loginErrors.email ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {loginErrors.email && (
                <p className="text-red-500 text-xs mt-1">* {loginErrors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                className={`border p-2 w-full rounded ${
                  loginErrors.password ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {loginErrors.password && (
                <p className="text-red-500 text-xs mt-1">* {loginErrors.password}</p>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={toggleLogin}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
                disabled={!loginData.email || !loginData.password}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      )}

      {isRegisterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleRegisterSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            encType="multipart/form-data"
          >
            <h2 className="text-2xl font-semibold mb-4">Register</h2>
            
            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={registerData.username}
                onChange={handleRegisterChange}
                className={`border p-2 w-full rounded ${
                  registerErrors.username ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {registerErrors.username && (
                <p className="text-red-500 text-xs mt-1">* {registerErrors.username}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className={`border p-2 w-full rounded ${
                  registerErrors.email ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {registerErrors.email && (
                <p className="text-red-500 text-xs mt-1">* {registerErrors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={handleRegisterChange}
                className={`border p-2 w-full rounded ${
                  registerErrors.password ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {registerErrors.password && (
                <p className="text-red-500 text-xs mt-1">* {registerErrors.password}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                className={`border p-2 w-full rounded ${
                  registerErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {registerErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">* {registerErrors.confirmPassword}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={registerData.mobile}
                onChange={handleRegisterChange}
                className={`border p-2 w-full rounded ${
                  registerErrors.mobile ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {registerErrors.mobile && (
                <p className="text-red-500 text-xs mt-1">* {registerErrors.mobile}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="file"
                name="profilePic"
                accept="image/*"
                onChange={handleRegisterChange}
                className={`border p-2 w-full rounded ${
                  registerErrors.profilePic ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {registerErrors.profilePic && (
                <p className="text-red-500 text-xs mt-1">* {registerErrors.profilePic}</p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={toggleRegister}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
                disabled={
                  !registerData.username ||
                  !registerData.email ||
                  !registerData.password ||
                  !registerData.confirmPassword ||
                  !registerData.mobile ||
                  !registerData.profilePic
                }
              >
                Register
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-24 pt-32">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Professional Legal Documents Made Simple
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create, customize, and download legally binding documents in
              minutes with our easy-to-use platform.
            </p>
            <button
              onClick={toggleLogin}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2092/2092663.png"
              alt="Legal Documents"
              className="w-full h-96 object-contain animate-float"
            />
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose LegalDoc?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Legally Verified</h3>
              <p className="text-gray-600">
                Documents crafted and reviewed by certified legal professionals.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Time</h3>
              <p className="text-gray-600">
                Generate documents in minutes, not days.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6l-7-5-7 5v6a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is encrypted and protected.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2092/2092663.png"
              alt="Contract Agreement"
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Contract Agreements</h3>
            <p className="text-gray-600">
              Customized contracts for business, freelance, or personal use.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3481/3481072.png"
              alt="Will Creation"
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Will Creation</h3>
            <p className="text-gray-600">
              Draft a legally binding will with ease.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2874/2874088.png"
              alt="Lease Agreements"
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Lease Agreements</h3>
            <p className="text-gray-600">
              Create landlord-tenant agreements tailored to your needs.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "LegalDoc saved me hours of work and thousands in legal fees!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">Jane Doe</p>
                  <p className="text-gray-500 text-sm">Small Business Owner</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "The interface is so intuitive, and the documents are top-notch."
              </p>
              <div className="flex items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">John Smith</p>
                  <p className="text-gray-500 text-sm">Freelancer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "I created a lease agreement in under 10 minutes!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">Emily Brown</p>
                  <p className="text-gray-500 text-sm">Landlord</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Simplify Your Legal Needs?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of users who trust LegalDoc for their legal documents.
          </p>
          <button
            onClick={toggleRegister}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition-colors"
          >
            Create Free Account
          </button>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">LegalDoc</h4>
            <p className="text-gray-400">
              Your trusted legal document partner.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Resources</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Connect</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 LegalDoc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;