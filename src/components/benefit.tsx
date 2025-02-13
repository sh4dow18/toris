// Benefit Requiremeents
import { cloneElement, ReactElement } from "react";
// Benefit Props
interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
}
// Benefit Main Function
function Benefit({ title, description, icon }: Props) {
  // Returns Benefit Component
  return (
    // Benefit Main Container
    <div className="flex gap-3 md:max-w-xs lg:max-w-sm xl:max-w-md">
      {/* Benefit Icon Container */}
      <div>
        {/* Benefit Icon */}
        {cloneElement(icon as ReactElement, {
          className: "w-10 p-2 bg-mateoryPurple fill-gray-200 rounded-lg",
        })}
      </div>
      {/* Benefit Information Container */}
      <div className="flex flex-col gap-2">
        {/* Benefit Title */}
        <span className="font-semibold text-gray-300">{title}</span>
        {/* Benefit Description */}
        <p className="leading-7">{description}</p>
      </div>
    </div>
  );
}

export default Benefit;
