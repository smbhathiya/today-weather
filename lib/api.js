import React from 'react'
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_BASE_URL;

export const getWeatherData = (city) => {


    return axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          units: "metric",
          appid: API_KEY,
        },
      });
}

export const getWeatherByLocation = (lat,lon) => {
    return axios.get(`${BASE_URL}/forecast`,{
        params:{
            lat,
            lon,
            units: "metric",
            appid: API_KEY,
        },
    });
}

