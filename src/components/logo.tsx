// Logo Requirements
import { Link } from "next-view-transitions";
import Image from "next/image";
// Logo Props
interface Props {
  href: string;
  icon: string;
  width?: number;
  height?: number;
}
// Logo Main Function
function Logo({ href, icon, width, height }: Props) {
  // Returns Logo Component
  return (
    // Logo Link
    <Link href={href} target="_blank">
      {/* Logo Image */}
      <Image
        src={`/logos/${icon}.svg`}
        alt={`${icon} logo`}
        width={width || 30}
        height={height || 30}
        className="hover:filter hover:brightness-150"
      />
    </Link>
  );
}

export default Logo;
