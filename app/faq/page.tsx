"use client"
import { BackBtn } from "@/components/BackBtn"
import { useState } from "react"

type FAQItem = {
  question: string
  answer: string
  link?: { text: string; url: string }
}

const faqs: FAQItem[] = [
  {
    question: "¿Cómo puedo sumarme al archivo?",
    answer:
      "Para formar parte del archivo, ingresa y completa este formulario: ",
    link: {
      text: "Formulario de registro",
      url: "https://forms.gle/kZC8AedsxaZWXko38",
    },
  },
  {
    question: "¿Quienes pueden participar?",
    answer:
      "Personas de Argentina que forman parte de la comunidad travesti/trans/no binarie que practican alguna disciplina artistica, sin importar su nivel de experiencia o reconocimiento público.",
  },
  {
    question: "¿Con qué frecuencia se actualiza el archivo?",
    answer:
      "El archivo se actualiza semanalmente a medida que se reciben nuevas inscripciones y se validan los datos.",
  },
  {
    question: "¿Puedo editar o eliminar mi información del archivo?",
    answer: "Sí, escribinos un email a: ",
    link: { text: "Contacto", url: "mailto:jusrecondo@gmail.com" },
  },
  {
    question: "¿Quien lleva adelante el archivo?",
    answer:
      "Se trata de un trabajo voluntario sin fines de lucro, llevado adelante por una persona que forma parte de la comunidad travesti/trans/no binarie. Para más información sobre el proyecto, podés seguirnos en: ",
    link: { text: "Instagram", url: "https://www.instagram.com/artistastransargentinxs" },
  },
]

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-180 max-w-full mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Preguntas Frecuentes</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleIndex(index)}
              className="w-180 max-w-full text-left p-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
            >
              <span className="font-medium">{faq.question}</span>
              <span className="text-xl">{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="p-4 bg-white border-t">
                {faq.answer}
                {faq.link && (
                  <a
                    href={faq.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="faq-link"
                  >
                    {faq.link.text}
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 border-2 border-black p-2">
        <p>Por dudas, consultas o sugerencias escribinos a <a href="mailto:jusrecondo@gmail.com" target="_blank" className="home-link">este email</a> de contacto. Responderemos a la brevedad.</p>
      </div>
      <div className="mt-4">
        <BackBtn />
      </div>
    </div>
  )
}
