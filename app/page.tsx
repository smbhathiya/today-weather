"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./(components)/Navbar";
import WeatherDetails from "./(components)/WeatherDetails";
import ForecastList from "./(components)/ForecastList";
import { getCurrentWeather, getTodayForecast, getNextFiveDaysForecast } from "@/lib/weather";
import { useUserLocation } from "./hooks/useUserLocation";
import { getCityByCoords } from "@/lib/city";
import Footer from "./(components)/Footer";
import NextFiveDaysForecastList from "./(components)/NextFiveDaysForecastList";

interface WeatherData {
  cityName: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

interface ForecastItem {
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

export default function Home() {
  const [cityName, setCityName] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [todayForecast, setTodayForecast] = useState<ForecastItem[]>([]);
  const [fiveDayForecast, setFiveDayForecast] = useState<ForecastItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locationFetched, setLocationFetched] = useState<boolean>(false);

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
        cityName={cityName} 
        temperature={weatherData?.temperature}
        description={weatherData?.description}
        icon={weatherData?.icon}
        humidity={weatherData?.humidity}
        windSpeed={weatherData?.windSpeed}
        isLoading={isLoading}
      />

      <ForecastList title="Today's Forecast" forecastData={todayForecast} isLoading={isLoading} />
      <NextFiveDaysForecastList title="Next 5 Days Forecast" forecastData={fiveDayForecast} isLoading={isLoading} />

      <Footer />
    </div>
  );
}
