"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import DisplayWeather from "./DisplayWeather";
import DisplayWeeklyWeather from "./DisplayWeeklyWeather";
import Footer from "./Footer";
import DarkModeToggle from "./DarkModeToggle";

const Home = () => {
  const [cityName, setCityName] = useState("Colombo");

  const handleSearch = (city) => {
    setCityName(city);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="flex justify-between items-center p-4">
        <Logo />
        <div className="flex items-center space-x-4">
          <SearchBox onSearch={handleSearch} />
          <DarkModeToggle /> {/* Add the DarkModeToggle here */}
        </div>
      </header>
      <main>
        <DisplayWeather cityName={cityName} />
        <DisplayWeeklyWeather cityName={cityName} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
