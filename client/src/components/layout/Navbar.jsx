"use client";

import { useState } from "react";
import Link from "next/link";

import Logo from "../common/Logo";
import Container from "../common/Container";
import Button from "../common/Button";

import NAVIGATION from "@/constants/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">

        <Logo />

        {/* Desktop Menu */}

        <nav className="hidden items-center gap-8 lg:flex">
          {NAVIGATION.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-medium text-gray-700 transition hover:text-[#0D3B82]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/admin/login">
            Login
          </Button>
        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border lg:hidden"
        >
          ☰
        </button>
      </Container>

      {/* Mobile Menu */}

      {isOpen && (
        <div className="border-t bg-white lg:hidden">
          <Container className="flex flex-col py-5">

            {NAVIGATION.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-3 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Button
              href="/admin/login"
              className="mt-4"
            >
              Admin Login
            </Button>

          </Container>
        </div>
      )}
    </header>
  );
}