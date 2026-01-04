import React from "react";

const LogoutButton = () => (
  <button
    onClick={() => {
      localStorage.clear();
      window.location.href = "/login";
    }}
    className="absolute top-6 right-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-semibold"
  >
    Logout
  </button>
);

export default LogoutButton;
