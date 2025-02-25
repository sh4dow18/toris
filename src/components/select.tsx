// Select Requirements
import { ChevronDownIcon } from "@heroicons/react/16/solid";
// Select Props
interface Props {
  name: string;
  label: string;
  optionsList: { name: string; value: string }[];
}
// Select Main Function
function Select({ name, label, optionsList }: Props) {
  // Returns Select Component
  return (
    // Select Container
    <div className="flex flex-col gap-1 min-[768px]:w-1/3">
      {/* Select Label */}
      <label
        htmlFor={name}
        className="text-black font-medium dark:text-white lowContrast:text-gray-500"
      >
        {label}
      </label>
      {/* Select Content Container */}
      <div className="relative w-full">
        {/* Main Select */}
        <select
          id={name}
          name={name}
          className="w-full appearance-none bg-gray-50 text-black rounded-md outline-2 py-2 pl-1 outline-gray-300 focus-within:outline-mateoryPurple dark:bg-gray-800 dark:text-white dark:outline-gray-800 highContrast:bg-white highContrast:outline-black lowContrast:bg-gray-100 lowContrast:outline-gray-300 lowContrast:text-gray-500 min-[344px]:pl-3"
        >
          {optionsList.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {/* Select Arrow */}
        <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
          <ChevronDownIcon className="w-5" />
        </div>
      </div>
    </div>
  );
}

export default Select;
