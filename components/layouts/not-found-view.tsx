import Link from "next/link";

export default function NotFoundView() {
  return (
    <section className="min-h-svh overflow-x-clip bg-background px-6 pt-28 pb-20 text-foreground md:px-12 md:pt-36 md:pb-28">
      <div className="mx-auto flex min-h-[calc(100svh-12rem)] max-w-screen-2xl flex-col justify-between gap-16">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 md:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              404 / Not Found
            </p>
          </div>

          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <h1 className="max-w-[9ch] font-serif text-[clamp(4.5rem,18vw,13rem)] leading-[0.82] tracking-[-0.06em]">
              Page drifted{" "}
              <span className="font-normal italic text-foreground/70">
                out.
              </span>
            </h1>

            <p className="mt-8 max-w-[48ch] text-base leading-relaxed text-foreground/72 md:text-lg">
              The route you requested does not exist, or the project has moved.
              Return to the selected work or head back to the opening page.
            </p>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <Link
                href="/#works"
                scroll={false}
                className="inline-flex text-[11px] font-bold uppercase tracking-[0.22em] text-foreground"
              >
                <span className="border-b border-foreground pb-1">
                  View Works
                </span>
              </Link>
              <Link
                href="/"
                className="inline-flex text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                <span className="border-b border-foreground/20 pb-1">
                  Return Home
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 border-t border-foreground/10 pt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
          <p className="col-span-12 md:col-span-3">Nguyen Huynh Minh Tri</p>
          <p className="col-span-12 mt-3 md:col-span-8 md:col-start-5 md:mt-0">
            Thoughtful interfaces / Reliable systems
          </p>
        </div>
      </div>
    </section>
  );
}
