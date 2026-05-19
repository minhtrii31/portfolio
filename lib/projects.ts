export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectVisual = {
  src: string;
  alt: string;
  caption: string;
  positionClassName?: string;
};

export type ProjectCaseStudy = {
  slug: string;
  year: string;
  title: string;
  discipline: string;
  role: string;
  summary: string;
  overview: string;
  challenge: string;
  approach: string;
  stack: string[];
  image: string;
  visuals: ProjectVisual[];
  links?: ProjectLink[];
};

export const projects: ProjectCaseStudy[] = [
  {
    slug: "ai-resume-platform",
    year: "2026",
    title: "AI Resume Platform",
    discipline: "Fullstack Product / AI Workflow",
    role: "Fullstack Developer",
    summary:
      "A resume workflow platform for CV analysis, job-fit review, and AI-assisted application preparation.",
    overview:
      "A focused workspace for resume analysis, job-fit review, and AI-assisted application preparation. The experience is designed to keep complex feedback readable and actionable throughout the application process.",
    challenge:
      "The main challenge was turning AI output into something users could trust and act on. The interface needed to reduce ambiguity, keep feedback readable, and avoid making the workflow feel like a generic chat surface.",
    approach:
      "I structured the experience around document context, match signals, and guided revisions. The system separates analysis, recommendations, and application steps so users can move through the process so users can move through the process with clearer context and next steps.",
    stack: ["Next.js", "Express", "MongoDB", "Gemini API"],
    image: "/saas.png",
    visuals: [
      {
        src: "/saas/saas1.png",
        alt: "The CVs page.",
        caption:
          "The CVs page where users can upload and manage their resumes, view AI analysis results, and track job application progress.",
        positionClassName: "object-left-top",
      },
      {
        src: "/saas/saas2.png",
        alt: "User's usage history.",
        caption:
          "The usage history page where users can review past resume analyses, job matches, and application outcomes to track their progress and refine their approach over time.",
        positionClassName: "object-center",
      },
    ],
  },
  {
    slug: "quan-bao-construction",
    year: "2024",
    title: "Quan Bao Construction",
    discipline: "Business Platform / CMS",
    role: "Fullstack Developer",
    summary:
      "A construction company website and CMS built for publishing projects, managing content, and presenting company credibility through clear structure and editorial presentation.",
    overview:
      "A construction company website and CMS focused on project presentation, editorial content, and practical publishing workflows.",
    challenge:
      "The site needed to serve two audiences at once: visitors evaluating the company and internal users maintaining project content. The public experience had to feel polished while the CMS stayed straightforward.",
    approach:
      "The public experience emphasizes trust and clarity, while the CMS keeps publishing workflows simple and maintainable.",
    stack: ["Next.js", "Node.js", "MongoDB", "Cloudinary"],
    image: "/quanbao.png",
    visuals: [
      {
        src: "/quanbao/quanbao1.png",
        alt: "Project showcase page with editorial-style layout and project details.",
        caption:
          "Showcases the construction projects the company has completed.",
        positionClassName: "object-left-top",
      },
      {
        src: "/quanbao/quanbao2.png",
        alt: "Admin user management page.",
        caption:
          "A straightforward admin dashboard for managing projects, content, and company information.",
        positionClassName: "object-center",
      },
    ],
  },
  {
    slug: "movie",
    year: "2024",
    title: "Movie Streaming Platform",
    discipline: "Entertainment Platform / MERN Application",
    role: "Fullstack Developer",
    summary:
      "A fullstack movie streaming platform built around discovery, watch history, ratings, and admin-managed content workflows.",
    overview:
      "A MERN-based movie streaming platform focused on content discovery, user watch history, ratings, and admin-managed media workflows.",
    challenge:
      "The challenge was balancing a content-heavy entertainment interface with responsive performance and maintainable backend structure. The system needed to support both everyday viewing flows and administrative content management without becoming difficult to scale.",
    approach:
      "I structured the platform around reusable React components, RESTful API architecture, and modular backend organization using the MVC pattern. Features such as watch history, ratings, comments, and favourites were designed to keep user interactions persistent and easy to manage.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Cloudinary"],
    image: "/movie.png",
    visuals: [
      {
        src: "/movie/movie1.png",
        alt: "Admin dashboard",
        caption:
          "Admin dashboard for managing movies, users, and platform content with a clean and organized interface.",
        positionClassName: "object-left-top",
      },
      {
        src: "/movie/movie2.png",
        alt: "Top movies page",
        caption: "Top movies section showcasing popular films.",
        positionClassName: "object-center",
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const currentIndex = projects.findIndex((project) => project.slug === slug);

  if (currentIndex === -1) {
    return undefined;
  }

  return projects[(currentIndex + 1) % projects.length];
}
