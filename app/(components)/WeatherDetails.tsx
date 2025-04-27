import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
    <Card className="mt-6 max-w-5xl mx-auto bg-card shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="py-8">
        <div className="flex flex-col lg:flex-row justify-between gap-8 border-l-0 lg:border-l border-muted">
          <div className="flex-1 flex items-center justify-center py-4 lg:border-r border-muted">
            {showSkeletons ? (
              <Skeleton className="h-10 w-60 rounded-md" />
            ) : (
              <CardTitle className="text-4xl font-bold tracking-tight text-center uppercase">
                {cityName}
              </CardTitle>
            )}
          </div>
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-6">
            {showSkeletons ? (
              <div className="flex flex-col items-center gap-4">
                <Skeleton className="w-18 h-18 rounded-full" />
                <div className="space-y-4 w-full max-w-xs">
                  <Skeleton className="h-7 w-20 mx-auto" />
                  <Skeleton className="h-5 w-28 mx-auto" />
                  <Skeleton className="h-5 w-36 mx-auto" />
                  <Skeleton className="h-5 w-40 mx-auto" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-muted rounded-full opacity-50 group-hover:opacity-70 transition-opacity"></div>
                  <Image
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    width={100}
                    height={100}
                    alt="Weather Icon"
                    className="relative z-10 transform group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 space-y-3 text-center sm:text-left">
                  <p className="text-3xl font-semibold tracking-tight">
                    {temperature}°C
                  </p>
                  <p className="text-xl capitalize">{description}</p>
                  <div className="flex gap-6 text-base justify-center sm:justify-start">
                    <p>Humidity: {humidity}%</p>
                    <p>Wind: {windSpeed} m/s</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
