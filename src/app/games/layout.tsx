export default async function Layout(
  props: Readonly<{ children: React.ReactNode }>
) {
  return (
    <main className="relative z-1 max-w-5xl mx-auto">
      <section
        className={`flex flex-col justify-center mx-auto w-full md:flex-row md:justify-around select-none`}
      >
        {props.children}
      </section>
    </main>
  );
}
