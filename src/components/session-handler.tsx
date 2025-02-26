// Set this component as a client component
"use client";
// Session Handler Requirements
import { GetFont, GetFontSize, GetTheme } from "@/libs/session";
import { useEffect } from "react";
// Session Handler Main Function
function SessionHandler() {
  // Session Handler Hooks
  useEffect(() => {
    // Hook Constants
    const CURRENT_THEME = GetTheme();
    const CURRENT_FONT = GetFont();
    const CURRENT_FONT_SIZE = GetFontSize();
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
      DOCUMENT_CLASS_LIST.remove("text-lg");
      // Check if the current font size exists
      if (CURRENT_FONT_SIZE) {
        // If it is large, add normal text, else, small text
        if (CURRENT_FONT_SIZE.includes("large")) {
          DOCUMENT_CLASS_LIST.add("text-md");
        } else {
          DOCUMENT_CLASS_LIST.add("text-sm");
        }
      }
    }
    // Check the current font size is normal
    if (CURRENT_FONT_SIZE && CURRENT_FONT_SIZE !== "normal") {
      // Check if it is the open dyslexic font, if it is, remove small text
      if (CURRENT_FONT === "open-dyslexic") {
        DOCUMENT_CLASS_LIST.remove("text-sm");
      }
      DOCUMENT_CLASS_LIST.add(CURRENT_FONT_SIZE.split("/")[1]);
    }
  }, []);
  // Returns Null, because the Session handler has no TSX format
  return null;
}

export default SessionHandler;
