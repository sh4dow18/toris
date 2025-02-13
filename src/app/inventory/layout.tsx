// Inventory Page Layout Requirements
import { Metadata } from "next";
// Inventory Page Layout Metadata
export const metadata: Metadata = {
  title: "Inventarios",
  description:
    "Soluciona Problemas Fáciles de Teorías de Inventarios con unos Cuantos Clics",
};
// Inventory Page Layout Props
interface Props {
  children: React.ReactNode;
}
// Inventory Page Layout Main Function
function InventoryLayout({ children }: Props) {
  return children;
}
export default InventoryLayout;
