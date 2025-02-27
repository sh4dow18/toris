// Settings Page Layout Requirements
import { Metadata } from "next";
// Settings Page Layout Metadata
export const metadata: Metadata = {
  title: "Ajustes",
  description: "Configura Mateory a tu gusto",
};
// Settings Page Layout Props
interface Props {
  children: React.ReactNode;
}
// Settings Page Layout Main Function
function SettingsLayout({ children }: Props) {
  return children;
}
export default SettingsLayout;
