import React from "react";
import "./Loader.css";
import LoaderSvg from "../../assets/loader.svg";

export default function Loader() {
  return (
    <div className="preloader">
      <img src={LoaderSvg} alt="spinner" />
    </div>
  );
}
