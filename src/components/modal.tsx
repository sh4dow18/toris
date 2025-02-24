// Set this component as a client component
"use client";
// Modal Requirements
import { ArrowPathIcon, CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
// Modal Props
type Props = {
  open: boolean;
  status: "success" | "error" | "loading";
  message: string;
  Close: () => void;
};
// Modal Status Titles Record
const STATUS_TITLES: Record<string, string> = {
  success: "¡Éxito!",
  error: "¡Error!",
  loading: "Cargando...",
};
// Modal Main Function
function Modal({ open, status, message, Close }: Props) {
  // Returns Modal Component
  return (
    // Modal Main Container
    <div
      className={
        open ? "fixed top-0 left-0 w-full h-full z-20 bg-gray-900/50" : "hidden"
      }
    >
      {/* Modal Dialog */}
      <dialog
        open={open}
        className="fixed inset-0 m-auto w-72 z-30 flex flex-col gap-5 text-center bg-gray-200 text-gray-700 px-3 pt-6 pb-3 rounded-lg dark:bg-gray-800 dark:text-gray-300 highContrast:bg-white highContrast:text-black sm:w-96"
      >
        {/* Modal Main Image */}
        {status === "success" ? (
          <CheckIcon className="w-14 h-14 mx-auto bg-mateoryPurpleLight text-gray-200 rounded-full p-2 dark:bg-mateoryPurple dark:text-inherit highContrast:bg-mateoryPurple highContrast:text-white" />
        ) : status === "error" ? (
          <XMarkIcon className="w-14 h-14 mx-auto bg-red-800 text-gray-200 rounded-full p-2 dark:text-inherit highContrast:bg-red-500 highContrast:text-white" />
        ) : (
          <ArrowPathIcon className="w-14 h-14 mx-auto animate-spin" />
        )}
        {/* Modal Information */}
        <div className="flex flex-col gap-1 px-3">
          {/* Modal Title */}
          <span className="text-black font-bold dark:text-white">
            {STATUS_TITLES[status]}
          </span>
          {/* Modal Message */}
          <p className="text-sm">{message}</p>
        </div>
        {/* Modal Close Button */}
        <button
          onClick={Close}
          disabled={status === "loading"}
          className="bg-mateoryPurple text-white py-2 rounded-md cursor-pointer hover:bg-mateoryPurpleLight disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-gray-600 dark:disabled:text-gray-400"
        >
          Cerrar
        </button>
      </dialog>
    </div>
  );
}

export default Modal;
