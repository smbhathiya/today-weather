"use client";

import React, { useState, useEffect } from "react";
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
import Footer from "./(components)/Footer";

export default function Home() {
  const [cityName, setCityName] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [todayForecast, setTodayForecast] = useState<any[]>([]);
  const [fiveDayForecast, setFiveDayForecast] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locationFetched, setLocationFetched] = useState<boolean>(false);

  // Track if the component is mounted to prevent state updates after unmount
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useUserLocation(async ({ lat, lon }) => {
    if (!locationFetched && isMounted) {
      setLocationFetched(true);
      const city = await getCityByCoords(lat, lon);
      if (city && isMounted) {
        handleSearch(city);
      }
    }
  });

  const handleSearch = async (city: string) => {
    if (!isMounted) return;
    
    setCityName(city);
    setIsLoading(true);

    try {
      const [currentWeather, today, nextFiveDays] = await Promise.all([
        getCurrentWeather(city),
        getTodayForecast(city),
        getNextFiveDaysForecast(city)
      ]);

      if (isMounted) {
        setWeatherData(currentWeather);
        setTodayForecast(today);
        setFiveDayForecast(nextFiveDays);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <Navbar onSearch={handleSearch} />

      <WeatherDetails
        cityName={weatherData?.cityName}
        temperature={weatherData?.temperature}
        description={weatherData?.description}
        icon={weatherData?.icon}
        humidity={weatherData?.humidity}
        windSpeed={weatherData?.windSpeed}
        isLoading={isLoading}
      />

      <ForecastList 
        title="Today's Forecast" 
        forecastData={todayForecast} 
        isLoading={isLoading} 
      />

      <ForecastList
        title="Next 5 Days Forecast"
        forecastData={fiveDayForecast}
        isLoading={isLoading}
      />
      
      <Footer/>
    </div>
  );
}
