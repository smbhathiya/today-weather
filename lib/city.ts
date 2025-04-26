import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const geoUrl = process.env.NEXT_PUBLIC_OPENWEATHER_GEO_URL;

export async function getCitySuggestions(query: string, limit: 5) {
  if (!query.trim()) return [];

  try {
    const response = await axios.get(geoUrl!, {
      params: {
        q: query,
        limit,
        appid: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
}
