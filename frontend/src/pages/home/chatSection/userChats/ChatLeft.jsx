import React from "react";
import { useState } from "react";

function ChatLeft() {
  const messageOptions = (
    <button className="dropdown dropdown-end btn shadow-none z-2  bg-neutral h-4 w-2 border-none ">
      <div tabIndex={0} role="button" className="">
        <svg
          className="h-[1em]  text-gray-50 "
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </g>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content translate-y-14 menu bg-base-300 rounded-box z-10 w-36 p-2 shadow-sm"
      >
        <li>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.0"
              stroke="currentColor"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.49 12 3.74 8.248m0 0 3.75-3.75m-3.75 3.75h16.5V19.5"
              />
            </svg>
            <a>Reply</a>
          </div>
        </li>

        <li>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.0"
              stroke="currentColor"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
            <a>Copy</a>
          </div>
        </li>
        <li>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.0"
              stroke="currentColor"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.49 12 3.75-3.751m0 0-3.75-3.75m3.75 3.75H3.74V19.5"
              />
            </svg>

            <a>Forward</a>
          </div>
        </li>
      </ul>
    </button>
  );

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="px-6">
      <div className="chat chat-start ">
        <div
          className="chat-bubble chat-bubble-neutral py-0 pr-0 text-wrap "
          onMouseEnter={() => setShowModal(true)}
          onMouseLeave={() => setShowModal(false)}
        >
          <div
            className={`w-full flex justify-end  ${
              showModal ? "" : "opacity-0"
            }`}
          >
            {messageOptions}
          </div>

          <span className="mr-3">
            Put me on the Council and not make me a Master!??
          </span>
          <span className="flex justify-end mr-3">
            <time className="text-xs opacity-50">00:00 am</time>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatLeft;
