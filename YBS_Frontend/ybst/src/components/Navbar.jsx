"use client";

import Link from "next/link";

import classNames from "classnames";

import Image from "next/image";
import { Container } from "./container";
import { Button } from "./Button";
import Logo from "src/app/assets/logo.webp";

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
                "fixed top-navigation-height left-0 h-0 w-full overflow-auto bg-background transition-opacity duration-500 md:relative md:top-0 md:block md:h-auto md:w-auto md:translate-x-0 md:overflow-hidden md:bg-transparent md:opacity-100 md:transition-none"
              )}
            >
              <ul
                className={classNames(
                  "flex h-full flex-col md:flex-row md:items-center [&_li]:ml-6 [&_li]:border-b [&_li]:border-grey-dark md:[&_li]:border-none",
                  "ease-in [&_a:hover]:text-grey [&_a]:flex [&_a]:h-10 [&_a]:w-full [&_a]:translate-y-8 [&_a]:items-center [&_a]:text-lg [&_a]:transition-[color,transform] [&_a]:duration-300 md:[&_a]:translate-y-0 md:[&_a]:text-sm [&_a]:md:transition-colors"
                )}
              >
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/service">Services</Link>
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
