"use client";
import Lottie from "lottie-react";
import Typewriter from "typewriter-effect";
import React from "react";

import { Hero, HeroSubtitle, HeroTitle } from "./Hero/herotitle";

import teamAnimation from "../app/assets/teamAnimation.json";
const About = () => {
  return (
    <Hero>
      <HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <div className="py-15 ">
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
      <div className="flex justify-center">
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
