import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-white/70
        backdrop-filter
        backdrop-blur-lg
        pointer-events-none
      "
    >
      <img src="/Spoon.gif" alt="Loader" />
    </div>
  );
};

export default Loader;
