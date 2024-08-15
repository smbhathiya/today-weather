"use client";
import React, { useEffect, useState, useRef } from "react";
import { getWeatherData } from "../../../lib/api";
import {
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";
import SearchBox from "./SearchBox";

function DisplayWeather({cityName}) {
  const [weatherData, setWeatherData] = useState(null);
  //const cityName = "Colombo"; 
  const scrollRef = useRef(null); 

  useEffect(() => {
    getWeatherData(cityName)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }, [cityName]);

  const filterWeatherData = (data) => {
    const now = new Date();
    const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);
    const twelveHoursLater = new Date(now.getTime() + 12 * 60 * 60 * 1000);

    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.dt_txt);
      return itemDate >= twelveHoursAgo && itemDate <= twelveHoursLater;
    });

    const sortedFilteredData = filteredData.sort(
      (a, b) => new Date(a.dt_txt) - new Date(b.dt_txt)
    );

    return sortedFilteredData;
  };

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (!weatherData) return <p>Loading...</p>;

  const filteredData = filterWeatherData(weatherData.list);

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-bold text-center mb-4">
        WEATHER IN {cityName.toUpperCase()} TODAY
      </h1>

      <div className="flex items-center justify-center">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 mx-4  "
        >
          <IoChevronBackCircleOutline
            size={50}
            className="text-black rounded-full hover:scale-125 duration-300"
          />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-scroll no-scrollbar space-x-6 h-[350px] p-6 items-center"
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
                className="p-10 bg-mainColor text-center cursor-pointer hover:bg-mainColorHover hover:scale-110 duration-300 rounded-lg min-w-[250px]"
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
          className="absolute right-0 z-10 mr-4 "
        >
          <IoChevronForwardCircleOutline
            size={50}
            className="text-black rounded-full hover:scale-125 duration-300"
          />
        </button>
      </div>
    </div>
  );
}

export default DisplayWeather;
