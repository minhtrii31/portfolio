import HomeProject from "./home-project";
import HomeSectionHeading from "./home-section-heading";
import { FadeIn } from "@/components/motion/reveal";
import { ProjectCaseStudy } from "@/lib/projects";

const sectionHeading = {
  index: 1,
  title: "Selected Projects, ",
  italicText: "studied closely",
  description: (
    <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-foreground/70">
      A curated selection of digital products focused on modern engineering,
      thoughtful interfaces, and scalable user experiences.
    </p>
  ),
};

type HomeSectionProjectProps = {
  projects: ProjectCaseStudy[];
};

export default function HomeSectionProject({
  projects,
}: HomeSectionProjectProps) {
  return (
    <section
      id="works"
      className="overflow-x-clip px-6 py-20 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-screen-2xl">
        <HomeSectionHeading {...sectionHeading} />

        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <HomeProject
              key={project.title}
              align={index % 2 === 0 ? "left" : "right"}
              project={{
                ...project,
                no: String(index + 1).padStart(2, "0"),
              }}
            />
          ))}
        </div>
        {/* Section footer */}
        <FadeIn className="mt-24 flex flex-col gap-6 border-t border-foreground/10 pt-6 md:mt-32 md:flex-row md:items-end md:justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
            Additional case studies on request
          </span>

          <a
            href="#contact"
            aria-label="Request additional case studies via the contact section"
            className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground"
          >
            <span className="border-b border-foreground pb-1">
              Request Archive
            </span>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
