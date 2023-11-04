"use client";
export function Box(props: {
  children: React.ReactNode;
  onAttempt(): void;
  selected: boolean;
}) {
  const { children, onAttempt, selected } = props;

  const bg = selected ? "bg-secondary" : "bg-white";

  return (
    <div
      onClick={onAttempt}
      className={`rounded ${bg} h-full border-2 border-primary px-normal py-small`}
    >
      {children}
    </div>
  );
}
