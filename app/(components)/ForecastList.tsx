import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface ForecastItem {
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

interface ForecastListProps {
  title: string;
  forecastData: ForecastItem[] | null;
  isLoading?: boolean;
}

const ForecastList: React.FC<ForecastListProps> = ({
  title,
  forecastData,
  isLoading = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Show skeleton state either when explicitly loading OR on initial page load
  const showSkeletons = isLoading || (!forecastData && window !== undefined);

  // Only hide the component completely when we know for sure there's no data and we're not loading
  if (!showSkeletons && (!forecastData || forecastData.length === 0)) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <div className="flex gap-2">
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
            : forecastData?.map((item, index) => (
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
                    className="w-16 h-16"
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

export default ForecastList;
