const Pulse = () => {
  return (
    <section
      className={`flex-center p-normal rounded-lg`}
      role="alert"
      aria-label="loading"
      aria-busy={true}
    >
      <div className="p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-primary rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-primary rounded col-span-2"></div>
                <div className="h-2 bg-primary rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-primary rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const PageLoader = () => {
  return (
    <section className="relative mt-48 w-full mx-normal flex flex-col">
      <Pulse></Pulse>
      <Pulse></Pulse>
      <Pulse></Pulse>
      <Pulse></Pulse>
    </section>
  );
};
