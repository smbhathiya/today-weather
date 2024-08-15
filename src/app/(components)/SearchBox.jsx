import React, { useState } from "react";

function SearchBox({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <div className="text-center">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter city name"
        className="border rounded py-2 px-4 mt-4 mb-4 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />
      <button
        onClick={handleSearchClick}
        className="bg-primaryColor hover:bg-primaryColorHover text-white font-bold py-2 px-4 rounded dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        Search City
      </button>
    </div>
  );
}

export default SearchBox;
