import { useParams, useNavigate, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar as MaterialNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { toast } from "react-toastify";

function Navbar({ onLogin }) {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  function handleLogin() {
    navigate("/login");
  }

  function handleLogout() {
    // Clear any session or token if necessary here
    // For now, we'll just navigate to the root ("/")
    navigate("/");
    toast.success(" Logged out successfully");
  }

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <h1
          style={{
            fontSize: "34px",
            color: "#000",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            letterSpacing: "0.1rem",
          }}
        >
          Ai-Powered Legal Documents
        </h1>
      </Typography>
    </ul>
  );

  return (
    <MaterialNavbar className="fixed z-40 top-[-40px] w-full h-16 max-w-full rounded-none py-1 px-4 lg:px-8 lg:py-2 mt-10">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link
          to="/home"
          className="mr-4 cursor-pointer py-1.5 font-bold text-2xl  font-sans-serif"
        >
          Legal Documents
        </Link>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
          >
            <span>Logout</span>
          </Button>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav
        open={openNav}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)", // Decreased opacity to 0.25
          boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(15px)",
        }}
      >
        {navList}
        <Button variant="gradient" size="sm" fullWidth className="mb-2">
          <span>Buy Now</span>
        </Button>
      </MobileNav>
    </MaterialNavbar>
  );
}

export default Navbar;
