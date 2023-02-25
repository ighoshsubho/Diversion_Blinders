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
        <div className="py-15">
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
      <div className="flex justify-center bg-hero-gradient">
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
