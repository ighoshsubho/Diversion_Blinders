"use client";
import Typewriter from "typewriter-effect";
import React from "react";
import { Hero, HeroSubtitle, HeroTitle } from "./Hero/herotitle";
import { HeroImage } from "./Hero/heroimage";

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
      <HeroImage />
      <HeroSubtitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        We are the most fantastic team of the world. Yes we are
        <br className="hidden md:block" /> that helps the lives of people easy
      </HeroSubtitle>
    </Hero>
  );
};

export default About;
