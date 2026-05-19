import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn, RevealImage, RevealText } from "@/components/motion/reveal";
import { getNextProject, getProjectBySlug, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.title} — Project Case Study`,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Project Case Study`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 900,
          alt: `${project.title} project visual`,
        },
      ],
    },
  };
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 py-4 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="max-w-[65%] text-right text-foreground/85">{value}</dd>
    </div>
  );
}

function CaseSection({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <FadeIn className="grid grid-cols-12 gap-x-6 gap-y-6 border-t border-foreground/10 py-12 md:gap-x-10 md:py-16">
      <div className="col-span-12 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground md:col-span-3">
        {label}
      </div>
      <div className="col-span-12 md:col-span-8 md:col-start-5">
        <h2 className="mb-5 font-serif text-[clamp(2.5rem,8vw,4.75rem)] leading-[0.92] tracking-[-0.045em]">
          {title}
        </h2>
        <p className="text-base leading-relaxed text-foreground/72 md:text-lg">
          {body}
        </p>
      </div>
    </FadeIn>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(project.slug);
  const heroVisual = project.visuals[0];

  return (
    <article className="overflow-x-clip bg-background px-6 pt-28 md:px-12 md:pt-36">
      <div className="mx-auto max-w-screen-2xl">
        <section className="grid grid-cols-12 gap-x-6 gap-y-10 pb-16 md:gap-x-10 md:pb-24">
          <FadeIn className="col-span-12 md:col-span-3">
            <Link
              href="/#works"
              scroll={false}
              aria-label="Back to selected projects"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <span className="border-b border-foreground/20 pb-1">
                Back to Works
              </span>
            </Link>
          </FadeIn>

          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <div className="mb-6 flex items-center justify-between gap-6 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              <FadeIn>{project.discipline}</FadeIn>
              <FadeIn>{project.year}</FadeIn>
            </div>

            <div className="flex items-start gap-4 md:gap-5">
              <RevealText
                as="h1"
                text={project.title}
                className="min-w-0 font-serif text-[clamp(4rem,16vw,12rem)] leading-[0.82] tracking-[-0.06em]"
              />

              {project.links?.[0] ? (
                <FadeIn className="mt-1 shrink-0 md:mt-3">
                  <a
                    href={project.links[0].href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.links[0].label} for ${project.title}`}
                    className="group inline-flex size-9 items-center justify-center border border-foreground/15 text-xl leading-none text-foreground/75 transition-colors duration-300 hover:border-foreground hover:text-foreground md:size-11 md:text-2xl"
                  >
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                    >
                      ↗
                    </span>
                  </a>
                </FadeIn>
              ) : null}
            </div>

            <FadeIn className="mt-8 grid gap-8 border-t border-foreground/10 pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0rem,16rem)]">
              <p className="text-base leading-relaxed text-foreground/75 md:text-lg border-r border-foreground/10 pr-4">
                {project.overview}
              </p>

              <dl>
                <DetailRow label="Role" value={project.role} />
                <DetailRow label="Stack" value={project.stack.join(" · ")} />
              </dl>
            </FadeIn>
          </div>
        </section>

        <RevealImage className="relative aspect-16/10 overflow-hidden bg-muted md:aspect-16/8">
          <Image
            src={project.image}
            alt={heroVisual.alt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className={`object-cover ${heroVisual.positionClassName ?? "object-center"}`}
          />
        </RevealImage>

        <section className="py-16 md:py-24">
          <CaseSection
            label="Challenge"
            title="The product problem"
            body={project.challenge}
          />
          <CaseSection
            label="Approach"
            title="How it was shaped"
            body={project.approach}
          />
        </section>

        <section className="border-t border-foreground/10 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10 md:gap-x-10">
            <FadeIn className="col-span-12 md:col-span-3">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                Selected Visuals
              </h2>
            </FadeIn>

            <div className="col-span-12 space-y-12 md:col-span-9">
              {project.visuals.map((visual, index) => (
                <FadeIn key={`${visual.src}-${index}`}>
                  <RevealImage className="relative aspect-4/3 overflow-hidden bg-muted md:aspect-video">
                    <Image
                      src={visual.src}
                      alt={visual.alt}
                      fill
                      sizes="(min-width: 768px) 75vw, 100vw"
                      loading="lazy"
                      className={`object-cover ${visual.positionClassName ?? "object-center"}`}
                    />
                  </RevealImage>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {visual.caption}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {nextProject ? (
          <section className="border-t border-foreground/10 py-16 md:py-24">
            <FadeIn className="grid grid-cols-12 gap-x-6 gap-y-8 md:gap-x-10">
              <div className="col-span-12 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground md:col-span-3">
                Next Project
              </div>

              <Link
                href={`/projects/${nextProject.slug}`}
                aria-label={`Continue to ${nextProject.title}`}
                className="group col-span-12 md:col-span-8 md:col-start-5"
              >
                <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  {nextProject.year} · {nextProject.discipline}
                </div>
                <h2 className="font-serif text-[clamp(3.25rem,11vw,8rem)] leading-[0.86] tracking-[-0.055em]">
                  {nextProject.title}
                </h2>
                <div className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-foreground">
                  <span className="border-b border-foreground pb-1">
                    Continue
                  </span>
                </div>
              </Link>
            </FadeIn>
          </section>
        ) : null}
      </div>
    </article>
  );
}
