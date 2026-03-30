"use client"
import { useRouter } from "next/navigation"
import { FaArrowLeft } from "react-icons/fa"

export const BackBtn = () => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 cursor-pointer hover:underline"
    >
      <FaArrowLeft />
      Volver
    </button>
  )
}
