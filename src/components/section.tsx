// Section Props
interface Props {
  title: string;
  description: string;
  contentClassName?: string;
  children: React.ReactNode;
}
// Section Main Function
function Section({ title, description, contentClassName, children }: Props) {
  // Returns Section Component
  return (
    // Section Container
    <div className="flex flex-col gap-5 border-t border-gray-200/30 pt-5 mt-7">
      {/* Main Section */}
      <section className="flex flex-col gap-1">
        {/* Section Title */}
        <h2 className="text-gray-200 text-2xl font-semibold">{title}</h2>
        {/* Section Description */}
        <p className="text-xs text-pretty">{description}</p>
      </section>
      {/* Content */}
      <div
        className={
          contentClassName ||
          "flex flex-col gap-3 min-[768px]:flex-row min-[768px]:flex-wrap min-[768px]:justify-center min-[768px]:gap-5"
        }
      >
        {children}
      </div>
    </div>
  );
}

export default Section;
