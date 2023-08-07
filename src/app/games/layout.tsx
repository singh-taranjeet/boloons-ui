export default function Layout(props: { children: React.ReactNode }) {
  return <main className="p-5 bg-slate-50 h-full">{props.children}</main>;
}
