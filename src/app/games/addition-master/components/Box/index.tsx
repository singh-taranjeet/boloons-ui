export function Box(props: { children: React.ReactNode }) {
  const { children } = props;
  return <div className="rounded bg-slate-50">{children}</div>;
}
