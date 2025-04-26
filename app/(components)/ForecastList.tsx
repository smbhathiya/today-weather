import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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
  isLoading,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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

      <CardContent>
        <div
          ref={scrollRef}
          className="overflow-x-auto flex space-x-4 py-2 scroll-smooth scrollbar-hide"
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="min-w-[220px] min-h-[220px] rounded-2xl bg-muted p-4 flex-shrink-0 text-center space-y-2"
                >
                  <Skeleton className="h-4 w-20 mx-auto" />
                  <Skeleton className="h-16 w-16 mx-auto rounded-full" />
                  <Skeleton className="h-5 w-14 mx-auto" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              ))
            : forecastData?.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[220px] min-h-[220px] rounded-2xl bg-muted p-4 flex-shrink-0 text-center justify-center shadow-sm transition hover:shadow-md"
                >
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleString(undefined, {
                      weekday: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                    alt={item.description}
                    className="w-16 h-16 mx-auto"
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
