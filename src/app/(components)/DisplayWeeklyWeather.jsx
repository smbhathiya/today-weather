"use client";
import React, { useEffect, useState } from "react";
import { getWeatherData } from "../../../lib/api"; // Adjust the import path as necessary

function DisplayWeeklyWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const cityName = "Colombo"; // Default city name

  useEffect(() => {
    getWeatherData(cityName)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }, [cityName]);

  // Function to group weather data by day and return the forecast for the next 7 days
  const getDailyForecast = (data) => {
    const dailyData = {};

    data.forEach((item) => {
      const date = new Date(item.dt_txt);
      const dateString = date.toLocaleDateString("en-GB", {
        weekday: "long", // Show day of the week
        day: "numeric",
        month: "long",
      });

      if (!dailyData[dateString]) {
        dailyData[dateString] = [];
      }

      dailyData[dateString].push(item);
    });

    // Extract the forecast for each day (taking the average temperature and the most frequent weather description)
    const dailyForecast = Object.keys(dailyData)
      .slice(0, 7)
      .map((date) => {
        const dayData = dailyData[date];

        const averageTemp =
          dayData.reduce((total, item) => total + item.main.temp, 0) /
          dayData.length;

        const mainWeather = dayData[0].weather[0]; // Using the first weather condition of the day for simplicity

        return {
          date,
          temp: averageTemp.toFixed(1), // Average temperature rounded to 1 decimal
          description: mainWeather.description,
          icon: mainWeather.icon,
        };
      });

    return dailyForecast;
  };

  if (!weatherData) return <p>Loading...</p>;

  const dailyForecast = getDailyForecast(weatherData.list);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        7-DAY WEATHER FORECAST FOR {cityName.toUpperCase()}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {dailyForecast.map((weather, index) => (
          <div
            className="p-6 bg-mainColor text-center cursor-pointer hover:bg-mainColorHover hover:scale-110 duration-300 rounded-lg"
            key={index}
          >
            <p className="text-lg font-bold">{weather.date}</p>
            <p className="text-3xl font-bold">{weather.temp}°C</p>
            <p className="text-lg">{weather.description}</p>
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
