import React from "react";

function Logo() {
  return (
    <div className="flex items-center">
      <img src="/cloudy.png" alt="Cloudy Icon" className="w-10 h-10 mr-3" />
      <h1 className="text-3xl font-extrabold text-primaryColor">
        WEATHER TODAY
      </h1>
    </div>
  );
}

export default Logo;
