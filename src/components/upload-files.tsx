"use client";
import { useRef, useState } from "react";

interface Props {
  label: string;
  name: string;
  help: string;
}

function UploadFiles({ label, name, help }: Props) {
  const [state, SetState] = useState<"Valid" | "Neutral" | "Invalid">(
    "Neutral"
  );
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const REFERENCE = useRef<HTMLInputElement | null>(null);

  const validateFiles = (files: File[]) => {
    if (files.length === 0) {
      return false;
    }
    let badFile = false;
    files.filter((file) => {
      if (
        file.size > 10 * 1024 * 1024 ||
        (!file.name.endsWith(".png") &&
          !file.name.endsWith(".jpg") &&
          !file.name.endsWith(".jpeg"))
      ) {
        badFile = true;
      }
    });
    if (badFile) {
      return false;
    }
    return true;
  };

  const OnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
      SetState(
        validateFiles(Array.from(event.target.files)) ? "Valid" : "Invalid"
      );
    }
  };

  const OnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // Manejar Drag & Drop en el label
  const OnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = event.dataTransfer.files;
    setFiles([...droppedFiles]);
    if (REFERENCE.current) {
      SetState(validateFiles(Array.from(droppedFiles)) ? "Valid" : "Invalid");
      REFERENCE.current.files = droppedFiles;
    }
  };
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-white font-medium">
        {label}
      </label>
      <div
        onDragOver={OnDragOver}
        onDragLeave={() => {
          setIsDragging(false);
        }}
        onDrop={OnDrop}
        onClick={() => {
          REFERENCE.current !== undefined
            ? REFERENCE.current?.click()
            : undefined;
        }}
        className={`cursor-pointer text-center rounded-md outline outline-2 py-8 px-1 min-[344px]:px-3 ${
          files.length > 0
            ? validateFiles(files)
              ? "bg-gray-700"
              : "bg-red-900"
            : isDragging
            ? "bg-mateoryPurpleLight"
            : "bg-gray-800 outline-gray-800 focus-within:outline-mateoryPurple"
        }`}
      >
        <span
          className={files.length > 0 || isDragging ? "text-white" : undefined}
        >
          {files.length > 0
            ? validateFiles(files)
              ? `¡Hay ${files.length} Archivos listos para subir!`
              : "Hay un Archivo que no cumple con los requisitos"
            : isDragging
            ? "¡Suelta los archivos aquí!"
            : "Haz clic o arrastra archivos aquí"}
        </span>
        <input
          id={name}
          ref={REFERENCE}
          type="file"
          name={name}
          multiple
          aria-invalid={state !== "Neutral" ? state === "Invalid" : undefined}
          onChange={OnChange}
          className="hidden"
        />
      </div>
      <small>{help}</small>
    </div>
  );
}

export default UploadFiles;
