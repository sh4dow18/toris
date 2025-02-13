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
      <label htmlFor={name} className="text-white font-medium">
        {label}
      </label>
      {/* Select Content Container */}
      <div className="relative w-full">
        {/* Main Select */}
        <select
          id={name}
          name={name}
          className="w-full appearance-none bg-gray-800 text-white rounded-md outline outline-2 py-2 pl-1 outline-gray-800 focus-within:outline-mateoryPurple min-[344px]:pl-3"
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
