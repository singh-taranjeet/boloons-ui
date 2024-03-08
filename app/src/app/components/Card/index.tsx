interface CardType
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}
export function Card(props: Readonly<CardType>) {
  const cx = `p-small sm:p-normal rounded ${props.className}`;
  return (
    <div {...props} className={`${cx} shadow bg-opacity-40 bg-pink-700`}></div>
  );
}
