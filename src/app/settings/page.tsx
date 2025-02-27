// Set this as a client page
"use client";
// Settings Page Requirements
import { Section, ToggleConfiguration } from "@/components";
import {
  GetFont,
  GetFontSize,
  GetTheme,
  SetFont,
  SetFontSize,
  SetTheme,
} from "@/libs/session";
import { useEffect, useState } from "react";
// Settings Page Main Function
function Settings() {
  // Settings Page Hooks
  const [themes, SetThemes] = useState<Record<string, boolean>>({
    dark: false,
    highContrast: false,
    lowContrast: false,
    grayScale: false,
  });
  const [dyslexiaFont, SetDyslexiaFont] = useState<boolean>(false);
  const [fontSizes, SetFontSizes] = useState<Record<string, boolean>>({
    large: false,
    small: false,
  });
  useEffect(() => {
    // Session Constants
    const CURRENT_THEME = GetTheme();
    const CURRENT_FONT = GetFont();
    const CURRENT_FONT_SIZE = GetFontSize();
    // Check the current theme and set it
    SetThemes({
      dark: CURRENT_THEME === "dark",
      highContrast: CURRENT_THEME === "highContrast",
      lowContrast: CURRENT_THEME === "lowContrast",
      grayScale: CURRENT_THEME === "grayScale",
    });
    // Check the current font and set it
    SetDyslexiaFont(CURRENT_FONT === "open-dyslexic");
    // Check the current font size and set it
    SetFontSizes({
      large:
        CURRENT_FONT_SIZE && CURRENT_FONT_SIZE.includes("large") ? true : false,
      small:
        CURRENT_FONT_SIZE && CURRENT_FONT_SIZE.includes("small") ? true : false,
    });
  }, []);
  const SetThemeInDOM = (theme: string) => {
    // Get HTML Class List
    const DOCUMENT_CLASS_LIST = document.documentElement.classList;
    // If it is theme, change it to light mode
    if (themes[theme]) {
      DOCUMENT_CLASS_LIST.remove(theme);
      SetTheme("light");
    }
    // If it is not the theme, set it
    else {
      const CURRENT_THEME = GetTheme();
      if (CURRENT_THEME) {
        DOCUMENT_CLASS_LIST.remove(CURRENT_THEME);
      }
      DOCUMENT_CLASS_LIST.add(theme);
      SetTheme(theme);
    }
  };
  const ChangeFontInDOM = () => {
    // Get Current Font Size
    const CURRENT_FONT_SIZE = GetFontSize();
    // Get HTML Class List
    const DOCUMENT_CLASS_LIST = document.documentElement.classList;
    // If it is dyslexia font, change it to normal font
    if (dyslexiaFont) {
      DOCUMENT_CLASS_LIST.remove("font-open-dyslexic");
      DOCUMENT_CLASS_LIST.add("font-inter");
      DOCUMENT_CLASS_LIST.remove("text-sm");
      DOCUMENT_CLASS_LIST.remove("text-md");
      DOCUMENT_CLASS_LIST.remove("text-xs");
      if (CURRENT_FONT_SIZE) {
        // If the font is large, convert it to the large inter font
        if (CURRENT_FONT_SIZE.includes("large")) {
          DOCUMENT_CLASS_LIST.add("text-lg");
          SetFontSize("large/text-lg");
        }
        // If the font is small, convert it to the small inter font
        else if (CURRENT_FONT_SIZE.includes("small")) {
          DOCUMENT_CLASS_LIST.add("text-sm");
          SetFontSize("small/text-sm");
        }
      }
      SetFont("inter");
    }
    // If it is not the dyslexia font, set it
    else {
      DOCUMENT_CLASS_LIST.remove("font-inter");
      DOCUMENT_CLASS_LIST.add("font-open-dyslexic");
      DOCUMENT_CLASS_LIST.remove("text-lg");
      DOCUMENT_CLASS_LIST.remove("text-sm");
      // Check if the current font size exists
      if (CURRENT_FONT_SIZE) {
        // If the current font size is large, added to DOM
        if (CURRENT_FONT_SIZE.includes("large")) {
          DOCUMENT_CLASS_LIST.add("text-md");
          SetFontSize("large/text-md");
        }
        // If the current font size is small, added to DOM
        else if (CURRENT_FONT_SIZE.includes("small")) {
          DOCUMENT_CLASS_LIST.add("text-xs");
          SetFontSize("small/text-xs");
        }
        // If the current font size is normal, added to DOM
        else {
          DOCUMENT_CLASS_LIST.add("text-sm");
          SetFontSize("normal");
        }
      }
      SetFont("open-dyslexic");
    }
  };
  const SetFontSizeInDOM = (fontSize: string, className: string) => {
    // Get Current Font
    const CURRENT_FONT = GetFont();
    // Get HTML Class List
    const DOCUMENT_CLASS_LIST = document.documentElement.classList;
    // If it is large or small font size, change it to normal font size
    if (fontSizes[fontSize]) {
      DOCUMENT_CLASS_LIST.remove(className);
      // If it is the Open Dyslexyc Font, add smaller size
      if (CURRENT_FONT === "open-dyslexic") {
        DOCUMENT_CLASS_LIST.add("text-sm");
      }
      SetFontSize("normal");
    }
    // If it is not the normal font size, set it
    else {
      // Get Current Font Size
      const CURRENT_FONT_SIZE = GetFontSize();
      // If the current font size exists, remove the associated classname
      if (CURRENT_FONT_SIZE) {
        DOCUMENT_CLASS_LIST.remove(CURRENT_FONT_SIZE.split("/")[1]);
      }
      // If it is the Open Dyslexyc Font, remove smaller size
      if (CURRENT_FONT === "open-dyslexic") {
        DOCUMENT_CLASS_LIST.remove("text-sm");
      }
      DOCUMENT_CLASS_LIST.add(className);
      SetFontSize(`${fontSize}/${className}`);
    }
  };
  // Returns Settings Page
  return (
    // Main Section
    <Section title="Ajustes" description="Configura Mateory a tu gusto" main>
      {/* Themes Section */}
      <Section
        title="Temas"
        description="Aquí podrá manejar los diferentes estilos que puede tener Mateory"
        contentClassName="flex flex-col gap-7"
      >
        {/* Dark Mode Toggle Configuration */}
        <ToggleConfiguration
          title="Tema Oscuro"
          description="Puede cambiar el tema a un tono más oscuro. Desactiva esta opción si desea un tema más claro"
          enabled={themes.dark}
          OnClick={() => {
            SetThemeInDOM("dark");
            SetThemes({
              dark: !themes.dark,
              highContrast: false,
              lowContrast: false,
              grayScale: false,
            });
          }}
        />
        {/* High Contrast Theme Toggle Configuration */}
        <ToggleConfiguration
          title="Contraste Alto"
          description="Puede cambiar el tema a un tono con mayor contraste. Desactiva esta opción si desea el tema predefinido"
          enabled={themes.highContrast}
          OnClick={() => {
            SetThemeInDOM("highContrast");
            SetThemes({
              dark: false,
              highContrast: !themes.highContrast,
              lowContrast: false,
              grayScale: false,
            });
          }}
        />
        {/* Low Contrast Theme Toggle Configuration */}
        <ToggleConfiguration
          title="Contraste Bajo"
          description="Puede cambiar el tema a un tono con menor contraste. Desactiva esta opción si desea el tema predefinido"
          enabled={themes.lowContrast}
          OnClick={() => {
            SetThemeInDOM("lowContrast");
            SetThemes({
              dark: false,
              highContrast: false,
              lowContrast: !themes.lowContrast,
              grayScale: false,
            });
          }}
        />
        {/* Gray Scale Theme Toggle Configuration */}
        <ToggleConfiguration
          title="Escala de Grises"
          description="Puede cambiar el tema a únicamente grises, esto por personas que les cuesta distinguir ciertos colores. Desactiva esta opción si desea el tema predefinido"
          enabled={themes.grayScale}
          OnClick={() => {
            SetThemeInDOM("grayScale");
            SetThemes({
              dark: false,
              highContrast: false,
              lowContrast: false,
              grayScale: !themes.grayScale,
            });
          }}
        />
      </Section>
      {/* Fonts Section */}
      <Section
        title="Fuentes"
        description="Aquí podrá manejar los diferentes cambios de fuente que puede tener Mateory"
        contentClassName="flex flex-col gap-7"
      >
        {/* Dyslexia Mode Toggle Configuration */}
        <ToggleConfiguration
          title="Modo Dislexia"
          description="Puede cambiar la fuente a una que mejore la lectura para personas con una dislexia común. Desactiva esta opción si desea la fuente predefinida"
          enabled={dyslexiaFont}
          OnClick={() => {
            ChangeFontInDOM();
            SetDyslexiaFont(!dyslexiaFont);
          }}
        />
        {/* Increase Font Size Toggle Configuration */}
        <ToggleConfiguration
          title="Aumentar Tamaño de Letra"
          description="Puede aumentar el tamaño de la fuente. Desactiva esta opción si desea la fuente predefinida"
          enabled={fontSizes.large}
          OnClick={() => {
            SetFontSizeInDOM("large", dyslexiaFont ? "text-md" : "text-lg");
            SetFontSizes({
              large: !fontSizes.large,
              small: false,
            });
          }}
        />
        {/* Decrease Font Size Toggle Configuration */}
        <ToggleConfiguration
          title="Disminuir Tamaño de Letra"
          description="Puede disminuir el tamaño de la fuente. Desactiva esta opción si desea la fuente predefinida"
          enabled={fontSizes.small}
          OnClick={() => {
            SetFontSizeInDOM("small", dyslexiaFont ? "text-xs" : "text-sm");
            SetFontSizes({
              large: false,
              small: !fontSizes.small,
            });
          }}
        />
      </Section>
    </Section>
  );
}

export default Settings;
