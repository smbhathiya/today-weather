"use client";

import React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import SearchBox from "./Searchbox";
import Image from "next/image";

interface NavbarProps {
  onSearch: (city: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  return (
    <header className="w-full  bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 p-4 sm:flex-row">
        <div className="flex items-center">
          <Image
            src="/cloudy.png"
            alt="Cloudy Icon"
            className="mr-3"
            width={32}
            height={32}
          />
          <h1 className="text-xl font-bold ">TODAY WEATHER</h1>
        </div>
        <nav className="flex items-center gap-4 sm:flex-row sm:gap-6">
          <SearchBox onSearch={onSearch} />
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
