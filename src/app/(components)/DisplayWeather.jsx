"use client";
import React, { useEffect, useState, useRef } from "react";
import { getWeatherData, getWeatherByLocation } from "../../../lib/api";
import { IoChevronBackCircleOutline, IoChevronForwardCircleOutline } from "react-icons/io5";

function DisplayWeather({ cityName }) {
  const [weatherData, setWeatherData] = useState(null);
  const [userCity, setUserCity] = useState(cityName);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchWeatherData = async (city) => {
      try {
        const response = await getWeatherData(city);
        if (response.data && response.data.list.length > 0) {
          setWeatherData(response.data);
          setUserCity(city);
          setError(null); // Clear any previous errors
        } else {
          setError("City not found. Showing nearest location...");
          getLocation(); // Fetch weather by location if city is not found
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Error fetching weather data. Showing nearest location...");
        getLocation(); // Fallback to location-based weather data
      }
    };

    const fetchWeatherByLocation = async (latitude, longitude) => {
      try {
        const response = await getWeatherByLocation(latitude, longitude);
        const nearestCity = response.data.city.name; // Adjust according to the API response
        setUserCity(nearestCity);
        setWeatherData(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching weather data by coordinates:", error);
        setError("Unable to fetch weather data by location.");
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByLocation(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
            setError("Geolocation not available. Showing default city.");
            fetchWeatherData(cityName); // Fallback if location is denied or unavailable
          }
        );
      } else {
        setError("Geolocation not supported. Showing default city.");
        fetchWeatherData(cityName); // Fallback if geolocation is not supported
      }
    };

    fetchWeatherData(cityName); // Fetch weather data for the initial city

  }, [cityName]);

  const filterWeatherData = (data) => {
    const now = new Date();
    const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);
    const twelveHoursLater = new Date(now.getTime() + 12 * 60 * 60 * 1000);

    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.dt_txt);
      return itemDate >= twelveHoursAgo && itemDate <= twelveHoursLater;
    });

    return filteredData.sort((a, b) => new Date(a.dt_txt) - new Date(b.dt_txt));
  };

  const scroll = (direction) => {
    const { current } = scrollRef;
    current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
  };

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!weatherData) return <p className="text-center">Loading...</p>;

  const filteredData = filterWeatherData(weatherData.list);

  return (
    <div className="p-6 relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold text-center mb-4">
        WEATHER IN {userCity.toUpperCase()} TODAY
      </h1>

      <div className="flex items-center justify-center">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 mx-4 p-2 rounded-full hover:scale-150 duration-300"
        >
          <IoChevronBackCircleOutline
            size={50}
            className="text-gray-900 dark:text-gray-100"
          />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-scroll scrollbar space-x-6 h-[350px] p-6 items-center"
        >
          {filteredData.map((weather, index) => {
            const weatherDate = new Date(weather.dt_txt);
            const weatherTime = weatherDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            const weatherDateStr = weatherDate.toLocaleDateString();

            return (
              <div
                className="p-10 bg-mainColor dark:bg-gray-700 text-center cursor-pointer hover:bg-mainColorHover dark:hover:bg-gray-600 hover:scale-110 duration-300 rounded-lg min-w-[250px]"
                key={index}
              >
                <p className="text-sm font-bold">{weatherDateStr}</p>
                <p className="text-lg font-bold">{weatherTime}</p>
                <p className="text-xl">{weather.main.temp}°C</p>
                <p className="text-lg">{weather.weather[0].description}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                  className="mx-auto"
                />
              </div>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 mr-4 p-2 rounded-full hover:scale-150 duration-300"
        >
          <IoChevronForwardCircleOutline
            size={50}
            className="text-gray-900 dark:text-gray-100"
          />
        </button>
      </div>
    </div>
  );
}

export default DisplayWeather;
