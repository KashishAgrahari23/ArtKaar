import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/images/icon.png";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <Image
        src={logo}
        alt="Artkaar"
        priority
        width={60}
        height={60}
        className="h-14 w-auto object-contain"
      />

      <div>
        <h1 className="text-2xl font-bold tracking-wide text-[#0D3B82]">
          ARTKAAR
        </h1>

        <p className="text-xs text-gray-500">
          Design • Develop • Deliver
        </p>
      </div>
    </Link>
  );
}