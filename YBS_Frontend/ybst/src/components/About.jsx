"use client";
import Lottie from "lottie-react";
import Typewriter from "typewriter-effect";
import React from "react";

import classNames from "classnames";
import { Hero, HeroSubtitle, HeroTitle } from "./Hero/herotitle";

import Desktop from "/src/app/assets/desktop.png";
import { HeroImage } from "./Hero/heroimage";
import teamAnimation from "../app/assets/teamAnimation.json";
const About = () => {
  return (
    <Hero>
      <HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <div
          className="py-15  rounded-lg border border-transparent-white bg-white bg-opacity-[0.01] bg-hero-gradient
          "
        >
          {
            <>
              We are
              <Typewriter
                options={{
                  strings: ["Team Blinders"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </>
          }
        </div>
      </HeroTitle>

      {/* <HeroImage params={Desktop} width={500} height={500} /> */}
      <div
        className="flex justify-center bg-hero-gradient  rounded-lg border border-transparent-white bg-white bg-opacity-[0.01] bg-hero-gradient
          before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-hero-glow before:opacity-0 before:[filter:blur(120px)]
          before:animate-image-glow"
      >
        <Lottie animationData={teamAnimation} loop={true} />
      </div>
      <HeroSubtitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        We are the most fantastic team of the world. Yes we are
        <br className="hidden md:block" /> that helps the lives of people easy
      </HeroSubtitle>
    </Hero>
  );
};

export default About;
