// How it Works Page Requirements
import { Picture, Section, Steps } from "@/components";
import { Metadata } from "next";
// How it Works Page Metadata
export const metadata: Metadata = {
  title: "¿Cómo Funciona?",
  description:
    "Bienvenido a la guía de Mateory, Aquí encontrarás todo lo que necesitas para aprender a usar Mateory",
};
// How it Works Page Main Function
function HowItWorks() {
  // Returns How it Works Page
  return (
    // Main Function
    <Section
      title="¿Cómo Funciona?"
      description="Bienvenido a la guía de Mateory, Aquí encontrarás todo lo que necesitas para aprender a usar Mateory"
      preTitle="Guíate en Mateory"
      contentClassName="flex flex-col justify-center items-center"
      main
    >
      {/* How to solve problems about math theories main container */}
      <div className="flex flex-wrap justify-center">
        {/* How to solve problems about math theories information container */}
        <Section
          title="¿Cómo Resolver Problemas de Teorías Matemáticas?"
          description="Se va explicar paso a paso cómo usar las páginas de teorías matemáticas, como la teoria de inventarios y la teoría de colas, para calcular los resultados exitósamente."
          contentClassName="flex flex-col max-w-4xl gap-5 min-[1351px]:max-w-2xl"
        >
          {/* Step 1: Select the Math Theory Container */}
          <Section
            title="Paso 1: Seleccionar la Teoría Matemática"
            description="Para poder encontrar una resolución al problema, se debe tener en cuenta cuál teoría matemática usar"
            contentClassName="mb-5"
            h3
          >
            <Steps
              list={[
                {
                  title:
                    "Analizar el problema para encontrar la teoría matemática",
                  description:
                    "Primero se debe identificar cual tipo de problema se trata para saber la teoría matemática a usar, puede buscar palabras clave como demanda constante para teorías de inventarios o Tasa de Distribución de Llegada para teorías de colas",
                },
                {
                  title: "Ir al Solucionador de Problemas",
                  description:
                    "Una vez identificado la teoría matemática, se debe ir al solucionador correspondiente, si es de colas, se de ir a la pestaña de Colas, si es de Inventarios, a la de Inventarios. Para hacerlo, en la parte superior de la pantalla verá varias opciones para la navegación. Si está en un celular o tableta, podría ver un menu en la parte superior que puede abrir haciendo click en él",
                },
              ]}
            />
          </Section>
          {/* Step 2: Select the Model to Use Container */}
          <Section
            title="Paso 2: Seleccionar el Modelo a Usar"
            description="Las Teorías Matemáticas tienen ramificaciones gracias a los modelos que poseen, no todos los problemas son iguales ni tienen las mismas características. Cuando la página esté abierta, podrá ver opciones para diferentes modelos."
            contentClassName="mb-5"
            h3
          >
            <Steps
              list={[
                {
                  title: "Analizar el problema para encontrar el modelo",
                  description:
                    "Primero se debe identificar a cuál modelo de esa teoría matemática pertenece el problema, esto se puede saber por medio de las variables que existen para ese modelo, por ejemplo, un costo por déficit solo va a existir en un modelo con déficit o el tamaño de cola solo va a estar en un modelo con tamaño de cola finito",
                },
                {
                  title: "Seleccionar el Modelo",
                  description:
                    "Una vez identificado el modelo, se debe seleccionar este a través del botón relacionado al modelo",
                },
              ]}
            />
          </Section>
          {/* Step 3: Add the Value of the Variables Container */}
          <Section
            title="Paso 3: Agregar el Valor de las Variables"
            description="Una vez que hayas elegido el modelo, se podrán observar varios campos donde se deben escribir los datos obtenidos del problema"
            contentClassName="mb-5"
            h3
          >
            <Steps
              list={[
                {
                  title: "Observar las variables requeridas",
                  description:
                    "Debe observar las variables que pide el formulario para poder continuar con el proceso, que son las variables que ocupa el modelo para poder calcular los resultados",
                },
                {
                  title:
                    "Analizar el problema para encontrar las variables y sus valores relacionadas al modelo escogido",
                  description:
                    "Identifique cuales son los valores de las variables relacionadas al modelo en el problema con respecto al nombre de los campos del formulario, por ejemplo cuánto es el costo por mantener el producto en inventario o ver cuantos servidores hay para una cola",
                },
                {
                  title: "Agregar los Valores al formulario",
                  description:
                    "Para ingresar un número, haga clic en el espacio designado para ese valor y escriba el valor correspondiente. Si tiene errores al poner el valor, verifique el valor ingresado sea un valor correcto. Todos los campos muestran una pequeña ayuda para mostrar si el valor es válido o no, por ejemplo, en muchos campos, solo son válidos números positivos.",
                },
              ]}
            />
          </Section>
          {/* Step 4: Calculate the results Container */}
          <Section
            title="Paso 4: Calcular los resultados"
            description="Al tener todos los datos ingresados, lo único que falta es obtener los resultados con base a las fórmulas de ese modelo"
            contentClassName="flex flex-col gap-6"
            h3
          >
            <Steps
              list={[
                {
                  title: "Obtén los Datos",
                  description:
                    'Busca un botón que diga "Obtener Resultados" y haga clic en él',
                },
                {
                  title: "Esperar resultados",
                  description:
                    "Espera unos segundos a que la página haga los cálculos. Normalmente es instantaneo, pero dependiendo de la demanda, puede tardar un poco",
                },
              ]}
            />
            <p className="leading-8">
              Después de calcular, la página mostrará los resultados en los
              espacios correspondientes
            </p>
          </Section>
        </Section>
        {/* How to solve problems about math theories pictures container */}
        <div className="flex flex-col gap-3 mx-auto mt-16">
          <span className="text-center">
            <strong className="text-gray-600 dark:text-gray-400">
              Puede hacer clíc a las imágenes para verlas más grandes
            </strong>
          </span>
          <div className="flex flex-col gap-16 min-[875px]:grid min-[875px]:grid-cols-2 min-[1351px]:flex min-[1351px]:flex-col">
            <Picture
              src="/how-it-works/inventory-form-blank.png"
              alt="Inventory Form Blank"
              caption="Formulario de Teorías de Inventarios en blanco listo para ser llenado"
            />
            <Picture
              src="/how-it-works/inventory-form-full.png"
              alt="Inventory Form Full"
              caption="Formulario de Teorías de Inventarios completado con datos del primer modelo"
            />
            <Picture
              src="/how-it-works/inventory-form-diff-model-full.png"
              alt="Inventory Form Full with Diff Model"
              caption="Formulario de Teorías de Inventarios completado con datos de un modelo diferente"
            />
            <Picture
              src="/how-it-works/queue-form-blank.png"
              alt="Queue Form Blank"
              caption="Formulario de Teorías de Colas en blanco listo para ser llenado"
            />
            <Picture
              src="/how-it-works/queue-form-full.png"
              alt="Queue Form Full"
              caption="Formulario de Teorías de Colas completado con datos del primer modelo"
            />
          </div>
        </div>
      </div>
      {/* How to report a problem in Mateory main container */}
      <div className="flex flex-wrap justify-center">
        {/* How to report a problem in Mateory information container */}
        <Section
          title="¿Cómo reportar un problema en Mateory?"
          description="Si encuentra un problema en Mateory, puede reportarlo siguiendo estos pasos"
          contentClassName="flex flex-col max-w-4xl gap-5 min-[1351px]:max-w-2xl"
        >
          {/* Step 1: Enter the report a problem page container */}
          <Section
            title="Paso 1: Entrar a la página de reportar un problema"
            description="Para poder reportar un problema, es necesario ir al formulario designado para ello, que se encuentra en la página de Reportar Problema"
            contentClassName="mb-5"
            h3
          >
            <Steps
              list={[
                {
                  title: "Observar la navegación disponible",
                  description:
                    "Para hacerlo, en la parte superior de la pantalla verá varias opciones para la navegación. Si está en un celular o tableta, podría ver un menu en la parte superior que puede abrir haciendo click en él",
                },
                {
                  title: "Elija la opción correcta",
                  description: 'Haga clic en "Reportar Problema"',
                },
              ]}
            />
          </Section>
          {/* Step 2: Fill out the Form container */}
          <Section
            title="Paso 2: Llenar el Formulario"
            description="En la página de reporte verá varios espacios que debe completar"
            contentClassName="mb-5"
            h3
          >
            <Steps
              list={[
                {
                  title: "Nombre",
                  description:
                    'Aquí debe escribir su nombre. Por ejemplo, si su nombre es Juan Pérez, escriba "Ramsés Solano" en este espacio.',
                },
                {
                  title: "Correo Electrónico",
                  description:
                    'Escriba su dirección de correo electrónico, por ejemplo "ramses.solano@gmail.com". Asegúrese de escribirlo bien, ya que podrían contactarlo por ahí.',
                },
                {
                  title: "Mensaje (Descripción del Problema)",
                  description:
                    'En este cuadro, debe escribir qué problema encontró, por ejemplo "No me deja ingresar los datos en el formulario de Teoría de Inventarios.". Puede escribir hasta 500 caracteres, así que trate de explicar claramente lo que sucede.',
                },
                {
                  title: "Evidencia (Imágenes del Problema)",
                  description:
                    'Aquí debe mostrar alguna imagen o imágenes del problema. Para subir una imagen, haga clic en el cuadro que dice "Haz clic o arrastra archivos aquí". Luego, busque la imagen en su dispositivo y selecciónela. También puede simplemente arrastrar la imagen y soltarla dentro del cuadro.',
                },
              ]}
            />
          </Section>
          {/* Step 3: Submit the Report container */}
          <Section
            title="Paso 3: Enviar el Reporte"
            description="Una vez con todos los campos del formulario llenos, se debe enviar el reporte para que los técnicos puedan analizar y resolver el problema indicado"
            contentClassName="mb-5"
            h3
          >
            <Steps
              list={[
                {
                  title: "Apretar Botón",
                  description:
                    'haga clic en el botón "Reportar". Este es un botón grande y de color. Esto enviará su reporte al equipo de Mateory para que revisen el problema.',
                },
              ]}
            />
          </Section>
          {/* Step 4: Report on Github (Alternative to Previous Form) container */}
          <Section
            title="Paso 4: Reportar en Github (Alternativa al Formulario Anterior)"
            description="Si tiene una cuenta de GitHub, puede reportar el problema ahí también"
            contentClassName="mb-5"
            h3
          >
            <Steps
              list={[
                {
                  title: "Apretar Botón",
                  description:
                    'Para hacerlo, haga clic en el botón "Reportar en GitHub", que está debajo del botón de "Reportar". Esto lo llevará a la página de GitHub donde podrá escribir el problema como un issue (un reporte técnico).',
                },
              ]}
            />
          </Section>
        </Section>
        {/* How to report a problem in Mateory pictures container */}
        <div className="flex flex-col gap-3 mx-auto mt-16">
          <span className="text-center">
            <strong>
              Puede hacer clíc a las imágenes para verlas más grandes
            </strong>
          </span>
          <div className="flex flex-col gap-16 min-[875px]:grid min-[875px]:grid-cols-2 min-[1351px]:flex min-[1351px]:flex-col">
            <Picture
              src="/how-it-works/report-bug-form-blank.png"
              alt="Report Bug Form Blank"
              caption="Formulario de Reportar Problema en blanco listo para ser llenado"
            />
            <Picture
              src="/how-it-works/report-bug-form-full.png"
              alt="Report Bug Form Full"
              caption="Formulario de Reportar Problema completado con datos de un problema"
            />
            <Picture
              src="/how-it-works/report-bug-github-form-blank.png"
              alt="Report Issue Form Blank"
              caption="Formulario de Reportar una Issue de Github en blanco listo para ser llenado"
            />
            <Picture
              src="/how-it-works/report-bug-github-form-full.png"
              alt="Report Issue Form Full"
              caption="Formulario de Reportar una Issue de Github completado con datos de un problema"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

export default HowItWorks;
