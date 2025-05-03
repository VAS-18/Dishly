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
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperClass="color-ring-wrapper"
        colors={[
          "#e15b64",
          "#f47e60",
          "#f8b26a",
          "#abbd81",
          "#849b87",
        ]}
      />
    </div>
  );
};

export default Loader;
