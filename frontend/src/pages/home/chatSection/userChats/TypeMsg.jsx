function TypeMsg() {
  return (
    <div className="flex items-center gap-3 mx-4 my-4">

      {/* Message Input */}
      <div className="flex items-center w-full bg-white/20 backdrop-blur-md border border-white/30 
                      rounded-full px-4 py-2 shadow-md transition-all duration-200
                      focus-within:ring-2 focus-within:ring-purple-400">
        
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full bg-transparent text-white placeholder-white/70 outline-none"
        />

        {/* File Upload */}
        <label className="cursor-pointer flex items-center justify-center p-2 rounded-full 
                           hover:bg-white/20 transition">
          <input type="file" className="hidden" />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="w-6 h-6 opacity-70 hover:opacity-100 transition"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32"
            />
          </svg>
        </label>
      </div>

      {/* Send Button */}
      <button
        className="flex items-center justify-center p-3 rounded-full 
                   bg-purple-600 hover:bg-purple-700 text-white shadow-md
                   transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94"
          />
        </svg>
      </button>
    </div>
  );
}

export default TypeMsg;
