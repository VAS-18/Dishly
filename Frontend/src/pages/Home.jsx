import { Link, useNavigate } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import NavBar from "../../components/NavBar";
import { ArrowRight } from "lucide-react";

const heroCollagePlaceholder = "/source.jpeg";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Welcome to Dishly!";
  }, []);

  return (
    <>
      <NavBar />
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
            <div>
              <button
                onClick={() => navigate("/register")}
                className="group flex items-center bg-sunset hover:bg-orange-600 text-white font-bold py-2 pl-4 pr-2 rounded-full overflow-hidden transition-all duration-300 ease-in-out cursor-pointer"
              >
                <span className="whitespace-nowrap mr-1 group-hover:mr-1 transition-all duration-300">
                  Join The Kitchen Now!
                </span>
                <div className="w-0 group-hover:w-6 transition-all duration-300 overflow-hidden flex items-center justify-center">
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 h-5 w-5" />
                </div>
              </button>
            </div>
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

      <Footer />
    </>
  );
}
