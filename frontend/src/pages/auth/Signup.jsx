import React from "react";
import male from "../../assets/male.png";
import female from "../../assets/female.png";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  const [credentials, setCredentials] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    profilePicture: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    profilePicture: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setCredentials((c) => Object.assign( c, {[name]: value }));
    setCredentials({ ...credentials, [name]: value });
    // Validate input
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    const fullnamePattern = /^[A-Za-z\s]{3,30}$/;
    const usernamePattern = /^[A-Za-z][A-Za-z0-9-]{2,29}$/;
    const passwordPattern = /(?=.*\d).{6,}$/;
    const escapedPassword = credentials.password.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const confirmPassPattern = new RegExp(`^${escapedPassword}$`);
    const profilePicPattern =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*\.(jpg|jpeg|png|gif|webp))$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const genderPattern = /^(Male|Female)$/;
    let errorMessage = "";

    switch (name) {
      case "fullname":
        if (!fullnamePattern.test(value)) {
          errorMessage =
            "Full name must be minimum 3 characters and letters only";
        }
        break;
      case "username":
        if (!usernamePattern.test(value)) {
          errorMessage =
            "Username must start with a letter and minimum 3 characters";
        }
        break;
      case "email":
        if (!emailPattern.test(value)) {
          errorMessage = "Enter a valid email address";
        }
        break;
      case "password":
        if (!passwordPattern.test(value)) {
          errorMessage =
            "Password must be at least 6 characters long and contain a number";
        }
        break;
      case "confirmPassword":
        if (!confirmPassPattern.test(value)) {
          errorMessage = "Confirm password must match the password";
        }
        break;
      case "gender":
        if (!genderPattern.test(value)) {
          errorMessage = "Select a gender";
        }
        break;
      case "profilePicture":
        if (!profilePicPattern.test(value)) {
          errorMessage = "Enter a valid URL for profile picture";
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };
  const signupUser = async () => {
    try {
      setLoading(true);
      console.log(credentials);
      const response = await axios.post(
        "http://localhost:5000/auth/signup",
        credentials
      );
      if (response.status === 201) {
        setLoading(false);
        const user = response.data;
        console.log(user);
        Navigate("/login");
        setCredentials({
          fullname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setErrors({
        fullname: error.response?.data?.message || "Signup failed",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      credentials.username === "" ||
      credentials.password === "" ||
      credentials.fullname === "" ||
      credentials.email === "" ||
      credentials.confirmPassword === "" ||
      credentials.gender === ""
    ) {
      setErrors({
        fullname: credentials.fullname === "" ? "Full Name is required" : "",
        username: credentials.username === "" ? "Username is required" : "",
        email: credentials.email === "" ? "Email is required" : "",
        password: credentials.password === "" ? "Password is required" : "",
        confirmPassword:
          credentials.confirmPassword === ""
            ? "Confirm Password is required"
            : "",
        gender: credentials.gender === "" ? "Select a gender" : "",
        profilePicture:
          credentials.profilePicture === ""
            ? "Profile Picture URL is empty"
            : "",
      });
      return;
    }
    if (
      !/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*\.(jpg|jpeg|png|gif|webp))$/.test(
        credentials.profilePicture
      )
    ) {
      credentials.profilePicture = "";
    }
    signupUser();
    setErrors({
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setCredentials({
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      profilePicture: "",
    });
  };

  return (
    <div className="flex w-full justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl p-10">
        <h1 className="text-4xl font-extrabold text-center text-white tracking-wide mb-10">
          Create Your Account
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1 */}
          <div>
            {/* Full Name */}
            <label className="text-purple-200 font-semibold text-sm">
              Full Name
            </label>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2 mt-1 focus-within:border-purple-400 transition">
              {/* your same SVG */}
              <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                onChange={handleChange}
                placeholder="Harley Quinn"
                minLength="3"
                maxLength="30"
                required
                className="bg-transparent w-full text-white outline-none"
              />
            </div>
            {errors.fullname && (
              <span className="text-red-400 text-xs">{errors.fullname}</span>
            )}

            {/* Username */}
            <label className="text-purple-200 font-semibold text-sm mt-6 block">
              Username
            </label>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2 mt-1 focus-within:border-purple-400 transition">
              {/* svg */}
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={credentials.username}
                placeholder="@quinn123"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength="3"
                maxLength="30"
                required
                className="bg-transparent w-full text-white outline-none"
              />
            </div>
            {errors.username && (
              <span className="text-red-400 text-xs">{errors.username}</span>
            )}

            {/* Profile Picture */}
            <label className="text-purple-200 font-semibold text-sm mt-6 block">
              Profile Picture URL
            </label>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2 mt-1 focus-within:border-purple-400 transition">
              {/* svg */}
              <input
                type="url"
                name="profilePicture"
                value={credentials.profilePicture}
                onChange={handleChange}
                placeholder="https://"
                className="bg-transparent w-full text-white outline-none"
              />
            </div>
            {errors.profilePicture && (
              <span className="text-yellow-400 text-xs">
                {errors.profilePicture}
              </span>
            )}
          </div>

          {/* Column 2 */}
          <div>
            {/* Email */}
            <label className="text-purple-200 font-semibold text-sm">
              Email
            </label>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2 mt-1 focus-within:border-purple-400 transition">
              {/* svg */}
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="quinn@example.com"
                required
                className="bg-transparent w-full text-white outline-none"
              />
            </div>
            {errors.email && (
              <span className="text-red-400 text-xs">{errors.email}</span>
            )}

            {/* Password */}
            <label className="text-purple-200 font-semibold text-sm mt-6 block">
              Password
            </label>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2 mt-1 focus-within:border-purple-400 transition">
              {/* svg */}
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                minLength="6"
                required
                className="bg-transparent w-full text-white outline-none"
              />
              {showPassword ? eyeOpen : eyeClose}
            </div>
            {errors.password && (
              <span className="text-red-400 text-xs">{errors.password}</span>
            )}

            {/* Confirm Password */}
            <label className="text-purple-200 font-semibold text-sm mt-6 block">
              Confirm Password
            </label>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2 mt-1 focus-within:border-purple-400 transition">
              {/* svg */}
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                minLength="6"
                required
                className="bg-transparent w-full text-white outline-none"
              />
              {showPassword ? eyeOpen : eyeClose}
            </div>
            {errors.confirmPassword && (
              <span className="text-red-400 text-xs">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Column 3 */}
          <div>
            {/* Gender */}
            <label className="text-purple-200 font-semibold text-sm">
              Gender
            </label>
            <div className="flex gap-6 mt-3">
              <label className="flex items-center gap-2 cursor-pointer text-white">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  className="radio radio-sm"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-white">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  className="radio radio-sm"
                />
                <span>Female</span>
              </label>
            </div>
            {errors.gender && (
              <span className="text-red-400 text-xs">{errors.gender}</span>
            )}

            {/* Submit */}
            {loading ? (
              <button className="btn btn-disabled w-full mt-10">
                <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="mt-10 w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-bold shadow-lg transition transform hover:scale-[1.02]"
              >
                Sign Up
              </button>
            )}

            <div className="text-center text-purple-200 mt-6">
              Already have an account?
              <Link
                to="/login"
                className="ml-2 text-white font-semibold hover:underline hover:text-purple-300 transition"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
