// Section Requirements
import React from "react";
// Section Props
interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
  contentClassName?: string;
  preTitle?: string;
  small?: boolean;
  main?: boolean;
}
// Section Main Function
function Section({
  title,
  description,
  children,
  contentClassName,
  preTitle,
  small,
  main,
}: Props) {
  // Section Constants
  const TITLE = main ? "h1" : "h2";
  const WRAPPER = !small && !main ? "div" : React.Fragment;
  // Returns Section Component
  return (
    // Section Container if it is a Normal Section
    <WRAPPER
      {...(!small && !main
        ? { className: "mx-5 my-16 min-[570px]:mx-10" }
        : {})}
    >
      {/* Second Section Container */}
      <div
        className={
          main
            ? "flex flex-col justify-center text-gray-400 z-10 px-8 mx-auto my-5 md:gap-3"
            : small
            ? "flex flex-col gap-7 mt-10"
            : "md:text-center md:max-w-2xl md:mx-auto"
        }
      >
        {/* Helper Span */}
        {preTitle && (
          <span className="text-mateoryPurpleLight font-semibold mb-1">
            {preTitle}
          </span>
        )}
        {/* Main Section */}
        <section
          className={`flex flex-col ${
            main
              ? "gap-5 text-center"
              : small
              ? "gap-1 md:text-center"
              : "gap-5 mb-10"
          }`}
        >
          {/* Main Section Title */}
          <TITLE
            className={`text-gray-300 ${
              main
                ? "text-5xl font-bold min-[378px]:text-6xl"
                : small
                ? "text-3xl font-semibold"
                : "text-4xl font-bold md:text-5xl"
            }`}
          >
            {title}
          </TITLE>
          {/* Main Section Description */}
          <p className={main ? undefined : small ? "text-pretty" : "leading-8"}>
            {description}
          </p>
        </section>
        {/* Content if it is the Main Section or a Little Section */}
        {(small || main) && (
          <div
            className={
              main
                ? "min-[1440px]:flex min-[1440px]:gap-10"
                : contentClassName ||
                  "flex flex-col gap-3 min-[768px]:flex-row min-[768px]:flex-wrap min-[768px]:justify-center min-[768px]:gap-5"
            }
          >
            {children}
          </div>
        )}
      </div>
      {/* Content if it is a Normal Section */}
      {!small && !main && <div className={contentClassName}>{children}</div>}
    </WRAPPER>
  );
}

export default Section;
