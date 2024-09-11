"use client";
import React, { useState, useEffect } from "react";
import { getCitySuggestions } from "../../../lib/api"; // Adjust import path as needed

function SearchBox({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (inputValue) {
      const fetchSuggestions = async () => {
        try {
          const response = await getCitySuggestions(inputValue);
          if (response.data && response.data.list) {
            setSuggestions(response.data.list); // Adjust according to the actual response structure
          }
        } catch (error) {
          console.error("Error fetching city suggestions:", error);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSelectedIndex(-1); // Reset selection index on input change
  };

  const handleSearchClick = () => {
    if (inputValue.trim()) {
      onSearch(inputValue);
      setSuggestions([]); // Clear suggestions after search
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        setInputValue(suggestions[selectedIndex].name);
        handleSearchClick();
      } else {
        handleSearchClick();
      }
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) =>
        Math.max(prevIndex - 1, 0)
      );
    }
  };

  const handleSuggestionClick = (city) => {
    setInputValue(city.name);
    onSearch(city.name);
    setSuggestions([]);
  };

  return (
    <div className="text-center relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter city name"
        className="border rounded py-2 px-4 mt-4 mb-4 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />
      <button
        onClick={handleSearchClick}
        className="bg-primaryColor hover:bg-primaryColorHover text-white font-bold py-2 px-4 rounded dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        Search City
      </button>
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded mt-1 max-h-60 overflow-y-auto z-10">
          {suggestions.map((city, index) => (
            <li
              key={city.id}
              onClick={() => handleSuggestionClick(city)}
              className={`py-2 px-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 ${
                index === selectedIndex ? 'bg-gray-300 dark:bg-gray-600' : ''
              }`}
            >
              {city.name}, {city.sys.country} {/* Display city name and country */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
