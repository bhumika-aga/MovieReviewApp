import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/toggle.css";
import MovieService from "../services/MovieService";
import { Toggle } from "./Toggle";

const Registration = () => {
  const navigate = useNavigate();

  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: [],
  });

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegister({ ...register, [name]: value });
  };

  const checkPasswordMatch = (event) => {
    let hasError = false;

    if (register.password.length < 8 || register.password.length > 32) {
      setPasswordError("Password must be between 8 to 32 characters");
      hasError = true;
    } else {
      if (register.password !== register.confirmPassword) {
        setPasswordError("Passwords do not match.");
        hasError = true;
      } else {
        setPasswordError("");
        hasError = false;
      }
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    MovieService.register(register)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-md mx-auto my-auto">
      <h2 className="text-4xl font-bold mb-4 mt-8">Registration</h2>
      <form>
        <div className="flex mb-4">
          <label
            htmlFor="firstName"
            className="w-1/4 text-xl font-normal py-1 text-gray-700"
          >
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={register.firstName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex mb-4">
          <label
            htmlFor="lastName"
            className="w-1/4 text-xl font-normal py-1 text-gray-700"
          >
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={register.lastName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex mb-4">
          <label
            htmlFor="email"
            className="w-1/4 text-xl font-normal py-1 text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={register.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex mb-4">
          <label
            htmlFor="contactNumber"
            className="w-1/4 text-xl font-normal py-1 text-gray-700"
          >
            COntact Number:
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            required
            pattern="[0-9]{10}"
            maxLength={10}
            placeholder="Enter you mobile number (10 digits)"
            className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={register.contactNumber}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex mb-4">
          <label
            htmlFor="username"
            className="w-1/4 text-xl font-normal py-1 text-gray-700"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={register.username}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex mb-4">
          <label
            htmlFor="password"
            className="w-1/4 text-xl font-normal py-1 text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Password must be between 8 to 32 characters long"
            className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={register.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex mb-4">
          <label
            htmlFor="confirmPassword"
            className="w-1/4 text-xl font-normal py-1 text-gray-700"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            className="w-3/4 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={register.confirmPassword}
            onChange={(e) => handleChange(e)}
            onBlur={(e) => checkPasswordMatch(e)}
          />
        </div>
        {passwordError && (
          <p className="mt-2 text-sm text-red-600">{passwordError}</p>
        )}
        ;
        <div className="flex mb-4">
          <Toggle
            label="Admin User?"
            toggled={false}
            onClick={(role) => {
              if (role) {
                setRegister({ ...register, role: ["admin"] });
              }
            }}
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={handleRegister}
            className="rounded mr-4 text-white font-semibold bg-blue-500 hover:bg-blue-800 py-2 px-6"
          >
            Register
          </button>

          <button
            onClick={() => navigate("/movieList")}
            className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;