"use client"

import { disciplinas } from "@/lib/const"
import { useArtistStore } from "@/stores/artistsStore"
import { useState } from "react"
import { FaSliders, FaX } from "react-icons/fa6"

export function DrawerMenu() {
  const [open, setOpen] = useState(false)
  const setFilters = useArtistStore((state) => state.setFilters)
  const filters = useArtistStore((state) => state.filters)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setFilters(e.target.value)
  }
  return (
    <>
      {/* Botón de apertura */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-50 p-3 border-2 border-black bg-white text-black font-bold hover:bg-gray-200 transition"
      >
        <FaSliders />
      </button>

      {/* Drawer lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white border-l-4 border-black z-50 transform transition-transform duration-300 flex flex-col p-6 gap-4 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="self-end p-2 border-2 border-black hover:bg-gray-200"
        >
          <FaX />
        </button>

        <div className="flex flex-col gap-4 mt-4 font-bold text-lg">
          {/* Búsqueda */}
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="border-2 border-black p-2 font-bold focus:outline-none"
            value={filters}
            onChange={handleSearchChange}
          />

          {/* Filtros por disciplina */}
          <h2 className="text-xl border-b-2 border-black pb-1">
            Filtrar por disciplina
          </h2>
          {disciplinas.map((disc) => (
            <label
              key={disc}
              className="flex items-center gap-2 border-2 border-black p-2 hover:bg-gray-200 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={false}
                onChange={() => console.log(`Toggling ${disc}`)}
              />
              {disc}
            </label>
          ))}
        </div>
      </div>
    </>
  )
}
