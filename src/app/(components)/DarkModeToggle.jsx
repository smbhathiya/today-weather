import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Retrieve the theme mode preference from localStorage
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode !== null) {
      setIsDarkMode(storedMode === "true");
    }
  }, []);

  useEffect(() => {
    // Apply the dark mode class based on the state
    document.documentElement.classList.toggle("dark", isDarkMode);

    // Persist the preference in localStorage
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-primaryColor dark:bg-PrimaryColor hover:bg-primaryColorHover dark:hover:bg-PrimaryColorHover focus:outline-none"
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? (
        <FaSun className="h-6 w-6 text-white" />
      ) : (
        <FaMoon className="h-6 w-6 text-white" />
      )}
    </button>
  );
}

export default DarkModeToggle;
