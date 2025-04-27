import ForecastItem from "./ForecastItem";

interface ForecastListProps {
  title: string;
  forecastData: ForecastItem[] | null;
  isLoading?: boolean;
}

export default ForecastListProps;
