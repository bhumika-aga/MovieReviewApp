import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovieService from "../services/MovieService";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const url = location.state && location.state.url;

  const [loginError, setLoginError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await MovieService.resetPassword(
      credentials,
      credentials.username
    )
      .then((response) => {
        navigate("/login", { state: { loginFlag: false } });
      })
      .catch((error) => {
        setLoginError("Enter Valid Username!");
      });
  };

  return (
    <div className="max-w-md mx-auto my-auto">
      <h2 className="text-4xl font-bold mb-4 mt-8">Reset Password</h2>
      <p className="text-red-400">{loginError}</p>
      <form>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-800 text-sm font-semibold">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border border-black mt-2 px-2 py-2"
          />
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-800 text-sm font-semibold">
            New Password
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border border-black mt-2 px-2 py-2"
          />
        </div>

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={handleLogin}
            className="rounded mr-4 text-white font-semibold bg-green-600 hover:bg-green-800 py-2 px-6"
          >
            Reset
          </button>
          <button
            onClick={() => navigate("/login")}
            className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
