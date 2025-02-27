// Set this component as a client component
"use client";
// Mateory Logo Requirements
import Image from "next/image";
import { useEffect, useState } from "react";
// Mateory Logo Props
interface Props {
  width: number;
  height: number;
  className: string;
}
// Mateory Logo Main Function
function MateoryLogo({ width, height, className }: Props) {
  // Mateory Logo Hooks
  const [darkImage, SetDarkImage] = useState<boolean>(false);
  useEffect(() => {
    // Use Dark Image if Mateory is in Light Mode
    SetDarkImage(!document.documentElement.classList.contains("dark"));
    // Observer that Change the Dark Image Value when theme change
    const OBSERVER = new MutationObserver(() => {
      SetDarkImage(!document.documentElement.classList.contains("dark"));
    });
    // Observer can observe the atrribute class
    OBSERVER.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    // Disconnect the Observer
    return () => OBSERVER.disconnect();
  }, []);
  // Returns Mateory Logo Component
  return (
    <Image
      src={darkImage ? "/logo-dark.svg" : "/logo.svg"}
      alt="Mateory Logo"
      width={width}
      height={height}
      priority
      className={className}
    />
  );
}

export default MateoryLogo;
