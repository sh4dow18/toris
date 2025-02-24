// Set this component as a client component
"use client";
// Input Requirements
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { ChangeEvent, useState } from "react";
// Input Props
interface Props {
  label: string;
  placeholder: string;
  name: string;
  help: string;
  validation: string;
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
}
// Input Regular Expressions to use in Validations
const REGEX: Record<string, RegExp> = {
  // Only Positive Numbers
  // Example: 8000 or 0.20
  number: /^[1-9]\d*(\.\d+)?$|^0\.\d*[1-9]\d*$/,
  // Only Positive Numbers and Cero
  // Example: 43450 or 0
  numberWithZero: /^[0-9]\d*(\.\d+)?$|^0\.\d*[0-9]\d*$/,
  // Only Positive Numbers Between Cero and Nine
  // Example: 1 or 9
  numberWithOneDigit: /^[1-9]$/,
  // Only Positive Numbers from number 2 onwards
  servers: /^(?!1$)([1-9]\d*)$/,
  // Only valid names
  // Example: Ramsés Solano or John Smith
  name: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ']+(?: [A-ZÁÉÍÓÚÑ][a-záéíóúñ']+)*$/,
  // Only valid e-mails
  // Example: sh4dow18@mateory.com or example@example.com
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};
// Input Main Function
function Input({
  label,
  placeholder,
  name,
  help,
  validation,
  disabled,
  autoComplete,
  maxLength,
}: Props) {
  // Input Hooks
  const [state, SetState] = useState<"Valid" | "Neutral" | "Invalid">(
    "Neutral"
  );
  // Input on Change Function
  const OnChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Event Value
    const VALUE = event.target.value;
    // If Value is Empty, set Neutral
    if (VALUE.length == 0) {
      SetState("Neutral");
    }
    // If is not empty, check if it is valid
    else {
      // If Value is Valid, set Valid
      if (REGEX[validation ? validation : name].test(VALUE)) {
        SetState("Valid");
        return;
      }
      // If Value is not Valid, set Invalid
      SetState("Invalid");
    }
  };
  // Returns Input Component
  return (
    // Input Container
    <div className="flex flex-col gap-1">
      {/* Input Label */}
      <label
        htmlFor={name}
        aria-disabled={disabled}
        className="text-black font-medium aria-disabled:text-gray-400 dark:text-white dark:aria-disabled:text-gray-700"
      >
        {label}
      </label>
      {/* Input Content Container */}
      <div
        aria-disabled={disabled}
        className="flex place-content-between rounded-md outline-2 py-2 px-1 bg-gray-50 outline-gray-300 focus-within:outline-mateoryPurple aria-disabled:bg-gray-200 aria-disabled:outline-gray-200 dark:bg-gray-800 dark:outline-gray-800 dark:aria-disabled:bg-gray-900 dark:aria-disabled:outline-gray-900 min-[344px]:px-3"
      >
        {/* Main Input */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={`Ejemplo: ${placeholder}`}
          onChange={OnChange}
          aria-invalid={state !== "Neutral" ? state === "Invalid" : undefined}
          disabled={disabled}
          autoComplete={autoComplete || "on"}
          maxLength={maxLength || 10}
          className="bg-transparent outline-hidden text-black disabled:placeholder:text-gray-300 disabled:text-gray-600 dark:text-white dark:disabled:placeholder:text-gray-600"
        />
        {/* Input Validation Icon */}
        {state === "Neutral" ? (
          <div className="hidden min-[360px]:block min-[360px]:w-6 min-[360px]:h-6" />
        ) : state === "Valid" ? (
          <CheckIcon
            aria-disabled={disabled}
            className="hidden min-[360px]:block min-[360px]:w-6 aria-disabled:opacity-0"
          />
        ) : (
          <XMarkIcon
            aria-disabled={disabled}
            className="hidden min-[360px]:block min-[360px]:w-6 min-[360px]:fill-red-500 aria-disabled:opacity-0"
          />
        )}
      </div>
      {/* Input Help Message */}
      <small
        aria-disabled={disabled}
        className={`aria-disabled:text-gray-300 dark:aria-disabled:text-gray-600 ${
          state !== "Neutral"
            ? state === "Invalid"
              ? "text-red-500"
              : undefined
            : undefined
        }`}
      >
        {help}
      </small>
    </div>
  );
}

export default Input;
