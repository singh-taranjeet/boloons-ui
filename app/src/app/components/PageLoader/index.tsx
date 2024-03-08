import { PulseLoading } from "../PulseLoading";

export const PageLoader = () => {
  return (
    <section className="relative mt-48 w-full mx-normal flex flex-wrap">
      <PulseLoading></PulseLoading>
      <PulseLoading></PulseLoading>
      <PulseLoading></PulseLoading>
      <PulseLoading></PulseLoading>
    </section>
  );
};
