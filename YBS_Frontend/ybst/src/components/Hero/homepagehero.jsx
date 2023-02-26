import { Button } from "../Button";
import { HeroImage } from "./heroimage";
import { Hero, HeroSubtitle, HeroTitle } from "./herotitle";
import Heroimage from "/src/app/assets/heroimage.webp";

export const HomepageHero = () => (
  <Hero>
    <HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
      <div className="py-15">
      Your. Brand. Stories.
        <br className="hidden md:block" /> 
      </div>
    </HeroTitle>
    <HeroSubtitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
      Your Brand. Your Stories.
      <br className="hidden md:block" /> Every content writer's dream partner
    </HeroSubtitle>
    <Button
      className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]"
      href="/"
      variant="primary"
      size="large"
    >
      <span>Get Started </span>
    </Button>
    <HeroImage params={Heroimage} width={1500} height={1500} />
  </Hero>
);
