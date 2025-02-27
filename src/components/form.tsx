// Set this component as a client component
"use client";
// Form Requirements
import { FormEvent, useEffect, useRef, useState } from "react";
// Form Props
interface Props {
  children: React.ReactNode;
  submitButton: string;
  OnSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
}
// Form Main Function
function Form({ children, submitButton, OnSubmit, className }: Props) {
  // Button Disabled State that always starts with true
  const [disabled, SetDisabled] = useState<boolean>(true);
  // Form Reference
  const REFERENCE = useRef<HTMLFormElement | null>(null);
  // Form Main Use Effect Hook
  useEffect(() => {
    // Update Disable Attribute in Submit Button
    const UpdateButton = () => {
      // If the Reference Exists, continue
      if (REFERENCE.current) {
        // First, get every Input, Textarea and Select in the Form
        // Later, create a new key-value array with input name and aria-invalid attribute
        // Example: [ ["name", true], ["email", false] ]
        const inputsList = Array.from(
          REFERENCE.current.querySelectorAll<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          >("input, textarea")
        )
          .filter((input) => !input.disabled)
          .map((input) => [
            input.name,
            input.getAttribute("aria-invalid") === "false",
          ]);
        // Create a new object from a key-value array
        // Example: From [ ["name", true], ["email", false] ] to { name: true, email: false }
        const FORM_OBJECT = Object.fromEntries(inputsList);
        // Get values from FORM_OBJECT to check if every value is true
        // If it is true, set false, if not, set true
        SetDisabled(!Object.values(FORM_OBJECT).every(Boolean));
      }
    };
    // Update Button Function Call
    UpdateButton();
    // Create a new observer for "aria invalid" attributes to update the disabled attribute on the Submit button
    // Mutation Observer can observe changes in the DOM
    const ARIA_INVALID_OBSERVER = new MutationObserver(UpdateButton);
    // If the Reference Exists, continue
    if (REFERENCE.current) {
      // Aria Invalid Observer can observe attributes and subtrees, but focuses on the aria-invalid attribute and its children
      ARIA_INVALID_OBSERVER.observe(REFERENCE.current, {
        attributes: true,
        subtree: true,
        attributeFilter: ["aria-invalid", "disabled"],
        childList: true,
      });
    }
    // When useEffect finishes, unmount the observer
    return () => {
      ARIA_INVALID_OBSERVER.disconnect();
    };
  }, []);
  // Returns Form Component
  return (
    <form
      className={className || "grayScale:grayscale min-[1024px]:max-w-3xl min-[1440px]:max-w-2xl"}
      ref={REFERENCE}
      onSubmit={OnSubmit}
    >
      {/* Form Body */}
      {children}
      {/* Form Submit Button */}
      <button
        type="submit"
        disabled={disabled}
        className="w-full mt-5 py-2 px-3 font-medium rounded-md text-center text-white bg-mateoryPurple cursor-pointer hover:bg-mateoryPurpleLight disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-500 dark:disabled:text-inherit highContrast:disabled:bg-gray-500 highContrast:disabled:text-white"
      >
        {submitButton}
      </button>
    </form>
  );
}

export default Form;
