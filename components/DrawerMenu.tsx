"use client"

import { disciplinas } from "@/lib/const"
import { useSearchStore } from "@/stores/searchStore"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { FaSliders, FaX } from "react-icons/fa6"

export function DrawerMenu() {
  const [open, setOpen] = useState(false)
  const searchQuery = useSearchStore((state) => state.searchQuery)
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery)
  const setFilter = useSearchStore((state) => state.setFilter)
  const filter = useSearchStore((state) => state.filters.disciplina)

  const searchParams = useSearchParams()
  const urlFilter = searchParams.get("disciplina") || ""

  useEffect(() => {
    if (urlFilter) {
      setFilter("disciplina", urlFilter)
    } else {
      setFilter("disciplina", "")
    }
  }, [urlFilter])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleChangeFilter = (filterName: string, value: string) => {
    if (value) {
      const params = new URLSearchParams(searchParams)
      params.set(filterName, value)
      window.history.pushState(null, "", `?${params.toString()}`)
    } else {
      const params = new URLSearchParams(searchParams)
      params.delete(filterName)
      window.history.pushState(
        null,
        "",
        params.toString() ? `?${params.toString()}` : window.location.pathname,
      )
    }
    setFilter(filterName, value)
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
        className={`fixed top-0 right-0 h-full w-80 overflow-y-auto bg-white border-l-4 border-black z-50 transform transition-transform duration-300 flex flex-col p-6 gap-4 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="self-end p-2 border-2 border-black hover:bg-gray-200"
        >
          <FaX />
        </button>

        <div className="flex flex-col gap-4 mt-4 font-bold text-lg ">
          {/* Búsqueda */}
          <label htmlFor="search">Buscar por nombre</label>
          <input
            id="search"
            type="text"
            placeholder="Ingresa el nombre del artista"
            className="border-2 border-black p-2 font-bold focus:outline-none"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          {/* Filtros por disciplina */}
          <label htmlFor="disciplina-filter">Filtrar por disciplina</label>
          <select
            id="disciplina-filter"
            value={filter || ""}
            onChange={(e) => handleChangeFilter("disciplina", e.target.value)}
            className="border-2 border-black p-2 hover:bg-gray-200 cursor-pointer font-bold focus:outline-none"
          >
            <option value="">Todas</option>
            {disciplinas.map((disc) => (
              <option key={disc} value={disc}>
                {disc}
              </option>
            ))}
          </select>

          {/* FAQ */}
          <h2 className="text-xl pb-1">
            <Link
              href="/faq"
              onClick={() => setOpen(false)}
              className="hover:underline"
            >
              Preguntas Frecuentes
            </Link>
          </h2>
        </div>
      </div>
    </>
  )
}
