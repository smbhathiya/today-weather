"use client";

import { useEffect } from "react";

interface LocationData {
  lat: number;
  lon: number;
}

export function useUserLocation(onSuccess: (location: LocationData) => void) {
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        onSuccess(location);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, [onSuccess]);
}
