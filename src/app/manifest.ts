// Manifest Requirements
import type { MetadataRoute } from "next";
// Manifest Main Function
export default function manifest(): MetadataRoute.Manifest {
  // Returns Manifest JSON File
  return {
    name: "Mateory",
    short_name: "Mateory",
    description:
      "Soluciona Problemas Fáciles de Teorías de Matemáticas con unos Cuantos Clics",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
