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
  addMargin?: boolean;
  h3?: boolean;
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
  addMargin,
  h3,
}: Props) {
  // Section Constants
  const TITLE = main ? "h1" : h3 ? "h3" : "h2";
  const WRAPPER = !small && !main ? "div" : React.Fragment;
  // Returns Section Component
  return (
    // Section Container if it is a Normal Section
    <WRAPPER
      {...(!small && !main
        ? {
            className: `${addMargin ? "mx-5" : ""} ${
              h3 ? "" : "mt-16"
            } md:mx-10`.trimStart(),
          }
        : {})}
    >
      {/* Second Section Container */}
      <div
        className={
          main
            ? "flex flex-col justify-center text-gray-500 z-10 px-8 mx-auto my-5 md:gap-3 dark:text-gray-400 highContrast:text-black"
            : small
            ? "flex flex-col gap-7 mt-10"
            : "md:text-center md:max-w-2xl md:mx-auto"
        }
      >
        {/* Helper Span */}
        {preTitle && (
          <span className="text-mateoryPurple font-semibold mb-1 text-center dark:text-mateoryPurpleLight grayScale:grayscale">
            {preTitle}
          </span>
        )}
        {/* Main Section */}
        <section
          className={`flex flex-col grayScale:grayscale ${
            main
              ? "gap-5 text-center"
              : small
              ? "gap-1 md:text-center"
              : "gap-5 mb-10"
          }`}
        >
          {/* Main Section Title */}
          <TITLE
            className={`text-gray-900 dark:text-gray-300 highContrast:text-black lowContrast:text-gray-500 ${
              main
                ? "text-[2.5rem] leading-none font-bold min-[330px]:text-5xl min-[378px]:text-6xl"
                : small
                ? "text-3xl font-semibold"
                : h3
                ? "text-2xl font-semibold md:text-3xl"
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
                ? contentClassName ||
                  "min-[1440px]:flex min-[1440px]:justify-center min-[1440px]:gap-10"
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
