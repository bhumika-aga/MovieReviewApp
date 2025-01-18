import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    setIsLoggedIn(token);
  }, [isLoggedIn, location]);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-gray-700 p-4">
      <div className="text-white font-bold text-xl">
        <button
          className="hover:font-extrabold"
          onClick={() => navigate("/movieList")}
        >
          Movie Ticket Booking App
        </button>
      </div>

      <div
        className="text-white font-bold text-xl"
        style={{ textAlign: "right" }}
      >
        <p className="hover:font-extrabold">Welcome!</p>
      </div>

      <div className="flex items-center">
        {!isLoggedIn && (
          <div>
            <button
              onClick={() => navigate("/register")}
              className="mx-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>

            <button
              onClick={() => navigate("/login")}
              className="mx-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </div>
        )}

        {isLoggedIn && (
          <button
            className="mx-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
