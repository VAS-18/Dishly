import React from "react";

const Footer = () => {
  return (
    <footer className="absolute w-full bottom-0 text-center text-gray-500 dark:text-gray-400 p-6 text-sm border-t border-gray-200 dark:border-gray-800 flex items-center justify-center gap-1"> {/* Use flex for alignment */}
      &copy; {new Date().getFullYear()} Dishly. Crafted with

      <img
        src="/Fire.gif" 
        alt="love"
        className="inline-block h-4 w-4 align-middle"
      />
      for food lovers
    </footer>
  );
};

export default Footer;
