// Set this component as a client page
"use client";
// Report Bug Page Requirements
import {
  Form,
  Input,
  Modal,
  Section,
  Textarea,
  UploadFiles,
} from "@/components";
import {
  CheckOneDayHasPassed,
  GetReportsMade,
  SetReportsMade,
  SetReportsMadeDate,
} from "@/libs/session";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { FormEvent, useState } from "react";
// Report Bug Necessary types
type ModalSettings = {
  open: boolean;
  status: "success" | "error" | "loading";
  message: string;
};
// Report Bug Main Function
function ReportBug() {
  // Report Bug Constants
  const INIT_MODAL_SETTINGS: ModalSettings = {
    open: false,
    status: "loading",
    message: "Enviando el Reporte del Problema...",
  };
  // Report Bug Hooks
  const [modalSettings, SetModalSettings] =
    useState<ModalSettings>(INIT_MODAL_SETTINGS);
  // Report Bug On Submit Function
  const OnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Avoid refreshing the page
    event.preventDefault();
    // Create a Form Data with actual form
    const FORM = new FormData(event.currentTarget);
    // If the Reports Made are 3, do the following
    if (GetReportsMade() === "3") {
      // Check that a day has passed, if true, init reports values
      if (CheckOneDayHasPassed()) {
        SetReportsMadeDate();
        SetReportsMade(0);
      }
      // Else, display a Error Modal with to many attempts message
      else {
        SetModalSettings({
          open: true,
          status: "error",
          message:
            "El Mensaje no se ha podido enviar, ya ha enviado 3 reportes hoy, intente de nuevo mañana.",
        });
        return;
      }
    }
    // Open Modal
    SetModalSettings({
      ...modalSettings,
      open: true,
    });
    // Make a request to project's api to send an email
    const RESPONSE = await fetch("/api/emails", {
      method: "POST",
      body: FORM,
    });
    // Change the modal info to success info if response is ok, otherwise set error info
    SetModalSettings({
      open: true,
      status: RESPONSE.ok ? "success" : "error",
      message: RESPONSE.ok
        ? "El Mensaje se ha reportado con Éxito."
        : await RESPONSE.text(),
    });
  };
  // Returns Report Bug Page
  return (
    <>
      {/* Returns Report Bug Main Section */}
      <Section
        title="Reporta un Problema"
        description="Ayuda a tener el sistema al día reportando los problemas que encuentres en Mateory"
        contentClassName="flex flex-col justify-center gap-5 max-w-2xl"
        main
      >
        {/* Report Bug Form */}
        <Form
          submitButton="Reportar"
          OnSubmit={OnSubmit}
          className="flex flex-col gap-5 mt-5 place-content-center"
        >
          {/* Inputs Container */}
          <div className="flex flex-col gap-5 min-[660px]:grid min-[660px]:grid-cols-2">
            {/* Name Input */}
            <Input
              label="Nombre"
              placeholder="Ramsés Solano"
              help="Solo Nombres Válidos"
              name="name"
              validation="name"
              maxLength={30}
            />
            {/* E-Mail Input */}
            <Input
              label="Correo Electrónico"
              placeholder="sh4dow18@mateory.com"
              help="Únicamente usado para Contacto"
              name="email"
              validation="email"
              maxLength={50}
              autoComplete="email"
            />
          </div>
          {/* Message Textarea */}
          <Textarea
            label="Mensaje"
            name="message"
            help="Describe el problema encontrado"
            placeholder="No me deja ingresar los datos en el formulario."
            maxLength={500}
          />
          {/* Upload Files Drag and Drop Input */}
          <UploadFiles
            label="Evidencia"
            name="files"
            help="Solo Archivos PNG, JPG y JPEG. Los archivos juntos deben tener un peso menor a 4 MB. Esta es requerida para resolver con la mayor brevedad posible"
          />
        </Form>
        {/* Or Separation */}
        <div className="flex items-center">
          <div className="grow border-t border-gray-500" />
          <span className="mx-4">ó</span>
          <div className="grow border-t border-gray-500" />
        </div>
        {/* Report on Github Button */}
        <Link
          href="https://github.com/sh4dow18/mateory/issues/new"
          target="_blank"
        >
          <div className="flex gap-2 place-content-center bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700">
            <Image
              src="/logos/github.svg"
              alt="Github Logo"
              width={25}
              height={25}
              className="filter brightness-150"
            />
            <span>Reportar en Github</span>
          </div>
        </Link>
      </Section>
      {/* Form Modal */}
      <Modal
        open={modalSettings.open}
        status={modalSettings.status}
        message={modalSettings.message}
        Close={() => {
          const REPORTS_MADE = GetReportsMade();
          // If Reports Made is not 3, do the following
          if (REPORTS_MADE !== "3") {
            // If Reports Made is not defined, it is the first time it has reported, if it is, init Reports Made
            if (REPORTS_MADE === undefined) {
              SetReportsMade(0);
            }
            // Else, add 1 to the number of reports
            else {
              SetReportsMade(Number.parseInt(REPORTS_MADE) + 1);
            }
          }
          // Set init settings to modal
          SetModalSettings(INIT_MODAL_SETTINGS);
        }}
      />
    </>
  );
}

export default ReportBug;
