import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface WeatherDetailsProps {
  cityName?: string;
  temperature?: number;
  description?: string;
  icon?: string;
  humidity?: number;
  windSpeed?: number;
  isLoading?: boolean;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  cityName,
  temperature,
  description,
  icon,
  humidity,
  windSpeed,
  isLoading = false,
}) => {
  const showSkeletons = isLoading || !cityName;

  return (
    <Card className="mt-4">
      <CardHeader>
        {showSkeletons ? (
          <Skeleton className="h-8 w-48" />
        ) : (
          <CardTitle className="text-2xl font-bold">{cityName}</CardTitle>
        )}
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        {showSkeletons ? (
          <>
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-36" />
            </div>
          </>
        ) : (
          <>
            <Image
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              width={100}
              height={100}
              alt={"Weather Icon"}
            />
            <div>
              <p className="text-xl">{temperature}°C</p>
              <p className="capitalize">{description}</p>
              <p>Humidity: {humidity}%</p>
              <p>Wind Speed: {windSpeed} m/s</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
