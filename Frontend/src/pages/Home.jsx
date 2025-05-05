import * as React from "react";
import { Link } from "react-router-dom";

import "@radix-ui/themes/styles.css";

const heroCollagePlaceholder = "/source.jpeg";



export default function Landing() {
  return (
    <>
      <main className="flex-1 flex items-center justify-center py-16 md:py-24 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <p className="text-lg font-medium text-red-500 mb-2">
              Your Go-To Foodie Social App
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-800 mb-6 leading-tight">
              Discover Food Through Community
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              We believe food is best enjoyed when shared. Dishly is your go-to
              platform for discovering restaurants, sharing food experiences,
              and connecting with fellow food lovers. Find the best places to
              eat with real reviews, ratings, and photos from the community.
            </p>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>

          <div className="flex justify-center items-center relative">
            <img
              src={heroCollagePlaceholder}
              alt="Food collage"
              className="rounded-lg max-w-full h-auto"
            />
          </div>
        </div>
      </main>

      <footer className="text-center text-gray-500 dark:text-gray-400 p-6 text-sm border-t border-gray-200 dark:border-gray-800">
        &copy; {new Date().getFullYear()} Dishly. Crafted with{" "}
        <span className="text-red-500">♥</span> for food lovers
      </footer>
    </>
  );
}
