"use client";
import React, { useEffect, useState } from "react";
import { getWeatherData, getWeatherByLocation } from "../../../lib/api";

function DisplayWeeklyWeather({ cityName }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (city) => {
      try {
        const response = await getWeatherData(city);
        if (response.data && response.data.list.length > 0) {
          setWeatherData(response.data);
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
            fetchWeatherData(cityName || "London"); // Fallback to a default city if geolocation fails
          }
        );
      } else {
        setError("Geolocation not supported. Showing default city.");
        fetchWeatherData(cityName || "London"); // Fallback to a default city if geolocation is not supported
      }
    };

    if (cityName) {
      fetchWeatherData(cityName); // Fetch weather data for the specified city
    } else {
      getLocation(); // Fetch weather data based on current location if no city is specified
    }

  }, [cityName]);

  const getDailyForecast = (data) => {
    const dailyData = {};

    data.forEach((item) => {
      const date = new Date(item.dt_txt);
      const dateString = date.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });

      if (!dailyData[dateString]) {
        dailyData[dateString] = [];
      }

      dailyData[dateString].push(item);
    });

    const dailyForecast = Object.keys(dailyData)
      .slice(0, 7)
      .map((date) => {
        const dayData = dailyData[date];

        const averageTemp =
          dayData.reduce((total, item) => total + item.main.temp, 0) /
          dayData.length;

        const mainWeather = dayData[0].weather[0];
        return {
          date,
          temp: averageTemp.toFixed(1),
          description: mainWeather.description,
          icon: mainWeather.icon,
        };
      });

    return dailyForecast;
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!weatherData) {
    return <p className="text-center">Loading...</p>;
  }

  const dailyForecast = getDailyForecast(weatherData.list);

  return (
    <div className="p-6 bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
        7-DAY WEATHER FORECAST FOR {cityName ? cityName.toUpperCase() : "CURRENT LOCATION"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {dailyForecast.map((weather, index) => (
          <div
            className="p-4 bg-mainColor dark:bg-gray-800 text-center pt-10 pb-10 cursor-pointer hover:bg-mainColorHover dark:hover:bg-gray-700 hover:scale-110 duration-300 rounded-lg"
            key={index}
          >
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {weather.date}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {weather.temp}°C
            </p>
            <p className="text-lg text-gray-900 dark:text-gray-300">
              {weather.description}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="Weather icon"
              className="mx-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayWeeklyWeather;
