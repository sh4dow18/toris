// Email Route Requirements
import SendEmail from "@/libs/email";
import path from "path";
import fs from "fs";
// Email Route Post Function
export async function POST(request: Request) {
  // Request Form Values
  const { name, email, message } = await request.json();
  // Get Email Template from templates project folder
  let emailTemplate = fs.readFileSync(
    path.join(process.cwd(), "src/templates", "report-bug-template.html"),
    "utf8"
  );
  // Replace Email Template Variables
  emailTemplate = emailTemplate
    .replace("{{name}}", name)
    .replace("{{email}}", email)
    .replace("{{message}}", message);
  // Send Email and Get the Response
  const RESPONSE = await SendEmail(emailTemplate);
  // Return the Email Response
  return new Response(RESPONSE.response);
}