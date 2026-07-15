import Image from "next/image";

import Section from "../common/Section";
import Button from "../common/Button";

import logo from "@/assets/images/logo.png";

export default function Hero() {
  return (
    <Section className="overflow-hidden">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        {/* LEFT */}

        <div>
          {/* Badge */}

          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-[#0D3B82]">
            Premium Marketplace for Digital Designs
          </span>

          {/* Heading */}

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl">
            Discover
            <span className="block text-[#0D3B82]">Creative Design Files</span>
          </h1>

          {/* Description */}

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 lg:text-lg">
            Discover premium digital design files for CNC carving, laser
            cutting, interior décor, woodworking and creative projects. Built
            for makers, artists and businesses.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button>Explore Collections</Button>

            <Button href="/login" variant="secondary">
              Login
            </Button>
          </div>

          {/* Stats */}

          <div className="mt-12 grid grid-cols-3 gap-6">
            <div>
              <h3 className="text-3xl font-bold text-[#0D3B82]">1200+</h3>

              <p className="mt-1 text-sm text-gray-500">Products</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#0D3B82]">20+</h3>

              <p className="mt-1 text-sm text-gray-500">Collections</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#0D3B82]">5000+</h3>

              <p className="mt-1 text-sm text-gray-500">Downloads</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="relative flex justify-center">
          {/* Background Circle */}

          <div className="absolute h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-50 lg:h-96 lg:w-96" />

          {/* Main Card */}

          <div className="relative w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl">
            <Image
              src={logo}
              alt="Artkaar"
              priority
              className="mx-auto h-auto w-60 object-contain"
            />

            <div className="mt-8 border-t pt-6">
              <p className="text-sm uppercase tracking-wider text-gray-500">
                Featured Collection
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                Premium Digital Designs
              </h3>

              <p className="mt-3 text-gray-600">
                Download premium design files for CNC, Laser, Woodworking,
                Interior Design and Creative Projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
