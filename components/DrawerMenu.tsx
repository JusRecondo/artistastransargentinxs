"use client";

import { useState } from "react";
import { FaSliders, FaX } from "react-icons/fa6";

export function DrawerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón para abrir el drawer */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-50 p-3 border-2 border-black bg-white text-black font-bold hover:bg-gray-200 transition"
      >
        <FaSliders />
      </button>

      {/* Drawer lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white border-l-4 border-black z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col p-6 gap-4`}
      >
        <button
          onClick={() => setOpen(false)}
          className="self-end p-2 border-2 border-black hover:bg-gray-200"
        >
          <FaX />
        </button>

        <nav className="flex flex-col gap-4 mt-4 font-bold text-lg">
          <a href="/" className="border-b-2 border-black pb-1">Home</a>
          <a href="/about" className="border-b-2 border-black pb-1">About</a>
          <a href="/contact" className="border-b-2 border-black pb-1">Contact</a>
          {/* Agregá más links según tu proyecto */}
        </nav>
      </div>
    </>
  );
}