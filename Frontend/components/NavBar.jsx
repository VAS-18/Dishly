import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className=" flex w-full justify-center">
      <div className="flex justify-between items-center m-10 mx-20 w-full max-w-4xl">
        <div className="flex justify-center items-center gap-2">
          <img
            src="/Logo.png"
            alt="Logo"
            height={60}
            width={60}
            className="rounded-lg"
          />
          <span className="font-bold text-xl">Dishly</span>
        </div>
        <div>
          <button
            onClick={() => navigate("/login")}
            className="group flex items-center bg-green-100 text-green-700 font-semibold py-2 pl-4 pr-2 rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:bg-green-200 cursor-pointer"
          >
            <span className="whitespace-nowrap mr-1 group-hover:mr-2 transition-all duration-300">
              Return to kitech
            </span>
            <div className="w-0 group-hover:w-6 transition-all duration-300 overflow-hidden flex items-center justify-center">
              <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 h-5 w-5" />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
