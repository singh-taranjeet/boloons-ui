"use client";
export function Box(
  props: Readonly<{
    children: React.ReactNode;
    onAttempt(): void;
    selected: boolean;
  }>
) {
  const { children, onAttempt, selected } = props;

  const bg = selected ? "bg-opacity-95 bg-pink-700" : "bg-transparent";

  return (
    <button
      onClick={onAttempt}
      className={`rounded ${bg} h-full border-2 border-primary px-normal py-small w-full`}
      type="button"
    >
      {children}
    </button>
  );
}
