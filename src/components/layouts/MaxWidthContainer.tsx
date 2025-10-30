import React from "react";

const MaxWidthContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8${className ? ` ${className}` : ""}`}
    >
      {children}
    </section>
  );
};

export default MaxWidthContainer;
