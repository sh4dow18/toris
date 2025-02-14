// Email Route Requirements
import SendEmail from "@/libs/email";
import path from "path";
import fs from "fs";
import { Attachment } from "nodemailer/lib/mailer";
import sharp from "sharp";
// Check if the file sent is an image
async function IsValidImage(file: File): Promise<boolean> {
  try {
    // Convert the file to a binary data buffer
    const buffer = await file.arrayBuffer();
    // Use "sharp" to process the buffer and get the image metadata
    await sharp(Buffer.from(buffer)).metadata();
    // If the image is valid, return true
    return true;
  } catch (_) {
    // If the image is invalid, return false
    return false;
  }
}
// Email Route Post Function
export async function POST(request: Request) {
  // Request Form Values
  const formData = await request.formData();
  // Get Email Template from templates project folder
  let emailTemplate = fs.readFileSync(
    path.join(process.cwd(), "src/templates", "report-bug-template.html"),
    "utf8"
  );
  // Get all values
  const NAME = formData.get("name");
  const EMAIL = formData.get("email");
  const MESSAGE = formData.get("message");
  const FILES = formData.getAll("files") as File[];
  let invalidFiles = false;
  // Check if all files sent are real images, if not, throw an error
  try {
    const VALID_IMAGES_LIST = await Promise.all(FILES.map(IsValidImage));
    const INVALID_FILES_LIST = FILES.filter(
      (_, index) => !VALID_IMAGES_LIST[index]
    );
    if (INVALID_FILES_LIST.length !== 0) {
      invalidFiles = true;
    }
  } 
  // If any errors were detected, send a report about that error
  catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    emailTemplate = emailTemplate
      .replace("{{name}}", "Sistema de Reportes de Problemas de Mateory")
      .replace("{{email}}", "(No Posee)")
      .replace("{{message}}", errorMessage);

    SendEmail(emailTemplate);
    return new Response(
      "El Mensaje no se ha podido enviar, inténtelo nuevamente.",
      { status: 500 }
    );
  }
  // If invalidFiles is true, returns a bad request error response
  if (invalidFiles) {
    return new Response("Uno de los Archivos no es una Imagen", {
      status: 400,
    });
  }
  // Transform Files to Attachments
  const ATTACHMENTS: Attachment[] = await Promise.all(
    FILES.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
    }))
  );
  // Replace Email Template Variables
  emailTemplate = emailTemplate
    .replace("{{name}}", NAME ? NAME.toString() : "Error")
    .replace("{{email}}", EMAIL ? EMAIL.toString() : "Error")
    .replace("{{message}}", MESSAGE ? MESSAGE.toString() : "Error");
  // Send Email and Get the Response
  const RESPONSE = await SendEmail(emailTemplate, ATTACHMENTS);
  // Return the Email Response
  return new Response(RESPONSE.response);
}