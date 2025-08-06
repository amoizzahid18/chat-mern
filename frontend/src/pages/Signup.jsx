import React from "react";
import male from "../assets/male.png";
import female from "../assets/female.png";
function Signup() {
  const [password, setPassword] = React.useState("margot123");
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
  );
  return (
    <>
      <div className=" bg-base-200 border-base-300 flex justify-center items-center  rounded-box max-w-3/4 border p-10">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-center mb-12">Sign Up</h1>

          <div className="flex flex-row w-full mb-4">
            
            
            
            <div className="w-full mx-6">
              {/* Full Name */}
              <div className="mb-4">
                <label className="label block">Full Name</label>
                <label className="input validator w-full">
                  <svg
                    className="h-[1em] opacity-50"
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
                      <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      <circle cx="12" cy="7" r="4"></circle>
                    </g>
                  </svg>

                  <input
                    // className="input validator"
                    type="text"
                    required
                    placeholder="Harley Quinn"
                    minLength="3"
                    maxLength="30"
                  />
                </label>
                <div className="validator-hint hidden">Enter your name</div>
              </div>

              {/* Username */}
              <div className="my-4">
                <label className="label block">Username</label>
                <label className="input validator w-full">
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
                    //   className="input validator"
                    required
                    placeholder="quinn123"
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    minLength="3"
                    maxLength="30"
                    title="Only letters, numbers or dash"
                  />
                </label>
                <p className="validator-hint hidden">
                  Must be 3 to 30 characters
                  <br />
                  containing only letters, numbers or dash
                </p>
              </div>

              {/* Profile Picture */}
              <div className="my-4">
                <label className="label block">Profile Picture</label>
                <label className="input validator w-full">
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
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </g>
                  </svg>
                  <input
                    type="url"
                    className=""
                    placeholder="https://"
                    pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-].*[a-zA-Z0-9])?.)+[a-zA-Z].*$"
                    title="Must be valid URL"
                  />
                </label>
                <p className="validator-hint hidden">Must be valid URL</p>
              </div>
            </div>



            <div className="divider divider-horizontal py-8"></div>


            <div className="w-full mx-6">
              {/* Email */}
              <div className="mb-4">
                <label className="label block">Email</label>
                <label className="input validator w-full">
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
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input
                    //   className="input validator"
                    type="email"
                    required
                    placeholder="quinn.harley@yahoo.com"
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid email address
                </div>
              </div>

              {/* Password */}
              <div className="my-4">
                <label className="label block">Password</label>
                <label className="input validator w-full">
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
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>

                  <input
                    type="password"
                    // className="input validator"
                    required
                    placeholder="margot123"
                    minLength="6"
                    pattern="(?=.*\d)(?=.*[a-z]).{6,}"
                    title="Must be more than 6 characters, including number, lowercase letter"
                  />

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
                </label>
                <p className="validator-hint hidden">
                  Must be more than 6 characters, including
                  <br />
                  At least one number
                  <br />
                  At least one lowercase letter
                </p>
              </div>

              {/* Confirm Password */}
              <div className="my-4">
                <label className="label block">Confirm Password</label>
                <label className="input validator w-full">
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
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type="password"
                    //   className="input validator"
                    required
                    placeholder="margot123"
                    minLength="6"
                    pattern={`^${password}$`}
                    title="Must be same as password"
                  />
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
                </label>
                <p className="validator-hint hidden">
                  Must be same as password
                </p>
              </div>
            </div>

            <div className="divider divider-horizontal py-8"></div>

            <div className="w-full mx-6">
              {/* Gender*/}
              <div className="mb-4">
                <label className="label mb-2 block">Gender</label>
                <div className="flex  w-full">
                  <label className="w-full flex justify-center">
                    <span className="mr-2">Male</span>
                    <img src={male} width={24} className="h-6 mr-2" />
                    <input
                      className="checkbox checkbox-neutral rounded"
                      type="radio"
                      name="gender"
                      value={"Male"}
                    />
                  </label>

                  <span className="divider divider-horizontal"></span>

                  <label className="w-full flex justify-center">
                    <span className="mr-2">Female</span>
                    <img src={female} width={28} className="h-6 mr-2" />
                    <input
                      className="checkbox checkbox-neutral rounded"
                      type="radio"
                      name="gender"
                      value={"Female"}
                    />
                  </label>
                </div>
                <div className="validator-hint hidden">Enter your name</div>
              </div>

              <button type="submit" className="btn btn-neutral w-full  mt-4">
                Sign Up
              </button>
              <div className="divider mt-8 px-6"></div>
              <div className="text-center mt-4 px-2">
                Already have an account?
                <div className="text-purple-700 link focus:translate-y-1 hover:text-purple-900 transition duration-100">
                  Login
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
