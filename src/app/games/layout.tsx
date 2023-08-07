export default function Layout(props: { children: React.ReactNode }) {
  return (
    <main className="p-5 h-full">
      <section className="flex flex-col justify-center gap-4 max-w-5xl mx-auto w-full md:flex-row md:justify-around select-none">
        {props.children}
      </section>
    </main>
  );
}
