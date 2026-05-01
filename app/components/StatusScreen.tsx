import Link from "next/link";

type StatusAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type StatusScreenProps = {
  eyebrow: string;
  title: string;
  description: string;
  code?: string;
  actions: StatusAction[];
  children?: React.ReactNode;
  useAnchorLinks?: boolean;
};

export default function StatusScreen({
  eyebrow,
  title,
  description,
  code,
  actions,
  children,
  useAnchorLinks = false,
}: StatusScreenProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-primary text-text-primary">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,168,124,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-24">
        <div className="grid w-full gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <section className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-accent-gold">
              {eyebrow}
            </p>
            <h1 className="mb-6 font-serif text-5xl leading-tight text-white md:text-7xl">
              {title}
            </h1>
            <p className="max-w-xl text-base leading-8 text-text-secondary md:text-lg">
              {description}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {actions.map((action) => {
                const className =
                  action.variant === "secondary"
                    ? "inline-flex items-center rounded-sm border border-white/15 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-accent-gold hover:text-accent-gold"
                    : "inline-flex items-center rounded-sm bg-accent-gold px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-text-inverse transition-colors hover:bg-accent-hover";

                return useAnchorLinks ? (
                  <a key={`${action.href}-${action.label}`} href={action.href} className={className}>
                    {action.label}
                  </a>
                ) : (
                  <Link key={`${action.href}-${action.label}`} href={action.href} className={className}>
                    {action.label}
                  </Link>
                );
              })}
            </div>
          </section>

          <aside className="rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            {code ? (
              <p className="mb-6 text-sm uppercase tracking-[0.45em] text-accent-gold">{code}</p>
            ) : null}
            <div className="space-y-6">
              <div className="border-l-2 border-accent-gold/70 pl-4">
                <p className="text-sm uppercase tracking-[0.25em] text-white/60">What to do next</p>
              </div>
              <div className="space-y-3 text-sm leading-7 text-text-secondary">
                <p>Return to the homepage to continue exploring the portfolio.</p>
                <p>Open the contact page if you were trying to reach the artist directly.</p>
                <p>Refresh or retry if this page should normally exist.</p>
              </div>
              {children}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
