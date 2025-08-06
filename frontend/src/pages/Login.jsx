import React from "react";

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
      <div className=" bg-base-200 border-base-300 rounded-box w-lg border p-7 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

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
          </p>
        </div>

       
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
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>

            <input
              type="password"
              // className="input validator"
              required
              placeholder="margot123"
              minLength="6"
              pattern="(?=.*\d)(?=.*[a-z]).{6,}"
              title="Must be more than 6 characters"
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
            Password should be atleast 6 characters
          </p>
        </div>

        <button className="btn btn-neutral w-full  mt-4">Login</button>

        <div>
            Don't have an account?
            <span>Sign Up Now</span>
        </div>

      </div>
    </>
  );
}

export default Login;
