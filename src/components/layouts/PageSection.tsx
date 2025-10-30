import React from "react";
import MaxWidthContainer from "./MaxWidthContainer";

interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

const PageSection = ({
  children,
  className,
  containerClassName,
}: PageSectionProps) => {
  return (
    <section className={`w-full${className ? ` ${className}` : ""}`}>
      <MaxWidthContainer className={containerClassName}>
        {children}
      </MaxWidthContainer>
    </section>
  );
};

export default PageSection;
