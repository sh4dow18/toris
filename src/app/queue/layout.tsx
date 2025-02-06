// Queue Page Layout Requirements
import { Metadata } from "next";
// Queue Page Layout Metadata
export const metadata: Metadata = {
  title: "Colas",
  description:
    "Soluciona Problemas Fáciles de Teorías de Colas con unos Cuantos Clics",
};
// Queue Page Layout Props
interface Props {
  children: React.ReactNode;
}
// Queue Page Layout Main Function
function QueueLayout({ children }: Props) {
  return children;
}
export default QueueLayout;
