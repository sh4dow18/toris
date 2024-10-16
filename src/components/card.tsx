// Model Card Stylesheets
import "@/stylesheets/components/card.css";
// Model Card Requirements
import Image from "next/image";
import Link from "next/link";
// Model Card Props
type Props = {
  name: string;
  image: string;
  href: string;
  model?: string;
};
// Model Card Main Function
function Card({ name, image, href, model }: Props) {
  // Returns Model Card Component
  return (
    // Model Card Container
    <Link
      className="card-container"
      href={`/${href}${model ? `?model=${model}` : ""}`.trimEnd()}
    >
      {/* Main Image */}
      <Image
        src={`/${image}.png`}
        alt={name}
        width={247}
        height={140}
        priority
      />
      {/* Main Name */}
      <p>{name}</p>
    </Link>
  );
}

export default Card;
