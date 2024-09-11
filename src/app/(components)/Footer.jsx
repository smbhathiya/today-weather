import React from "react";

const links = [
  { href: "#", text: "Privacy Policy" },
  { href: "#", text: "Terms of Service" },
  { href: "#", text: "Contact Us" },
];

function Footer() {
  return (
    <footer className="bg-mainColor dark:bg-gray-800 text-black dark:text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-8">
        <p className="text-sm font-semibold mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} WEATHER TODAY. All rights reserved.
        </p>
        <div className="flex flex-wrap space-x-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-primaryColor dark:text-primaryColor text-sm hover:underline dark:hover:underline transition-colors duration-300 font-medium"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
