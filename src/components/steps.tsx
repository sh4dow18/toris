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
          className="relative mb-5 grayScale:grayscale before:px-2 before:py-1 before:counter-increment before:content-[counter(list-item)] before:bg-mateoryPurple before:rounded-full before:text-white before:font-medium before:text-center min-[361px]:pl-10 min-[361px]:mt-0 min-[361px]:before:p-0 min-[361px]:before:absolute min-[361px]:before:left-0 min-[361px]:before:top-1 min-[361px]:before:w-6 min-[361px]:before:h-6"
        >
          {/* Step Container */}
          <p className="leading-8">
            <strong className="text-gray-800 dark:text-gray-300 highContrast:text-black lowContrast:text-gray-500">
              {item.title}
            </strong>
            : {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

export default Steps;
