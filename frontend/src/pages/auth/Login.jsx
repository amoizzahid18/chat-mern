import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

function Login() {
  const eyeOpen = (
    <svg
      className="h-[1.5em] opacity-50 cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2.0"
        fill="none"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </g>
    </svg>
  );
  const eyeClose = (
    <button
      onClick={() => {
        setShowPassword(true);
        setTimeout(() => {
          setShowPassword(false);
        }, 1500);
      }}
    >
      <svg
        className="h-[1.5em] opacity-50 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.0"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </g>
      </svg>
    </button>
  );

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const validateInput = (name, value) => {
    const usernamePattern = /^[A-Za-z][A-Za-z0-9-]{2,29}$/;
    const passwordPattern = /(?=.*\d).{6,}$/;

    let errorMessage = "";

    if (name === "username") {
      if (!usernamePattern.test(value)) {
        errorMessage =
          "Username must start with a letter and minimum 3 characters";
      }
    }
    if (name === "password") {
      if (!passwordPattern.test(value)) {
        errorMessage =
          "Password must be at least 6 characters long and contain a number";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    validateInput(name, value);
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        credentials
      );
      if (response.status === 200) {
        const user = response.data;
        alert(`Welcome ${user.profilePic}`);
        setCredentials({ username: "", password: "" });
        setErrors({ username: "", password: "" });
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({
        username: "Invalid username or password",
        password: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === "" || credentials.password === "") {
      setErrors({
        username: credentials.username === "" ? "Username is required" : "",
        password: credentials.password === "" ? "Password is required" : "",
      });
      return;
    }

    // if no errors, proceed with login
    loginUser();
  };

  return (
    <>
      <div className=" bg-base-200 border-base-300 rounded-box w-lg border p-7 pt-10">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

        <div className="my-4">
          <label className="label block">Username</label>
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              placeholder="quinn123"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength="3"
              maxLength="30"
              title="Only letters, numbers or dash"
            />
          </label>
          {errors.username && (
            <div className="mt-1  text-xs text-red-500">{errors.username}</div>
          )}
        </div>

        <div className="my-4">
          <label className="label block">Password</label>
          <label className="input  w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="margot123"
              // minLength="6"
              pattern="(?=.*\d)(?=.*[a-z]).{6,}"
              title="Must be more than 6 characters"
            />
            {showPassword ? eyeOpen : eyeClose}
          </label>
          {errors.password && (
            <div className="mt-1 text-xs text-red-500">{errors.password}</div>
          )}
        </div>

        <button onClick={handleSubmit} className="btn btn-neutral w-full  mt-4">
          Login
        </button>

        <div className="text-center mt-8 px-2">Or Sign In using</div>
        <div className="flex justify-center rounded-full mx-24 py-6 btn btn-neutral items-center my-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0,0,256,256"
          >
            <g
              fill="#efefef"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
              style={{ mixBlendMode: "normal" }}
            >
              <g transform="scale(10.66667,10.66667)">
                <path d="M12.545,12.151v0c0,1.054 0.855,1.909 1.909,1.909h3.536c-0.607,1.972 -2.101,3.467 -4.26,3.866c-3.431,0.635 -6.862,-1.865 -7.19,-5.339c-0.34,-3.595 2.479,-6.62 6.005,-6.62c1.002,0 1.946,0.246 2.777,0.679c0.757,0.395 1.683,0.236 2.286,-0.368v0c0.954,-0.954 0.701,-2.563 -0.498,-3.179c-1.678,-0.862 -3.631,-1.264 -5.692,-1.038c-4.583,0.502 -8.31,4.226 -8.812,8.809c-0.661,6.03 4.043,11.13 9.939,11.13c6.368,0 8.972,-4.515 9.499,-8.398c0.242,-1.78 -1.182,-3.352 -2.978,-3.354l-4.61,-0.006c-1.055,-0.002 -1.911,0.853 -1.911,1.909z"></path>
              </g>
            </g>
          </svg>
          <span className="ml-4">Sign in with Google</span>
        </div>
        <div className="divider px-20"></div>
        <div className="text-center mt-4 px-2">
          Don't have an account?
          <div className="text-purple-700 link focus:translate-y-1  hover:text-purple-900 transition duration-100">
            Register
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
