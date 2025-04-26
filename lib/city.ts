import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function getCitySuggestions(query: string, limit: 5) {
  if (!query.trim()) return [];

  try {
    const response = await axios.get(
      "http://api.openweathermap.org/geo/1.0/direct"!,
      {
        params: {
          q: query,
          limit,
          appid: apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
}

export async function getCityByCoords(
  lat: number,
  lon: number
): Promise<string | null> {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat,
          lon,
          appid: apiKey,
        },
      }
    );
    return response.data.name;
  } catch (error) {
    console.error("Error fetching city by coordinates:", error);
    return null;
  }
}
