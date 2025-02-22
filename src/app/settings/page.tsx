// Set this as a client page
"use client";
// Settings Page Requirements
import { Section, ToggleConfiguration } from "@/components";
import { useState } from "react";
// Settings Page Main Function
function Settings() {
  // Settings Page Hooks
  const [themes, SetThemes] = useState({
    dark: true,
    highContrast: false,
    lowContrast: false,
    grayScale: false,
  });
  const [dyslexiaFont, SetDyslexiaFont] = useState<boolean>(false);
  const [fontSize, SetFontSize] = useState({
    bigger: false,
    smaller: false,
  });
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
          OnClick={() =>
            SetThemes({
              dark: !themes.dark,
              highContrast: false,
              lowContrast: false,
              grayScale: false,
            })
          }
        />
        {/* High Contrast Theme Toggle Configuration */}
        <ToggleConfiguration
          title="Contraste Alto"
          description="Puede cambiar el tema a un tono con mayor contraste. Desactiva esta opción si desea el tema predefinido"
          enabled={themes.highContrast}
          OnClick={() =>
            SetThemes({
              dark: false,
              highContrast: !themes.highContrast,
              lowContrast: false,
              grayScale: false,
            })
          }
        />
        {/* Low Contrast Theme Toggle Configuration */}
        <ToggleConfiguration
          title="Contraste Bajo"
          description="Puede cambiar el tema a un tono con menor contraste. Desactiva esta opción si desea el tema predefinido"
          enabled={themes.lowContrast}
          OnClick={() =>
            SetThemes({
              dark: false,
              highContrast: false,
              lowContrast: !themes.lowContrast,
              grayScale: false,
            })
          }
        />
        {/* Gray Scale Theme Toggle Configuration */}
        <ToggleConfiguration
          title="Escala de Grises"
          description="Puede cambiar el tema a únicamente grises, esto por personas que les cuesta distinguir ciertos colores. Desactiva esta opción si desea el tema predefinido"
          enabled={themes.grayScale}
          OnClick={() =>
            SetThemes({
              dark: false,
              highContrast: false,
              lowContrast: false,
              grayScale: !themes.grayScale,
            })
          }
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
