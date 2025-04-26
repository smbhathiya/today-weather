import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";

// Define types for the forecast data
interface Weather {
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  humidity: number;
}

interface Wind {
  speed: number;
}

interface ForecastItem {
  dt_txt: string;
  main: Main;
  weather: Weather[];
  wind: Wind;
}

export async function getCurrentWeather(city: string) {
  try {
    const response = await axios.get(weatherUrl, {
      params: {
        q: city,
        appid: apiKey,
        units: "metric",
      },
    });

    const { name, main, weather, wind } = response.data;
    const { temp, humidity } = main;
    const { description, icon } = weather[0];
    const { speed: windSpeed } = wind;

    return {
      cityName: name,
      temperature: temp,
      description,
      icon,
      humidity,
      windSpeed,
    };
  } catch (error) {
    console.error("Error fetching current weather:", error);
    return null;
  }
}

export async function getTodayForecast(city: string) {
  try {
    const response = await axios.get(forecastUrl, {
      params: {
        q: city,
        appid: apiKey,
        units: "metric",
      },
    });

    const today = new Date().toISOString().split("T")[0];

    const todayForecast = response.data.list
      .filter((item: ForecastItem) => item.dt_txt.startsWith(today))
      .map((item: ForecastItem) => ({
        date: item.dt_txt,
        temperature: item.main.temp,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      }));

    return todayForecast;
  } catch (error) {
    console.error("Error fetching today's forecast:", error);
    return [];
  }
}

export async function getNextFiveDaysForecast(city: string) {
  try {
    const response = await axios.get(forecastUrl, {
      params: {
        q: city,
        appid: apiKey,
        units: "metric",
      },
    });

    const today = new Date().toISOString().split("T")[0];

    const futureForecast = response.data.list
      .filter((item: ForecastItem) => !item.dt_txt.startsWith(today))
      .map((item: ForecastItem) => ({
        date: item.dt_txt,
        temperature: item.main.temp,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      }));

    return futureForecast;
  } catch (error) {
    console.error("Error fetching next 5 days forecast:", error);
    return [];
  }
}
