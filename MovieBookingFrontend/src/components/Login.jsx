import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovieService from "../services/MovieService";

const Login = () => {
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
    const response = await MovieService.login(credentials)
      .then((response) => {
        sessionStorage.setItem("token", response.data.accessToken);
        sessionStorage.setItem("userType", response.data.roles);
        if (url != null) {
          navigate(url, {
            state: {
              movie: location.state && location.state.movie,
              index: location.state && location.state.index,
            },
          });
        } else {
          navigate("/", {
            state: {
              loginFlag: true,
            },
          });
        }
      })
      .catch((error) => {
        setLoginError("Enter valid username or password");
      });
  };

  return (
    <div className="max-w-md mx-auto my-auto">
      <h2 className="text-4xl font-bold mb-4 mt-8">Login</h2>
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
          <label className="block mt-8 text-gray-800 text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border border-black mt-2 px-2 py-2"
          />
        </div>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="mt-4 text-black hover:text-blue-900 hover:text-lg font-semibold"
        >
          New User? Register here!
        </button>

        <button
          type="button"
          onClick={() => navigate("/reset-password")}
          className="mt-4 text-black hover:text-blue-900 hover:text-lg font-semibold"
        >
          Forgot Password?
        </button>

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={handleLogin}
            className="rounded mr-4 text-white font-semibold bg-green-600 hover:bg-green-800 py-2 px-6"
          >
            Login
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

export default Login;
