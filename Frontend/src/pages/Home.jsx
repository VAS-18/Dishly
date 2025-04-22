import * as React from "react";
import { Link } from "react-router-dom";
import { Image, Users, ChevronRight } from "lucide-react";
import * as ButtonPrimitive from "@radix-ui/react-slot";
import "@radix-ui/themes/styles.css";

const heroImg =
  "https://images.unsplash.com/photo-1511690656852-a4d90&q=80"; // Placeholder for the incomplete URL

// Custom Button using Radix Slot to accept children and className
const Button = React.forwardRef(({ asChild, className = "", variant = "solid", size = "lg", ...props }, ref) => {
  const Comp = asChild ? ButtonPrimitive.Slot : "button";

  const baseStyles = "inline-flex items-center justify-center rounded-2xl font-semibold transition-colors duration-300";
  const sizeStyles = {
    lg: "text-base px-8 py-4",
  };
  const variantStyles = {
    solid: "bg-indigo-600 text-white hover:bg-indigo-500",
    outline: "border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
  };

  return (
    <Comp
      ref={ref}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
});
Button.displayName = "Button";

export default function Landing() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Hero Section */}
      <header className="flex-1 flex items-center justify-center flex-col text-center px-4 pt-16 pb-12">
        <div className="flex justify-center mb-10 w-full max-w-4xl px-4">
          <div className="relative group">
            <img
              src={heroImg}
              alt="Delicious food"
              className="rounded-2xl shadow-2xl w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-3xl"
              style={{ maxHeight: 420, minHeight: 280 }}
            />
            <div className="absolute inset-0 bg-black/10 rounded-2xl group-hover:opacity-0 transition-opacity duration-300"></div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 max-w-3xl mx-auto leading-tight animate-fade-in">
          Capture, Share, and Savor Your Culinary Journey
        </h1>

        <p className="text-lg md:text-xl max-w-2xl text-gray-600 dark:text-gray-300 mx-auto mb-8 animate-fade-in delay-100">
          Transform every meal into a memorable story. Connect with food lovers, discover amazing cuisines, and inspire your next culinary adventure.
        </p>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-center animate-fade-in delay-200">
          <Link to="/register" className="group">
            <Button className="group-hover:pr-6 group-hover:gap-2 flex items-center gap-1">
              Get Started
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </Link>

          <Link to="/login">
            <Button variant="outline">Log In</Button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="w-full bg-white/50 dark:bg-gray-900/50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Image className="w-10 h-10 text-indigo-600" />,
              title: "Showcase Your Dishes",
              description:
                "Capture stunning food photos and share your culinary creations with a passionate community.",
            },
            {
              icon: <Users className="w-10 h-10 text-green-500" />,
              title: "Connect with Foodies",
              description:
                "Engage with fellow food enthusiasts, exchange recipes, and discover hidden culinary gems.",
            },
            {
              icon: <span className="text-2xl font-bold text-orange-500">🍽</span>,
              title: "Endless Inspiration",
              description:
                "Explore diverse cuisines, trending recipes, and get inspired by food stories from around the world.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group transform transition-transform hover:-translate-y-2 hover:scale-[1.02]"
            >
              <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 dark:text-gray-400 p-6 text-sm">
        &copy; {new Date().getFullYear()} GrubGram. Crafted with <span className="text-red-500">♥</span> for food lovers
      </footer>
    </div>
  );
}
