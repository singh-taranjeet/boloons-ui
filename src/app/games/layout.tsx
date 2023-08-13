export default function Layout(props: { children: React.ReactNode }) {
  return (
    <main>
      <section
        className={`flex flex-col justify-center gap-small md:gap-normal max-w-5xl mx-auto w-full md:flex-row md:justify-around select-none`}
      >
        {props.children}
      </section>
    </main>
  );
}
