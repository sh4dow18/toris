// Not Found Requirements
import { Section } from "@/components";
import Link from "next/link";
// Not Found Main Function
function NotFound() {
  // Return Not Found Page
  return (
    // Not Found Main Section
    <Section
      preTitle="404"
      title="Página No Encontrada"
      description="Lo sentimos, no se pudo encontrar la página que está buscando."
      main
    >
      {/* Return to Home Link */}
      <div className="flex justify-center mt-7 md:mt-2 min-[1440px]:mx-auto">
        <Link
          href="/"
          className="bg-mateoryPurple text-white px-4 py-2 font-medium rounded-md hover:bg-mateoryPurpleLight"
        >
          Regresar al Inicio
        </Link>
      </div>
    </Section>
  );
}

export default NotFound;
