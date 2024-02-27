interface HeadingProps {
  title: string;
  description: string;
}
export function Heading(props: HeadingProps) {
  const { title, description } = props;
  return (
    <>
      <h1 className="font-extrabold text-5xl md:text-9xl text-center text-white">
        {title}
      </h1>
      <h2 className="text-xl md:text-3xl text-white bg-primary p-small w-fit mx-auto -rotate-2 animate-pulse">
        {description}
      </h2>
    </>
  );
}
