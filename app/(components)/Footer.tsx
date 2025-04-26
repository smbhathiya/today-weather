import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-background/80 backdrop-blur-sm mt-10 py-5">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Today Weather. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Powered by OpenWeather
          </a>
          <a
            href="https://github.com/smbhathiya/today-weather.git"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
