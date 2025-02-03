// Card Props
interface Props {
  name: string;
  value: number | string;
  disabled?: boolean;
}
// Card Main Function
function Card({ name, value, disabled }: Props) {
  // Return Card Component
  return (
    // Card Container
    <article
      className={`flex flex-col gap-2 p-4 rounded-lg ${
        disabled ? "bg-gray-900" : "bg-gray-800"
      }`.trimEnd()}
    >
      {/* Card Title */}
      <p
        aria-disabled={disabled}
        className="text-sm aria-disabled:text-gray-500"
      >
        {name}
      </p>
      {/* Card Value */}
      <p
        aria-disabled={disabled}
        className="font-bold text-2xl text-white aria-disabled:text-gray-500"
      >
        {disabled === true ? "No Aplica" : value}
      </p>
    </article>
  );
}

export default Card;
