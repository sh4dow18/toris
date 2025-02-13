// Picture Requirements
import Image from "next/image";
// Picture Props
interface Props {
  src: string;
  alt: string;
  caption: string;
}
// Picture Main Function
function Picture({ src, alt, caption }: Props) {
  // Returns Picture Component
  return (
    <figure className="min-[875px]:w-96 min-[1351px]:w-full">
      <picture>
        <source srcSet={src} type="image/webp" />
        <Image
          src={src}
          alt={alt}
          width={1000}
          height={100}
          priority
          className="w-full h-auto rounded-lg min-[1351px]:max-w-[530px]"
        />
      </picture>
      <figcaption className="text-xs mt-3 text-center">{caption}</figcaption>
    </figure>
  );
}

export default Picture;
