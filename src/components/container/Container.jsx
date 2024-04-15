import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`container w-full mx-auto ${className}`}>{children}</div>
  );
};

export default Container;
