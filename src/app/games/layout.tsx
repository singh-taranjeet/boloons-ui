export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="p-5 h-screen bg-slate-50 h-full">{props.children}</div>
  );
}
