// Set this component as a client component
"use client";
// Theme Handler Requirements
import { GetTheme } from "@/libs/session";
import { useEffect } from "react";
// Theme Handler Main Function
function ThemeHandler() {
  // Theme Handler Hooks
  useEffect(() => {
    // Check which Theme is Enabled
    const CURRENT_THEME = GetTheme();
    if (CURRENT_THEME === "light") {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  // Returns Null, because the theme handler has no TSX format
  return null;
}

export default ThemeHandler;
