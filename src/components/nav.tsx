// Set this component as a client component
"use client";
// Nav Requirements
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { Link } from "next-view-transitions";
// Nav Main Function
function Nav() {
  // Nav Hooks
  const [open, SetOpen] = useState(false);
  const CURRENT_PAGE = usePathname();
  // Nav Pages List to use in Mobile Nav and Desktop Nav
  const NAV_PAGES_LIST = [
    { href: "/", name: "Inicio" },
    { href: "/how-it-works", name: "¿Como Funciona?" },
    { href: "/inventory", name: "Inventarios" },
    { href: "/queue", name: "Colas" },
    { href: "/report-bug", name: "Reportar Problema" },
    { href: "/settings", name: "Ajustes" },
  ];
  // Function that Sets the Opposite Value in Open Hook to Open and Close the Burger Menu
  const OnClickButton = () => {
    SetOpen(!open);
  };
  // Returns Nav Component
  return (
    <nav>
      <div
        className={`p-2 grid grid-cols-3 items-center relative min-[973px]:flex min-[973px]:px-6 ${
          open ? "bg-gray-900" : "bg-gray-950"
        }`}
      >
        {/* Burger Menu Button to Mobile Nav */}
        <button
          className="w-10 h-10 place-content-center text-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-white min-[973px]:hidden"
          onClick={OnClickButton}
        >
          {/* If the burger menu is closed, it shows the bars icon; if open, shows the X Mark icon */}
          <Bars3Icon
            className={`w-7 mx-auto ${open ? "hidden" : ""}`.trimEnd()}
          />
          <XMarkIcon
            className={`w-7 mx-auto ${open ? "" : "hidden"}`.trimEnd()}
          />
        </button>
        <Link href="/" className="min-[973px]:m-3">
          <Image
            src="/logo.svg"
            alt="Mateory Logo"
            width={120}
            height={20}
            priority
            className="mx-auto"
          />
        </Link>
        {/* Desktop Nav */}
        <div className="hidden min-[973px]:block">
          {NAV_PAGES_LIST.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className={`font-medium mx-2 px-3 py-2 rounded-md select-none ${
                CURRENT_PAGE === page.href
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              {page.name}
            </Link>
          ))}
        </div>
      </div>
      {/* Mobile Nav */}
      <div
        className={`flex flex-col text-white absolute bg-gray-900 w-full py-2 z-20 min-[973px]:hidden ${
          open ? "" : "hidden"
        }`.trimEnd()}
      >
        {NAV_PAGES_LIST.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            onClick={() => SetOpen(false)}
            className={`mx-2 my-1 px-3 py-2 font-medium ${
              CURRENT_PAGE === page.href ? "bg-gray-700 rounded-md" : ""
            }`}
          >
            {page.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Nav;
