// Steps Props
interface Props {
  list: { title: string; description: string }[];
}
// Steps Main Function
function Steps({ list }: Props) {
  // Returns Steps Component
  return (
    // Main List Container
    <ol className="counter-reset list-none space-y-2">
      {list.map((item, index) => (
        // Use CSS container increment to add the numbers in the list
        <li
          key={index}
          className="relative pl-8 before:absolute before:left-0 before:top-1 before:counter-increment before:content-[counter(list-item)] before:bg-mateoryPurple before:w-6 before:h-6 before:rounded-full before:text-white before:font-medium before:text-center min-[340px]:pl-10"
        >
          {/* Step Container */}
          <p className="leading-8">
            <strong className="text-gray-300">{item.title}</strong>: {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

export default Steps;
