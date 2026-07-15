"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import Logo from "../common/Logo";
import navigation from "@/constants/adminNavigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-72 border-r bg-white flex-col">

      <div className="border-b px-8 py-7">
        <Logo />
      </div>

      <nav className="flex-1 p-5 space-y-2">

        {navigation.map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all",

                pathname === item.href
                  ? "bg-[#0D3B82] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Icon size={20} />

              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}