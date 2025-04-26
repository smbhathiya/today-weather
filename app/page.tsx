"use client";

import React, { useState } from "react";
import Navbar from "./(components)/Navbar";
import WeatherDetails from "./(components)/WeatherDetails";
import ForecastList from "./(components)/ForecastList";
import {
  getCurrentWeather,
  getTodayForecast,
  getNextFiveDaysForecast,
} from "@/lib/weather";
import { useUserLocation } from "./hooks/useUserLocation";
import { getCityByCoords } from "@/lib/city";

export default function Home() {
  const [cityName, setCityName] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [todayForecast, setTodayForecast] = useState<any[]>([]);
  const [fiveDayForecast, setFiveDayForecast] = useState<any[]>([]);

  useUserLocation(async ({ lat, lon }) => {
    const city = await getCityByCoords(lat, lon);
    if (city) {
      handleSearch(city);
    }
  });

  const handleSearch = async (city: string) => {
    setCityName(city);

    const currentWeather = await getCurrentWeather(city);
    setWeatherData(currentWeather);

    const today = await getTodayForecast(city);
    setTodayForecast(today);

    const nextFiveDays = await getNextFiveDaysForecast(city);
    setFiveDayForecast(nextFiveDays);
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <Navbar onSearch={handleSearch} />

      {weatherData ? (
        <WeatherDetails
          cityName={weatherData.cityName}
          temperature={weatherData.temperature}
          description={weatherData.description}
          icon={weatherData.icon}
          humidity={weatherData.humidity}
          windSpeed={weatherData.windSpeed}
        />
      ) : (
        <p className="mt-4">Search for a city to see the weather details.</p>
      )}

      {todayForecast.length > 0 && (
        <ForecastList title="Today's Forecast" forecastData={todayForecast} />
      )}

      {fiveDayForecast.length > 0 && (
        <ForecastList
          title="Next 5 Days Forecast"
          forecastData={fiveDayForecast}
        />
      )}
    </div>
  );
}
