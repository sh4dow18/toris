// Set this as a client page
"use client";
// Settings Page Requirements
import { Section, ToggleConfiguration } from "@/components";
import { GetTheme, SetTheme } from "@/libs/session";
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
  const [fontSize, SetFontSize] = useState({
    bigger: false,
    smaller: false,
  });
  useEffect(() => {
    const CURRENT_THEME = GetTheme();
    // Check the current theme and set it
    SetThemes({
      dark: CURRENT_THEME === "dark",
      highContrast: CURRENT_THEME === "highContrast",
      lowContrast: CURRENT_THEME === "lowContrast",
      grayScale: CURRENT_THEME === "grayScale",
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
            SetDyslexiaFont(!dyslexiaFont);
          }}
        />
        {/* Increase Font Size Toggle Configuration */}
        <ToggleConfiguration
          title="Aumentar Tamaño de Letra"
          description="Puede aumentar el tamaño de la fuente. Desactiva esta opción si desea la fuente predefinida"
          enabled={fontSize.bigger}
          OnClick={() => {
            SetFontSize({
              bigger: !fontSize.bigger,
              smaller: false,
            });
          }}
        />
        {/* Decrease Font Size Toggle Configuration */}
        <ToggleConfiguration
          title="Disminuir Tamaño de Letra"
          description="Puede disminuir el tamaño de la fuente. Desactiva esta opción si desea la fuente predefinida"
          enabled={fontSize.smaller}
          OnClick={() => {
            SetFontSize({
              bigger: false,
              smaller: !fontSize.smaller,
            });
          }}
        />
      </Section>
    </Section>
  );
}

export default Settings;
