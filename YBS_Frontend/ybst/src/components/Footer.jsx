import Link from "next/link";
import { Container } from "./container";

import Logo from "src/app/assets/logo.webp";

import Image from "next/image";

const footerLinks = [
  {
    title: "Product",
    links: [
      { title: "Text-To-Text", href: "/service" },
      { title: "Text-To-Image", href: "/service" },
    ],
  },
  {
    title: "Company",
    links: [{ title: "About us", href: "/about" }],
  },

  {
    title: "Important Links",
    links: [{ title: "GitHub", href: "#" }],
  },
];

export const Footer = () => (
  <footer className="mt-12 border-t border-transparent-white py-[5.6rem] text-sm">
    <Container className="flex flex-col justify-between lg:flex-row">
      <div className="flex flex-wrap">
        {footerLinks.map((column) => (
          <div
            key={column.title}
            className="mt-10 min-w-[50%] lg:mt-0 lg:min-w-[18rem]"
          >
            <h3 className="mb-3 font-medium">{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.title} className="[&_a]:last:mb-0">
                  <Link
                    className="mb-3 block text-grey transition-colors hover:text-off-white"
                    href={link.href}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div>
        <div className="flex h-full flex-row justify-between lg:flex-col">
          <Link href="/">
            <Image src={Logo} alt="logo" height={100} width={100} />
          </Link>
        </div>
      </div>
    </Container>
  </footer>
);
