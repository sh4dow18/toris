// Set this component as a client component
"use client";
// Toggle Configuration Props
interface Props {
  title: string;
  description: string;
  enabled: boolean;
  OnClick: () => void;
}
// Toggle Configuration Main Function
function ToggleConfiguration({ title, description, enabled, OnClick }: Props) {
  // Returns Toggle Configuration Component
  return (
    // Main Container
    <div className="flex justify-between grayScale:grayscale">
      {/* Main Information Container */}
      <div className="w-40 min-[375px]:w-full min-[375px]:max-w-96">
        <span className="font-semibold text-gray-700 dark:text-gray-300 highContrast:text-black lowContrast:text-gray-500">
          {title}
        </span>
        <p className="leading-6 mt-1">{description}</p>
      </div>
      {/* Toggle Button */}
      <button
        onClick={OnClick}
        className={`flex w-16 h-8 rounded-full p-1 border-2 border-gray-300 cursor-pointer focus:outline-2 focus:outline-mateoryPurple highContrast:border-black
                  ${
                    enabled
                      ? "bg-mateoryPurple"
                      : "bg-gray-300 dark:bg-gray-700 highContrast:bg-black"
                  }`}
      >
        <div
          className={`w-5 h-5 bg-gray-100 rounded-full shadow-md transform transition
                    ${enabled ? "translate-x-7" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

export default ToggleConfiguration;
