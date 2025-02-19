// Colaborator Requirements
import Image from "next/image";
import Logo from "./logo";
// Colaborator Props
interface Props {
  image: string;
  name: string;
  role: string;
  description: string;
  github?: string;
  linkedin?: string;
}
// Colaborator Main Function
function Colaborator({
  image,
  name,
  role,
  description,
  github,
  linkedin,
}: Props) {
  // Returns Colaborator Component
  return (
    // Colaborator Container
    <div className="flex flex-col gap-5 min-[685px]:flex-row">
      {/* Image container to use to reshape image */}
      <div className="min-[685px]:w-[32rem] min-[685px]:h-56 min-[685px]:overflow-hidden min-[685px]:relative">
        {/* Colaborator Image */}
        <Image
          src={`/profiles/${image}.jpeg`}
          alt={`Imagen de ${name}`}
          width={300}
          height={100}
          priority
          className="w-full rounded-lg min-[685px]:w-[150%] min-[685px]:h-full min-[685px]:object-cover min-[685px]:object-center"
        />
      </div>
      {/* Colaborator Information Container */}
      <div className="flex flex-col gap-5 min-[685px]:max-w-xl">
        {/* Colaborator Main Information Container */}
        <div className="flex flex-col gap-5">
          {/* Colaborator Primary Information Container */}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-300 text-lg">{name}</span>
            <span>{role}</span>
          </div>
          {/* Colaborator Profile Description */}
          <p className="leading-8">{description}</p>
        </div>
        {/* Colaborator Social Media Links */}
        <div className="flex gap-5">
          {/* Github Logo */}
          {github && (
            <Logo href={`https://github.com/${github}`} icon="github" />
          )}
          {/* Linkedin Logo */}
          {linkedin && (
            <Logo
              href={`https://www.linkedin.com/in/${linkedin}`}
              icon="linkedin"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Colaborator;
