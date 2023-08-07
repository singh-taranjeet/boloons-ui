export function Text(props: { children: React.ReactNode; className?: string }) {
  const { className = "", children } = props;

  return (
    <p className={`text-center pb-5 text-5xl md:text-xl ${className}`}>
      {children}
    </p>
  );
}
