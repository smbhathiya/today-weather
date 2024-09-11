"use client";
import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import DisplayWeather from "./DisplayWeather";
import DisplayWeeklyWeather from "./DisplayWeeklyWeather";
import Footer from "./Footer";
import DarkModeToggle from "./DarkModeToggle";
import { getWeatherByLocation } from "../../../lib/api"; // Ensure this path is correct

const Home = () => {
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherByCurrentLocation = async (latitude, longitude) => {
      try {
        const response = await getWeatherByLocation(latitude, longitude);
        const nearestCity = response.data.city.name; // Adjust according to the API response
        setCityName(nearestCity);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data by location:", error);
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCurrentLocation(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
            setLoading(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  const handleSearch = (city) => {
    setCityName(city);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="flex flex-col items-center p-4 space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
        <Logo />
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <SearchBox onSearch={handleSearch} />
          <DarkModeToggle className="sm:ml-4" />
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
