import React from "react";

function Footer() {
  return (
    <footer className="bg-mainColor dark:bg-gray-800 text-black dark:text-gray-300 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm font-semibold">
          &copy; {new Date().getFullYear()} WEATHER TODAY. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-primaryColor hover:text-primaryColorHover dark:text-primaryColor dark:hover:text-primaryColorHover"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-primaryColor hover:text-primaryColorHover dark:text-primaryColor dark:hover:text-primaryColorHover"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-primaryColor hover:text-primaryColorHover dark:text-primaryColor dark:hover:text-primaryColorHover"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
