import React, { useState } from "react";

function SearchBox({onSearch}) {
  const [inputValue,setInputValue] = useState("");
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSearchClick = () => {
    if(inputValue.trim()){
      onSearch(inputValue);
    }
  };

  return (
    <>
      <div className="text-center">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter city name"
        className="border rounded py-2 px-4 mt-4 mb-4 mr-2"
      />
      <button 
        onClick={handleSearchClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Search City
      </button>
      </div>
    </>
  );
}

export default SearchBox;
