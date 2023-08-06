export function Box(props: {
  children: React.ReactNode;
  onAttempt(): void;
  selected: boolean;
}) {
  const { children, onAttempt, selected } = props;

  const bg = selected ? "bg-cyan-100" : "bg-white";

  return (
    <div onClick={onAttempt} className={`rounded ${bg}`}>
      {children}
    </div>
  );
}
