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
    if (CURRENT_THEME !== "dark" && CURRENT_THEME !== undefined) {
      const DOCUMENT_CLASS_LIST = document.documentElement.classList;
      DOCUMENT_CLASS_LIST.remove("dark");
      DOCUMENT_CLASS_LIST.add(CURRENT_THEME);
    }
  }, []);
  // Returns Null, because the theme handler has no TSX format
  return null;
}

export default ThemeHandler;
