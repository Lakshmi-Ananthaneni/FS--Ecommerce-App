import React from "react";
import { useNavigate } from "react-router-dom";

export const Error = () => {
  const navigate= useNavigate();
  return (
    <div>
      <h2>404 ! Page not found</h2>
      <button className="btn" onClick={() => {
        navigate("/", {replace: true})
      }}>
        Go to Home
      </button>
    </div>
  )
};