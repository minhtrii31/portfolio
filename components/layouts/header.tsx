import Link from "next/link";

const NAV_LINKS = [
  { label: "Works", href: "/#works" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  return (
    <nav
      aria-label="Primary navigation"
      className="fixed left-0 top-0 z-50 w-full px-6 py-5 text-white mix-blend-difference md:px-12"
    >
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between text-[13px] font-bold uppercase">
        <Link href="/" aria-label="Go to homepage" className="leading-none">
          <span className="flex items-center gap-2">Portfolio</span>
        </Link>

        <div className="hidden gap-12 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative h-4 overflow-hidden motion-reduce:h-auto"
            >
              <div className="transition-transform duration-300 hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <p className="block leading-4">{link.label}</p>
                <p aria-hidden="true" className="block leading-4">
                  {link.label}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div>
          <span className="flex items-center gap-2">HCMC, VN</span>
        </div>
      </div>
    </nav>
  );
}
