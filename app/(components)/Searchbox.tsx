"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { getCitySuggestions } from "@/lib/city";

interface CitySuggestion {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
}

interface SearchBoxProps {
  onSearch: (city: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const cities = await getCitySuggestions(inputValue, 5);
        setSuggestions(cities);
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [inputValue]);

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleSuggestionClick = (city: CitySuggestion) => {
    const cityName = `${city.name}`;
    setInputValue(cityName);
    onSearch(cityName);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter city name"
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md dark:bg-gray-800 max-h-60 overflow-y-auto">
          {suggestions.map((city, index) => (
            <li
              key={`${city.lat}-${city.lon}`}
              onClick={() => handleSuggestionClick(city)}
              className={`cursor-pointer px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                index === selectedIndex ? "bg-muted text-muted-foreground" : ""
              }`}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
