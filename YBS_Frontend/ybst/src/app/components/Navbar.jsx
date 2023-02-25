"use client";

import Link from "next/link";

import classNames from "classnames";

import Image from "next/image";
import { Container } from "./container";
import { Button } from "./Button";
import Logo from "/src/app/assets/logo.webp";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 z-10 w-full border-b border-transparent-white backdrop-blur-[12px]">
      <Container className="flex h-navigation-height">
        <Link className="flex items-center text-md" href="/">
          <Image src={Logo} alt="logo" height={60} width={60} />Y B S
        </Link>

        <div className="ml-auto flex h-full items-center">
          <div className={classNames("transition-[visibility] md:visible")}>
            <nav
              className={classNames(
                "fixed top-navigation-height left-0 h-[calc(100vh_-_var(--navigation-height))] w-full overflow-auto bg-background transition-opacity duration-500 md:relative md:top-0 md:block md:h-auto md:w-auto md:translate-x-0 md:overflow-hidden md:bg-transparent md:opacity-100 md:transition-none"
              )}
            >
              <ul>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/image">Services</Link>
                </li>
                <li>
                  <Link href="/login">Log in</Link>
                </li>
                <li>
                  <Button href="/register">
                    <span>Register </span>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
};
