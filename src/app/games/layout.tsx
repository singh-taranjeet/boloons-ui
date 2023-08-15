export default function Layout(props: { children: React.ReactNode }) {
  return (
    <main className="relative z-1">
      <section
        className={`flex flex-col justify-center md:gap-normal mx-auto w-full md:flex-row md:justify-around select-none`}
      >
        {props.children}
      </section>
    </main>
  );
}
