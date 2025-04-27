import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import ForecastListProps from "../types/ForecastListProps";

const getNextFiveDays = () => {
  const today = new Date();
  const days = [];
  for (let i = 1; i <= 5; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    days.push(nextDay.toLocaleString(undefined, { weekday: "long" }));
  }
  return days;
};

const NextFiveDaysForecastList: React.FC<ForecastListProps> = ({
  title,
  forecastData,
  isLoading = false,
}) => {
  const [selectedDay, setSelectedDay] = useState<string | null>("All Days");
  const scrollRef = useRef<HTMLDivElement>(null);

  const dataToFilter = forecastData ?? [];

  const nextFiveDays = getNextFiveDays();

  const filteredForecast =
    selectedDay && selectedDay !== "All Days"
      ? dataToFilter.filter(
          (forecast) =>
            new Date(forecast.date).toLocaleString(undefined, {
              weekday: "long",
            }) === selectedDay
        )
      : dataToFilter;

  const handleChange = (value: string) => {
    setSelectedDay(value);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const showSkeletons = isLoading || (!forecastData && window !== undefined);

  if (!showSkeletons && (!forecastData || forecastData.length === 0)) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <div className="flex gap-2">
          <Select onValueChange={handleChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Days">All Days</SelectItem>
              {nextFiveDays.map((day, index) => (
                <SelectItem key={index} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button size="icon" variant="ghost" onClick={() => scroll("left")}>
            <ChevronLeft />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => scroll("right")}>
            <ChevronRight />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center min-h-[250px]">
        <div
          ref={scrollRef}
          className="overflow-x-auto flex space-x-4 py-2 scroll-smooth scrollbar-hide w-full"
        >
          {showSkeletons
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="min-w-[220px] min-h-[220px] rounded-2xl bg-muted p-4 flex-shrink-0 flex flex-col items-center justify-center space-y-4"
                >
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <Skeleton className="h-5 w-14" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))
            : filteredForecast?.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[220px] min-h-[220px] rounded-2xl bg-muted p-4 flex-shrink-0 flex flex-col items-center justify-center space-y-2 shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary/10 hover:shadow-md"
                >
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleString(undefined, {
                      weekday: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <Image
                    src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                    alt={item.description}
                    width={64}
                    height={64}
                  />
                  <p className="text-lg font-semibold">{item.temperature}°C</p>
                  <p className="capitalize text-sm text-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NextFiveDaysForecastList;
