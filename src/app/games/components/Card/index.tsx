export function Card(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  return (
    <div
      {...props}
      className={`p-5 bg-slate-50 rounded ${props.className}`}
    ></div>
  );
}
