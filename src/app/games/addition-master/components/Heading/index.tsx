export function Heading(props: {
  children: React.ReactNode;
  className?: string;
}) {
  const { className = "text-5xl", children } = props;

  return <h1 className={`text-center pb-5 ${className}`}>{children}</h1>;
}
