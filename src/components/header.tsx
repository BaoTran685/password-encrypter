"use client";

import Link from "next/link";
import Line from "./line";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/tailwind-merge";

const links = [
  {
    link: "/generate",
    name: "Generate",
    color: 'white',
  },
  {
    link: "/function",
    name: "Encrypt",
    color: 'white',
  },
  // {
  //   link: "/about",
  //   name: "About",
  // },
];

const Header = () => {
  const path = usePathname();

  return (
    <nav>
      <div className="flex flex-col sm:flex-row sm:justify-between py-4 sm:py-5 md:py-6">
        <Link href="/">
          <p className="text--main--header font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-yellow-600 text-center">
            Password Encrypter
          </p>
        </Link>
        <div className="flex flex-row justify-center items-end space-x-4 sm:space-x-8 mt-2 sm:mt-0">
          {links.map((item, index) => {
            const underline = path == item.link ? "underline" : "";
            return (
              <Link
                key={index}
                href={item.link}
                className={`font-semibold hover:underline decoration-2 decoration-[${item.color}] ${underline}`}
              >
                <p className={`text--sub--header text-[${item.color}]`}>{item.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
      <Line />
    </nav>
  );
};

export default Header;
