import Link from "next/link"

type Props = {
  title: string
}

export default function ShareCard({ title }: Props) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-270 h-270 flex flex-col items-center justify-center p-16">
        <h1
          className="
          text-6xl md:text-7xl 
          font-bold 
          text-center 
          leading-tight
          tracking-tight
        "
        >
          {title}
        </h1>
        <Link href="/">Ir al inicio</Link>
      </div>
    </div>
  )
}
