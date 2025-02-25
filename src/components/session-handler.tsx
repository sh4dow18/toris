// Set this component as a client component
"use client";
// Session Handler Requirements
import { GetFont, GetTheme } from "@/libs/session";
import { useEffect } from "react";
// Session Handler Main Function
function SessionHandler() {
  // Session Handler Hooks
  useEffect(() => {
    // Hook Constants
    const CURRENT_THEME = GetTheme();
    const CURRENT_FONT = GetFont();
    const DOCUMENT_CLASS_LIST = document.documentElement.classList;
    // Check which Theme is Enabled
    if (CURRENT_THEME !== "dark" && CURRENT_THEME !== undefined) {
      DOCUMENT_CLASS_LIST.remove("dark");
      DOCUMENT_CLASS_LIST.add(CURRENT_THEME);
    }
    // Check if dyslexia font is Enabled
    if (CURRENT_FONT !== "inter" && CURRENT_FONT !== undefined) {
      DOCUMENT_CLASS_LIST.remove("font-inter");
      DOCUMENT_CLASS_LIST.add("font-open-dyslexic");
      DOCUMENT_CLASS_LIST.add("text-sm");
    }
  }, []);
  // Returns Null, because the Session handler has no TSX format
  return null;
}

export default SessionHandler;
