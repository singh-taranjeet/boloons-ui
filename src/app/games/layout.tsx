export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="p-5 flex flex-col justify-center h-screen">
      {props.children}
    </div>
  );
}
