"use client";
import React, { useState } from "react";
import SearchBox from "./SearchBox";
import DisplayWeather from "./DisplayWeather";
import DisplayWeeklyWeather from "./DisplayWeeklyWeather";


const Home = () => {
  const [cityName, setCityName] = useState("Colombo");

  const handleSearch = (city) => {
    setCityName(city);
  };

  return (
    <div>
      <SearchBox onSearch={handleSearch} />
      <DisplayWeather cityName={cityName} />
      <DisplayWeeklyWeather cityName={cityName} />
    </div>
  );
};

export default Home;
