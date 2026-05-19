import Image from "next/image";
import Link from "next/link";
import { FadeIn, RevealImage, RevealText } from "@/components/motion/reveal";

export type Project = {
  no: string;
  slug: string;
  year: string;
  title: string;
  discipline: string;
  role: string;
  summary: string;
  stack: string[];
  image: string;
};

const projectImageClassName =
  "object-cover motion-safe:transition-transform motion-safe:duration-1000 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

const projectImagePresentation: Record<
  string,
  {
    alt: string;
    positionClassName: string;
  }
> = {
  "/saas.png": {
    alt: "AI resume workflow interface focused on the CV workspace.",
    positionClassName: "object-left-top",
  },
  "/quanbao.png": {
    alt: "Construction company website homepage with project imagery.",
    positionClassName: "object-left-top",
  },
  "/movie.png": {
    alt: "Movie product interface with navigation and featured content.",
    positionClassName: "object-left-top",
  },
};

function ProjectMeta({
  no,
  slug,
  year,
  title,
  discipline,
  role,
  summary,
  stack,
}: Project) {
  return (
    <FadeIn>
      <div className="mb-6 flex items-center justify-between gap-6 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
        <span>N° {no}</span>
        <span>{year}</span>
      </div>

      <Link href={`/projects/${slug}`} className="group/title block">
        <RevealText
          as="h3"
          text={title}
          className="mb-3 max-w-[12ch] font-serif text-[clamp(2.5rem,12vw,3.75rem)] leading-[0.95] tracking-[-0.045em] md:text-6xl"
        />
      </Link>

      <div className="mb-8 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
        {discipline}
      </div>

      <p className="mb-10 max-w-[45ch] text-base leading-relaxed text-foreground/75">
        {summary}
      </p>

      <Link
        href={`/projects/${slug}`}
        className="group mb-10 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-foreground"
      >
        <span className="border-b border-foreground pb-1">View Case Study</span>
      </Link>

      <dl className="space-y-3 border-t border-foreground/10 pt-5 text-sm">
        <div className="flex justify-between gap-6">
          <dt className="text-muted-foreground">Role</dt>
          <dd className="max-w-[65%] text-right">{role}</dd>
        </div>

        <div className="flex justify-between gap-6">
          <dt className="text-muted-foreground">Stack</dt>
          <dd className="max-w-[65%] text-right font-mono text-xs leading-relaxed text-foreground/80">
            {stack.join(" · ")}
          </dd>
        </div>
      </dl>
    </FadeIn>
  );
}

export default function HomeProject({
  project,
  align = "left",
}: {
  project: Project;
  align?: "left" | "right";
}) {
  const imagePresentation = projectImagePresentation[project.image] ?? {
    alt: `${project.title} project interface.`,
    positionClassName: "object-center",
  };

  const image = (
    <div className="col-span-12 md:col-span-7">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.title}`}
      >
        <RevealImage className="group/project-image relative aspect-4/3 overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={imagePresentation.alt}
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            loading="lazy"
            className={`${projectImageClassName} ${imagePresentation.positionClassName}`}
          />
        </RevealImage>
      </Link>
    </div>
  );

  return (
    <div>
      <article className="grid grid-cols-12 gap-x-6 gap-y-10 md:gap-x-10">
        {align === "left" ? (
          <>
            {image}
            <div className="col-span-12 md:col-span-4 md:col-start-9 md:pt-8">
              <ProjectMeta {...project} />
            </div>
          </>
        ) : (
          <>
            <div className="order-2 col-span-12 md:order-1 md:col-span-4 md:pt-8">
              <ProjectMeta {...project} />
            </div>

            <div className="order-1 col-span-12 md:order-2 md:col-span-7 md:col-start-6">
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`View ${project.title}`}
              >
                <RevealImage className="group/project-image relative aspect-4/3 overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={imagePresentation.alt}
                    fill
                    sizes="(min-width: 768px) 58vw, 100vw"
                    loading="lazy"
                    className={`${projectImageClassName} ${imagePresentation.positionClassName}`}
                  />
                </RevealImage>
              </Link>
            </div>
          </>
        )}
      </article>
    </div>
  );
}
