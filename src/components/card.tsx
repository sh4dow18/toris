// Card Requirements
import { CheckNumber } from "@/libs/general";
// Card Props
interface Props {
  name: string;
  value: number | string;
  disabled?: boolean;
  staticWidth?: boolean;
}
// Card Main Function
function Card({ name, value, disabled, staticWidth }: Props) {
  // Return Card Component
  return (
    // Card Container
    <article
      className={`flex flex-col gap-2 p-4 rounded-lg shadow-md ${
        disabled ? "bg-gray-100 dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"
      } ${staticWidth === true ? "md:w-[21rem]" : undefined}`.trimEnd()}
    >
      {/* Card Title */}
      <p
        aria-disabled={disabled}
        className="text-sm aria-disabled:text-gray-300 dark:aria-disabled:text-gray-500"
      >
        {name}
      </p>
      {/* Card Value */}
      <p
        aria-disabled={disabled}
        className="font-bold text-2xl text-gray-700 aria-disabled:text-gray-300 dark:text-white dark:aria-disabled:text-gray-500"
      >
        {disabled === true
          ? "No Aplica"
          : typeof value === "string"
          ? value
          : CheckNumber(value)}
      </p>
    </article>
  );
}

export default Card;
