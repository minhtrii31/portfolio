import HomeAbout from "@/components/home/home-about";
import HomeApproach from "@/components/home/home-approach";
import HomeContact from "@/components/home/home-contact";
import HomeHero from "@/components/home/home-hero";
import HomeIntro from "@/components/home/home-intro";
import HomeMarquee from "@/components/home/home-marquee";
import HomeSectionProject from "@/components/home/home-section-project";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <HomeIntro />
      <HomeHero />
      <HomeMarquee />
      <HomeSectionProject projects={projects} />
      <HomeApproach />
      <HomeAbout />
      <HomeContact />
    </>
  );
}
