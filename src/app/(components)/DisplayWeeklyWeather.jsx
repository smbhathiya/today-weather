"use client";
import React, { useEffect, useState } from "react";
import { getWeatherData } from "../../../lib/api";

function DisplayWeeklyWeather({ cityName }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getWeatherData(cityName)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => console.error("Error fetching weather data:", error));
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

  if (!weatherData) return <p>Loading...</p>;

  const dailyForecast = getDailyForecast(weatherData.list);

  return (
    <div className="p-6 bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
        7-DAY WEATHER FORECAST FOR {cityName.toUpperCase()}
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
