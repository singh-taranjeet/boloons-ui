export default function Layout(props: { children: React.ReactNode }) {
  return <div className="p-5 bg-slate-50 h-full">{props.children}</div>;
}
