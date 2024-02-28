export default async function Layout(
  props: Readonly<{ children: React.ReactNode }>
) {
  return (
    <main className="relative z-1 max-w-5xl mx-normal md:mx-auto h-full">
      <section
        className={`flex flex-col justify-center mx-auto w-full md:flex-row md:justify-around select-none h-full`}
      >
        {props.children}
      </section>
    </main>
  );
}
