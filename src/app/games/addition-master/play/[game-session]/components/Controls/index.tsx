export function Controls(props: {
  onClick(): void;
  gameInProgress: boolean;
  className?: string;
}) {
  const { onClick, gameInProgress, className = "" } = props;
  if (gameInProgress) {
    return null;
  }

  return (
    <section
      onClick={onClick}
      className={`select-none flex justify-center rounded-md p-5 w-fit h-fit bg-cyan-500 mx-auto`}
    >
      <p className="m-auto text-4xl text-white">Restart</p>
    </section>
  );
}
